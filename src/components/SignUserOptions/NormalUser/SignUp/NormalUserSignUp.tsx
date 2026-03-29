import { CSSProperties, useContext, useState } from "react";
import { colors } from "../../../../assets/colors";
import { esp_strings } from "../../../../assets/strings";
import { VisitorUser, Son, Aniversary } from '../../../../structs/structs';
import { NavigationButtonSignUp } from "./NavigationButtonsSignUp";
import { FormPersonalInfoData } from "./UserComponents/SignUpForms/FormPersonalInfoData";
import { FormKehilaInfoData } from "./UserComponents/SignUpForms/FormKehilaInfoData";
import { FormFamilyInfoData } from "./UserComponents/SignUpForms/FormFamilyInfoData";
import { CreateAniversaryModalComponent } from "./AniversaryComponents/AniversaryModal";
import { CreateNormalUserSignInfoModal } from "./UserComponents/CreateNormalUserSignInfoModal";
import { CreateChildModalComponent } from "./ChildComponents/ChildModal";
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
  const [isNewUser, setIsNewUser] = useState<boolean>(true);

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

  const deleteAniversary = (aniversary: Aniversary) => {
    const updatedAniversaries = user.aniversarios?.filter(a => a.id !== aniversary.id);
    setUser({...user, aniversarios: updatedAniversaries});
    showToastSucces("Aniversario eliminado");
  }

  /*const addVisitorUser = addAVisitorUserInTheKehila();

  const saveNewVisitorUserOnUsersList = () => {
    addVisitorUser(logedUser.kehila, user)
    showToastSucces("Mitpalel agregado")
  }*/

  const navigateRule = () => {
    logedUser.rol == "" ?  navigate("/sign-in") : navigate("/administrator-dashboard")
  }
  
  return (
    <>
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.pageTitle}>{esp_strings.btn_create_user}</h2>
          <div style={styles.description}>Completa los datos para crear tu usuario</div>
        </div>
        <button style={styles.backBtn} onClick={navigateRule}>
          <FaArrowLeft /> {logedUser.rol != "" ?  "Volver" : "Iniciar Sesión"}
        </button>
      </div>

      <NavigationButtonSignUp step={step} setStep={setStep} setModalRealSignInfo={setModalRealSignInfo} fromPage={"SignUp"}  setIsNewUser={setIsNewUser}/>
      
      <form style={{ flex: 1, overflow: 'auto', width: '100%', padding: '20px' }}>
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
            deleteAniversary={deleteAniversary}
          />
        )}
      </form>

      {step === 3 && (  
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <div>
            <button type={"button"} style={styles.button} onClick={addChild}>Agregar Hijo</button>
          </div>
          <div>
            <button type={"button"} style={styles.button} onClick={addAniversary}>Agregar Aniversario</button>
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
       user={user}
       isNewUser={isNewUser}
      />
      :
       null
    }
    </>
  );
};


const styles: { [key: string]: CSSProperties }= {
  container: {
    backgroundColor: colors.main_background,
    borderRadius: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "0",
    padding: "0",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap" as const,
    padding: "20px",
    borderBottom: "1px solid #e5e7eb",
  },
  pageTitle: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#1f2937",
    margin: 0,
  },
  description: {
    fontSize: "18px",
    color: "#6b7280",
    marginTop: "4px",
  },
  backBtn: {
    backgroundColor: "#07b45b",
    color: "white",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    border: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "background-color 0.2s",
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
