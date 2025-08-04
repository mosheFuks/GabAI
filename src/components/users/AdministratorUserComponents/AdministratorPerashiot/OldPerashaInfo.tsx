import { CSSProperties, useContext, useEffect, useState } from "react";
import { Alia } from '../../../../structs/structs';

import { useNavigate, useParams } from "react-router-dom";

import {FaArrowLeft } from "react-icons/fa";
import { colors } from "../../../../assets/colors";
import { AliaModal } from "./AliaModal";
import { addPerashaToKehila, getPerashaInfo } from "../../../../apis/requests";
import { PageContext } from "../../../../StoreInfo/page-storage";
import { DelAllPereashiotInfoModal } from "./DelAllPerashiotInfoModal";

export const OldPerashaInfo = () => {
  const { logedUser } = useContext(PageContext) as any;
  const { id } = useParams();

  const perashaName = id?.replace(/([a-z])([A-Z])/g, '$1 $2') ?? "";
  let alia = getPerashaInfo(logedUser.kehila, perashaName);
  const agregarPerasha = addPerashaToKehila();

  const [openAliaModal, setOpenAliaModal] = useState<boolean>(false)
  //const [addUserDonationModal, setOpenAddUserDonationModal] = useState<boolean>(false)
  const [aliotList, setAliotList] = useState<Alia[]>()
  const [arsDonation, setArsDonation] = useState<number>(0)
  const [usdDonation, setUsdDonation] = useState<number>(0)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const navigate = useNavigate();

  const getAllPendingDonations = () => {
    if (aliotList && aliotList.length > 0) {
       const arsTotal = aliotList!.reduce((total, alia) => {
        if (alia.moneda === 'ARS') {
          return total + (alia.monto || 0);
        }
        return total;
      }, 0);
      const usdTotal = aliotList!.reduce((total, alia) => {
        if (alia.moneda === 'USD') {
          return total + (alia.monto || 0);
        }
        return total;
      }, 0);
      setArsDonation(arsTotal);
      setUsdDonation(usdTotal);
    }
  }
  
  useEffect(() => {
    if (alia === "NOT FOUND") {
      agregarPerasha(logedUser.kehila, perashaName);
    } else {
      setAliotList(alia?.aliot!)
      getAllPendingDonations()
    }
  }, [alia, agregarPerasha]);


  return (
    <>
    <div style={styles.container}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", height: "70px", marginBottom: '20px'}}>
        <button style={{...styles.button, backgroundColor: "green"}} onClick={() => navigate("/administrator-dashboard")}>
          <FaArrowLeft className="text-black" /> Lista de Perashiot
        </button>
        <h2 style={{...styles.title, marginRight: '100px'}}>
          {id?.replace(/([a-z])([A-Z])/g, '$1 $2')}
        </h2>
        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <button style={styles.delButton} onClick={() => setOpenDeleteModal(true)}>Eliminar</button>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', marginTop: '10px', marginBottom: '10px'}}>
        <div style={{ display: "flex", flexDirection: "row", gap: '10px' }}>
          <div style={styles.pendingCard}>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {`Monto recaudado en pesos:`}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'orange' }}>
              ${arsDonation}
            </div>
          </div>

          <div style={styles.pendingCard}>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {`Monto recaudado en dolares:`}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'orange' }}>
              USD {usdDonation} 
            </div>
          </div> 
        </div>
        <button style={{...styles.button, backgroundColor: "orange"}} onClick={() => setOpenAliaModal(true)}>
          Agregar Alia
        </button>
      </div>
      <div style={{ flex: 1, height: "400px", overflowY: "auto", borderRadius: "5px" }}>
        <div>
            {aliotList && aliotList.length > 0  ? (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Alia</th>
                    <th style={styles.th}>Nombre</th>
                    <th style={styles.th}>Nombre Hebreo</th>
                    <th style={styles.th}>Apellido</th>
                    <th style={styles.th}>Monto</th>
                    <th style={styles.th}>Moneda</th>
                  </tr>
                </thead>
                <tbody>
                  {aliotList!.map((alia: Alia, index) => {
                    const nomAlia = alia.alia;
                    const nombre = alia.nombre;
                    const nombreHebreo = alia.nombreHebreo;
                    const apellido = alia.apellido;
                    const monto = alia.monto
                    const moneda = alia.moneda

                    return (
                      <tr key={index}>
                        <td style={styles.td} data-label="NomAlia">{nomAlia}</td>
                        <td style={styles.td} data-label="Nombre">{nombre}</td>
                        <td style={styles.td} data-label="NombreHebreo">{nombreHebreo}</td>
                        <td style={styles.td} data-label="Apellido">{apellido}</td>
                        <td style={styles.td} data-label="Monto">{monto}</td>
                        <td style={styles.td} data-label="Moneda">{moneda}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )
            : 
            (
              <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '3rem' }}>
                <h5 style={{ color: colors.btn_background }}>No hay información de las Aliot</h5>
              </div>
            )}
        </div>
      </div>

      {openAliaModal ? (
        <AliaModal 
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
