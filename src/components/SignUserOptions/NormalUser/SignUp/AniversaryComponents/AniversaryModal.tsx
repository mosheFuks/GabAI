import React, { useState } from 'react';
import Modal from 'react-modal';
import { colors } from '../../../../../assets/colors';
import { HDate } from "@hebcal/core";
import { Aniversary, CustomDate, HEBREW_MONTHS, VisitorUser } from '../../../../../structs/structs';

Modal.setAppElement('#root');

interface AniversaryModalProps {
  modalAniversaryIsOpen: boolean;
  setModalAniversaryIsOpen: (modalAniversaryIsOpen: boolean) => void;
  user: VisitorUser
  setUser: (user: VisitorUser) => void;
  aniversarySelected?: Aniversary;
  setAniversarySelected: (aniversary: Aniversary) => void;
}

export const CreateAniversaryModalComponent = ({modalAniversaryIsOpen, setModalAniversaryIsOpen, user, setUser, aniversarySelected, setAniversarySelected}: AniversaryModalProps) => {

  const [formUserAniversaryData, setFormUserAniversaryData] = useState<Aniversary>({
    fecha: {
      dia:  aniversarySelected?.fecha?.dia != null ? aniversarySelected.fecha.dia : "",
      mes:  aniversarySelected?.fecha?.mes != null ? aniversarySelected.fecha.mes : "",
      año:  aniversarySelected?.fecha?.año != null ? aniversarySelected.fecha.año : "",
    },
    fechaHebreo: {
      dia:  aniversarySelected?.fechaHebreo?.dia != null ? aniversarySelected.fechaHebreo.dia : "",
      mes:  aniversarySelected?.fechaHebreo?.mes != null ? aniversarySelected.fechaHebreo.mes : "",
      año:  aniversarySelected?.fechaHebreo?.año != null ? aniversarySelected.fechaHebreo.año : "",
    },
    motivo: aniversarySelected?.motivo != null ? aniversarySelected?.motivo : "",
    nombreDelAniversario: aniversarySelected?.nombreDelAniversario != null ? aniversarySelected?.nombreDelAniversario : "",
  });

  const closeModal = () => {
    setModalAniversaryIsOpen(false);
    console.log("Form aniversary child data", formUserAniversaryData?.motivo);
    
    if (formUserAniversaryData?.motivo != "") {
      const childIsAlreadySavedOnUserChildList = user.aniversarios?.some(ani => ani.motivo === aniversarySelected?.motivo);
      childIsAlreadySavedOnUserChildList ? updateUserAniversaryData() : addUserAniversaryData()
      setAniversarySelected({})
    }
    console.log("Aniversario agregado", formUserAniversaryData);
  }

  const addUserAniversaryData = () => {
    setUser({...user, aniversarios: [...(user.aniversarios || []), formUserAniversaryData]})
  }

  const updateUserAniversaryData = () => {
    const updatedUserChildData = user.aniversarios?.map(aniversary => {
      if(aniversary.motivo === aniversarySelected?.motivo) {
        return formUserAniversaryData
      }
      return aniversary
    })
    setUser({...user, aniversarios: updatedUserChildData})
  }

  const handleChangeAniversaryData = (e: any) => {
    setFormUserAniversaryData({ ...formUserAniversaryData, [e.target.name]: e.target.value }); 
  }

  const calculateAniversaryDateBtn = (aniversaryType: "fecha" | "fechaHebreo", referenceDateValue: CustomDate, disabledCondition: boolean) => {
    return (
      <>
      <button 
        type="button" 
        style={{...styles.button, backgroundColor: disabledCondition == true ? 'gray' : colors.btn_calculate_date, color: "white"}}
        onClick={() => aniversaryType == "fechaHebreo" ? calculateHebrewAniversaryDate(referenceDateValue) : calculateGregorianAniversaryDate(referenceDateValue)} 
        disabled={disabledCondition}>
          Calcular fecha
      </button>
      </>
    ) 
  };

  /*const calculateHebrewDate = (date: string, parameterToSave: string) => {
    console.log("Date to calculate is:", date); // Devuelve "2001-10-18"

    // Extraer el año, mes y día manualmente
    const [year, month, day] = date.split("-").map(Number);

    // Crear la fecha sin que JavaScript la convierta automáticamente a UTC
    const gregorianDate = new Date(year, month - 1, day, 12); // Fuerza el mediodía local

    console.log("Gregorian date is:", gregorianDate); // Ahora debería ser el 18 de octubre correctamente

    const hebrewDate = new HDate(gregorianDate);
    console.log("Hebrew date is:", hebrewDate.toString());

    setFormUserAniversaryData({ ...formUserAniversaryData, [parameterToSave]: hebrewDate.toString() });
    setUser({ ...user, [parameterToSave]: hebrewDate.toString() });
  };*/

  const saveBirthDateParams = (dateKey: string, aniversaryType: "fecha" | "fechaHebreo", isCalculated?: boolean, e?: any) => {
    if (!isCalculated) { 
      setFormUserAniversaryData({
        ...formUserAniversaryData,
        [aniversaryType]: {
          ...formUserAniversaryData[aniversaryType],
          [dateKey]: e.target.value, // Update the specific field
        },
      })
    } else {
      setFormUserAniversaryData({
        ...formUserAniversaryData,
        [aniversaryType]: {
          ...formUserAniversaryData[aniversaryType],
          dia: e[0],
          mes: e[1],
          año: e[2]
        },
      });
    }
    console.log("User form Data: ", formUserAniversaryData.fecha);
    
  }

  const calculateHebrewAniversaryDate = (date: CustomDate) => {
    console.log("Date to calculate is:", date);
    const day = +date.dia!
    const month = +date.mes!
    const year = +date.año!

    const gregorianDate = new Date(year, month - 1, day, 12)
    console.log("Gregorian date is:", gregorianDate);

    const hebrewDate = new HDate(gregorianDate);
    console.log("Hebrew date is:", hebrewDate.toString());
    const [dayHeb, monthHeb, yearHeb] = hebrewDate.toString().split(" ");

    saveBirthDateParams("dia", "fechaHebreo", true, [dayHeb, monthHeb, yearHeb])
  };
  
  const calculateGregorianAniversaryDate = (date: CustomDate) => {
    console.log("Date to calculate is:", date); // Devuelve "2001-10-18"
    // Extraer el año, mes y día manualmente
    const hebDay = +date.dia!
    const hebMonth = date.mes
    const hebYear = +date.año!

    const hdate = new HDate(hebDay, hebMonth, hebYear);
    const gregDate: Date = hdate.greg();
    const dayGreg = gregDate.getDate()
    const monthGreg = gregDate.getMonth() + 1
    const yearGreg = gregDate.getFullYear()

    saveBirthDateParams("dia", "fecha", true, [dayGreg, monthGreg, yearGreg])
  };
  return (
    <div>
      <Modal
        isOpen={modalAniversaryIsOpen}
        onRequestClose={closeModal}
        style={{ content: styles.container }}
        contentLabel="Example Modal"
      >
        <h2 style={{ textAlign: 'center'}}>Ingresa los datos del aniversario</h2>
        <div>
          <label htmlFor="userAniversaryMotive" style={{ display: "block" }}>Motivo</label>
          <select id="userAniversaryMotive" name="motivo" onChange={(e) => { 
            handleChangeAniversaryData(e);
          }} style={styles.input}>
            <option value="" disabled selected>{formUserAniversaryData.motivo != "" ? formUserAniversaryData.motivo : 'Selecciona el motivo'}</option>
            <option value="Iortzai">Iortzai</option>
          </select>

          <label htmlFor="userAniversaryPerName" style={{ display: "block"}}>Nombre de la persona</label>
          <input id="userAniversaryPerName" type="text" name="nombreDelAniversario" placeholder="Nombre de la persona" onChange={handleChangeAniversaryData} style={styles.input} value={formUserAniversaryData.nombreDelAniversario }/>

          <label htmlFor="userAniversaryDateGreg" style={{ display: "block"}}>Fecha en Gregoriano</label>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userAniversaryDateGreg" style={{ display: "block", marginRight: 10}}>Día</label>
              <input id="userAniversaryDateGreg" type="number" name="fecha" placeholder="Día" onChange={(e: any) => saveBirthDateParams("dia", "fecha", false, e)} style={{...styles.input}} value={formUserAniversaryData.fecha?.dia}/>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userAniversaryDateGregMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Mes</label>
              <input id="userAniversaryDateGregMes" type="number" name="fecha" placeholder="Mes" onChange={(e: any) => saveBirthDateParams("mes", "fecha", false, e)} style={{...styles.input}} value={formUserAniversaryData.fecha?.mes}/>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userAniversaryDateGregAño" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
              <input id="userAniversaryDateGregAño" type="number" name="fecha" placeholder="Año" onChange={(e: any) => saveBirthDateParams("año", "fecha", false, e)} style={{...styles.input}} value={formUserAniversaryData.fecha?.año}/>
            </div>
            {calculateAniversaryDateBtn("fecha", formUserAniversaryData.fechaHebreo!, formUserAniversaryData.fechaHebreo?.dia! == "" || formUserAniversaryData.fechaHebreo?.mes! == "" || formUserAniversaryData.fechaHebreo?.año! == "" )}
          </div>

          <label htmlFor="userFechaNacHeb" style={{ display: "block"}}>Fecha Nacimiento Hebreo</label>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row"}}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userFechaNacHebDia" style={{ display: "block", marginRight: 10}}>Día</label>
                <input id="userFechaNacHebDia" type="number" name="fechaHebreo" placeholder="Día" onChange={(e: any) => saveBirthDateParams("dia", "fechaHebreo", false, e)} style={{...styles.input}} value={formUserAniversaryData.fechaHebreo?.dia}/>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userFechaNacHebMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>
                  Mes
                </label>
                <select
                  id="userFechaNacHebMes"
                  name="fechaHebreo"
                  style={styles.input}
                  onChange={(e) => saveBirthDateParams("mes", "fechaHebreo", false, e)}
                  value={formUserAniversaryData.fechaHebreo?.mes || ""}
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
                <label htmlFor="userFechaNacHebAño" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
                <input id="userFechaNacHebAño" type="number" name="fechaHebreo" placeholder="Año" onChange={(e: any) => saveBirthDateParams("año", "fechaHebreo", false, e)} style={{...styles.input}} value={formUserAniversaryData.fechaHebreo?.año}/>
              </div>
            </div>
            {calculateAniversaryDateBtn("fechaHebreo", formUserAniversaryData.fecha!, formUserAniversaryData.fecha?.dia! == "" || formUserAniversaryData.fecha?.mes! == "" || formUserAniversaryData.fecha?.año! == "" )}
          </div>

          <button onClick={closeModal} style={{...styles.button, backgroundColor: formUserAniversaryData.motivo == "" ? 'gray' : colors.btn_background}} disabled={formUserAniversaryData.motivo == ""}>
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