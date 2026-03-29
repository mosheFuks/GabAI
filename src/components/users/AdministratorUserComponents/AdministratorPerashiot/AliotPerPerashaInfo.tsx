import { CSSProperties, useContext, useState } from "react";
import { Alia } from '../../../../structs/structs';
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaDownload } from "react-icons/fa";
import { AddUserToAliaModal } from "./AddUserToPerashaModal";
import { PageContext } from "../../../../StoreInfo/page-storage";
import { DelAllPereashiotInfoModal } from "./DelAllPerashiotInfoModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { colors } from "../../../../assets/colors";

export const AliotPerPershaInfo = () => {
  const { logedUser } = useContext(PageContext) as any;
  const { id } = useParams();
  
  //const agregarPerasha = addPerashaToKehila();

  const [openAliaModal, setOpenAliaModal] = useState<boolean>(false)
  //const [addUserAliaModal, setOpenAddUserAliaModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [searchMinian, setSearchMinian] = useState<string>("")
  const [clicked, setClicked] = useState<boolean>(false)

  const navigate = useNavigate();

  const perashaName = id?.replace(/([a-z])([A-Z])/g, '$1 $2') ?? "";
  console.log("Perasha Name: ", perashaName);
  
  const perasha = useQuery(api.kehila.getKehilaPerashaInfo, {
    nombre: logedUser.kehila,
    nombrePerasha: perashaName
  });

  console.log("Info os the current Perasha: ", perasha);
  

  console.log("Perasha info info: ", perasha);
  

  const aliotList = perasha === undefined ? "NOT FOUND" : perasha.aliot;
  console.log("Aliot list: ", aliotList);

  const handleDownloadPDF = () => {
    if (!aliotList || aliotList.length === 0) {
      alert("No hay información para descargar.");
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    // Título centrado
    doc.setFontSize(20);
    doc.text(perashaName || "Parashá", doc.internal.pageSize.getWidth() / 2, 50, { align: "center" });

    // Encabezados de la tabla
    const headers = [
      ["Alia", "Nombre", "Apellido", "Nombre Hebreo", "Aniversario", "Fecha Aniversario Hebreo", "Minian"]
    ];

    // Datos
    const data = aliotList != "NOT FOUND" ? aliotList.filter((alia: Alia) => alia.tipoAlia === "ALIA").map((alia: Alia) => [
      alia.alia!,
      alia.nombre!,
      alia.apellido!,
      alia.nombreHebreo!,
      alia.aniversario!,
      alia.fechaAniversarioHebreo!,
      alia.minian!,
    ])  : [];

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 80,
      styles: {
        fontSize: 10,
        halign: "center",
        valign: "middle",
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: "bold",
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
      },
    });

    // Guardar
    doc.save(`Aliot_${perashaName}.pdf`);
  };

  const searchAliaByMinian = (key: string) => {
    setSearchMinian(key);
  };

  return (
    <>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backBtn} onClick={() => navigate("/perasha-info/aliot")}>
              <FaArrowLeft /> Volver
            </button>
          </div>
          <div style={styles.headerRight}>
            {aliotList !== "NOT FOUND" && aliotList.length > 0 && (
              <>
                <button style={styles.downloadBtn} onClick={handleDownloadPDF} title="Descargar PDF">
                  <FaDownload /> Descargar
                </button>
              </>
            )}
            {aliotList !== "NOT FOUND" && aliotList.length > 0 && (
              <>
                <button style={styles.actionBtn} onClick={() => navigate(`/perasha-info/donation/${id}`)}>+ Donaciones</button>
                <button style={{...styles.actionBtn, backgroundColor: "#ef4444"}} onClick={() => setOpenDeleteModal(true)}>Eliminar</button>
              </>
            )}
          </div>
        </div>
        <div style={{...styles.headerRight, justifyContent: "space-between", marginTop: "40px", marginBottom: "20px"}}>
          <h1 style={styles.title}>Aliot de {id?.replace(/([a-z])([A-Z])/g, '$1 $2')}</h1>
          <div style={styles.searchContainer}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Busca por Minian"
              style={{...styles.searchInput, borderColor: clicked ? "#3b82f6" : "#e5e7eb"}}
              value={searchMinian}
              onChange={(e) => searchAliaByMinian(e.target.value)}
              onClick={() => setClicked(true)}
              onBlur={() => setClicked(false)}
            />
          </div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {aliotList !== "NOT FOUND" && aliotList.length > 0 ? (
            (() => {
              const filteredAlias = aliotList
                .filter((alia: Alia) => alia.tipoAlia === "ALIA")
                .filter((alia: Alia) => {
                  const keySearch = searchMinian.trim().toLowerCase();
                  if (keySearch === "") return true;
                  return alia.minian?.toLowerCase().startsWith(keySearch);
                });

              return filteredAlias.length > 0 ? (
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Alia</th>
                        <th style={styles.th}>Nombre</th>
                        <th style={styles.th}>Apellido</th>
                        <th style={styles.th}>Nombre Hebreo</th>
                        <th style={styles.th}>Aniversario</th>
                        <th style={styles.th}>Fecha Hebrea</th>
                        <th style={styles.th}>Minian</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAlias.map((alia: Alia, index: number) => {
                        const { alia: nomAlia, nombre, apellido, nombreHebreo, aniversario: anive, fechaAniversarioHebreo: fechaAnivHeb, minian } = alia;
                        return (
                          <tr key={index}>
                            <td style={styles.td} data-label="NomAlia">{nomAlia}</td>
                            <td style={styles.td} data-label="Nombre">{nombre}</td>
                            <td style={styles.td} data-label="Apellido">{apellido}</td>
                            <td style={styles.td} data-label="NombreHebreo">{nombreHebreo}</td>
                            <td style={styles.td} data-label="Aniversario">{anive}</td>
                            <td style={styles.td} data-label="FechaAniversarioHebreo">{fechaAnivHeb}</td>
                            <td style={styles.td} data-label="Minian">{minian}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={styles.emptyState}>
                  <h3 style={styles.emptyStateText}>No se seleccionaron Mitpalelim para el Minian seleccionado</h3>
                </div>
              )
            })()
          ) : (
            <div style={styles.emptyState}>
              <h3 style={styles.emptyStateText}>No hay información de las aliot para esta perasha</h3>
              <p style={styles.emptyStateSubtext}>Para agregar información, haz click en el botón "+" al seleccionar un Mitpalel</p>
            </div>
          )}
        </div>
      </div>

      {openAliaModal && (
        <AddUserToAliaModal
          setOpenAliaModal={setOpenAliaModal}
          openAliaModal={openAliaModal}
          userToAddInThePerasha={logedUser}
        />
      )}

      <DelAllPereashiotInfoModal
        action={"DEL_PERASHA"}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        typeOfAliotToDelete={"ALIA"}
      />
    </>
  );
};

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
    flexWrap: "wrap" as const,
  } as CSSProperties,
  searchContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "8px 12px",
    minWidth: "240px",
  } as CSSProperties,
  searchIcon: {
    color: "#9ca3af",
    fontSize: "16px",
  } as CSSProperties,
  searchInput: {
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: "14px",
    flex: 1,
    color: "#374151",
    transition: "border-color 0.2s",
  } as CSSProperties,
  downloadBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#10b981",
    color: "#ffffff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  } as CSSProperties,
  actionBtn: {
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
    flexDirection: "column",
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
    margin: "0 0 8px 0",
  } as CSSProperties,
  emptyStateSubtext: {
    fontSize: "14px",
    color: "#9ca3af",
    margin: 0,
  } as CSSProperties,
};
