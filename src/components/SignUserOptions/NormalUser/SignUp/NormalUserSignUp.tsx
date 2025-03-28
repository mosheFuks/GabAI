import React, { CSSProperties, useEffect, useState } from "react";
import { colors } from "../../../../assets/colors";
import { esp_strings } from "../../../../assets/strings";
import { VisitorUser, Son, Aniversary } from '../../../../structs/structs';
import { NavigationButtonSignUp } from "./NavigationButtonsSignUp";
import { FormPersonalInfoData } from "./UserComponents/Forms/FormPersonalInfoData";
import { FormKehilaInfoData } from "./UserComponents/Forms/FormKehilaInfoData";
import { FormFamilyInfoData } from "./UserComponents/Forms/FormFamilyInfoData";
import { CreateAniversaryModalComponent } from "./AniversaryComponents/AniversaryModal";
import { CreateRealSignInfoModalComponent } from "./UserComponents/CreateRealSignInfoModalComponent";
import { CreateChildModalComponent } from "./ChildComponents/ChildModal";

const NormalUserSignUp = () => {
  const [step, setStep] = useState<number>(1);
  const [user, setUser] = useState<VisitorUser>({})
  const [modalChildIsOpen, setChildModalIsOpen] = useState<boolean>(false);
  const [modalAniversaryIsOpen, setModalAniversaryIsOpen] = useState<boolean>(false);
  const [modalRealSignInfo, setModalRealSignInfo] = useState<boolean>(false);
  const [childSelected, setChildSelected] = useState<Son>({});
  const [aniversarySelected, setAniversarySelected] = useState<Aniversary>();

  useEffect(() => {
    console.log("User data on Sign UP is:", user);
  }, [user])

  const [formUserPersonalData, setFormUserPersonalData] = useState<VisitorUser>({
    nombreKehila: "",
    nombreEspañol: "",
    nombreHebreo: "",
    fechaNacimientoGregoriano: {
      dia: "",
      mes: "",
      año: ""
    },
    fechaNacimientoHebreo: {
      dia: "",
      mes: "",
      año: ""
    },
    minian: "",
    apellido: "",
    emailPersonal: "",
    emailComercial: "", //Opcional
    telefono: "",
    direccion: "",
    numeroSocio: "",
    grupo: "",
    fechaBarMitzvaGregoriano: {
      dia: "",
      mes: "",
      año: ""
    },
    fechaBarMitzvaHebreo: {
      dia: "",
      mes: "",
      año: ""
    },
    perashaBarMitzva: "",
    habilidades: [], //Leer tora, haftara, ser jazan
    aniversarios: [],
    nombreMadreEspañol: "",
    nombreMadreHebreo: "",
    nombrePadreEspañol: "",
    nombrePadreHebreo: "",
    estadoCivil: "",
    nombreEsposaEspañol: "",
    nombreEsposaHebreo: "",
  });

  const handleChangePersonalData = (e: any) => {
    setFormUserPersonalData({ ...formUserPersonalData, [e.target.name]: e.target.value });
    setUser({...user, [e.target.name]: e.target.value})
  };

  const addChild = () => {
    setChildModalIsOpen(true)
  }

  const addAniversary = () => {
    setModalAniversaryIsOpen(true)
  }

  return (
    <>
    <div style={styles.container}>
      <h2 style={styles.title}>{esp_strings.btn_create_user}</h2>
      <NavigationButtonSignUp step={step} setStep={setStep} setModalRealSignInfo={setModalRealSignInfo}/>
      <form style={{ width: "100%" }}>
        {step === 1 && (
          <FormPersonalInfoData 
            handleChangePersonalData={handleChangePersonalData}
            user={user} 
            setFormUserPersonalData={setFormUserPersonalData} 
            formUserPersonalData={formUserPersonalData} 
            setUser={setUser}
          />
        )}
        {step === 2 && (
          <FormKehilaInfoData 
            handleChangePersonalData={handleChangePersonalData} 
            user={user}
            setFormUserPersonalData={setFormUserPersonalData}
            formUserPersonalData={formUserPersonalData}
            setUser={setUser}
          />
        )}
        {step === 3 && (    
          <FormFamilyInfoData 
            handleChangePersonalData={handleChangePersonalData} 
            user={user} 
            setChildModalIsOpen={setChildModalIsOpen}
            setModalAniversaryIsOpen={setModalAniversaryIsOpen} 
            setChildSelected={setChildSelected}
            setAniversarySelected={setAniversarySelected}
          />
        )}
      </form>

      {step === 3 && (
        <div style={{display: "flex", flexDirection: "row"}}>
          <div>
            <button type={"button"}style={styles.button} onClick={addChild}>Agregar Hijo</button>
          </div>
          <div>
            <button type={"button"}style={styles.button} onClick={addAniversary}>Agregar Aniversario</button>
          </div>
        </div>
      )}
    </div>

    {modalChildIsOpen ? 
      <CreateChildModalComponent 
        modalChildIsOpen={modalChildIsOpen} 
        setChildModalIsOpen={setChildModalIsOpen} 
        user={user} setUser={setUser} 
        childSelected={childSelected} 
        setChildSelected={setChildSelected}/> 
      : 
       null
    }
    {modalAniversaryIsOpen ? 
      <CreateAniversaryModalComponent 
        modalAniversaryIsOpen={modalAniversaryIsOpen} 
        setModalAniversaryIsOpen={setModalAniversaryIsOpen} 
        user={user} setUser={setUser} 
        aniversarySelected={aniversarySelected} 
        setAniversarySelected={setAniversarySelected}/>
      :
       null
    }
    {modalRealSignInfo ?
      <CreateRealSignInfoModalComponent
       modalRealSignInfo={modalRealSignInfo}
       setModalRealSignInfo={setModalRealSignInfo}
       user={user} />
      :
       null
    }
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
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    border: `2px solid ${colors.btn_background}`,
    borderColor: colors.btn_background,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10
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

export default NormalUserSignUp;
