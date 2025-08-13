import { useContext, useState } from "react";
import { CSSProperties } from "react";
import { AtSign, Eye, EyeOff } from "lucide-react"

import { colors } from "../../../../assets/colors";
import { esp_strings } from "../../../../assets/strings";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase-config";
import { LogedUserData } from '../../../../structs/structs';
import { getUserOnSignInDirect, getVisitorUserInfoOnSignIn } from "../../../../apis/requests";
import { useConvex } from "convex/react";
import { PageContext } from "../../../../StoreInfo/page-storage";
import { toast } from "react-toastify";
import { ResetPassModal } from "./ResetPassModal";
import { ClipLoader } from "react-spinners";

export const SignIn = () => {
  const { updateLocalUser, updateVisitorUserInfo } = useContext(PageContext) as any;
  const [formData, setFormData] = useState({ "email": "", "password": "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isDoingAnApiRequest, setIsDoingAnApiRequest] = useState(false);
  const [resetPassModal, setResetPassModal] = useState(false);
  let logedUserRol = '';

  const convex = useConvex();

  const navigate = useNavigate();
  
  const handleEmailChange = (inputEmail: string) => {
    setFormData({ 
      ...formData,
      email: inputEmail
    });
  };

  const handlePassChange = (inputPassword: string) => {
    setFormData({ 
      ...formData,
      password: inputPassword
    });
  };

  const handleResetPassword = () => {
    setResetPassModal(true)
  }

  const getUserFromTheList = async (email: string) => {
    try {
      const logedUserInfo = await getUserOnSignInDirect(convex, email);
      return logedUserInfo;
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const handleSignIn = async () => {
    let signInMessageError = "NO_ERROR";
    let logedUser: any = {}
    try {
      setIsDoingAnApiRequest(true);
      /*--------SIGN IN ON FIREBASE-------*/
      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      ).then(userCredential => {
        logedUser = userCredential.user;
      })
      /*--------GET THE USER INFO FROM BACKEND-------*/
      if (logedUser != null) {
        const userFromBE = await getUserFromTheList(logedUser.email);
        const user: LogedUserData = {
          email: logedUser.email,
          nombre: userFromBE.nombre,
          rol: userFromBE.rol,
          kehila: userFromBE.kehila
        }
        logedUserRol = user.rol;

        /*----IF THE LOGED USER ROL IS VISITOR, WE NEED TO GET ALL HIS DATA */
        if (logedUserRol == "VISITANTE") {
          const logedVisitorInfo = await getVisitorUserInfoOnSignIn(convex, user.kehila, user.email)
          updateVisitorUserInfo(logedVisitorInfo);
        }
        updateLocalUser(user);
      }
      setIsDoingAnApiRequest(false);
    } catch (error) {
      signInMessageError = "Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.";
      setIsDoingAnApiRequest(false);
    }
    return signInMessageError;
  };

  const showToastError = (errorMessage: string) => {
    toast.error(errorMessage, {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const signError = await handleSignIn();
    
    if (signError == "NO_ERROR") {
      logedUserRol != "VISITANTE"  ? await navigate("/administrator-dashboard") : await navigate("/visitor-user-info");
    } else {
      showToastError(signError);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.scrollWrapper}>
        <h2 style={styles.title}>
          <span style={{ fontWeight: '600', fontSize: "60px", textAlign: 'center' }}>{esp_strings.btn_signin}</span>
        </h2>
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <div>
            <label style={{ fontSize: 20}}>{esp_strings.sign_email}</label>
            <div style={styles.inputContainer}>
              <input
                type="email"
                name="email"
                value={formData.email}
                style={styles.input}
                onChange={(email) => handleEmailChange(email.target.value)}
              />
              <AtSign size={25} style={styles.icon}/>  
            </div>
          </div>
          <div>
            <label style={{ fontSize: 20}}>{esp_strings.sign_password}</label>
            <div style={styles.inputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                style={styles.input}
                onChange={(password) => handlePassChange(password.target.value)}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                style={{ border: "none", backgroundColor: "transparent", cursor: "pointer", color: "black", margin: 0 }}
              >
                {showPassword ? <EyeOff size={25} style={styles.icon}/> : <Eye size={25} style={styles.icon}/>}
              </div>
            </div>
          </div>
          <div onClick={handleResetPassword}>
            <p style={styles.forgotPass}>{esp_strings.sign_password_forgot}</p>
          </div>
        </form>
        
        <div style={styles.buttonContainer}>
          <button 
            style={{...styles.button, backgroundColor: formData.email == "" || formData.password == "" ? "gray": colors.btn_background, cursor: formData.email == "" || formData.password == "" ? "not-allowed" : "pointer"}}
            onClick={handleSubmit}
            onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = styles.buttonHover.transform || "scale(1.1)")}
            onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
            disabled={isDoingAnApiRequest == true || (formData.email == "" || formData.password == "")} 
          >{isDoingAnApiRequest == true? 
            <ClipLoader color="white" loading={true} size={35} /> : esp_strings.btn_signin}
          </button>
        </div>

        {resetPassModal && (
          <ResetPassModal resetPassModal={resetPassModal} setResetPassModal={setResetPassModal}/>
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    backgroundColor: colors.main_background,
    borderRadius: "25px",
    width: "95%",
    minWidth: "360px",
    minHeight: "75vh",
    display: "flex",
    justifyContent: "center",   // centrado horizontal
    alignItems: "center",       // centrado vertical
    margin: "20px auto 0 auto",
    padding: "20px",
    boxSizing: "border-box",
    overflowX: "auto"           // scroll horizontal
  },
  scrollWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "400px",          // contenido mínimo
    maxWidth: "600px"           // opcional
  },
  title: {
    fontSize: "clamp(2rem, 6vw, 3rem)",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    whiteSpace: "nowrap"
  },
  inputContainer: { 
    width: "400px",
    minWidth: "320px",          // evita encogerse demasiado
    height: "50px",
    marginTop: "10px",
    marginBottom: "20px",
    padding: "8px", 
    border: "1px solid #ccc", 
    borderRadius: "50px",
    backgroundColor: colors.btn_txt,
    color: colors.form_txt,
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    boxSizing: "border-box"
  },
  input: {
    flex: "1 1 auto",         // que se ajuste al espacio
    border: "none",
    outline: "none", 
    backgroundColor: "transparent", 
    color: "black",
    marginLeft: "10px",
    marginRight: "10px",
    fontSize: "clamp(1rem, 4vw, 1.5rem)"
  },
  icon: {
    marginRight: "10px", 
    marginTop: "2px"
  },
  forgotPass: {
    color: colors.btn_background, 
    fontSize: "1.3rem", 
    textAlign: "center", 
    cursor: "pointer", 
    textDecoration: "underline"
  },
  buttonContainer: {
    display: "flex",
    gap: "15px",
    flexWrap: "nowrap",          // mantiene botones en una sola línea
    minWidth: "320px",           // genera scroll si no entra
    justifyContent: "center",
  },
  button: {
    border: "none",
    padding: "15px 15px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "clamp(1rem, 4vw, 1.5rem)",
    transition: "transform 0.2s ease-in-out",
    color: colors.btn_txt,
    flex: "1 1 220px",      // adaptable
    maxWidth: "100%"
  },
  buttonHover: {
    transform: "scale(1.1)",
  },
};
  