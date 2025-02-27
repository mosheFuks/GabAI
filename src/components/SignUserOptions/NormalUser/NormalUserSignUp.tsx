import React, { CSSProperties, useEffect, useState } from "react";
import { HDate } from "@hebcal/core";
import { colors } from "../../../assets/colors";
import { esp_strings } from "../../../assets/strings";
import { VisitorUser, Ability, Son } from '../../../structs/structs';
import { CreateChildModalComponent } from "./ChildComponents/ChildModal";
import { ChildCard } from "./ChildComponents/ChildCard";

const NormalUserSignUp = () => {
  const [step, setStep] = useState<number>(1);
  const [user, setUser] = useState<VisitorUser>({})
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [childSelected, setChildSelected] = useState<Son>({});

  useEffect(() => {
    console.log("User data on Sign UP is:", user);
  }, [user])

  const [formUserPersonalData, setFormUserPersonalData] = useState<VisitorUser>({
    nombreKehila: "",
    nombreEspañol: "",
    nombreHebreo: "",
    fechaNacimientoGregoriano: "",
    fechaNacimientoHebreo: "",
    minian: "",
    apellido: "",
    emailPersonal: "",
    emailComercial: "", //Opcional
    telefono: "",
    direccion: "",
    numeroSocio: "",
    grupo: "",
    fechaBarMitzvaGregoriano: "",
    fechaBarMitzvaHebreo: "",
    perashaBarMitzva: "",
    habilidades: [], //Leer tora, haftara, ser jazan
    nombreMadreEspañol: "",
    nombreMadreHebreo: "",
    nombrePadreEspañol: "",
    nombrePadreHebreo: "",
    estadoCivil: "",
    nombreEsposaEspañol: "",
    nombreEsposaHebreo: "",
  });

  const habilidades: Ability[] = ["Leer Torah", "Jazan", "Leer Haftara", "Leer Meguila"];
  const [habilidad, setHabilidad] = useState<Ability[]>([])

  const handleChangePersonalData = (e: any) => {
    setFormUserPersonalData({ ...formUserPersonalData, [e.target.name]: e.target.value });
    setUser({...user, [e.target.name]: e.target.value})
  };

  const handleAddAbility = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Ability;
    setHabilidad((prevHabilidades) =>
      e.target.checked
        ? [...prevHabilidades, value] // Agregar si se selecciona
        : prevHabilidades.filter((h) => h !== value) // Quitar si se deselecciona
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("User data on Sign UP is:", user); 
  };

  const addChild = () => {
    setModalIsOpen(true)
  }

  const calculateHebrewDateBtn = (referenceDateValue: string, nameOfThePropertyToChange: string, disabledCondition: boolean) => {
    return (
      <button 
        type="button" 
        style={{...styles.button, backgroundColor: disabledCondition == true ? 'gray' : "red", color: "white"}} 
        onClick={() => calculateHebrewDate(referenceDateValue, nameOfThePropertyToChange)} 
        disabled={disabledCondition}>
        Calcular fecha
      </button>
    )
  }

  const calculateHebrewDate = (date: string, parameterToSave: string) => {
    console.log("Date to calculate is:", date); // Devuelve "2001-10-18"

    // Extraer el año, mes y día manualmente
    const [year, month, day] = date.split("-").map(Number);

    // Crear la fecha sin que JavaScript la convierta automáticamente a UTC
    const gregorianDate = new Date(year, month - 1, day, 12); // Fuerza el mediodía local

    console.log("Gregorian date is:", gregorianDate); // Ahora debería ser el 18 de octubre correctamente

    const hebrewDate = new HDate(gregorianDate);
    console.log("Hebrew date is:", hebrewDate.toString());

    setFormUserPersonalData({ ...formUserPersonalData, [parameterToSave]: hebrewDate.toString() });
    setUser({ ...user, [parameterToSave]: hebrewDate.toString() });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <>
    <div style={styles.container}>
      <h2 style={styles.title}>{esp_strings.btn_create_user}</h2>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "row", width: "100%", alignContent: "center", justifyContent: "center" }}>
            <h3 onClick={() => setStep(1)} style={{...styles.sectionTitle, color: step === 1 ? colors.btn_background : "black", textDecoration: step === 1 ? "underline" : "none"}}>Datos Personales</h3>
            <h3 onClick={() => setStep(2)} style={{...styles.sectionTitle, color: step === 2 ? colors.btn_background : "black", textDecoration: step === 2 ? "underline" : "none"}}>Datos de Kehila</h3>
            <h3 onClick={() => setStep(3)} style={{...styles.sectionTitle, color: step === 3 ? colors.btn_background : "black", textDecoration: step === 3 ? "underline" : "none"}}>Datos de Familia</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%", alignContent: "center", justifyContent: "flex-end" }}>
            {step === 1 && (<button type="button" onClick={nextStep} style={styles.button}>Siguiente</button>)}
            {step === 2 && (
                <div>
                    <button type="button" onClick={prevStep} style={styles.button}>Atrás</button>
                    <button type="button" onClick={nextStep} style={styles.button}>Siguiente</button>
                </div>
            )}
            {step === 3 && (
                <div>
                    <button type="button" onClick={prevStep} style={styles.button}>Atrás</button>
                    <button type="submit" style={styles.button} onClick={handleSubmit}>Registrarse</button>
                </div>
            )}
        </div>
      </div>
      <form style={{ width: "100%" }}>
        {step === 1 && (
          <div style={{ height: "400px", overflowY: "auto", padding: "10px", border: "0px solid #ccc", borderRadius: "5px" }}>
            <div>
                <label htmlFor="userNombreKehila" style={{ display: "block"}}>Nombre Kehila</label>
                <input id="userNombreKehila"type="text" name="nombreKehila" placeholder="Nombre Kehila" onChange={handleChangePersonalData} style={styles.input} value={user.nombreKehila}/>
                
                <label htmlFor="userNombreEspañol" style={{ display: "block"}}>Nombre Español</label>
                <input id="userNombreEspañol" type="text" name="nombreEspañol" placeholder="Nombre en Español" onChange={handleChangePersonalData} style={styles.input} value={user.nombreEspañol}/>
                
                <label htmlFor="userNombreHebreo" style={{ display: "block"}}>Nombre Hebreo</label>
                <input id="userNombreHebreo" type="text" name="nombreHebreo" placeholder="Nombre en Hebreo" onChange={handleChangePersonalData} style={styles.input} value={user.nombreHebreo}/>
                
                <label htmlFor="userApellido"style={{ display: "block"}}>Apellido</label>
                <input id="userApellido" type="text" name="apellido" placeholder="Apellido" onChange={handleChangePersonalData} style={styles.input} value={user.apellido}/>

                <label htmlFor="userFechaNacGreg" style={{ display: "block"}}>Fecha Nacimiento Gregoriano</label>
                <input id="userFechaNacGreg" type="date" name="fechaNacimientoGregoriano" placeholder="Fecha Nacimiento Gregoriano" onChange={handleChangePersonalData} style={{...styles.input}} value={user.fechaNacimientoGregoriano}/>
                
                <label htmlFor="userFechaNacHeb" style={{ display: "block"}}>Fecha Nacimiento Hebreo</label>
                <div style={styles.calculateDateBtnContainer}>
                  <input id="userFechaNacHeb" type="text" name="fechaNacimientoHebreo" placeholder="Fecha Nacimiento Hebreo" onChange={handleChangePersonalData} style={{...styles.input}} value={user.fechaNacimientoHebreo}/>
                  {calculateHebrewDateBtn(user.fechaNacimientoGregoriano!, "fechaNacimientoHebreo", user.fechaNacimientoGregoriano == undefined)}
                </div>

                <label htmlFor="userMinian" style={{ display: "block"}}>Minian</label>
                <input id="userMinian" type="text" name="minian" placeholder="Minian" onChange={handleChangePersonalData} style={styles.input} value={user.minian}/>
                
                <label htmlFor="userEmailPers" style={{ display: "block"}}>Email Personal</label>
                <input id="userEmailPers" type="email" name="emailPersonal" placeholder="Email Personal" onChange={handleChangePersonalData} style={styles.input} value={user.emailPersonal}/>
                
                <label htmlFor="userEmailCom" style={{ display: "block"}}>Email Comercial</label>
                <input id="userEmailCom" type="email" name="emailComercial" placeholder="Email Comercial (Opcional)" onChange={handleChangePersonalData} style={styles.input} value={user.emailComercial}/>
                
                <label htmlFor="userPhone" style={{ display: "block"}}>Teléfono</label>
                <input id="userPhone" type="text" name="telefono" placeholder="Teléfono" onChange={handleChangePersonalData} style={styles.input} value={user.telefono}/>
                
                <label htmlFor="userDirection" style={{ display: "block"}}>Dirección</label>
                <input id="userDirection" type="text" name="direccion" placeholder="Dirección" onChange={handleChangePersonalData} style={styles.input} value={user.direccion}/>
                
                <label htmlFor="userAsosiateNum" style={{ display: "block"}}>Numero Socio</label>
                <input id="userAsosiateNum" type="text" name="numeroSocio" placeholder="Número de Socio" onChange={handleChangePersonalData} style={styles.input} value={user.numeroSocio}/>
                
                <label htmlFor="userGroup" style={{ display: "block" }}>Grupo</label>
                <select id="userGroup" name="grupo" onChange={(e) => { 
                  handleChangePersonalData(e);
                }} style={styles.input}>
                  <option value="" disabled selected>Selecciona el grupo</option>
                  <option value="Cohen">Cohen</option>
                  <option value="Levi">Levi</option>
                  <option value="Israel">Israel</option>
                </select>
            </div>
          </div>
        )}
        {step === 2 && (
          <div style={{ height: "400px", overflowY: "auto", padding: "10px", borderRadius: "5px" }}>
            <div>
                <label htmlFor="userBarMitzvaDateGreg" style={{ display: "block"}}>Fecha Bar Mitzva Gregoriano</label>
                <input id="userBarMitzvaDateGreg" type="date" name="fechaBarMitzvaGregoriano" placeholder="Fecha Bar Mitzva (Gregoriano)" onChange={handleChangePersonalData} style={styles.input} value={user.fechaBarMitzvaGregoriano}/>
                
                <label htmlFor="userBarMitzvaDateHeb" style={{ display: "block"}}>Fecha Bar Mitzva Hebreo</label>
                <div style={styles.calculateDateBtnContainer}>
                  <input id="userBarMitzvaDateHeb" type="text" name="fechaBarMitzvaHebreo" placeholder="Fecha Bar Mitzva (Hebreo)" onChange={handleChangePersonalData} style={styles.input} value={user.fechaBarMitzvaHebreo}/>
                  {calculateHebrewDateBtn(user.fechaBarMitzvaGregoriano!, "fechaBarMitzvaHebreo", user.fechaBarMitzvaGregoriano == undefined)}
                </div>

                <label htmlFor="userPerasha" style={{ display: "block"}}>Perasha Bar Mitzva</label>
                <input id="userPerasha" type="text" name="perashaBarMitzva" placeholder="Perasha Bar Mitzva" onChange={handleChangePersonalData} style={styles.input} value={user.perashaBarMitzva}/>
                
                <label htmlFor="userAbilities" style={{ display: "block" }}>Habilidades</label>
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

                <label htmlFor="userMotherNameSpa" style={{ display: "block"}}>Nombre Madre Español</label>
                <input id="userMotherNameSpa" type="text" name="nombreMadreEspañol" placeholder="Nombre Madre Español" onChange={handleChangePersonalData} style={{...styles.input}} value={user.nombreMadreEspañol}/>
                
                <label htmlFor="userMotherNameHeb" style={{ display: "block"}}>Nombre Madre Hebreo</label>
                <input id="userMotherNameHeb" type="text" name="nombreMadreHebreo" placeholder="Nombre Madre Hebreo" onChange={handleChangePersonalData} style={{...styles.input}} value={user.nombreMadreHebreo}/>
                
                <label htmlFor="userFatherNameSpa" style={{ display: "block"}}>Nombre Padre Español</label>
                <input id="userFatherNameSpa"type="text" name="nombrePadreEspañol" placeholder="Nombre Padre Español" onChange={handleChangePersonalData} style={{...styles.input}} value={user.nombrePadreEspañol}/>
                
                <label htmlFor="userFatherNameHeb" style={{ display: "block"}}>Nombre Padre Hebreo</label>
                <input id="userFatherNameHeb" type="text" name="nombrePadreHebreo" placeholder="Nombre Padre Hebreo" onChange={handleChangePersonalData} style={{...styles.input}} value={user.nombrePadreHebreo}/>
            </div>
          </div>
        )}
        {step === 3 && (    
          <div style={{ height: "300px", overflowY: "auto", padding: "10px", borderRadius: "5px" }}>
            <label htmlFor="userMaritalStatus "style={{ display: "block" }}>Estado Civil</label>
            <select name="estadoCivil" onChange={(e) => { 
              handleChangePersonalData(e);
            }} style={styles.input}>
              <option value="" disabled selected>{'Selecciona tu estado civil'}</option>
              <option value="Soltero">Soltero</option>
              <option value="Casado">Casado</option>
              <option value="Divorciado">Divorciado</option>
              <option value="Viudo">Viudo</option>
            </select>
          
            <label htmlFor="userWifeNameEsp" style={{ display: "block"}}>Nombre Esposa Español</label>
            <input id="userWifeNameEsp" type="text" name="nombreEsposaEspañol" placeholder="Nombre Esposa (Español)" onChange={handleChangePersonalData} style={styles.input} value={user.nombreEsposaEspañol}/>

            <label htmlFor="userWifeNameHeb" style={{ display: "block"}}>Nombre Esposa Hebreo</label>
            <input id="userWifeNameHeb" type="text" name="nombreEsposaHebreo" placeholder="Nombre Esposa (Hebreo)" onChange={handleChangePersonalData} style={styles.input} value={user.nombreEsposaHebreo}/>

            {user.hijos != null ? (
              <div style={{width: '100%' }} >
                <label style={{ display: "block"}}>Hijos</label>
                <div style={styles.childCardContainer}>
                  {user.hijos.map((hijo, index) => (
                    <ChildCard hijo={hijo} key={index} setModalIsOpen={setModalIsOpen} setChildSelected={setChildSelected}/>
                  ))}
                </div>
              </div>
            ) : (null)}
          </div>
        )}
      </form>

      {step === 3 && (
        <div>
          <button type={"button"}style={styles.button} onClick={addChild}>Agregar hijo</button>
        </div>
      )}
    </div>

    {modalIsOpen ? <CreateChildModalComponent modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} user={user} setUser={setUser} childSelected={childSelected} setChildSelected={setChildSelected}/> : null}

    </>
  );
};

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

export default NormalUserSignUp;
