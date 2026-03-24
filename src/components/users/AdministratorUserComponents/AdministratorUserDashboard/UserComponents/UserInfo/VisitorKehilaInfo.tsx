import { CSSProperties } from 'react';
import { colors } from '../../../../../../assets/colors';
import { Ability } from '../../../../../../structs/structs';


interface FormPersonalDataProps {
  logedVisitorUser: any
}

export const VisitorKehilaInfo = ({logedVisitorUser}: FormPersonalDataProps) => {
    return (
      <div style={{ flex: 1, overflowY: "auto", padding: "10px", borderRadius: "5px", minHeight: 0 }}>
        <div>
          <label htmlFor="userBarMitzvaDateHeb" style={{ display: "block", fontWeight: "bold"}}>Fecha Bar Mitzva Hebreo</label>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userBarMitzvaDateHebDia" style={{ display: "block", fontWeight: "bold", marginRight: 10}}>Día</label>
              <h5 id="userBarMitzvaDateHebDia" style={styles.input}>
                {logedVisitorUser.fechaNacimientoHebreo?.dia}
              </h5>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userBarMitzvaDateHebMes" style={{ display: "block", fontWeight: "bold", marginRight: 10, marginLeft: 10}}>Mes</label>
              <h5 id="userBarMitzvaDateHebMes" style={styles.input}>
                {logedVisitorUser.fechaNacimientoHebreo?.mes}
              </h5>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userBarMitzvaDateHebAno" style={{ display: "block", fontWeight: "bold", marginRight: 10, marginLeft: 10}}>Año</label>
              <h5 id="userBarMitzvaDateHebAno" style={styles.input}>
                {logedVisitorUser.fechaNacimientoHebreo?.ano}
              </h5>
            </div>
          </div>

          <label htmlFor="userBarMitzvaDateGreg" style={{ display: "block", fontWeight: "bold"}}>Fecha Bar Mitzva Gregoriano</label>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userBarMitzvaDateGregDia" style={{ display: "block", fontWeight: "bold", marginRight: 10}}>Día</label>
              <h5 id="userBarMitzvaDateGregDia" style={styles.input}>
                {logedVisitorUser.fechaBarMitzvaGregoriano?.dia}
              </h5>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userBarMitzvaDateGregMes" style={{ display: "block", fontWeight: "bold", marginRight: 10, marginLeft: 10}}>Mes</label>
              <h5 id="userBarMitzvaDateGregMes" style={styles.input}>
                {logedVisitorUser.fechaBarMitzvaGregoriano?.mes}
              </h5>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userBarMitzvaDateGregAno" style={{ display: "block", fontWeight: "bold", marginRight: 10, marginLeft: 10}}>Año</label>
              <h5 id="userBarMitzvaDateGregAno" style={styles.input}>
                {logedVisitorUser.fechaBarMitzvaGregoriano?.ano}
              </h5>
            </div>
          </div>

          <label htmlFor="userPerasha" style={{ display: "block", fontWeight: "bold"}}>Perasha Bar Mitzva</label>
          <h5 id="userPerasha" style={styles.input}>
            {logedVisitorUser.perashaBarMitzva}
          </h5>
          
          <label htmlFor="userAbilities" style={{ display: "block", fontWeight: "bold" }}>Conocimientos</label>
          {logedVisitorUser.habilidades.map((role: Ability) => (
            <h5 style={styles.input} key={role}>
              {role}
            </h5>
          ))}

          <label htmlFor="userMotherNameSpa" style={{ display: "block", fontWeight: "bold"}}>Nombre Madre Español</label>
          <h5 id="userMotherNameSpa" style={styles.input}>
            {logedVisitorUser.nombreMadreEspanol}
          </h5>
          
          <label htmlFor="userMotherNameHeb" style={{ display: "block", fontWeight: "bold"}}>Nombre Madre Hebreo</label>
          <h5 id="userMotherNameHeb" style={styles.input}>
            {logedVisitorUser.nombreMadreHebreo}
          </h5>
          
          <label htmlFor="userFatherNameSpa" style={{ display: "block", fontWeight: "bold"}}>Nombre Padre Español</label>
          <h5 id="userFatherNameSpa" style={styles.input}>
            {logedVisitorUser.nombrePadreEspanol}
          </h5>
          
          <label htmlFor="userFatherNameHeb" style={{ display: "block", fontWeight: "bold"}}>Nombre Padre Hebreo</label>
          <h5 id="userFatherNameHeb" style={styles.input}>
            {logedVisitorUser.nombrePadreHebreo}
          </h5>
        </div>
      </div>
    )
}

const styles: { [key: string]: CSSProperties }= {
  input: {
    width: "80%",
    padding: "10px 12px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    color: "#1f2937",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.btn_background,
    color: "white",
    padding: "10px 16px",
    margin: "8px 0",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    border: "none",
    transition: "all 0.2s ease",
  }
};