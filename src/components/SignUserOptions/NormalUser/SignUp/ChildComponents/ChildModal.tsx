import React, { useState } from 'react';
import Modal from 'react-modal';
import { colors } from '../../../../../assets/colors';
import { HDate } from "@hebcal/core";
import { Ability, CustomDate, HEBREW_MONTHS, Son, VisitorUser } from '../../../../../structs/structs';
import { AfterSunsetSwitch } from '../../../../../assets/AfterSunsetSwitch';

Modal.setAppElement('#root');

interface ChildModalProps {
  modalChildIsOpen: boolean;
  setChildModalIsOpen: (modalChildIsOpen: boolean) => void;
  user: VisitorUser
  setUser: (user: VisitorUser) => void;
  childSelected?: Son;
  setChildSelected: (user: Son) => void;
}

export const CreateChildModalComponent = ({modalChildIsOpen, setChildModalIsOpen, user, setUser, childSelected, setChildSelected}: ChildModalProps) => {

  const [formUserChildData, setFormUserChildData] = useState<Son>({
    nombre: childSelected?.nombre != null ? childSelected.nombre : "",
    nombreHebreo: childSelected?.nombreHebreo != null ? childSelected.nombreHebreo : "",
    apellido: user.apellido ? user.apellido : "",
    genero: childSelected?.genero != null ? childSelected.genero : "",
    fechaNacimiento: {
      dia: childSelected?.fechaNacimiento?.dia != null ? childSelected?.fechaNacimiento.dia : "",
      mes: childSelected?.fechaNacimiento?.mes != null ? childSelected?.fechaNacimiento.mes : "",
      ano: childSelected?.fechaNacimiento?.ano != null ? childSelected?.fechaNacimiento.ano : "",
    },
    fechaNacimientoHebreo: {
      dia: childSelected?.fechaNacimientoHebreo?.dia != null ? childSelected?.fechaNacimientoHebreo.dia : "",
      mes: childSelected?.fechaNacimientoHebreo?.mes != null ? childSelected?.fechaNacimientoHebreo.mes : "",
      ano: childSelected?.fechaNacimientoHebreo?.ano != null ? childSelected?.fechaNacimientoHebreo.ano : "",
    },
    fechaBarMitzva: {
      dia: childSelected?.fechaBarMitzva?.dia != null ? childSelected?.fechaBarMitzva.dia : "",
      mes: childSelected?.fechaBarMitzva?.mes != null ? childSelected?.fechaBarMitzva.mes : "",
      ano: childSelected?.fechaBarMitzva?.ano != null ? childSelected?.fechaBarMitzva.ano : "",
    },
    fechaBarMitzvaHebreo: {
      dia: childSelected?.fechaBarMitzvaHebreo?.dia != null ? childSelected?.fechaBarMitzvaHebreo.dia : "",
      mes: childSelected?.fechaBarMitzvaHebreo?.mes != null ? childSelected?.fechaBarMitzvaHebreo.mes : "",
      ano: childSelected?.fechaBarMitzvaHebreo?.ano != null ? childSelected?.fechaBarMitzvaHebreo.ano : "",
    },
    perashaBarMitzva: childSelected?.perashaBarMitzva != null ? childSelected.perashaBarMitzva : "",
    habilidades: childSelected?.habilidades != null ? childSelected.habilidades : [],
  });

  const [genero, setGenero] = useState(formUserChildData.genero != null ? formUserChildData.genero : "");

  const habilidades: Ability[] = ["Leer Torah", "Jazan", "Leer Haftara", "Leer Meguila"];
  const [habilidad, setHabilidad] = useState<Ability[]>([])

  const [isAfterSunsetSelected, setIsAfterSunsetSelected] = useState<boolean>(false)

  const closeModal = () => {
    setChildModalIsOpen(false);
    console.log("Form user child data", formUserChildData?.nombre);
    
    if (formUserChildData?.nombre != "") {
      const childIsAlreadySavedOnUserChildList = user.hijos?.some(son => son.nombre === childSelected?.nombre);
      childIsAlreadySavedOnUserChildList ? updateUserChildData() : addUserChildData()
      setChildSelected({})
    }
    console.log("Hijo agregado", formUserChildData);
  }

  const addUserChildData = () => {
    setUser({...user, hijos: [...(user.hijos || []), formUserChildData]})
  }

  const updateUserChildData = () => {
    const updatedUserChildData = user.hijos?.map(son => {
      if(son.nombre === childSelected?.nombre) {
        return formUserChildData
      }
      return son
    })
    setUser({...user, hijos: updatedUserChildData})
  }

  const handleChangeChildData = (e: any) => {
    setFormUserChildData({ ...formUserChildData, [e.target.name]: e.target.value }); 
  }

  const handleAddAbility = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Ability;
  
    setHabilidad((prevHabilidades) =>
      e.target.checked
        ? [...prevHabilidades, value] // Agregar si se selecciona
        : prevHabilidades.filter((h) => h !== value) // Quitar si se deselecciona
    );
  
    setFormUserChildData((prevData: Son) => ({
      ...prevData,
      habilidades: e.target.checked
        ? [...(prevData.habilidades || []), value] // Agregar la habilidad al array
        : (prevData.habilidades || []).filter((h: Ability) => h !== value) // Quitar si se deselecciona
    }));
  };

  const calculateHebrewBirthDate = (date: CustomDate) => {
      console.log("Date to calculate is:", date);
      const day = +date.dia!
      const month = +date.mes!
      const year = +date.ano!
  
      const gregorianDate = new Date(year, month - 1, day, 12)
      console.log("Gregorian date is:", gregorianDate);
  
      const hebrewDate = isAfterSunsetSelected ? new HDate(gregorianDate).next() : new HDate(gregorianDate);
      console.log("Hebrew date is:", hebrewDate.toString());
      const [dayHeb, monthHeb, yearHeb] = hebrewDate.toString().split(" ");
  
      saveBirthDateParams("dia", "fechaNacimientoHebreo", true, [dayHeb, monthHeb, yearHeb])
  };
  
  const calculateGregorianBirthDate = (date: CustomDate) => {
    console.log("Date to calculate is:", date); // Devuelve "2001-10-18"
    // Extraer el ano, mes y día manualmente
    const hebDay = +date.dia!
    const hebMonth = date.mes
    const hebYear = +date.ano!

    const hdate = new HDate(hebDay, hebMonth, hebYear);
    const gregDate: Date = hdate.greg();
    const dayGreg = gregDate.getDate()
    const monthGreg = gregDate.getMonth() + 1
    const yearGreg = gregDate.getFullYear()

    saveBirthDateParams("dia", "fechaNacimiento", true, [dayGreg, monthGreg, yearGreg])
  };

  const calculateBirthDateBtn = (birthType: "fechaNacimiento" | "fechaNacimientoHebreo", referenceDateValue: CustomDate, disabledCondition: boolean) => {
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

  const calculateBarMitzvaDateBtn = (birthType: "fechaBarMitzva" | "fechaBarMitzvaHebreo", disabledCondition: boolean) => {
    return (
      <>
        <button 
          type="button" 
          style={{...styles.button, backgroundColor: disabledCondition == true ? 'gray' : colors.btn_calculate_date, color: "white"}}
          onClick={() => birthType == "fechaBarMitzvaHebreo" ? calculateHebBarMitzvaDate() : calculateGregBarMitzvaDate()} 
          disabled={disabledCondition}>
            Calcular fecha
        </button>
      </>
    )
  };

  const saveBirthDateParams = (dateKey: string, birthBarType: "fechaNacimiento" | "fechaNacimientoHebreo"| "fechaBarMitzvaHebreo" | "fechaBarMitzva", isCalculated?: boolean, e?: any) => {
    if (!isCalculated) { 
      setFormUserChildData({
        ...formUserChildData,
        [birthBarType]: {
          ...formUserChildData[birthBarType],
          [dateKey]: e.target.value, // Update the specific field
        },
      })
    } else {
      setFormUserChildData({
        ...formUserChildData,
        [birthBarType]: {
          ...formUserChildData[birthBarType],
          dia: e[0],
          mes: e[1],
          ano: e[2]
        },
      });
    }
  }

  const calculateGregBarMitzvaDate = () => {
    console.log("Date to calculate is:", formUserChildData.fechaBarMitzvaHebreo);
    // Extraer el ano, mes y día manualmente
    const hebDay = +formUserChildData.fechaBarMitzvaHebreo?.dia!
    const hebMonth = formUserChildData.fechaBarMitzvaHebreo?.mes
    const hebYear = +formUserChildData.fechaBarMitzvaHebreo?.ano!

    const hdate = new HDate(hebDay, hebMonth, hebYear);
    const gregDate: Date = hdate.greg();
    const dayGreg = gregDate.getDate()
    const monthGreg = gregDate.getMonth() + 1
    const yearGreg = gregDate.getFullYear()

    saveBirthDateParams("dia", "fechaBarMitzva", true, [dayGreg, monthGreg, yearGreg])
  };

  const calculateHebBarMitzvaDate = () => { 
    console.log("Fecha Bar Hebreo: ", user.fechaNacimientoHebreo);
    const calculatedBarMitzvaYear = parseInt(user.fechaNacimientoHebreo?.ano!) + 13
    saveBirthDateParams("dia", "fechaBarMitzvaHebreo", true, [user.fechaNacimientoHebreo?.dia, user.fechaNacimientoHebreo?.mes, calculatedBarMitzvaYear.toString()])
  }

  return (
    <div>
      <Modal
        isOpen={modalChildIsOpen}
        onRequestClose={closeModal}
        style={{
          content: styles.container,
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
            zIndex: 9998 // Asegura que esté detrás del modal pero encima del resto
          }
        }}
        contentLabel="Example Modal"
      >
        <h2 style={{ textAlign: 'center'}}>Ingresa los datos de tu hijo/a</h2>
        <div>
          <label htmlFor="userChildNameEsp" style={{ display: "block"}}>Nombre Hijo Español</label>
          <input id="userChildNameEsp" type="text" name="nombre" placeholder="Nombre (Español)" onChange={handleChangeChildData} style={styles.input} value={formUserChildData.nombre}/>

          <label htmlFor="userChildNameHeb" style={{ display: "block"}}>Nombre Hijo Hebreo</label>
          <input id="userChildNameHeb" type="text" name="nombreHebreo" placeholder="Nombre (Hebreo)" onChange={handleChangeChildData} style={styles.input} value={formUserChildData.nombreHebreo}/>

          <label htmlFor="userChildSurname" style={{ display: "block"}}>Apellido</label>
          <input id="userChildSurname" type="text" name="apellido" placeholder={user.apellido != null ? user.apellido : "Apellido"} onChange={handleChangeChildData} style={styles.input} value={formUserChildData.apellido}/>

          <label htmlFor="userChildBithDateGregDia" style={{ display: "block"}}>Fecha Nacimiento Gregoriano</label>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userChildBithDateGregDia" style={{ display: "block", marginRight: 10}}>Día</label>
              <input id="userChildBithDateGregDia" type="number" name="fechaNacimiento" placeholder="Día" onChange={(e: any) => saveBirthDateParams("dia", "fechaNacimiento", false, e)} style={{...styles.input}} value={formUserChildData?.fechaNacimiento?.dia}/>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userChildBithDateGregMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Mes</label>
              <input id="userChildBithDateGregMes" type="number" name="fechaNacimiento" placeholder="Mes" onChange={(e: any) => saveBirthDateParams("mes", "fechaNacimiento", false, e)} style={{...styles.input}} value={formUserChildData?.fechaNacimiento?.mes}/>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userChildBithDateGregAno" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
              <input id="userChildBithDateGregAno" type="number" name="fechaNacimiento" placeholder="Año" onChange={(e: any) => saveBirthDateParams("ano", "fechaNacimiento", false, e)} style={{...styles.input}} value={formUserChildData?.fechaNacimiento?.ano}/>
            </div>
            {calculateBirthDateBtn("fechaNacimiento", formUserChildData?.fechaNacimientoHebreo!, formUserChildData?.fechaNacimientoHebreo?.dia == "" || formUserChildData?.fechaNacimientoHebreo?.mes == "" || formUserChildData?.fechaNacimientoHebreo?.ano == "")}
          </div>

          <label htmlFor="userChildBithDateHeb" style={{ display: "block"}}>Fecha Nacimiento Hebreo</label>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row"}}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userChildBithHebDia" style={{ display: "block", marginRight: 10}}>Día</label>
                <input id="userChildBithHebDia" type="number" name="fechaNacimientoHebreo" placeholder="Día" onChange={(e: any) => saveBirthDateParams("dia", "fechaNacimientoHebreo", false, e)} style={{...styles.input}} value={formUserChildData?.fechaNacimientoHebreo?.dia}/>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userChildBithHebMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>
                  Mes
                </label>
                <select
                  id="userChildBithHebMes"
                  name="fechaNacimientoHebreo"
                  style={styles.input}
                  onChange={(e) => saveBirthDateParams("mes", "fechaNacimientoHebreo", false, e)}
                  value={formUserChildData?.fechaNacimientoHebreo?.mes || ""}
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
                <label htmlFor="userFechaNacHebAno" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
                <input id="userFechaNacHebAno" type="number" name="fechaNacimientoHebreo" placeholder="Año" onChange={(e: any) => saveBirthDateParams("ano", "fechaNacimientoHebreo", false, e)} style={{...styles.input}} value={formUserChildData?.fechaNacimientoHebreo?.ano}/>
              </div>
            </div>
            <AfterSunsetSwitch isCheked={isAfterSunsetSelected} setIsCheked={setIsAfterSunsetSelected} />
            {calculateBirthDateBtn("fechaNacimientoHebreo", formUserChildData?.fechaNacimiento!, formUserChildData?.fechaNacimiento?.dia == "" || formUserChildData?.fechaNacimiento?.mes == "" || formUserChildData?.fechaNacimiento?.ano == "")}
          </div>

          <label htmlFor="userChildGender" style={{ display: "block" }}>Género</label>
          <select id="userChildGender" name="genero" onChange={(e) => { 
            handleChangeChildData(e);
            setGenero(e.target.value);
          }} style={styles.input}>
            <option value="" disabled selected>{formUserChildData.genero != "" ? formUserChildData.genero : 'Selecciona el género'}</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>

          
          {genero === "Masculino" ? (
            <div>
              <label htmlFor="userBarMitzvaDateHeb" style={{ display: "block"}}>Fecha Bar Mitzva Hebreo</label>
              <div style={{ display: "flex", flexDirection: "row"}}>
                <div style={{ display: "flex", flexDirection: "row"}}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userChildBarMitzvaDateHebDia" style={{ display: "block", marginRight: 10}}>Día</label>
                    <input id="userChildBarMitzvaDateHebDia" type="number" name="fechaBarMitzvaHebreo" placeholder="Día" 
                      onChange={(e: any) => saveBirthDateParams("dia", "fechaBarMitzvaHebreo", false, e)} 
                      style={{...styles.input}} value={formUserChildData.fechaBarMitzvaHebreo?.dia}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userChildBarMitzvaDateHebMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>
                      Mes
                    </label>
                    <select
                      id="userChildBarMitzvaDateHebMes"
                      name="fechaBarMitzvaHebreo"
                      style={styles.input}
                      onChange={(e) => saveBirthDateParams("mes", "fechaBarMitzvaHebreo", false, e)}
                      value={formUserChildData?.fechaBarMitzvaHebreo?.mes || ""}
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
                    <label htmlFor="userChildBarMitzvaDateHebAno" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
                    <input id="userChildBarMitzvaDateHebAno" type="number" name="fechaBarMitzvaHebreo" placeholder="Año" 
                      onChange={(e: any) => saveBirthDateParams("ano", "fechaBarMitzvaHebreo", false, e)} 
                      style={{...styles.input}} value={formUserChildData.fechaBarMitzvaHebreo?.ano}
                    />
                  </div>
                </div>
                {calculateBarMitzvaDateBtn("fechaBarMitzvaHebreo", formUserChildData?.fechaNacimientoHebreo?.dia == "" || formUserChildData?.fechaNacimientoHebreo?.mes == "" || formUserChildData?.fechaNacimientoHebreo?.ano == "",)}
              </div>
              <label htmlFor="userBarMitzvaDateGreg" style={{ display: "block"}}>Fecha Bar Mitzva Gregoriano</label>
              <div style={{ display: "flex", flexDirection: "row"}}>
                <div style={{ display: "flex", flexDirection: "row"}}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userChildBarMitzvaDateGregDia" style={{ display: "block", marginRight: 10}}>Día</label>
                    <input id="userChildBarMitzvaDateGregDia" type="number" name="fechaBarMitzva" placeholder="Día" 
                      onChange={(e: any) => saveBirthDateParams("dia", "fechaBarMitzva", false, e)} 
                      style={{...styles.input}} value={formUserChildData?.fechaBarMitzva?.dia}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userChildBarMitzvaDateGregMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Mes</label>
                    <input id="userChildBarMitzvaDateGregMes" type="number" name="fechaBarMitzva" placeholder="Mes" 
                      onChange={(e: any) => saveBirthDateParams("mes", "fechaBarMitzva", false, e)} 
                      style={{...styles.input}} value={formUserChildData?.fechaBarMitzva?.mes}
                    />
                  </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userChildBarMitzvaDateGregAno" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
                    <input id="userChildBarMitzvaDateGregAno" type="number" name="fechaBarMitzva" placeholder="Año" 
                      onChange={(e: any) => saveBirthDateParams("ano", "fechaBarMitzva", false, e)} 
                      style={{...styles.input}} value={formUserChildData?.fechaBarMitzva?.ano}
                    />
                  </div>
                  {calculateBarMitzvaDateBtn("fechaBarMitzva", formUserChildData?.fechaBarMitzvaHebreo?.dia == "" || formUserChildData?.fechaBarMitzvaHebreo?.mes == "" || formUserChildData?.fechaBarMitzvaHebreo?.ano == "")}
              </div>

              <label htmlFor="userChildPerasha"style={{ display: "block"}}>Perasha Bar Mitzva</label>
              <input id="userChildPerasha" type="text" name="perashaBarMitzva" placeholder="Perasha Bar Mitzva" onChange={handleChangeChildData} style={styles.input} value={formUserChildData.perashaBarMitzva}/>

              <label htmlFor="userChildAbilities" style={{ display: "block" }}>Conocimientos</label>
              <div style={styles.input}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {habilidades.map((role) => (
                    <label key={role}>
                      <input
                        type="checkbox"
                        value={role}
                        checked={habilidad.includes(role)}
                        onChange={handleAddAbility} // Evento corregido
                      />
                      {role}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ) :  (
            null
          )}

          <button onClick={closeModal} style={{...styles.button, backgroundColor: formUserChildData.nombre == "" ? 'gray' : colors.btn_background}} disabled={formUserChildData.nombre == ""}>
            Guardar
          </button>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: colors.main_background,
    borderRadius: "25px", 
    width: "50%",
    height: "50%",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflowX: "hidden"
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
    display: "block",
    color: "white",
    padding: "10px 15px",
    margin: "10px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    border: "none",
  },
};