import { CSSProperties, useState } from 'react';
import Modal from 'react-modal';
import { colors } from '../../../../../assets/colors';
import { HDate } from "@hebcal/core";
import { Aniversary, CustomDate, GREG_MONTHS, HEBREW_MONTHS, VisitorUser } from '../../../../../structs/structs';

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
      ano:  aniversarySelected?.fecha?.ano != null ? aniversarySelected.fecha.ano : "",
    },
    fechaHebreo: {
      dia:  aniversarySelected?.fechaHebreo?.dia != null ? aniversarySelected.fechaHebreo.dia : "",
      mes:  aniversarySelected?.fechaHebreo?.mes != null ? aniversarySelected.fechaHebreo.mes : "",
      ano:  aniversarySelected?.fechaHebreo?.ano != null ? aniversarySelected.fechaHebreo.ano : "",
    },
    motivo: aniversarySelected?.motivo != null ? aniversarySelected?.motivo : "",
    nombreDelAniversario: aniversarySelected?.nombreDelAniversario != null ? aniversarySelected?.nombreDelAniversario : "",
  });

  const closeModal = () => {
    setModalAniversaryIsOpen(false);
    
    if (formUserAniversaryData?.motivo != "") {
      const childIsAlreadySavedOnUserChildList = user.aniversarios?.some(ani => ani.motivo === aniversarySelected?.motivo);
      childIsAlreadySavedOnUserChildList ? updateUserAniversaryData() : addUserAniversaryData()
      setAniversarySelected({})
    }
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

    // Extraer el ano, mes y día manualmente
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
          ano: e[2]
        },
      });
    }    
  }

  const calculateHebrewAniversaryDate = (date: CustomDate) => {
    const day = +date.dia!
    const month = +date.mes!
    const year = +date.ano!

    const gregorianDate = new Date(year, month - 1, day, 12)

    const hebrewDate = new HDate(gregorianDate);
    const [dayHeb, monthHeb, yearHeb] = hebrewDate.toString().split(" ");

    saveBirthDateParams("dia", "fechaHebreo", true, [dayHeb, monthHeb, yearHeb])
  };
  
  const calculateGregorianAniversaryDate = (date: CustomDate) => {
    // Extraer el ano, mes y día manualmente
    const hebDay = +date.dia!
    const hebMonth = date.mes
    const hebYear = +date.ano!

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
        style={{
          content: styles.container,
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
            zIndex: 9998 // Asegura que esté detrás del modal pero encima del resto
          }
        }}
        contentLabel="Example Modal"
      >
        <h2 style={{ textAlign: 'center', color: "blue"}}>Ingresa los datos del aniversario</h2>
        <div>
          <label htmlFor="userAniversaryMotive" style={{ display: "block", fontWeight: 'bold' }}>Motivo</label>
          <select id="userAniversaryMotive" name="motivo" onChange={(e) => { 
            handleChangeAniversaryData(e);
          }} style={styles.input}>
            <option value="" disabled selected>{formUserAniversaryData.motivo != "" ? formUserAniversaryData.motivo : 'Selecciona el motivo'}</option>
            <option value="Iortzai">Iortzai</option>
            <option value="Otro">Otro</option>
          </select>

          <label htmlFor="userAniversaryPerName" style={{ display: "block", fontWeight: 'bold'}}>Nombre de la persona</label>
          <input id="userAniversaryPerName" type="text" name="nombreDelAniversario" placeholder="Nombre de la persona" onChange={handleChangeAniversaryData} style={styles.input} value={formUserAniversaryData.nombreDelAniversario }/>

          <label htmlFor="userAniversaryDateGreg" style={{ display: "block", fontWeight: 'bold'}}>Fecha en Gregoriano</label>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userAniversaryDateGreg" style={{ display: "block", fontWeight: 'bold', marginRight: 10}}>Día</label>
              <input id="userAniversaryDateGreg" type="number" name="fecha" placeholder="Día" onChange={(e: any) => saveBirthDateParams("dia", "fecha", false, e)} style={{...styles.input}} value={formUserAniversaryData.fecha?.dia}/>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userAniversaryDateGregMes" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Mes</label>
              {//MAKE A SELECT FOR MONTHS
              <select id="userAniversaryDateGregMes" name="fecha" onChange={(e: any) => saveBirthDateParams("mes", "fecha", false, e)} style={styles.input} value={formUserAniversaryData.fecha?.mes}>
                {GREG_MONTHS.map((month) => (
                  <option key={month.numero} value={month.numero}>{month.nombre}</option>
                ))}
              </select>
              }
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <label htmlFor="userAniversaryDateGregAno" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Año</label>
              <input id="userAniversaryDateGregAno" type="number" name="fecha" placeholder="Ano" onChange={(e: any) => saveBirthDateParams("ano", "fecha", false, e)} style={{...styles.input}} value={formUserAniversaryData.fecha?.ano}/>
            </div>
            {calculateAniversaryDateBtn("fecha", formUserAniversaryData.fechaHebreo!, formUserAniversaryData.fechaHebreo?.dia! == "" || formUserAniversaryData.fechaHebreo?.mes! == "" || formUserAniversaryData.fechaHebreo?.ano! == "" )}
          </div>

          <label htmlFor="userFechaNacHeb" style={{ display: "block", fontWeight: 'bold'}}>Fecha Nacimiento Hebreo</label>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row"}}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userFechaNacHeb" style={{ display: "block", fontWeight: 'bold', marginRight: 10}}>Día</label>
                <input id="userFechaNacHeb" type="number" name="fechaHebreo" placeholder="Día" onChange={(e: any) => saveBirthDateParams("dia", "fechaHebreo", false, e)} style={{...styles.input}} value={formUserAniversaryData.fechaHebreo?.dia}/>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userFechaNacHebMes" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>
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
                <label htmlFor="userFechaNacHebAno" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Año</label>
                <input id="userFechaNacHebAno" type="number" name="fechaHebreo" placeholder="Año" onChange={(e: any) => saveBirthDateParams("ano", "fechaHebreo", false, e)} style={{...styles.input}} value={formUserAniversaryData.fechaHebreo?.ano}/>
              </div>
            </div>
            {calculateAniversaryDateBtn("fechaHebreo", formUserAniversaryData.fecha!, formUserAniversaryData.fecha?.dia! == "" || formUserAniversaryData.fecha?.mes! == "" || formUserAniversaryData.fecha?.ano! == "" )}
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
  } as CSSProperties,
  input: {
    width: "80%",
    padding: "10px",
    margin: "10px 0", 
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    backgroundColor: "white",
    color: "black",
  }  as CSSProperties,
  button: {
    display: "block",
    color: "white",
    padding: "10px 15px",
    margin: "10px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    border: "none",
  } as CSSProperties,
};