import { CSSProperties, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { Alia } from '../../../../structs/structs';
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import { AddDonationToPerashaModal } from "./AddDonationToPerashaModal";
import { getPerashaInfo } from "../../../../apis/requests";
import { PageContext } from "../../../../StoreInfo/page-storage";
import { DelAllPereashiotInfoModal } from "./DelAllPerashiotInfoModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { LoaderComponent } from "../../../../assets/loader";
import { colors } from "../../../../assets/colors";

export const DonationPerPerashaInfo = () => {
  const { logedUser } = useContext(PageContext) as any;
  const { id } = useParams();
  const navigate = useNavigate();

  const perashaName = id?.replace(/([a-z])([A-Z])/g, '$1 $2') ?? "";

  //const addNewPerToKehila = addPerashaToKehila();

  const [openAliaModal, setOpenAliaModal] = useState(false);
  const [aliotList, setAliotList] = useState<Alia[]>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // ✅ HOOK usado correctamente (SIN useMemo)
  const alia = getPerashaInfo(logedUser.kehila, perashaName);

  // ✅ useEffect corregido
  useEffect(() => {
    if (alia?.aliot) {
      setAliotList(alia.aliot);
    }
  }, [alia, perashaName, logedUser.kehila]);

  // ✅ Filtrado memoizado
  const donationAliot = useMemo(() => {
    return aliotList?.filter(a => a.tipoAlia === "DONACION") || [];
  }, [aliotList]);

  // ✅ Totales derivados (sin useState)
  const { arsTotal, usdTotal } = useMemo(() => {
    return donationAliot.reduce(
      (acc, alia) => {
        if (alia.moneda === "ARS") acc.arsTotal += alia.monto || 0;
        if (alia.moneda === "USD") acc.usdTotal += alia.monto || 0;
        return acc;
      },
      { arsTotal: 0, usdTotal: 0 }
    );
  }, [donationAliot]);

  // ✅ PDF optimizado
  const handleDownloadPDF = useCallback(() => {
    if (donationAliot.length === 0) {
      alert("No hay información para descargar.");
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    doc.setFontSize(20);
    doc.text(perashaName || "Parashá", doc.internal.pageSize.getWidth() / 2, 50, { align: "center" });

    const headers = [["Alia", "Nombre", "Apellido", "Nombre Hebreo", "Monto", "Moneda"]];

    const data = donationAliot.map((alia) => [
      alia.alia!,
      alia.nombre!,
      alia.apellido!,
      alia.nombreHebreo!,
      alia.monto!,
      alia.moneda!,
    ]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 80,
    });

    doc.save(`Donaciones_${perashaName}.pdf`);
  }, [donationAliot, perashaName]);

  return (
    <>
      <div style={styles.container}>
        {/* Header - Buttons Row */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backBtn} onClick={() => navigate("/perasha-info/donation/")}>
              <FaArrowLeft /> Volver
            </button>
          </div>
          <div style={styles.headerRight}>
            <button style={styles.actionBtn} onClick={() => setOpenAliaModal(true)}>
              + Agregar Donación
            </button>
            {donationAliot.length > 0 && (
              <>
                <button style={{...styles.actionBtn, backgroundColor: "#10b981"}} onClick={handleDownloadPDF}>
                  <FaDownload /> Descargar
                </button>
                <button style={{...styles.actionBtn, backgroundColor: "#ef4444"}} onClick={() => setOpenDeleteModal(true)}>
                  Eliminar
                </button>
              </>
            )}
          </div>
        </div>

        {/* Header - Title Row */}
        <div style={{...styles.headerRight, justifyContent: "space-between", marginTop: "40px", marginBottom: "20px"}}>
          <h1 style={styles.title}>Donaciones en Perasha {perashaName}</h1>
          <div></div>
        </div>

        {/* Content */}
        {aliotList === undefined ? (
          LoaderComponent()
        ) : (
          <>
            {/* Summary Cards */}
            {donationAliot.length > 0 && (
              <div style={styles.summarySection}>
                <div style={styles.summaryCard}>
                  <div style={styles.summaryLabel}>Monto recaudado en pesos</div>
                  <div style={styles.summaryAmount}>${arsTotal}</div>
                </div>
                <div style={styles.summaryCard}>
                  <div style={styles.summaryLabel}>Monto recaudado en dólares</div>
                  <div style={styles.summaryAmount}>USD {usdTotal}</div>
                </div>
              </div>
            )}

            {/* Table */}
            <div style={styles.content}>
              {donationAliot.length > 0 ? (
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Alia</th>
                        <th style={styles.th}>Nombre</th>
                        <th style={styles.th}>Apellido</th>
                        <th style={styles.th}>Nombre Hebreo</th>
                        <th style={styles.th}>Monto</th>
                        <th style={styles.th}>Moneda</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donationAliot.map((alia, index) => (
                        <tr key={index}>
                          <td style={styles.td} data-label="Alia">{alia.alia}</td>
                          <td style={styles.td} data-label="Nombre">{alia.nombre}</td>
                          <td style={styles.td} data-label="Apellido">{alia.apellido}</td>
                          <td style={styles.td} data-label="NombreHebreo">{alia.nombreHebreo}</td>
                          <td style={styles.td} data-label="Monto">{alia.monto}</td>
                          <td style={styles.td} data-label="Moneda">{alia.moneda}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={styles.emptyState}>
                  <h3 style={styles.emptyStateText}>No hay donaciones realizadas</h3>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {openAliaModal && (
        <AddDonationToPerashaModal
          setOpenAliaModal={setOpenAliaModal}
          openAliaModal={openAliaModal}
          setAliotList={setAliotList}
          aliotList={aliotList!}
          perashaName={perashaName}
        />
      )}

      <DelAllPereashiotInfoModal
        action={"DEL_PERASHA"}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        typeOfAliotToDelete={"DONACION"}
      />
    </>
  );
};

<style>
{`
  @media (max-width: 768px) {
    table {
      display: block;
      width: 100%;
    }
    thead {
      display: none;
    }
    tbody {
      display: block;
    }
    tr {
      display: block;
      margin-bottom: 15px;
      border: 1px solid #e5e7eb;
      padding: 10px;
      border-radius: 8px;
      background: #ffffff;
    }
    td {
      display: flex;
      justify-content: space-between;
      padding: 5px 10px;
      border: none;
      border-bottom: 1px solid #f3f4f6;
    }
    td::before {
      content: attr(data-label);
      font-weight: bold;
      flex-basis: 50%;
    }
  }
`}
</style>

const styles: { [key: string]: CSSProperties } = {
  container: {
    backgroundColor: colors.main_background,
    padding: "20px",
    borderRadius: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "0",
    overflow: "hidden",
    boxSizing: "border-box",
  } as CSSProperties,
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap" as const,
  } as CSSProperties,
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  } as CSSProperties,
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#07b45b",
    color: "#ffffff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  } as CSSProperties,
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1f2937",
    margin: 0,
  } as CSSProperties,
  headerRight: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  } as CSSProperties,
  summarySection: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap" as const,
    marginBottom: "20px",
  } as CSSProperties,
  summaryCard: {
    flex: 1,
    minWidth: "240px",
    padding: "16px 20px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  } as CSSProperties,
  summaryLabel: {
    fontSize: "14px",
    color: "#6b7280",
    fontWeight: "500",
    marginBottom: "8px",
  } as CSSProperties,
  summaryAmount: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#f59e0b",
  } as CSSProperties,
  actionSection: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap" as const,
  } as CSSProperties,
  actionBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  } as CSSProperties,
  content: {
    flex: 1,
    overflowY: "auto",
  } as CSSProperties,
  tableWrapper: {
    height: 'auto',
    overflowY: 'auto',
    padding: '10px',
    borderRadius: '5px',
  } as CSSProperties,
  table: {
    borderCollapse: 'separate',
    borderSpacing: '10px 12px',
    minWidth: '800px', // ✅ clave para habilitar el scroll horizontal
    width: '100%',
  } as CSSProperties,
  th: {
    padding: '12px 16px',
    textAlign: 'center',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: '#ffffff',
    fontSize: '0.95rem',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    borderRadius: '8px',
    border: '1px solid #1e40af',
  } as CSSProperties,
  td: {
    padding: '14px 16px',
    background: '#ffffff',
    fontSize: '0.95rem',
    color: '#1f2937',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    transition: 'all 0.2s ease',
  } as CSSProperties,
  emptyState: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    textAlign: "center",
  } as CSSProperties,
  emptyStateText: {
    fontSize: "16px",
    color: "#6b7280",
    margin: 0,
  } as CSSProperties,
};
