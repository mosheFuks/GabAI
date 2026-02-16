import { CSSProperties, useContext, useState } from "react";
import { Alia } from '../../../../structs/structs';

import { useNavigate, useParams } from "react-router-dom";

import {FaArrowLeft } from "react-icons/fa";
import { colors } from "../../../../assets/colors";
import { AddUserToAliaModal } from "./AddUserToPerashaModal";
import { getPerashaInfo } from "../../../../apis/requests";
import { PageContext } from "../../../../StoreInfo/page-storage";
import { DelAllPereashiotInfoModal } from "./DelAllPerashiotInfoModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const AliotPerPershaInfo = () => {
  const { logedUser } = useContext(PageContext) as any;
  const { id } = useParams();

  const perashaName = id?.replace(/([a-z])([A-Z])/g, '$1 $2') ?? "";
  
  //const agregarPerasha = addPerashaToKehila();

  const [openAliaModal, setOpenAliaModal] = useState<boolean>(false)
  //const [addUserAliaModal, setOpenAddUserAliaModal] = useState<boolean>(false)
  const alia = getPerashaInfo(logedUser.kehila, perashaName);
  const aliotList: Alia[] = alia?.aliot ?? [];
  console.log("Alia", alia);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const navigate = useNavigate();

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
    const data = aliotList.filter((alia) => alia.tipoAlia === "ALIA").map((alia) => [
      alia.alia,
      alia.nombre,
      alia.apellido,
      alia.nombreHebreo,
      alia.aniversario,
      alia.fechaAniversarioHebreo,
      alia.minian,
    ]);

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

  
  return (
    <>
    <div style={styles.container}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", height: "70px", marginBottom: '20px'}}>
        <button style={{...styles.button, backgroundColor: "green"}} onClick={() => navigate("/administrator-dashboard")}>
          <FaArrowLeft className="text-black" /> Lista de Perashiot
        </button>
        <h2 style={{...styles.title}}>
          {id?.replace(/([a-z])([A-Z])/g, '$1 $2')}
        </h2>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
          {aliotList!.length > 0 ? (
            <>
            <button style={{...styles.delButton, backgroundColor: aliotList.length > 0 ? "blue" : "gray"}} onClick={handleDownloadPDF} disabled={aliotList.length <= 0}>Descargar</button>
            <button style={{...styles.delButton, backgroundColor: "orange"}} onClick={() => navigate(`/perasha-info/donation/${id}`)}>Agregar Donaciones</button>
            <button style={styles.delButton} onClick={() => setOpenDeleteModal(true)}>Eliminar</button>
            </>
          ) : null}
        </div>
      </div>
      
      <div style={{ flex: 1, height: "400px", overflowY: "auto", borderRadius: "5px" }}>
        <div>
            {aliotList ? (
              aliotList.filter(a => a.tipoAlia === "ALIA").length > 0 ? (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Alia</th>
                      <th style={styles.th}>Nombre</th>
                      <th style={styles.th}>Apellido</th>
                      <th style={styles.th}>Nombre Hebreo</th>
                      <th style={styles.th}>Aniversario</th>
                      <th style={styles.th}>Fecha Aniversario en Hebreo</th>
                      <th style={styles.th}>Minian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aliotList
                      .filter((alia: Alia) => alia.tipoAlia === "ALIA")
                      .map((alia: Alia, index: number) => {
                        const {
                          alia: nomAlia,
                          nombre,
                          apellido,
                          nombreHebreo,
                          aniversario: anive,
                          fechaAniversarioHebreo: fechaAnivHeb,
                          minian
                        } = alia;

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
              ) : (
                <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '3rem' }}>
                  <h5 style={{ color: colors.btn_background }}>
                    No hay información de las aliot para esta perasha
                  </h5>
                </div>
              )
            ) : (
              <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '3rem' }}>
                <h5 style={{ color: colors.btn_background }}>No hay información disponible</h5>
              </div>
            )}
        </div>
      </div>

      {openAliaModal ? (
        <AddUserToAliaModal 
          setOpenAliaModal={setOpenAliaModal}
          openAliaModal={openAliaModal}
          setAliotList={setAliotList}
          aliotList={aliotList!}
          perashaName={id!.replace(/([a-z])([A-Z])/g, '$1 $2')}
        />
      ) : (
        null
      )}

      {
        <DelAllPereashiotInfoModal
          action={"DEL_PERASHA"}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          typeOfAliotToDelete={"ALIA"}
        />
      }

    </div>
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
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 8px;
      background: #f9f9f9;
    }
    td {
      display: flex;
      justify-content: space-between;
      padding: 5px 10px;
      border: none;
      border-bottom: 1px solid #eee;
    }
    td::before {
      content: attr(data-label);
      font-weight: bold;
      flex-basis: 50%;
    }
  }
`}
</style>

const styles: { [key: string]: CSSProperties }= {
  container: {
    backgroundColor: colors.main_background,
    padding: "10px",
    borderRadius: "25px",
    width: "95%",
    minHeight: "75vh",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //justifyContent: "space-between",
    margin: "20px auto 0 auto",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    border: `2px solid ${colors.btn_background}`,
    borderColor: colors.btn_background,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    //marginRight: 100
  },
  button: {
    backgroundColor: colors.btn_background,
    color: "white",
    padding: "10px 15px",
    margin: "10px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    border: "none",
    justifyContent: "center",
    fontWeight: 'bold'
  },
  rightGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    backgroundColor: colors.btn_background,
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    border: "none",
    outline: "none",
    width: "180px",
    color: "white",
    fontSize: "16px",
  },
  table: {
    borderCollapse: 'separate',
    borderSpacing: '10px 12px', // espacio vertical entre filas
    width: '100%',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'center',
    fontWeight: 'bolder ',
    background: '#f9f9f9',
    color: '#333',
    fontSize: '1.05rem',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    borderRadius: '8px', // importante
    border: '2px solid #040404ff',
  },
  td: {
    padding: '14px 16px',
    background: '#fff',
    fontSize: '1.05rem',
    color: '#333',
    borderRadius: '8px', // importante
    border: '2px solid #cbbabaff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  pendingCard: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    border: '3px solid orange',
    borderRadius: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    backgroundColor: '#f9f9f9'
  } as CSSProperties,
  delButton: {
    backgroundColor: "red",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    border: "1px solid green",
    cursor: "pointer",
    color: "white",
    fontSize: "16px",
  } as CSSProperties,
};
