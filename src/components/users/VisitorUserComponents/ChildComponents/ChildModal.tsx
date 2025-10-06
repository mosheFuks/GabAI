import React, { CSSProperties, useContext, useState } from 'react';
import Modal from 'react-modal';
import { colors } from '../../../../assets/colors';
import { Ability, CustomDate, GREG_MONTHS, HEBREW_MONTHS, Son } from '../../../../structs/structs';
import { HDate } from '@hebcal/core';
import { AfterSunsetSwitch } from '../../../../assets/AfterSunsetSwitch';
import { PageContext } from '../../../../StoreInfo/page-storage';
import { addSonToVisitorUser } from '../../../../apis/requests';
import { toast } from 'react-toastify';

interface UserChildModalProps {
  modalChildIsOpen: boolean;
  setChildModalIsOpen: (modalChildIsOpen: boolean) => void;
  son?: Son | undefined;
  setSonSelected?: (son: Son | undefined) => void;
  isSonSelected?: boolean;
  setIsSonSelected?: (isSonSelected: boolean) => void;
  setUserChangedSomeProperty: (value: boolean) => void;
}

export const UserChildModalComponent = ({modalChildIsOpen, setChildModalIsOpen, son, setSonSelected, isSonSelected, setIsSonSelected, setUserChangedSomeProperty}: UserChildModalProps) => {
  const { logedVisitorUser } = useContext(PageContext) as any;
  const closeModal = () => {
    setChildModalIsOpen(false);
    setSonSelected!({} as Son);
    setIsSonSelected!(false);
  }
  
  const [formUserChildData, setFormUserChildData] = useState<Son>({
    nombre: isSonSelected ? son?.nombre : "",
    nombreHebreo: isSonSelected ? son?.nombreHebreo : "",
    apellido: logedVisitorUser.apellido,
    genero: isSonSelected ? son?.genero : "",
    fechaNacimiento: {
      dia: isSonSelected ? son?.fechaNacimiento?.dia : "",
      mes: isSonSelected ? son?.fechaNacimiento?.mes : "",
      ano: isSonSelected ? son?.fechaNacimiento?.ano : "",
    },
    fechaNacimientoHebreo: {
      dia: isSonSelected ? son?.fechaNacimientoHebreo?.dia : "",
      mes: isSonSelected ? son?.fechaNacimientoHebreo?.mes : "",
      ano: isSonSelected ? son?.fechaNacimientoHebreo?.ano : "",
    },
    fechaBarMitzva: {
      dia: isSonSelected ? son?.fechaBarMitzva?.dia : "",
      mes: isSonSelected ? son?.fechaBarMitzva?.mes : "",
      ano: isSonSelected ? son?.fechaBarMitzva?.ano : "",
    },
    fechaBarMitzvaHebreo: {
      dia: isSonSelected ? son?.fechaBarMitzvaHebreo?.dia : "",
      mes: isSonSelected ? son?.fechaBarMitzvaHebreo?.mes : "",
      ano: isSonSelected ? son?.fechaBarMitzvaHebreo?.ano : "",
    },
    perashaBarMitzva: isSonSelected ? son?.perashaBarMitzva : "",
    habilidades: isSonSelected ? son?.habilidades : [],
  });
  
  const habilidades: Ability[] = ["Leer Torah", "Jazan", "Leer Haftara", "Leer Meguila"];
  const [habilidad, setHabilidad] = useState<Ability[]>([])
  const [isAfterSunsetSelected, setIsAfterSunsetSelected] = useState<boolean>(false)

  const addSonLogedVisitorUser = addSonToVisitorUser()

  const saveNewChild = () => {
    try {
      addSonLogedVisitorUser(logedVisitorUser.nombreKehila, logedVisitorUser.nombreEspanol, logedVisitorUser.apellido, formUserChildData)
      setChildModalIsOpen(false);
      toast.success("Se modificó la información correctamente", {
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
        : (prevData.habilidades || []).filter((h: string) => h !== value) // Quitar si se deselecciona
    }));
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
    const calculatedBarMitzvaYear = parseInt(formUserChildData.fechaNacimientoHebreo?.ano!.toString()!) + 13
    saveBirthDateParams("dia", "fechaBarMitzvaHebreo", true, [formUserChildData.fechaNacimientoHebreo?.dia, formUserChildData.fechaNacimientoHebreo?.mes, calculatedBarMitzvaYear.toString()])
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
        contentLabel="Visitor Child Modal"
      >
        {isSonSelected ? (
          <h2 style={{ textAlign: 'center', color: "blue"}}>{formUserChildData.nombre}</h2>
        ) : (
          <h2 style={{ textAlign: 'center', color: "blue"}}>Ingresa los datos de tu hijo/a</h2>
        )}
        <div>
          {!isSonSelected ? (
            <>
              <label htmlFor="userChildName" style={{ display: "block", fontWeight: 'bold'}}>Nombre</label>
              <input type="text" id="userChildName" name="nombre" style={styles.input} value={formUserChildData.nombre} onChange={handleChangeChildData} disabled={isSonSelected} />
            </>
          ) : null}

          <label htmlFor="userChildNameHeb" style={{ display: "block", fontWeight: 'bold'}}>Nombre Hebreo</label>
          <input type="text" id="userChildNameHeb" name="nombreHebreo" style={styles.input} value={formUserChildData.nombreHebreo} onChange={handleChangeChildData} disabled={isSonSelected} />

          <label htmlFor="userChildSurname" style={{ display: "block", fontWeight: 'bold'}}>Apellido</label>
          <input type="text" id="userChildSurname" name="apellido" style={styles.input} value={formUserChildData.apellido} onChange={handleChangeChildData} disabled={isSonSelected} />

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
            <label htmlFor="userChildBithDateGreg" style={{ display: "block", fontWeight: 'bold'}}>Fecha Nacimiento Gregoriano</label>
            {!isSonSelected ? calculateBirthDateBtn("fechaNacimiento", formUserChildData?.fechaNacimientoHebreo!, formUserChildData?.fechaNacimientoHebreo?.dia == "" || formUserChildData?.fechaNacimientoHebreo?.mes == "" || formUserChildData?.fechaNacimientoHebreo?.ano == "") : null}
          </div>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row"}}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userChildBithDateGregDia" style={{ display: "block", fontWeight: 'bold', marginRight: 10}}>Día</label>
                <input type="number" id="userChildBithDateGregDia" name="fechaNacimiento" style={styles.input} value={formUserChildData.fechaNacimiento?.dia} onChange={(e: any) => saveBirthDateParams("dia", "fechaNacimiento", false, e)} disabled={isSonSelected} />
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userChildBithDateGregMes" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Mes</label>
                {/*<input type="number" id="userChildBithDateGregMes" name="fechaNacimiento" style={styles.input} value={formUserChildData.fechaNacimiento?.mes} onChange={(e: any) => saveBirthDateParams("mes", "fechaNacimiento", false, e)}   disabled={isSonSelected} />*/}
                <select id="userChildBithDateGregMes" name="fechaNacimiento" onChange={(e: any) => saveBirthDateParams("mes", "fechaNacimiento", false, e)} style={styles.input} value={formUserChildData.fechaNacimiento?.mes} disabled={isSonSelected}>
                  <option value="" disabled hidden>Mes</option>
                  {GREG_MONTHS.map((month) => (
                    <option key={month.numero} value={month.numero}>{month.nombre}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userChildBithDateGregAno" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Año</label>
                <input type="number" id="userChildBithDateGregAno" name="fechaNacimiento" style={styles.input} value={formUserChildData.fechaNacimiento?.ano} onChange={(e: any) => saveBirthDateParams("ano", "fechaNacimiento", false, e)} disabled={isSonSelected} />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
            <label htmlFor="userChildBithDateHeb" style={{ display: "block", fontWeight: 'bold'}}>Fecha Nacimiento Hebreo</label>
            {!isSonSelected ? calculateBirthDateBtn("fechaNacimientoHebreo", formUserChildData?.fechaNacimiento!, formUserChildData?.fechaNacimiento?.dia == "" || formUserChildData?.fechaNacimiento?.mes == "" || formUserChildData?.fechaNacimiento?.ano == "") : null}
          </div>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row"}}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userChildBithHebDia" style={{ display: "block", fontWeight: 'bold', marginRight: 10}}>Día</label>
                <input id="userChildBithHebDia" type="number" name="fechaNacimientoHebreo" placeholder="Día" onChange={(e: any) => saveBirthDateParams("dia", "fechaNacimientoHebreo", false, e)} style={{...styles.input}} value={formUserChildData?.fechaNacimientoHebreo?.dia}/>
              </div>
              {isSonSelected ? (
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                  <label htmlFor="userChildBithHebMes" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Mes</label>
                  <input type="text" id="userChildBithHebMes" name="fechaNacimientoHebreo" style={styles.input} value={formUserChildData.fechaNacimientoHebreo?.mes} onChange={(e: any) => saveBirthDateParams("mes", "fechaNacimientoHebreo", false, e)} disabled={isSonSelected}/>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                  <label htmlFor="userChildBithHebMes" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>
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
                <label htmlFor="userFechaNacHebAno" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Año</label>
                <input id="userFechaNacHebAno" type="number" name="fechaNacimientoHebreo" placeholder="Año" onChange={(e: any) => saveBirthDateParams("ano", "fechaNacimientoHebreo", false, e)} style={{...styles.input}} value={formUserChildData?.fechaNacimientoHebreo?.ano}/>
              </div>
            </div>
            {!isSonSelected ? (
              <>
                <AfterSunsetSwitch isCheked={isAfterSunsetSelected} setIsCheked={setIsAfterSunsetSelected} />
              </>
            ) : null}
          </div>

          {son?.nombre != "" ? (
            <>
              <label htmlFor="userChildGender" style={{ display: "block", fontWeight: 'bold' }}>Género</label>
              <select id="userChildGender" name="genero" onChange={(e) => { 
                handleChangeChildData(e);
              }} style={styles.input}>
                <option value="" disabled selected>{formUserChildData.genero != "" ? formUserChildData.genero : 'Selecciona el género'}</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </>
          ) : (null)}
          
          {formUserChildData.genero === "Masculino" ? (
            <div>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                <label htmlFor="userBarMitzvaDateHeb" style={{ display: "block", fontWeight: 'bold'}}>Fecha Bar Mitzva Hebreo</label>
                {!isSonSelected ? calculateBarMitzvaDateBtn("fechaBarMitzvaHebreo", formUserChildData?.fechaNacimientoHebreo?.dia == "" || formUserChildData?.fechaNacimientoHebreo?.mes == "" || formUserChildData?.fechaNacimientoHebreo?.ano == "") : null}
              </div>
              <div style={{ display: "flex", flexDirection: "row"}}>
                <div style={{ display: "flex", flexDirection: "row"}}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userChildBarMitzvaDateHebDia" style={{ display: "block", fontWeight: 'bold', marginRight: 10}}>Día</label>
                    <input type="number" id="userChildBarMitzvaDateHebDia" style={styles.input} name="fechaBarMitzvaHebreo" value={formUserChildData.fechaBarMitzvaHebreo?.dia} onChange={handleChangeChildData} disabled={isSonSelected}/>
                  </div>
                  {isSonSelected ? (
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                      <label htmlFor="userChildBithHebMes" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Mes</label>
                      <input type="text" id="userChildBithHebMes" style={styles.input} name="fechaBarMitzvaHebreo" value={formUserChildData.fechaNacimientoHebreo?.mes} onChange={handleChangeChildData} disabled={isSonSelected}/>
                    </div>
                  ) : (
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userChildBithHebMes" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>
                      Mes
                    </label>
                    <select
                      id="userChildBithHebMes"
                      name="fechaBarMitzvaHebreo"
                      style={styles.input}
                      onChange={(e) => saveBirthDateParams("mes", "fechaNacimientoHebreo", false, e)}
                      value={formUserChildData?.fechaNacimientoHebreo?.mes || ""}
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
                    <label htmlFor="userChildBarMitzvaDateHebAno" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Año</label>
                    <input type="number" id="userChildBarMitzvaDateHebAno" style={styles.input} name="fechaBarMitzvaHebreo" value={formUserChildData.fechaBarMitzvaHebreo?.ano} onChange={handleChangeChildData} disabled={isSonSelected} />
                  </div>
                </div>
              </div>
              
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                <label htmlFor="userBarMitzvaDateGreg" style={{ display: "block", fontWeight: 'bold'}}>Fecha Bar Mitzva Gregoriano</label>
                {!isSonSelected ? calculateBarMitzvaDateBtn("fechaBarMitzva", formUserChildData?.fechaBarMitzvaHebreo?.dia == "" || formUserChildData?.fechaBarMitzvaHebreo?.mes == "" || formUserChildData?.fechaBarMitzvaHebreo?.ano == "") : null}
              </div>
              <div style={{ display: "flex", flexDirection: "row"}}>
                <div style={{ display: "flex", flexDirection: "row"}}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userChildBarMitzvaDateGregDia" style={{ display: "block", fontWeight: 'bold', marginRight: 10}}>Día</label>
                    <input type="number" id="userChildBarMitzvaDateGregDia" name="fechaBarMitzva" style={styles.input} value={formUserChildData.fechaBarMitzva?.dia} onChange={handleChangeChildData} disabled={isSonSelected}/>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userChildBarMitzvaDateGregMes" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Mes</label>
                    {/*<input type="number" id="userChildBarMitzvaDateGregMes" name="fechaBarMitzva" style={styles.input} value={formUserChildData.fechaBarMitzva?.mes} onChange={handleChangeChildData} disabled={isSonSelected}/>*/}
                    <select id="userChildBarMitzvaDateGregMes" name="fechaBarMitzva" onChange={handleChangeChildData} style={styles.input} value={formUserChildData.fechaBarMitzva?.mes} disabled={isSonSelected}>
                      <option value="" disabled hidden>Mes</option>
                      {GREG_MONTHS.map((month) => (
                        <option key={month.numero} value={month.numero}>{month.nombre}</option>
                      ))}
                    </select>
                  </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userChildBarMitzvaDateGregAno" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Año</label>
                    <input type="number" id="userChildBarMitzvaDateGregAno" name="fechaBarMitzva" style={styles.input} value={formUserChildData.fechaBarMitzva?.ano} onChange={handleChangeChildData} disabled={isSonSelected} />
                  </div>
              </div>

              <label htmlFor="userChildPerasha"style={{ display: "block", fontWeight: 'bold'}}>Perasha Bar Mitzva</label>
              <input type="text" id="userChildPerasha" name="perashaBarMitzva" style={styles.input} value={formUserChildData.perashaBarMitzva} onChange={handleChangeChildData} disabled={isSonSelected} />

              <label htmlFor="userChildAbilities" style={{ display: "block", fontWeight: 'bold' }}>Conocimientos</label>
              {isSonSelected ? (
                formUserChildData.habilidades?.map((habilidad: string) => (
                  <h5 key={habilidad} id="userChildAbilities" style={styles.input}>
                    {habilidad}
                  </h5>
                ))
              ) : 
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
              </div>}
            </div>
          ) :  (null)}
          {!isSonSelected && (
            <button onClick={saveNewChild} style={{...styles.button, backgroundColor: 'blue'}} disabled={formUserChildData.nombre == ""}>
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