import React from 'react'
import { CSSProperties } from 'react';
import { colors } from '../../../../assets/colors';

interface FormPersonalDataProps {
  logedVisitorUser: any
}

export const VisitorKehilaForm = ({logedVisitorUser}: FormPersonalDataProps) => {
    return (
      <div style={{ height: "400px", overflowY: "auto", padding: "10px", borderRadius: "5px" }}>
        <div>
          <label htmlFor="userBarMitzvaDateHeb" style={{ display: "block"}}>Fecha Bar Mitzva Hebreo</label>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userBarMitzvaDateHebDia" style={{ display: "block", marginRight: 10}}>Día</label>
              <h5 id="userBarMitzvaDateHebDia" style={styles.input}>
                {logedVisitorUser.fechaNacimientoHebreo?.dia}
              </h5>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userBarMitzvaDateHebMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Mes</label>
              <h5 id="userBarMitzvaDateHebMes" style={styles.input}>
                {logedVisitorUser.fechaNacimientoHebreo?.mes}
              </h5>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userBarMitzvaDateHebAño" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
              <h5 id="userBarMitzvaDateHebAño" style={styles.input}>
                {logedVisitorUser.fechaNacimientoHebreo?.año}
              </h5>
            </div>
          </div>

          <label htmlFor="userBarMitzvaDateGreg" style={{ display: "block"}}>Fecha Bar Mitzva Gregoriano</label>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userBarMitzvaDateGregDia" style={{ display: "block", marginRight: 10}}>Día</label>
              <h5 id="userBarMitzvaDateGregDia" style={styles.input}>
                {logedVisitorUser.fechaBarMitzvaGregoriano?.dia}
              </h5>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userBarMitzvaDateGregMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Mes</label>
              <h5 id="userBarMitzvaDateGregMes" style={styles.input}>
                {logedVisitorUser.fechaBarMitzvaGregoriano?.mes}
              </h5>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userBarMitzvaDateGregAño" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
              <h5 id="userBarMitzvaDateGregAño" style={styles.input}>
                {logedVisitorUser.fechaBarMitzvaGregoriano?.año}
              </h5>
            </div>
          </div>

          <label htmlFor="userPerasha" style={{ display: "block"}}>Perasha Bar Mitzva</label>
          <h5 id="userPerasha" style={styles.input}>
            {logedVisitorUser.perashaBarMitzva}
          </h5>
          
          <label htmlFor="userAbilities" style={{ display: "block" }}>Habilidades</label>
          {logedVisitorUser.habilidades.map((role) => (
            <h5 style={styles.input} key={role}>
              {role}
            </h5>
          ))}

          <label htmlFor="userMotherNameSpa" style={{ display: "block"}}>Nombre Madre Español</label>
          <h5 id="userMotherNameSpa" style={styles.input}>
            {logedVisitorUser.nombreMadreEspañol}
          </h5>
          
          <label htmlFor="userMotherNameHeb" style={{ display: "block"}}>Nombre Madre Hebreo</label>
          <h5 id="userMotherNameHeb" style={styles.input}>
            {logedVisitorUser.nombreMadreHebreo}
          </h5>
          
          <label htmlFor="userFatherNameSpa" style={{ display: "block"}}>Nombre Padre Español</label>
          <h5 id="userFatherNameSpa" style={styles.input}>
            {logedVisitorUser.nombrePadreEspañol}
          </h5>
          
          <label htmlFor="userFatherNameHeb" style={{ display: "block"}}>Nombre Padre Hebreo</label>
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
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    backgroundColor: "white",
    color: "black",
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
  }
};