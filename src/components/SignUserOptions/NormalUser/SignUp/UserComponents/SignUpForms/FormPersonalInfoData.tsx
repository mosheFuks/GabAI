import { useContext, useEffect, useState } from 'react'
import { CSSProperties } from 'react';
import { HDate } from '@hebcal/core';
import { colors } from '../../../../../../assets/colors';
import { CustomDate, GREG_MONTHS, HEBREW_MONTHS, VisitorUser } from '../../../../../../structs/structs';
import { AfterSunsetSwitch } from '../../../../../../assets/AfterSunsetSwitch';
import { PageContext } from '../../../../../../StoreInfo/page-storage';
import { getKehilotNames, getMinianimList } from '../../../../../../apis/requests';
import { useConvex } from 'convex/react';

interface FormPersonalDataProps {
  handleChangePersonalData: any,
  user: VisitorUser,
  setFormUserPersonalData: (userData: VisitorUser) => void,
  formUserPersonalData: VisitorUser,
  setUser: (userData: VisitorUser) => void,
}

export const FormPersonalInfoData = ({handleChangePersonalData, user, setFormUserPersonalData, formUserPersonalData, setUser}: FormPersonalDataProps) => {
  const { logedUser } = useContext(PageContext) as any;
  
  const [isAfterSunsetSelected, setIsAfterSunsetSelected] = useState<boolean>(false)
  const [minianimList, setMinianimList] = useState<string[]>([]);

  const kehilotNames = getKehilotNames();
  const convex = useConvex();

  const [isMobile, setIsMobile] = useState(false);

  const camposCriticos = [
    'nombreEspanol',
    'nombreHebreo',
    'apellido',
    'fechaNacimientoGregoriano',
    'fechaNacimientoHebreo',
    'minian'
  ];
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 600); // podés ajustar el break point
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getMinianimFromTheList = async (nombre: string) => {
    try {
      const minianimList = await getMinianimList(convex, nombre);
      setMinianimList(minianimList!);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const calculateHebrewBirthDate = (date: CustomDate) => {
    const day = +date.dia!
    const month = +date.mes!
    const year = +date.ano!

    const gregorianDate = new Date(year, month - 1, day, 12)

    // Si el usuario indicó "after sunset" sumamos un día en la conversión
    const hd = isAfterSunsetSelected
      ? new HDate(gregorianDate).add(1, 'd')   // avanzamos 1 día
      : new HDate(gregorianDate)

    const dayHeb = hd.getDate()               // número de día (1-30)
    const monthHeb = hd.getMonthName()        // nombre completo del mes, p.ej. "Adar II"
    const yearHeb = hd.getFullYear()          // año hebreo

    saveBirthDateParams("dia", "fechaNacimientoHebreo", true, [
      String(dayHeb),
      monthHeb,
      String(yearHeb),
    ])
  }


  const calculateGregorianBirthDate = (date: CustomDate) => {
    // Extraer el ano, mes y día manualmente
    const hebDay = +date.dia!
    const hebMonth = date.mes
    const hebYear = +date.ano!

    const hdate = new HDate(hebDay, hebMonth, hebYear);
    const gregDate: Date = hdate.greg();
    const dayGreg = gregDate.getDate()
    const monthGreg = gregDate.getMonth() + 1
    const yearGreg = gregDate.getFullYear()

    saveBirthDateParams("dia", "fechaNacimientoGregoriano", true, [dayGreg, monthGreg, yearGreg])
  };

  const calculateBirthDateBtn = (birthType: "fechaNacimientoGregoriano" | "fechaNacimientoHebreo", referenceDateValue: CustomDate, disabledCondition: boolean) => {
    return (
      <>
        <button 
          type="button" 
          style={{...styles.button, backgroundColor: disabledCondition == true ? 'gray' : colors.btn_calculate_date, color: "white"}}
          onClick={() => birthType == "fechaNacimientoHebreo" ? calculateHebrewBirthDate(referenceDateValue) : calculateGregorianBirthDate(referenceDateValue)} 
          disabled={disabledCondition}>
            Calcular fecha
        </button>
      </>
    )
  };

  const saveBirthDateParams = (dateKey: string, birthType: "fechaNacimientoGregoriano" | "fechaNacimientoHebreo", isCalculated?: boolean, e?: any) => {
    if (!isCalculated) { 
      setFormUserPersonalData({
        ...formUserPersonalData,
        [birthType]: {
          ...formUserPersonalData[birthType],
          [dateKey]: e.target.value, // Update the specific field
        },
      })
      setUser({
        ...user,
        [birthType]: {
          ...(user[birthType]),
          [dateKey]: e.target.value,
        },
      });
    } else {
      setFormUserPersonalData({
        ...formUserPersonalData,
        [birthType]: {
          ...formUserPersonalData[birthType],
          dia: e[0],
          mes: e[1],
          ano: e[2]
        },
      });
      setUser({
        ...user,
        [birthType]: {
          ...(user[birthType]),
          dia: e[0],
          mes: e[1],
          ano: e[2]
        },
      });
    }    
  }

  useEffect(() => {
    if (logedUser.rol == "") return;
    setFormUserPersonalData({ ...formUserPersonalData, ["nombreKehila"]: logedUser.kehila });
    setUser({...user, ["nombreKehila"]: logedUser.kehila });
    getMinianimFromTheList(logedUser.kehila);
  }, [logedUser]);

  const renderCamposCriticos = (htmlAndId: string, campo: string, name: string, value: string, placeholder: string = "") => {
    return (
      <div>
        <label htmlFor={htmlAndId}style={{ display: "block", fontWeight: "bold"}}>{campo} <span style={{ color: 'red' }}>*</span></label>
        <input id={htmlAndId} type="text" name={name} placeholder={placeholder == "" ? campo : placeholder} onChange={handleChangePersonalData} 
          style={{
            ...styles.input,
            borderColor: camposCriticos.includes(name) ? 'red' : '#ccc',
          }} 
          value={value}
        />
        {/*<div>{renderError(name)}</div>*/}  
      </div>
    )
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "10px", borderRadius: "5px", minHeight: 0 }}>
      <div>
        <label htmlFor="userKehilaName" style={{ display: "block", fontWeight: "bold" }}>Nombre Kehila</label>
        { logedUser.rol != "" ? 
            <input id="userKehilaName" type="text" name="nombreKehila" style={styles.input} onChange={handleChangePersonalData} value={logedUser.kehila} disabled/>
          :  
            <select
              id="userKehilaName"
              name="nombreKehila"
              onChange={(e) => {
                handleChangePersonalData(e);
                const selectedKehila = e.target.value;
                getMinianimFromTheList(selectedKehila);
              }}
              style={styles.input}
            >
              <option value={user.nombreKehila != "" ? user.nombreKehila : ""} disabled selected>Selecciona una Kehila</option>
              { kehilotNames && kehilotNames.length > 0 ? (
                kehilotNames.map((kehila: string) => (
                  <option key={kehila} value={kehila}>{kehila}</option>
                ))) : ( null )}
            </select>
        }
        <label style={{ display: 'block', fontWeight: 'bold' }}>
          Minian <span style={{ color: 'red' }}>*</span>
        </label>
        <select id="userMinian" name="minian" onChange={(e) => { 
          handleChangePersonalData(e);
        }} style={{...styles.input, borderColor: camposCriticos.includes('minian') ? 'red' : '#ccc'}}>
          <option value={user.minian != "" ? user.minian : ""} disabled selected>Selecciona un Minian</option>
          { minianimList && minianimList.length > 0 ? (
            minianimList.map((minian: string) => (
              <option key={minian} value={minian}>{minian}</option>
            ))) : ( null )}
        </select>
        {/*<div>{renderError('minian')}</div>*/}

        {/*//userApellido     //Apellido     //apellido     //user.apellido */}
        {renderCamposCriticos("userApellido", "Apellido", "apellido", user.apellido!)}
        
        {/*//userNombreEspanol     //Nombre Español     //nombreEspanol     //user.nombreEspanol */}
        {renderCamposCriticos("userNombreEspanol", "Nombre Español", "nombreEspanol", user.nombreEspanol!)}

        {/*//userNombreHebreo     //Nombre Hebreo     //nombreHebreo     //user.nombreHebreo */}
        {renderCamposCriticos("userNombreHebreo", "Nombre Hebreo", "nombreHebreo", user.nombreHebreo!, "Yaakov ben Yitzjak")}

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px", gap: "20px"}}>
          <label htmlFor="userFechaNacGreg" style={{ display: "block", fontWeight: "bold"}}>Fecha Nacimiento Gregoriano<span style={{ color: 'red' }}>*</span></label>
          {calculateBirthDateBtn("fechaNacimientoGregoriano", user.fechaNacimientoHebreo!, user.fechaNacimientoHebreo?.ano == "")}
        </div>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row"}}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor="userFechaNacGregDia" style={{ display: "block", fontWeight: "bold", marginRight: 10}}>Día</label>
            <input id="userFechaNacGregDia" type="number" name="fechaNacimientoGregoriano" placeholder="Día" onChange={(e: any) => saveBirthDateParams("dia", "fechaNacimientoGregoriano", false, e)} style={{...styles.input}} value={user.fechaNacimientoGregoriano?.dia}/>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor="userFechaNacGregMes" style={{ display: "block", fontWeight: "bold", marginRight: 10, marginLeft: 10}}>Mes</label>
            <select id="userFechaNacGregMes" name="fechaNacimientoGregoriano" onChange={(e: any) => saveBirthDateParams("mes", "fechaNacimientoGregoriano", false, e)} style={styles.input} value={user.fechaNacimientoGregoriano?.mes}>
              <option value="" disabled hidden>Mes</option>
              {GREG_MONTHS.map((month) => (
                <option key={month.numero} value={month.numero}>{month.nombre}</option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor="userFechaNacGregAno" style={{ display: "block", fontWeight: "bold", marginRight: 10, marginLeft: 10}}>Año</label>
            <input id="userFechaNacGregAno" type="number" name="fechaNacimientoGregoriano" placeholder="Año" onChange={(e: any) => saveBirthDateParams("ano", "fechaNacimientoGregoriano", false, e)} style={{...styles.input}} value={user.fechaNacimientoGregoriano?.ano}/>
          </div>
        </div>
        {/*<div>{renderError('fechaNacimientoHebreo')}</div>*/}
        
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px", gap: "20px" }}>
          <label htmlFor="userFechaNacHeb" style={{ display: "block", fontWeight: "bold"}}>Fecha Nacimiento Hebreo<span style={{ color: 'red' }}>*</span></label>
          {calculateBirthDateBtn("fechaNacimientoHebreo", user.fechaNacimientoGregoriano!, user.fechaNacimientoGregoriano?.ano == "")}
        </div>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row"}}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor="userFechaNacHebDia" style={{ display: "block", fontWeight: "bold", marginRight: 10}}>Día</label>
            <input id="userFechaNacHebDia" type="number" name="fechaNacimientoHebreo" placeholder="Día" onChange={(e: any) => saveBirthDateParams("dia", "fechaNacimientoHebreo", false, e)} style={{...styles.input}} value={user.fechaNacimientoHebreo?.dia}/>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor="userFechaNacHebMes" style={{ display: "block", fontWeight: "bold", marginRight: 10, marginLeft: isMobile ? 0 : 10}}>
              Mes
            </label>
            <select
              id="userFechaNacHebMes"
              name="fechaNacimientoHebreo"
              style={styles.input}
              onChange={(e) => saveBirthDateParams("mes", "fechaNacimientoHebreo", false, e)}
              value={user.fechaNacimientoHebreo?.mes || ""}
            >
              <option value="" disabled>
                Mes
              </option>
              {HEBREW_MONTHS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor="userFechaNacHebAno" style={{ display: "block", fontWeight: "bold", marginRight: 10, marginLeft: 10}}>Año</label>
            <input id="userFechaNacHebAno" type="number" name="fechaNacimientoHebreo" placeholder="Año" onChange={(e: any) => saveBirthDateParams("ano", "fechaNacimientoHebreo", false, e)} style={{...styles.input}} value={user.fechaNacimientoHebreo?.ano}/>
          </div>
          <AfterSunsetSwitch isCheked={isAfterSunsetSelected} setIsCheked={setIsAfterSunsetSelected} />
        </div>
        {/*<div>{renderError('fechaNacimientoGregoriano')}</div>*/}

        {/*userEmailPers     //Email Personal     //emailPersonal     //user.emailPersonal */}
        {renderCamposCriticos("userEmailPers", "Email Personal", "emailPersonal", user.emailPersonal!)}

        <label htmlFor="userEmailCom" style={{ display: "block", fontWeight: "bold"}}>Email Comercial</label>
        <input id="userEmailCom" type="email" name="emailComercial" placeholder="Email Comercial (Opcional)" onChange={handleChangePersonalData} style={styles.input} value={user.emailComercial}/>
        
        <label htmlFor="userPhone" style={{ display: "block", fontWeight: "bold"}}>Teléfono</label>
        <input id="userPhone" type="number" name="telefono" placeholder="Teléfono" onChange={handleChangePersonalData} style={styles.input} value={user.telefono}/>
        
        <label htmlFor="userDirection" style={{ display: "block", fontWeight: "bold"}}>Dirección</label>
        <input id="userDirection" type="text" name="direccion" placeholder="Dirección" onChange={handleChangePersonalData} style={styles.input} value={user.direccion}/>
        
        <label htmlFor="userAsosiateNum" style={{ display: "block", fontWeight: "bold"}}>Numero Socio</label>
        <input id="userAsosiateNum" type="text" name="numeroSocio" placeholder="Número de Socio" onChange={handleChangePersonalData} style={styles.input} value={user.numeroSocio}/>
        
        <label htmlFor="userGroup" style={{ display: "block", fontWeight: "bold" }}>Estatus Halájico</label>
        <select id="userGroup" name="grupo" onChange={(e) => { 
          handleChangePersonalData(e);
        }} style={styles.input}>
          <option value="" disabled selected>Estado Halájico</option>
          <option value="Cohen">Cohen</option>
          <option value="Levi">Levi</option>
          <option value="Israel">Israel</option>
        </select>
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