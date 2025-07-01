import { CSSProperties, useContext, useState } from "react";
import { colors } from "../../../../assets/colors";
import { esp_strings } from "../../../../assets/strings";
import { VisitorUser, Son, Aniversary } from '../../../../structs/structs';
import { NavigationButtonSignUp } from "./NavigationButtonsSignUp";
import { FormPersonalInfoData } from "./UserComponents/Forms/FormPersonalInfoData";
import { FormKehilaInfoData } from "./UserComponents/Forms/FormKehilaInfoData";
import { FormFamilyInfoData } from "./UserComponents/Forms/FormFamilyInfoData";
import { CreateAniversaryModalComponent } from "./AniversaryComponents/AniversaryModal";
import { CreateNormalUserSignInfoModal } from "./UserComponents/CreateNormalUserSignInfoModal";
import { CreateChildModalComponent } from "./ChildComponents/ChildModal";
import { addAVisitorUserInTheKehila } from "../../../../apis/requests";
import { PageContext } from "../../../../StoreInfo/page-storage";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NormalUserSignUp = () => {
  const { logedUser } = useContext(PageContext) as any;
  const navigate = useNavigate()
  const [step, setStep] = useState<number>(1);
  const [formUserPersonalData, setFormUserPersonalData] = useState<VisitorUser>({
    nombreKehila: "",
    nombreEspanol: "",
    nombreHebreo: "",
    fechaNacimientoGregoriano: {
      dia: "",
      mes: "",
      ano: ""
    },
    fechaNacimientoHebreo: {
      dia: "",
      mes: "",
      ano: ""
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
      ano: ""
    },
    fechaBarMitzvaHebreo: {
      dia: "",
      mes: "",
      ano: ""
    },
    perashaBarMitzva: "",
    habilidades: [], //Leer tora, haftara, ser jazan
    aniversarios: [],
    cuenta: [],
    hijos: [],
    nombreMadreEspanol: "",
    nombreMadreHebreo: "",
    nombrePadreEspanol: "",
    nombrePadreHebreo: "",
    estadoCivil: "",
    nombreEsposaEspanol: "",
    nombreEsposaHebreo: "",
  });
  const [user, setUser] = useState<VisitorUser>(formUserPersonalData)
  const [modalChildIsOpen, setChildModalIsOpen] = useState<boolean>(false);
  const [modalAniversaryIsOpen, setModalAniversaryIsOpen] = useState<boolean>(false);
  const [modalRealSignInfo, setModalRealSignInfo] = useState<boolean>(false);
  const [childSelected, setChildSelected] = useState<Son>({});
  const [aniversarySelected, setAniversarySelected] = useState<Aniversary>();

  const showToastSucces = (errorMessage: string) => {
    toast.success(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: { backgroundColor: 'green', color: 'white' },
    });
  }

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

  const addVisitorUser = addAVisitorUserInTheKehila();
  const saveNewVisitorUserOnUsersList = () => {
    addVisitorUser(logedUser.kehila, user)
    showToastSucces("Usuario agregado")
  }

  const navigateRule = () => {
    logedUser.rol == "" ?  navigate("/sign-in") : navigate("/administrator-dashboard")
  }
  
  return (
    <>
    <div style={styles.container}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", height: "70px" }}>
        <button style={{...styles.button, backgroundColor: "green"}} onClick={navigateRule}>
          <FaArrowLeft className="text-black" /> {logedUser.rol != "" ?  "Lista de usuarios" : "Iniciar Sesion"}
        </button>
        <h2 style={{...styles.title, marginRight: '100px'}}>{esp_strings.btn_create_user}</h2>
        <div></div>
      </div>
      <NavigationButtonSignUp step={step} setStep={setStep} setModalRealSignInfo={setModalRealSignInfo} fromPage={"SignUp"} saveNewVisitorUserOnUsersList={saveNewVisitorUserOnUsersList}/>
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
      <CreateNormalUserSignInfoModal
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
    width: "95%",
    minHeight: "75vh",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //justifyContent: "space-between",
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
