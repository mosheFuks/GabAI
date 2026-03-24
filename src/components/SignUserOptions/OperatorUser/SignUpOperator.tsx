import React, { useContext, useState } from 'react';
import { colors } from '../../../assets/colors';
import { LogedUserData, SignInfo } from '../../../structs/structs';
import { Eye, EyeOff } from "lucide-react"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PageContext } from '../../../StoreInfo/page-storage';
import { addAUserToTheUsuariosList } from '../../../apis/requests';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase-config';
import { FaArrowLeft } from 'react-icons/fa';

export const SignUpOperator = (/*{modalRealSignInfo, setModalRealSignInfo, user}: CrateOperatorProps*/) => {
  const { logedUser } = useContext(PageContext) as any;
  const [formUserSignData, setFormUserSignData] = useState<SignInfo>({
    nombre: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate();
  const addOperatorUser = addAUserToTheUsuariosList();

  const showErrorToast = (message: string) => {
    toast.error(message, {
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

  const handleNameChange = (inputName: string) => {
    setFormUserSignData({...formUserSignData, ['nombre']: inputName})
  };
    
  const handleEmailChange = (inputEmail: string) => {
    setFormUserSignData({...formUserSignData, ['email']: inputEmail})
  };

  const handlePassChange = (inputPassword: string) => {
    setFormUserSignData({...formUserSignData, ['password']: inputPassword})
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      /*ADD THE USER ON FIREBASE */
      await createUserWithEmailAndPassword(auth, formUserSignData.email!, formUserSignData.password!);
      /*ADD THE USER ON THE BACKEND */
      const newOperatorUser: LogedUserData = {
        nombre: formUserSignData.nombre!,
        email: formUserSignData.email!,
        rol: "OPERADOR",
        kehila: logedUser.kehila
      }
      await addOperatorUser(newOperatorUser);
    } catch (err: any) {
      console.error("Error de registro:", err.message);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    showErrorToast('Mitpalel registrado correctamente')
    await handleRegister(e);
    navigate("/administrator-dashboard");
  };

  return (
    <div style={styles.container}>
       {logedUser.rol != "VISITANTE" ? (
          <div style={{ display: "flex", marginTop: '10px',flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", height: "70px" }}>
            <button style={{...styles.button, backgroundColor: "#10b981"}} onClick={() => navigate("/administrator-dashboard")}>
              <FaArrowLeft /> Lista de usuarios
            </button>
            <h2 style={{...styles.title, marginRight: '100px'}}>Agrega un usuario operador</h2>
            <div></div>
          </div>
        ) : (
          <h2 style={styles.title}>Agrega un usuario operador</h2>
        )}
      <div style={{ width: '100%', marginBottom: '190px', paddingLeft: "30px" }}>
        <label htmlFor="kehilaName" style={{ display: "block"}}>Kehila</label>
        <h5 id="kehilaName" style={styles.input}>
          {logedUser.kehila}
        </h5>

        <label htmlFor="userNameEsp" style={{ display: "block"}}>Nombre</label>
        <input id="userNameEsp" type="text" name="nombreEspanol" placeholder="Nombre (Español)" style={styles.input} value={formUserSignData.nombre} onChange={(name) => handleNameChange(name.target.value)}/>

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
          Registrarse
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: colors.main_background,
    padding: "20px",
    borderRadius: "12px",
    width: "95%",
    minWidth: "720px",
    minHeight: "79vh",
    display: "flex" as const,
    flexDirection: "column" as const,
    alignItems: "center" as const,
    margin: "20px auto 0 auto",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1f2937",
    borderBottom: "2px solid #3b82f6",
    paddingBottom: "12px",
    marginBottom: "20px",
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