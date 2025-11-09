import { CSSProperties, useContext, useEffect, useState } from "react";
import { colors } from "../../../assets/colors";
import { VisitorUser } from "../../../structs/structs";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavigationDashboardButtons } from "./NavigationDahboardButtons";
import { ThisWeekAniversariesList } from "./AdministratorPerashiot/ThisWeekAniversariesList";
import { DonationPerPersha } from "./AdministratorPerashiot/DonationPerPerasha";

import { getUsersList } from "../../../apis/requests";
import { PageContext } from "../../../StoreInfo/page-storage";
import { AliotPerPersha } from "./AdministratorPerashiot/AliotPerPerasha";

export const AdministratorDefaultDashboard = () => {
  const navigate = useNavigate();
  const { logedUser } = useContext(PageContext) as any;

  const usuarios = logedUser != undefined ? getUsersList(logedUser.kehila) : []
  
  const [step, setStep] = useState(1)
  const [oldPerashaInfo, setOldPerashaInfo] = useState(false)
  const [peopleList, setPeopleList] = useState<VisitorUser[]>();
  const [peopleFilter, setPeopleFilter] = useState(peopleList);

  const getEstadoDeCuenta = (cuenta: any[]) => {
    let hasPendingDonation;
    if (!cuenta || cuenta.length === 0) {
      hasPendingDonation = "SIN MOVIMIENTOS"
    } else {
      const pendingDonation = cuenta.some((movimiento) => movimiento.status === "PENDIENTE");
      hasPendingDonation = pendingDonation ? "PENDIENTE" : "PAGADA";
    }
    return hasPendingDonation
  }; 
  
  useEffect(() => {
    setPeopleList(usuarios)
    setPeopleFilter(usuarios)
    //console.log("Lista de usuarios: ", peopleFilter);
    oldPerashaInfo ? setStep(3) : setStep(1)
  }, [usuarios])
  
  return (
    <div style={styles.container}>     
      <NavigationDashboardButtons 
        peopleList={peopleList} 
        setPeopleFilter={setPeopleFilter} 
        peopleFilter={peopleFilter} 
        setStep={setStep}
        step={step}  />

      {step == 1 ? (
        <div style={styles.stepsContainer}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', textDecorationLine: 'underline', textDecorationColor: 'orange', marginTop: '10px', marginBottom: '10px'}}>
            {`Lista de Mitpalelim de la Kehila`}
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "10px", borderRadius: "5px" }}>
            {peopleFilter != undefined && peopleFilter!.length > 0 ? (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Nombre</th>
                    <th style={styles.th}>Nombre Hebreo</th>
                    <th style={styles.th}>Numero de Socio</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Fecha Nacimiento Gregoriano</th>
                    <th style={styles.th}>Fecha Nacimiento Hebreo</th>
                    <th style={styles.th}>Estado Cuenta</th>
                  </tr>
                </thead>
                <tbody>
                  {peopleFilter!.map((persona, index) => {
                    const nombre = persona.nombreEspanol + " " + persona.apellido;
                    const nombreHebreo = persona.nombreHebreo;
                    const numeroSocio = persona.numeroSocio;
                    const grupo = persona.grupo;
                    const fechaNacimientoGreg = `${persona.fechaNacimientoGregoriano!.dia}/${persona.fechaNacimientoGregoriano!.mes}/${persona.fechaNacimientoGregoriano!.ano}`;
                    const fechaNacimientoHeb = `${persona.fechaNacimientoHebreo!.dia} ${persona.fechaNacimientoHebreo!.mes} ${persona.fechaNacimientoHebreo!.ano}`;
                    const estadoCuenta = getEstadoDeCuenta(persona.cuenta? persona.cuenta : []);

                    return (
                      <tr key={index}>
                        <td style={styles.td} data-label="Nombre">{nombre}</td>
                        <td style={styles.td} data-label="NombreHebreo">{nombreHebreo}</td>
                        <td style={styles.td} data-label="NumeroSocio">{numeroSocio}</td>
                        <td style={styles.td} data-label="Grupo">{grupo}</td>
                        <td style={styles.td} data-label="FechaNacimientoGreg">{fechaNacimientoGreg}</td>
                        <td style={styles.td} data-label="FechaNacimientoHeb">{fechaNacimientoHeb}</td>
                        <td style={styles.td} data-label="EstadoCuenta">
                          <span style={{
                            ...styles.statusBadge,
                            backgroundColor: estadoCuenta === "PENDIENTE" ? "#fef3c7" :
                                            estadoCuenta === "PAGADA" ? "#d1fae5" :
                                            "#e0e7ff",
                            color: estadoCuenta === "PENDIENTE" ? "#92400e" :
                                  estadoCuenta === "PAGADA" ? "#065f46" :
                                  "#3730a3"
                          }}>
                            {estadoCuenta}
                          </span>
                        </td>
                        <td 
                          style={{...styles.td, color: "green", alignItems: "center", cursor:"pointer", border: "2px solid green"}}
                          data-label="InfoUsuario"
                          onClick={() => navigate(`/administrator-user-info/${persona.nombreEspanol}-${persona.apellido!}`)}
                        >
                          <FaArrowAltCircleRight className="text-3xl text-gray-500 hover:text-blue-500 transition-colors duration-200" />
                        </td>
                      </tr>
                    );
                  })} 
                </tbody>
              </table>
            )
            : 
            (
              <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '3rem' }}>
                <h5 style={{ color: colors.btn_background }}>No hay usuarios registrados</h5>
              </div>
            )}
          </div>
        </div>
      ) : (
        null
      )}
      {step === 2 && (
        <div style={styles.stepsContainer}>
          <ThisWeekAniversariesList peopleList={peopleList} />
        </div>
      )}
      {step == 3 ? (
        <div style={styles.stepsContainer}>
          <DonationPerPersha setOldPerashaInfo={setOldPerashaInfo} setStep={setStep}/>
        </div>
      ) : (
        null
      )}

      {step == 4 ? (
        <div style={styles.stepsContainer}>
          <AliotPerPersha setOldPerashaInfo={setOldPerashaInfo} setStep={setStep}/>
        </div>
      ) : (
        null
      )}
    </div>
  );
}

