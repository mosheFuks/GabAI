import React, { useContext, useState } from "react";
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
          console.log('Firebase: User Email After SignIn: ', userCredential.user.email);
          logedUser = userCredential.user;
        })
        /*--------GET THE USER INFO FROM BACKEND-------*/
        console.log("Loged User Email: ", logedUser);
        if (logedUser != null) {
          const userFromBE = await getUserFromTheList(logedUser.email);
          console.log("Super User from Usuarios List: ", userFromBE);
          const user: LogedUserData = {
            email: logedUser.email,
            nombre: userFromBE.nombre,
            rol: userFromBE.rol,
            kehila: userFromBE.kehila
          }
          logedUserRol = user.rol;
          console.log("User data from BE: ", user);

          /*----IF THE LOGED USER ROL IS VISITOR, WE NEED TO GET ALL HIS DATA */
          if (logedUserRol == "VISITANTE") {
            const logedVisitorInfo = await getVisitorUserInfoOnSignIn(convex, user.kehila, user.email)
            updateVisitorUserInfo(logedVisitorInfo);
          }
          updateLocalUser(user);
        }
        setIsDoingAnApiRequest(false);
      } catch (error) {
        console.log('Firebase Sign In error: ', error);
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
      console.log("User data on Sign In is:", formData);
      console.log("Sign Error: ", signError);
      
      if (signError == "NO_ERROR") {
        logedUserRol != "VISITANTE"  ? await navigate("/administrator-dashboard") : await navigate("/visitor-user-info");
      } else {
        showToastError(signError);
      }
    };

    return (
      <div style={styles.container}>
        <h2 style={styles.title}>
          <span style={{ fontWeight: '600', fontSize: "60px" }}>{esp_strings.btn_signin}</span>
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
          >{isDoingAnApiRequest == true? "Cargando..." : esp_strings.btn_signin}</button>
        </div>

        {resetPassModal && (
          <ResetPassModal resetPassModal={resetPassModal} setResetPassModal={setResetPassModal}/>
        )}
      </div>
    );

    
}

const styles: { [key: string]: CSSProperties } = {
    container: {
      backgroundColor: colors.main_background,
      padding: "10px",
      borderRadius: "25px",
      width: "80%",
      minHeight: "75vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "20px auto 0 auto",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem'
    },
    inputContainer: { 
      width: "400px", 
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
      alignItems: "center"
    },
    input: {
      width: "100%", 
      border: "none",
      outline: "none", 
      backgroundColor: "transparent", 
      color: "black",
      marginLeft: "10px",
      marginRight: "10px",
      fontSize: "1.5rem"
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
    },
    button: {
      border: "none",
      padding: "15px 15px",
      borderRadius: "20px",
      fontWeight: "bold",
      fontSize: "1.5rem",
      transition: "transform 0.2s ease-in-out",
      color: colors.btn_txt,
    },
    buttonHover: {
      transform: "scale(1.1)",
    },
  };
  