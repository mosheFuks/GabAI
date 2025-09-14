import { CSSProperties, useContext, useState } from 'react';
import Modal from 'react-modal';
import { Aniversary, CustomDate, GREG_MONTHS, HEBREW_MONTHS } from '../../../../structs/structs';
import { colors } from '../../../../assets/colors';
import { PageContext } from '../../../../StoreInfo/page-storage';
import { toast } from 'react-toastify';
import { addAniversaryToVisitorUser } from '../../../../apis/requests';
import { HDate } from '@hebcal/core';


interface AniversaryModalProps {
  modalAniversaryIsOpen: boolean;
  setModalAniversaryIsOpen: (modalAniversaryIsOpen: boolean) => void;
  aniversary?: Aniversary;
  setAniversarySelected: (aniversary: Aniversary) => void;
  isAniversarySelected?: boolean;
  setIsAniversarySelected?: (isAniversarySelected: boolean) => void;
  setUserChangedSomeProperty: (value: boolean) => void;
}

export const CreateAniversaryModalComponent = ({modalAniversaryIsOpen, setModalAniversaryIsOpen, aniversary, setAniversarySelected, isAniversarySelected, setIsAniversarySelected, setUserChangedSomeProperty}: AniversaryModalProps) => {
  const { logedVisitorUser } = useContext(PageContext) as any;

  const closeModal = () => {
    setModalAniversaryIsOpen(false);
    setAniversarySelected({} as Aniversary);
    setIsAniversarySelected!(false)
  }

  const [formUserAniversaryData, setFormUserAniversaryData] = useState<Aniversary>({
    fecha: {
      dia:  isAniversarySelected ? aniversary!.fecha!.dia : "",
      mes:  isAniversarySelected ? aniversary!.fecha!.mes : "",
      ano:  isAniversarySelected ? aniversary!.fecha!.ano : "",
    },
    fechaHebreo: {
      dia:  isAniversarySelected ? aniversary!.fechaHebreo!.dia : "",
      mes:  isAniversarySelected ? aniversary!.fechaHebreo!.mes : "",
      ano:  isAniversarySelected ? aniversary!.fechaHebreo!.ano : "",
    },
    motivo: isAniversarySelected ? aniversary?.motivo : "",
    nombreDelAniversario: isAniversarySelected ? aniversary?.nombreDelAniversario : "",
  });

  const addAniversaryLogedVisitorUser = addAniversaryToVisitorUser()

  const saveNewAniversary = () => {
    try {
      addAniversaryLogedVisitorUser(logedVisitorUser.nombreKehila, logedVisitorUser.nombreEspanol, logedVisitorUser.apellido, formUserAniversaryData)
      setModalAniversaryIsOpen(false);
      toast.success("Aniversario guardado correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", 
        style: { backgroundColor: 'green', color: 'white' },
      });
      setUserChangedSomeProperty(true);
    } catch (error) {
      console.error("Error al guardar el hijo:", error);
      toast.error("Ocurrio un error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", 
        style: { backgroundColor: 'red', color: 'white' },
      });
    }
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
  }

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
    console.log("Saving new aniversary with data:", formUserAniversaryData);
    
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
        contentLabel="Visitor Aniversary Modal"
      >
        {isAniversarySelected ? (
          <h2 style={{ textAlign: 'center', color: "blue"}}>Aniversario</h2>
        ) : (
          <h2 style={{ textAlign: 'center', color: "blue"}}>Ingresa los datos del Aniversario</h2>
        )}
        <div>
          <label htmlFor="userAniversaryMotive" style={{ display: "block", fontWeight: 'bold' }}>Motivo</label>
          {isAniversarySelected ? (
            <input type="text" id="userAniversaryMotive" style={styles.input} value={formUserAniversaryData!.motivo} onChange={handleChangeAniversaryData} disabled={isAniversarySelected} />
          ) : (
            <select id="userAniversaryMotive" name="motivo" onChange={(e) => {
              handleChangeAniversaryData(e);
            }} style={styles.input}>
              <option value="" disabled selected>{formUserAniversaryData.motivo != "" ? formUserAniversaryData.motivo : 'Selecciona el motivo'}</option>
              <option value="Yortzait">Yortzait</option>
              <option value="Jupa">Jupa</option>
              <option value="Otro">Otro</option>
            </select>
          )}

          <label htmlFor="userAniversaryPerName" style={{ display: "block", fontWeight: 'bold'}}>Nombre de la persona</label>
          <input type="text" name="nombreDelAniversario" id="userAniversaryPerName" style={styles.input} value={formUserAniversaryData!.nombreDelAniversario} onChange={handleChangeAniversaryData} disabled={isAniversarySelected} />

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px" }}>
            <label htmlFor="userAniversaryBithDateGreg" style={{ display: "block", fontWeight: 'bold'}}>Fecha Aniversario Gregoriano</label>
            {!isAniversarySelected && calculateAniversaryDateBtn("fecha", formUserAniversaryData.fechaHebreo!, formUserAniversaryData.fechaHebreo?.dia! == "" || formUserAniversaryData.fechaHebreo?.mes! == "" || formUserAniversaryData.fechaHebreo?.ano! == "")}
          </div>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row"}}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userAniversaryBithDateGregDia" style={{ display: "block", fontWeight: 'bold', marginRight: 10}}>Día</label>
                <input type="number" id="userAniversaryBithDateGregDia" name="fecha" style={styles.input} value={formUserAniversaryData!.fecha?.dia} onChange={(e: any) => saveBirthDateParams("dia", "fecha", false, e)} disabled={isAniversarySelected} />
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userAniversaryBithDateGregMes" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Mes</label>
                {/*<input type="number" id="userAniversaryBithDateGregMes" name="fecha" style={styles.input} value={formUserAniversaryData!.fecha?.mes} onChange={(e: any) => saveBirthDateParams("mes", "fecha", false, e)} disabled={isAniversarySelected} /> */}
                <select id="userAniversaryBithDateGregMes" name="fecha" onChange={(e: any) => saveBirthDateParams("mes", "fecha", false, e)} style={styles.input} value={formUserAniversaryData!.fecha?.mes} disabled={isAniversarySelected}>
                  <option value="" disabled hidden>Mes</option>
                  {GREG_MONTHS.map((month) => (
                    <option key={month.numero} value={month.numero}>{month.nombre}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userAniversaryBithDateGregAno" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Año</label>
                <input type="number" id="userAniversaryBithDateGregAno" name="fecha" style={styles.input} value={formUserAniversaryData!.fecha?.ano} onChange={(e: any) => saveBirthDateParams("ano", "fecha", false, e)} disabled={isAniversarySelected} />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "5px" }}>
            <label htmlFor="userAniversaryBithDateHebDia" style={{ display: "block", fontWeight: 'bold'}}>Fecha Aniversario Hebreo</label>
            {!isAniversarySelected && calculateAniversaryDateBtn("fechaHebreo", formUserAniversaryData.fecha!, formUserAniversaryData.fecha?.dia! == "" || formUserAniversaryData.fecha?.mes! == "" || formUserAniversaryData.fecha?.ano! == "")}
          </div>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row"}}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userAniversaryBithDateHebDia" style={{ display: "block", fontWeight: 'bold', marginRight: 10}}>Día</label>
                <input type="number" id="userAniversaryBithDateHebDia" name="fechaHebreo" style={styles.input} value={formUserAniversaryData!.fechaHebreo?.dia} onChange={(e: any) => saveBirthDateParams("dia", "fechaHebreo", false, e)} disabled={isAniversarySelected} />
              </div>
              {isAniversarySelected ? (
                <>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userAniversaryBithDateHebMes" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Mes</label>
                    <input type="text" id="userAniversaryBithDateHebMes" name="fechaHebreo" style={styles.input} value={formUserAniversaryData!.fechaHebreo?.mes} disabled={isAniversarySelected} />
                  </div>
                </>
              ) : (
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
                      Mes
                    </option>
                    {HEBREW_MONTHS.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userAniversaryBithDateHebAno" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Año</label>
                <input type="number" id="userAniversaryBithDateHebAno" name="fechaHebreo" style={styles.input} value={formUserAniversaryData!.fechaHebreo?.ano} onChange={(e: any) => saveBirthDateParams("ano", "fechaHebreo", false, e)} disabled={isAniversarySelected} />
              </div>
            </div>
          </div>
          {!isAniversarySelected && (
            <button onClick={saveNewAniversary} style={{...styles.button, backgroundColor: 'blue'}} disabled={formUserAniversaryData.fechaHebreo?.dia == ""}>
              Guardar
            </button>
          )}
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
  } as CSSProperties,
  button: {
    display: "block", fontWeight: 'bold',
    color: "white",
    padding: "10px 15px",
    margin: "10px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    border: "none",
  } as CSSProperties,
};