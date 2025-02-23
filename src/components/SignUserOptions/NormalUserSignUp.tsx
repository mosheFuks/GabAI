import React, { CSSProperties, useState } from "react";
import { colors } from "../../assets/colors";
import { esp_strings } from "../../assets/strings";
import { VisitorUser } from "../../structs/structs";

const NormalUserSignUp = () => {
  const [step, setStep] = useState<number>(1);
  const [userChilds, setUserChilds] = useState<number>(0)
  const [formUserPersonalData, setFormUserPersonalData] = useState({
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
    grupo: {
        "Cohen": "",
        "Levi": "",
        "Israel": "",
    }, //Cohen, Levi e Israel
  });

  const [formUserImportantData, setFormUserImportantData] = useState({
    fechaBarMitzvaGregoriano: "",
    fechaBarMitzvaHebreo: "",
    perashaBarMitzva: "",
    habilidades: "", //Leer tora, haftara, ser jazan
    nombreMadreEspañol: "",
    nombreMadreHebreo: "",
    nombrePadreEspañol: "",
    nombrePadreHebreo: "",
  });

  const [formUserFamilyData, setFormUserFamilyData] = useState({
    estadoCivil: "",
    nombreEsposaEspañol: "",
    nombreEsposaHebreo: "",
    numeroSociaEsposa: "",
  });

  const [formUserChildData, setFormUserChildData] = useState({
    nombre: "",
    nombreHebreo: "",
    apellido: "",
    sexo: "",
    fechaNacimiento: "",
    fechaNacimientoHebreo: "",
    fechaBarMitzva: "",
    fechaBarMitzvaHebreo: "",
    perashaBarMitzva: "",
    fechaBatMitzva: "",
    fechaBatMitzvaHebreo: "",
    habilidades: "",
  });



  const [user, setUser] = useState<VisitorUser>({})

  const handleChangePersonalData = (e: any) => {
    setFormUserPersonalData({ ...formUserPersonalData, [e.target.name]: e.target.value });
    setUser({...user, [e.target.name]: e.target.value})
  };

  const handleChangeImportantData = (e: any) => {
    setFormUserImportantData({ ...formUserImportantData, [e.target.name]: e.target.value });
    setUser({...user, [e.target.name]: e.target.value})
  };

  const handleChangeFamilyData = (e: any) => {
    setFormUserFamilyData({ ...formUserFamilyData, [e.target.name]: e.target.value });
    setUser({...user, [e.target.name]: e.target.value})
  };

  const handleChangeChildData = (e: any) => {
    setFormUserChildData({ ...formUserChildData, [e.target.name]: e.target.value }); 
  }

  const addChild = () => {
    setUserChilds(userChilds + 1)
    setStep(3)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("User data on Sign UP is:", user); 
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{esp_strings.btn_create_user}</h2>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "row", width: "100%", alignContent: "center", justifyContent: "center" }}>
            <h3 style={{alignSelf: "center",textAlign: 'center', marginRight: 20, color: step === 1 ? colors.btn_background : "black", textDecoration: step === 1 ? "underline" : "none"}}>Datos Personales</h3>
            <h3 style={{alignSelf: "center",textAlign: 'center', marginRight: 20, color: step === 2 ? colors.btn_background : "black", textDecoration: step === 2 ? "underline" : "none"}}>Datos de Kehila</h3>
            <h3 style={{alignSelf: "center",textAlign: 'center', marginRight: 20, color: step === 3 ? colors.btn_background : "black", textDecoration: step === 3 ? "underline" : "none"}}>Datos de Familia</h3>
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
                <label style={{ display: "block"}}>Nombre Kehila</label>
                <input type="text" name="nombreKehila" placeholder="Nombre Kehila" onChange={handleChangePersonalData} style={styles.input} />
                
                <label style={{ display: "block"}}>Nombre Español</label>
                <input type="text" name="nombreEspañol" placeholder="Nombre en Español" onChange={handleChangePersonalData} style={styles.input} />
                
                <label style={{ display: "block"}}>Nombre Hebreo</label>
                <input type="text" name="nombreHebreo" placeholder="Nombre en Hebreo" onChange={handleChangePersonalData} style={styles.input} />
                
                <label style={{ display: "block"}}>Apellido</label>
                <input type="text" name="apellido" placeholder="Apellido" onChange={handleChangePersonalData} style={styles.input} />

                <label style={{ display: "block"}}>Fecha Nacimiento Gregoriano</label>
                <input type="date" name="fechaNacimientoGregoriano" placeholder="Fecha Nacimiento Gregoriano" onChange={handleChangePersonalData} style={{...styles.input}} />
                
                <label style={{ display: "block"}}>Fecha Nacimiento Hebreo</label>
                <input type="date" name="fechaNacimientoHebreo" placeholder="Fecha Nacimiento Hebreo" onChange={handleChangePersonalData} style={{...styles.input}} />
                
                <label style={{ display: "block"}}>Minian</label>
                <input type="text" name="minian" placeholder="Minian" onChange={handleChangePersonalData} style={styles.input} />
                
                <label style={{ display: "block"}}>Email Personal</label>
                <input type="email" name="emailPersonal" placeholder="Email Personal" onChange={handleChangePersonalData} style={styles.input} />
                
                <label style={{ display: "block"}}>Email Comercial</label>
                <input type="email" name="emailComercial" placeholder="Email Comercial (Opcional)" onChange={handleChangePersonalData} style={styles.input} />
                
                <label style={{ display: "block"}}>Teléfono</label>
                <input type="text" name="telefono" placeholder="Teléfono" onChange={handleChangePersonalData} style={styles.input} />
                
                <label style={{ display: "block"}}>Dirección</label>
                <input type="text" name="direccion" placeholder="Dirección" onChange={handleChangePersonalData} style={styles.input} />
                
                <label style={{ display: "block"}}>Numero Socio</label>
                <input type="text" name="numeroSocio" placeholder="Número de Socio" onChange={handleChangePersonalData} style={styles.input} />
                
                <label style={{ display: "block"}}>Grupo</label>
                <input type="text" name="grupo" placeholder="Grupo" onChange={handleChangePersonalData} style={styles.input} />
            </div>
          </div>
        )}
        {step === 2 && (
          <div style={{ height: "400px", overflowY: "auto", padding: "10px", borderRadius: "5px" }}>
            <div>
                <label style={{ display: "block"}}>Fecha Bar Mitzva Gregoriano</label>
                <input type="text" name="fechaBarMitzvaGregoriano" placeholder="Fecha Bar Mitzva (Gregoriano)" onChange={handleChangeImportantData} style={styles.input} />
                
                <label style={{ display: "block"}}>Fecha Bar Mitzva Hebreo</label>
                <input type="text" name="fechaBarMitzvaHebreo" placeholder="Fecha Bar Mitzva (Hebreo)" onChange={handleChangeImportantData} style={styles.input} />
                
                <label style={{ display: "block"}}>Perasha Bar Mitzva</label>
                <input type="text" name="perashaBarMitzva" placeholder="Perasha Bar Mitzva" onChange={handleChangeImportantData} style={styles.input} />
                
                <label style={{ display: "block"}}>Habilidades</label>
                <input type="text" name="habilidades" placeholder="Habilidades" onChange={handleChangeImportantData} style={styles.input} />

                <label style={{ display: "block"}}>Nombre Madre Español</label>
                <input type="text" name="nombreMadreEspañol" placeholder="Nombre Madre Español" onChange={handleChangeImportantData} style={{...styles.input}} />
                
                <label style={{ display: "block"}}>Nombre Madre Hebreo</label>
                <input type="text" name="nombreMadreHebreo" placeholder="Nombre Madre Hebreo" onChange={handleChangeImportantData} style={{...styles.input}} />
                
                <label style={{ display: "block"}}>Nombre Padre Español</label>
                <input type="text" name="nombrePadreEspañol" placeholder="Nombre Padre Español" onChange={handleChangeImportantData} style={{...styles.input}} />
                
                <label style={{ display: "block"}}>Nombre Padre Hebreo</label>
                <input type="text" name="nombrePadreHebreo" placeholder="Nombre Padre Hebreo" onChange={handleChangeImportantData} style={{...styles.input}} />
            </div>
          </div>
        )}
        {step === 3 && (    
          <div style={{ height: "300px", overflowY: "auto", padding: "10px", borderRadius: "5px" }}>
            <label style={{ display: "block"}}>Estado Civil</label>
            <input type="text" name="estadoCivil" placeholder="Estado civil" onChange={handleChangePersonalData} style={styles.input} />
          
            <label style={{ display: "block"}}>Nombre Esposa Español</label>
            <input type="text" name="nombreEsposaEspañol" placeholder="Nombre Esposa (Español)" onChange={handleChangeFamilyData} style={styles.input} />

            <label style={{ display: "block"}}>Nombre Esposa Hebreo</label>
            <input type="text" name="nombreEsposaHebreo" placeholder="Nombre Esposa (Hebreo)" onChange={handleChangeFamilyData} style={styles.input} />

            {userChilds > 0 && (
                <>
                    <div>
                        <label style={{ display: "block"}}>Nombre Hijo Español</label>
                        <input type="text" name="nombre" placeholder="Nombre (Español)" onChange={handleChangeChildData} style={styles.input} />

                        <label style={{ display: "block"}}>Nombre Hijo Hebreo</label>
                        <input type="text" name="numeroSociaEsposa" placeholder="Nombre (Hebreo)" onChange={handleChangeChildData} style={styles.input} />

                        <label style={{ display: "block"}}>Sexo</label>
                        <input type="text" name="sexo" placeholder="Sexo" onChange={handleChangeChildData} style={styles.input} />

                        <label style={{ display: "block"}}>Fecha Nacimiento</label>
                        <input type="text" name="fechaNacimiento" placeholder="Fecha Nacimiento" onChange={handleChangeChildData} style={styles.input} />

                        <label style={{ display: "block"}}>Fecha Nacimiento Hebreo</label>
                        <input type="text" name="fechaNacimientoHebreo" placeholder="Fecha Nacimiento Hebreo" onChange={handleChangeChildData} style={styles.input} />

                        <label style={{ display: "block"}}>Fecha Bar Mitzva</label>
                        <input type="text" name="fechaBarMitzva" placeholder="Fecha Bar Mitzva" onChange={handleChangeChildData} style={styles.input} />

                        <label style={{ display: "block"}}>Fecha Bar Mitzva Hebreo</label>
                        <input type="text" name="fechaBarMitzvaHebreo" placeholder="Fecha Bar Mitzva Hebreo" onChange={handleChangeChildData} style={styles.input} />

                        <label style={{ display: "block"}}>Perasha Bar Mitzva</label>
                        <input type="text" name="perashaBarMitzva" placeholder="Perasha Bar Mitzva" onChange={handleChangeChildData} style={styles.input} />

                        <label style={{ display: "block"}}>Fecha Bat Mitzva</label>
                        <input type="text" name="fechaBatMitzva" placeholder="Fecha Bat Mitzva" onChange={handleChangeChildData} style={styles.input} />

                        <label style={{ display: "block"}}>Fecha Bat Mitzva Hebreo</label>
                        <input type="text" name="fechaBatMitzvaHebreo" placeholder="Fecha Bat Mitzva Hebreo" onChange={handleChangeChildData} style={styles.input} />

                        <label style={{ display: "block"}}>Habilidades</label>
                        <input type="text" name="habilidades" placeholder="Habilidades" onChange={handleChangeChildData} style={styles.input} />
                    </div>
                </>
            )}
          </div>
        )}
      </form>

      <div>
        <button style={styles.button} onClick={addChild}>Agregar hijo</button>
      </div>
    </div>
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
};

export default NormalUserSignUp;
