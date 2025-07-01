import React from 'react'
import { CSSProperties, useState } from 'react';
import { HDate } from '@hebcal/core';
import { Ability, GREG_MONTHS, HEBREW_MONTHS, VisitorUser } from '../../../../../../structs/structs';
import { colors } from '../../../../../../assets/colors';

interface FormPersonalDataProps {
  handleChangePersonalData: any,
  user: VisitorUser,
  setFormUserPersonalData: any,
  formUserPersonalData: any,
  setUser: any
}

export const FormKehilaInfoData = ({handleChangePersonalData, user, setFormUserPersonalData, formUserPersonalData, setUser}: FormPersonalDataProps) => {
    const habilidades: Ability[] = ["Leer Torah", "Jazan", "Leer Haftara", "Leer Meguila"];
    const [habilidad, setHabilidad] = useState<Ability[]>([])

    const handleAddAbility = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value as Ability;
      setHabilidad((prevHabilidades) =>
        e.target.checked
          ? [...prevHabilidades, value] // Agregar si se selecciona
          : prevHabilidades.filter((h) => h !== value) // Quitar si se deselecciona
      );
    };

    const calculateBarMitzvaDateBtn = (disabledCondition: boolean, barMitzvaType: "fechaBarMitzvaHebreo" | "fechaBarMitzvaGregoriano") => {
      return (
        <button 
          type="button" 
          style={{...styles.button, backgroundColor: disabledCondition == true ? 'gray' : colors.btn_calculate_date, color: "white"}} 
          onClick={() => barMitzvaType == "fechaBarMitzvaHebreo" ? calculateHebBarMitzvaDate() : calculateGregBarMitzvaDate()}
          disabled={disabledCondition}>
            Calcular fecha
        </button>
      )
    }

    const saveBarMitzvaDateParams = (dateKey: string, barMitzvaType: "fechaBarMitzvaHebreo" | "fechaBarMitzvaGregoriano", isCalculated?: boolean, e?: any) => {
      if (!isCalculated) { 
        setFormUserPersonalData({
          ...formUserPersonalData,
          [barMitzvaType]: {
            ...formUserPersonalData[barMitzvaType],
            [dateKey]: e.target.value, // Update the specific field
          },
        })
        setUser({
          ...user,
          [barMitzvaType]: {
            ...(user[barMitzvaType]),
            [dateKey]: e.target.value,
          },
        });
      } else {
        setFormUserPersonalData({
          ...formUserPersonalData,
          [barMitzvaType]: {
            ...formUserPersonalData[barMitzvaType],
            dia: e[0].toString(),
            mes: e[1].toString(),
            ano: e[2].toString() // Ensure year is a string
          },
        });
        setUser({
          ...user,
          [barMitzvaType]: {
            ...(user[barMitzvaType]),
            dia: e[0].toString(),
            mes: e[1].toString(),
            ano: e[2].toString() // Ensure year is a string
          },
        });
      }
    }

    const calculateHebBarMitzvaDate = () => {
      const calculatedBarMitzvaYear = parseInt(user.fechaNacimientoHebreo?.ano!) + 13
      saveBarMitzvaDateParams("dia", "fechaBarMitzvaHebreo", true, [user.fechaNacimientoHebreo?.dia, user.fechaNacimientoHebreo?.mes, calculatedBarMitzvaYear.toString()])
    }

    const calculateGregBarMitzvaDate = () => {
      // Extraer el ano, mes y día manualmente
      const hebDay = +user.fechaBarMitzvaHebreo?.dia!
      const hebMonth = user.fechaBarMitzvaHebreo?.mes
      const hebYear = +user.fechaBarMitzvaHebreo?.ano!
  
      const hdate = new HDate(hebDay, hebMonth, hebYear);
      const gregDate: Date = hdate.greg();
      const dayGreg = gregDate.getDate()
      const monthGreg = gregDate.getMonth() + 1
      const yearGreg = gregDate.getFullYear()
  
      saveBarMitzvaDateParams("dia", "fechaBarMitzvaGregoriano", true, [dayGreg, monthGreg, yearGreg])
    };
    
    return (
      <div style={{ height: "400px", overflowY: "auto", padding: "10px", borderRadius: "5px" }}>
        <div>        
            <label htmlFor="userBarMitzvaDateHeb" style={{ display: "block", fontWeight: "bold"}}>Fecha Bar Mitzva Hebreo</label>
            <div style={{ display: "flex", flexDirection: "row"}}>
              <div style={{ display: "flex", flexDirection: "row"}}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                  <label htmlFor="userBarMitzvaDateHebDia" style={{ display: "block", fontWeight: "bold", marginRight: 10}}>Día</label>
                  <input id="userBarMitzvaDateHebDia" type="number" name="fechaBarMitzvaHebreo" placeholder="Día" 
                    onChange={(e: any) => saveBarMitzvaDateParams("dia", "fechaBarMitzvaHebreo", false, e)} 
                    style={{...styles.input}} value={user.fechaBarMitzvaHebreo?.dia}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                  <label htmlFor="userBarMitzvaDateHebMes" style={{ display: "block", fontWeight: "bold", marginRight: 10, marginLeft: 10}}>
                    Mes
                  </label>
                  <select
                    id="userBarMitzvaDateHebMes"
                    name="fechaBarMitzvaHebreo"
                    style={styles.input}
                    onChange={(e) => saveBarMitzvaDateParams("mes", "fechaBarMitzvaHebreo", false, e)}
                    value={user.fechaBarMitzvaHebreo?.mes || ""}
                  >
                    <option value="" disabled>
                      Selecciona un mes
                    </option>
                    {HEBREW_MONTHS.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                  <label htmlFor="userBarMitzvaDateHebAno" style={{ display: "block", fontWeight: "bold", marginRight: 10, marginLeft: 10}}>Año</label>
                  <input id="userBarMitzvaDateHebAno" type="number" name="fechaBarMitzvaHebreo" placeholder="Año" 
                    onChange={(e: any) => saveBarMitzvaDateParams("ano", "fechaBarMitzvaHebreo", false, e)} 
                    style={{...styles.input}} value={user.fechaBarMitzvaHebreo?.ano}
                  />
                </div>
              </div>
              {calculateBarMitzvaDateBtn(user.fechaNacimientoHebreo?.ano == "", "fechaBarMitzvaHebreo")}
            </div>

            <label htmlFor="userBarMitzvaDateGreg" style={{ display: "block", fontWeight: "bold"}}>Fecha Bar Mitzva Gregoriano</label>
            <div style={{ display: "flex", flexDirection: "row"}}>
              <div style={{ display: "flex", flexDirection: "row"}}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                  <label htmlFor="userBarMitzvaDateGregDia" style={{ display: "block", fontWeight: "bold", marginRight: 10}}>Día</label>
                  <input id="userBarMitzvaDateGregDia" type="number" name="fechaBarMitzvaGregoriano" placeholder="Día" 
                    onChange={(e: any) => saveBarMitzvaDateParams("dia", "fechaBarMitzvaGregoriano", false, e)} 
                    style={{...styles.input}} value={user.fechaBarMitzvaGregoriano?.dia}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                  <label htmlFor="userBarMitzvaDateGregMes" style={{ display: "block", fontWeight: "bold", marginRight: 10, marginLeft: 10}}>Mes</label>
                  <select id="userBarMitzvaDateGregMes" name="fechaBarMitzvaGregoriano" onChange={(e: any) => saveBarMitzvaDateParams("mes", "fechaBarMitzvaGregoriano", false, e)} style={styles.input} value={user.fechaBarMitzvaGregoriano?.mes}>
                    {GREG_MONTHS.map((month) => (
                      <option key={month.numero} value={month.numero}>{month.nombre}</option>
                    ))}
                  </select>
                </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                  <label htmlFor="userBarMitzvaDateGregAno" style={{ display: "block", fontWeight: "bold", marginRight: 10, marginLeft: 10}}>Año</label>
                  <input id="userBarMitzvaDateGregAno" type="number" name="fechaBarMitzvaGregoriano" placeholder="Año" 
                    onChange={(e: any) => saveBarMitzvaDateParams("ano", "fechaBarMitzvaGregoriano", false, e)} 
                    style={{...styles.input}} value={user.fechaBarMitzvaGregoriano?.ano}
                  />
                </div>
                {calculateBarMitzvaDateBtn(user.fechaNacimientoHebreo?.ano == "", "fechaBarMitzvaGregoriano")}
            </div>

            <label htmlFor="userPerasha" style={{ display: "block", fontWeight: "bold"}}>Perasha Bar Mitzva</label>
            <input id="userPerasha" type="text" name="perashaBarMitzva" placeholder="Perasha Bar Mitzva" onChange={handleChangePersonalData} style={styles.input} value={user.perashaBarMitzva}/>
            
            <label htmlFor="userAbilities" style={{ display: "block", fontWeight: "bold" }}>Conocimientos</label>
            <div style={styles.input}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {habilidades.map((role) => (
                  <label key={role}>
                    <input
                      type="checkbox"
                      value={role}
                      checked={habilidad.includes(role)}
                      onChange={handleAddAbility}
                    />
                    {role}
                  </label>
                ))}
              </div>
            </div>

            <label htmlFor="userMotherNameSpa" style={{ display: "block", fontWeight: "bold"}}>Nombre Madre Español</label>
            <input id="userMotherNameSpa" type="text" name="nombreMadreEspanol" placeholder="Nombre Madre Español" onChange={handleChangePersonalData} style={{...styles.input}} value={user.nombreMadreEspanol}/>
            
            <label htmlFor="userMotherNameHeb" style={{ display: "block", fontWeight: "bold"}}>Nombre Madre Hebreo</label>
            <input id="userMotherNameHeb" type="text" name="nombreMadreHebreo" placeholder="Nombre Madre Hebreo" onChange={handleChangePersonalData} style={{...styles.input}} value={user.nombreMadreHebreo}/>
            
            <label htmlFor="userFatherNameSpa" style={{ display: "block", fontWeight: "bold"}}>Nombre Padre Español</label>
            <input id="userFatherNameSpa"type="text" name="nombrePadreEspanol" placeholder="Nombre Padre Español" onChange={handleChangePersonalData} style={{...styles.input}} value={user.nombrePadreEspanol}/>
            
            <label htmlFor="userFatherNameHeb" style={{ display: "block", fontWeight: "bold"}}>Nombre Padre Hebreo</label>
            <input id="userFatherNameHeb" type="text" name="nombrePadreHebreo" placeholder="Nombre Padre Hebreo" onChange={handleChangePersonalData} style={{...styles.input}} value={user.nombrePadreHebreo}/>
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