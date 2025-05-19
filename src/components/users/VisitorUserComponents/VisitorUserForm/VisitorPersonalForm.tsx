import React, { useState } from 'react'
import { CSSProperties } from 'react';
import { colors } from '../../../../assets/colors';

interface VisitorPersonalDataProps {
  logedVisitorUser: any
}


export const VisitorPersonalForm = ({ logedVisitorUser }: VisitorPersonalDataProps) => {
  return (
    <div style={{ height: "400px", overflowY: "auto", padding: "10px", border: "0px solid #ccc", borderRadius: "5px" }}>
      <div>
        <label htmlFor="userKehilaName" style={{ display: "block" }}>Nombre Kehila</label>
        <h5 id="userKehilaName" style={styles.input}>
          {logedVisitorUser.nombreKehila}
        </h5>

        <label htmlFor="userMinian" style={{ display: "block"}}>Minian</label>
        <h5 id="userKehilaName" style={styles.input}>
          {logedVisitorUser.minian}
        </h5>
          
        <label htmlFor="userNombreEspañol" style={{ display: "block"}}>Nombre Español</label>
        <h5 id="userNombreEspañol" style={styles.input}>
          {logedVisitorUser.nombreEspañol}
        </h5>
        
        <label htmlFor="userNombreHebreo" style={{ display: "block"}}>Nombre Hebreo</label>
        <h5 id="userNombreHebreo" style={styles.input}>
          {logedVisitorUser.nombreHebreo}
        </h5>
        
        <label htmlFor="userApellido"style={{ display: "block"}}>Apellido</label>
        <h5 id="userApellido" style={styles.input}>
          {logedVisitorUser.apellido}
        </h5>

        <label htmlFor="userFechaNacGreg" style={{ display: "block"}}>Fecha Nacimiento Gregoriano</label>
        <div style={{ display: "flex", flexDirection: "row"}}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor="userFechaNacGregDia" style={{ display: "block", marginRight: 10}}>Día</label>
            <h5 id="userFechaNacGregDia" style={styles.input}>
              {logedVisitorUser.fechaNacimientoGregoriano?.dia}
            </h5>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor="userFechaNacGregMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Mes</label>
            <h5 id="userFechaNacGregDia" style={styles.input}>
              {logedVisitorUser.fechaNacimientoGregoriano?.mes}
            </h5>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor="userFechaNacGregAño" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
            <h5 id="userFechaNacGregDia" style={styles.input}>
              {logedVisitorUser.fechaNacimientoGregoriano?.año}
            </h5>
          </div>
        </div>
        
        <label htmlFor="userFechaNacHeb" style={{ display: "block"}}>Fecha Nacimiento Hebreo</label>
        <div style={styles.calculateDateBtnContainer}>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userFechaNacHebDia" style={{ display: "block", marginRight: 10}}>Día</label>
              <h5 id="userFechaNacHebDia" style={styles.input}>
                {logedVisitorUser.fechaNacimientoHebreo?.dia}
              </h5>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userFechaNacHebMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Mes</label>
              <h5 id="userFechaNacHebMes" style={styles.input}>
                {logedVisitorUser.fechaNacimientoHebreo?.mes}
              </h5>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userFechaNacHebAño" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
              <h5 id="userFechaNacHebAño" style={styles.input}>
                {logedVisitorUser.fechaNacimientoHebreo?.año}
              </h5>
            </div>
          </div>
        </div>

        <label htmlFor="userEmailPers" style={{ display: "block"}}>Email Personal</label>
        <h5 id="userEmailPers" style={styles.input}>
          {logedVisitorUser.emailPersonal}
        </h5>
        
        <label htmlFor="userEmailCom" style={{ display: "block"}}>Email Comercial</label>
        <h5 id="userEmailCom" style={styles.input}>
          {logedVisitorUser.emailComercial}
        </h5>
        
        <label htmlFor="userPhone" style={{ display: "block"}}>Teléfono</label>
        <h5 id="userPhone" style={styles.input}>
          {logedVisitorUser.telefono}
        </h5>
        
        <label htmlFor="userDirection" style={{ display: "block"}}>Dirección</label>
        <h5 id="userDirection" style={styles.input}>
          {logedVisitorUser.direccion}
        </h5>
        
        <label htmlFor="userAsosiateNum" style={{ display: "block"}}>Numero Socio</label>
        <h5 id="userAsosiateNum" style={styles.input}>
          {logedVisitorUser.numeroSocio}
        </h5>
        
        <label htmlFor="userGroup" style={{ display: "block" }}>Grupo</label>
        <h5 id="userGroup" style={styles.input}>
          {logedVisitorUser.grupo}
        </h5>
      </div>
    </div>
  )
}

const styles: { [key: string]: CSSProperties }= {
  container: {
    backgroundColor: colors.main_background,
    padding: "10px",
    borderRadius: "25px",
    width: "80%",
    minHeight: "75vh",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "20px auto 0 auto",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  sectionTitle: {
    cursor: "pointer", 
    alignSelf: "center",
    textAlign: 'center', 
    marginRight: 20
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
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
  },
  calculateDateBtnContainer: { 
    display: "flex",
    flexDirection: "row",
    gap: "10px"
  },
  childCardContainer: {
    display: "flex", 
    flexDirection: "row", 
    gap: "10px", 
    marginTop: "10px", 
    flexWrap: "wrap"
  },
};