const styles: {  [key: string]: CSSProperties }= {
  container: {
    backgroundColor: colors.main_background,
    //marginBottom: '200px',
    padding: "15px",
    borderRadius: "25px",
    width: "95%", // CAMBIO AQUÍ
    minWidth: "720px",
    //minHeight: "100%", // CAMBIO AQUÍ (antes 75vh)
    height: '85vh',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px auto 0 auto",
    textAlign: "center"
  },
  stepsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%', // <--- aseguramos que ocupe 100% del amarillo
    overflowY: 'auto', // en vez de 'hidden'
    overflowX: "auto"
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    border: `2px solid ${colors.btn_background}`,
    borderColor: colors.btn_background,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.btn_background,
    borderRadius: "30px",
    padding: "10px 20px",
    maxWidth: "900px",
    marginTop: "20px",
    width: "100%"
  },
  buttonGroup: {
    display: "flex",
    flex: 1,
    gap: "10px",
  },
  button: {
    backgroundColor: "green",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    border: "1px solid green",
    cursor: "pointer",
    color: "white",
    fontSize: "16px",
  },
  rightGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    fontSize: "20px",
    cursor: "pointer",
  },
  input: {
    backgroundColor: "white",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    border: "none",
    outline: "none",
    width: "180px",
    color: "black",
    fontSize: "16px",
  },
  tableContainer: {
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
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
  },
  cellPopover: {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    justifyContent: 'space-between',
    width: '100%',
  } as CSSProperties,
  popover: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: 'white',
    border: '1px solid #ccc',
    padding: '5px',
    zIndex: 1000,
    whiteSpace: 'nowrap',
  } as CSSProperties,
  headerButtons: {
    display: "flex",
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  filterButton: {
    border: "1px solid blue",
    color: 'black',
    padding: '10px 15px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '1rem',
    backgroundColor: colors.main_background
  } as CSSProperties
};