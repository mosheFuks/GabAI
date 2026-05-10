import { CSSProperties, useContext, useState } from 'react';
import { colors } from '../../../assets/colors';
import { OperatorLogedUserData, SignInfo } from '../../../structs/structs';
import { Eye, EyeOff } from "lucide-react"
import { toast } from 'react-toastify';
import { PageContext } from '../../../StoreInfo/page-storage';
import { addAnOperatorToOperadoresList, addAUserToTheUsuariosList } from '../../../apis/requests';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase-config';

export const SignUpOperator = (/*{modalRealSignInfo, setModalRealSignInfo, user}: CrateOperatorProps*/) => {
  const { logedUser } = useContext(PageContext) as any;
  const [formUserSignData, setFormUserSignData] = useState<SignInfo>({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false)

  const addOperatorUser = addAnOperatorToOperadoresList();
  const addVisitorUserToGlobalUsersList = addAUserToTheUsuariosList();

  const showToastMessage = (message: string, type: "error" | "success" | "info") => {
    toast(message, {
      type: type,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true, 
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: type === "success" ? { backgroundColor: "#4BB543" } : { backgroundColor: "#ee6565" },
    });
  }

  const handleNameChange = (inputName: string) => {
    setFormUserSignData({...formUserSignData, ['nombre']: inputName})
  };

  const handleLastNameChange = (inputLastName: string) => {
    setFormUserSignData({...formUserSignData, ['apellido']: inputLastName})
  }
    
  const handleEmailChange = (inputEmail: string) => {
    setFormUserSignData({...formUserSignData, ['email']: inputEmail})
  };

  const handlePassChange = (inputPassword: string) => {
    setFormUserSignData({...formUserSignData, ['password']: inputPassword})
  };

  const handleRegister = async () => {
    let sucess = false;
    try {
      /*ADD THE USER ON FIREBASE */
      await createUserWithEmailAndPassword(auth, formUserSignData.email!, formUserSignData.password!);
      /*ADD THE USER ON THE BACKEND */
      const newOperatorUser: OperatorLogedUserData = {
        nombre: formUserSignData.nombre!,
        apellido: formUserSignData.apellido!,
        email: formUserSignData.email!,
        rol: "OPERATOR",
        kehila: logedUser.kehila,
        _id: ""
      }
      await addOperatorUser(logedUser.kehila, newOperatorUser);
      await addVisitorUserToGlobalUsersList({
        email: formUserSignData.email!,
        nombre: formUserSignData.nombre!,
        rol: "OPERATOR",
        kehila: logedUser.kehila
      });
      sucess = true;
    } catch (err: any) {
      console.error("Error de registro:", err.message);
    }
    return sucess;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const isRegistered = await handleRegister();
    if (isRegistered) {
      showToastMessage('Operador registrado correctamente', 'success');
    } else {
      showToastMessage('Error al registrar el operador. Intenta nuevamente.', 'error');
    }
  };

  return (
    <div style={styles.container}>
      <div>
        <h2 style={styles.title}>Agrega un Nuevo Operador a tu Kehila</h2>
        <div style={styles.description}>Un usuario operador podra organizar aliot, donaciones, y otros aspectos de tu Kehila.</div>
      </div>
      <div style={{ width: '100%', marginBottom: '190px', paddingLeft: "30px" }}>
        <label htmlFor="kehilaName" style={{ display: "block"}}>Kehila</label>
        <h5 id="kehilaName" style={styles.input}>
          {logedUser.kehila}
        </h5>

        <label htmlFor="userNameEsp" style={{ display: "block"}}>Nombre</label>
        <input id="userNameEsp" type="text" name="nombreEspanol" placeholder="Nombre (Español)" style={styles.input} value={formUserSignData.nombre} onChange={(name) => handleNameChange(name.target.value)}/>
        
        <label htmlFor="userLastName" style={{ display: "block"}}>Apellido</label>
        <input id="userLastName" type="text" name="apellido" placeholder="Apellido" style={styles.input} value={formUserSignData.apellido} onChange={(lastName) => handleLastNameChange(lastName.target.value)}/>


        <label htmlFor="userEmal" style={{ display: "block"}}>Email</label>
        <input id="userEmal" type="email" name="emailPersonal" placeholder="Email" style={styles.input} value={formUserSignData.email} onChange={(email) => handleEmailChange(email.target.value)}/>

        <div >
          <label htmlFor="userPassword" style={{ display: "block" }}>
            Contraseña
          </label>

          {/* Si showPassword es true => type="text", sino => "password" */}
          <div style={{ display: 'flex', flexDirection: 'row', flex: 1}}>
              <input
                id="userPassword"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                style={styles.input}
                onChange={(e) => handlePassChange(e.target.value)}
              />

              {/* Botón para mostrar/ocultar */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.toggleButton}
              >
                {showPassword ? <EyeOff size={25} style={styles.icon}/> : <Eye size={25} style={styles.icon}/>}
              </button>
          </div>
        </div>

        <button style={{...styles.button, backgroundColor: formUserSignData.password == "" ? '#d1d5db' : colors.btn_background}} disabled={formUserSignData.password == ""} onClick={handleSubmit}>
          Registrar
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    backgroundColor: colors.main_background,
    //borderRadius: "0",
    //width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    //alignItems: "flex-start",
    margin: "0",
    //textAlign: "left",  
    overflow: "auto",
    //boxSizing: "border-box",
    gap: "24px",
    padding: "24px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1f2937",
    margin: 0,
  },
  description: {
    fontSize: "18px",
    color: "#6b7280",
    marginTop: "4px",
  },
  pass_container: {
    position: "relative",
    display: "inline-block"
  },
  input: {
    width: "80%",
    padding: "10px 12px",
    margin: "8px 0", 
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    color: "#1f2937",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    color: "white",
    padding: "10px 16px",
    margin: "10px 0",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    border: "none",
    transition: "all 0.2s ease",
  },
  toggleButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: '#6b7280'
  },
};