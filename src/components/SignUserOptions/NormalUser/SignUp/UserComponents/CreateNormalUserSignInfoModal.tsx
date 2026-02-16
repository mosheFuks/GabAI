import { CSSProperties, useContext, useState } from 'react';
import Modal from 'react-modal';
import { colors } from '../../../../../assets/colors';
import { LogedUserData, SignInfo, VisitorUser } from '../../../../../structs/structs';
import { Eye, EyeOff } from "lucide-react"
import { toast } from 'react-toastify';
import { addAUserToTheUsuariosList, addAVisitorUserInTheKehila } from '../../../../../apis/requests';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../../firebase-config';
import { PageContext } from '../../../../../StoreInfo/page-storage';

interface RealSignModalProps {
  modalRealSignInfo: boolean,
  setModalRealSignInfo: (modalRealSignInfo: boolean) => void;
  user: VisitorUser;
  isNewUser: boolean;
}

export const CreateNormalUserSignInfoModal = ({modalRealSignInfo, setModalRealSignInfo, user, isNewUser}: RealSignModalProps) => {
  const { logedUser } = useContext(PageContext) as any;
  console.log("Loged User:", logedUser);
  
  const [formUserSignData, setFormUserSignData] = useState<SignInfo>({
    nombre: user.nombreEspanol != null ? user.nombreEspanol : "",
    email:  user.emailPersonal != null ? user.emailPersonal : "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false)
  
  const setPassword = (e: any) => {
    setFormUserSignData({...formUserSignData, ['password']: e.target.value})
  }

  const validatePassword = (password: string): boolean => {
    if (!password) return false;
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const isPasswordValid = isNewUser ? validatePassword(formUserSignData.password!) : true;

  const showToastError = (message: string) => {
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

  const addVisitorUserToKehila = addAVisitorUserInTheKehila();
  const addVisitorUserToGlobalUsersList = addAUserToTheUsuariosList();
 
  const closeModal = () => {
    setModalRealSignInfo(false);
  }

  const camposCriticos = [
    'nombreEspanol',
    'nombreHebreo',
    'apellido',
    'fechaNacimientoGregoriano',
    'fechaNacimientoHebreo',
    'minian'
  ];
  const esUsuarioCompleto = () => {
    const campoIncompleto = Object.entries(user)
      .filter(([key]) => camposCriticos.includes(key))
      .find(([, value]) => {
        if (typeof value === 'string') return value.trim() === '';
        if (typeof value === 'object' && value !== null)
          return Object.keys(value).length === 0;
        return value === null || value === undefined;
      });

    if (campoIncompleto) {
      console.warn("Campo incompleto:", campoIncompleto[0], "con valor:", campoIncompleto[1]);
      return false; // usuario incompleto
    }

    return true; // usuario completo
  };

  const isFormComplete = esUsuarioCompleto()

  const registerUser = async () => {
    if (isFormComplete) {
      try {
        /*ADD THE USER ON THE BACKEND */
        const newVisitorUser: LogedUserData = {
          nombre: formUserSignData.nombre!,
          email: formUserSignData.email!,
          rol: "VISITANTE",
          kehila: user.nombreKehila!,
        }
        await addVisitorUserToKehila(user.nombreKehila!, user)
        await addVisitorUserToGlobalUsersList(newVisitorUser);
        /*ADD THE USER ON FIREBASE */
        if (isNewUser) {
          await createUserWithEmailAndPassword(auth, formUserSignData.email!, formUserSignData.password!);
        } else {
          // Create user account with a temporary password, then send password reset email
          try {
            const tempPassword = Math.random().toString(36).slice(-12); // Generate temporary password
            await createUserWithEmailAndPassword(auth, formUserSignData.email!, tempPassword);
            
            console.log("Password reset email sent to:", formUserSignData.email);
          } catch (err: any) {
            console.warn("Error creating user or sending password reset email:", err);
            // Don't fail the registration if email sending fails
          }
        }

        showToastSucces('Mitpalel registrado correctamente');

        //SEND A CONFIRMATION EMAIL TO THE USER
        
      } catch (err: any) {
        console.error("Error al registrar al Mitpalel:", err);
        if (err.toString().includes("auth/email-already-in-use")) {
          showToastError("Error al registrar al Mitpael: Mitpalel ya existente")
        }
        showToastError("Ocurrió un error al registrar al Mitpael, intenta nuevamente más tarde");
      }
    } else {
      showToastError('Por favor completa todos los campos, revisa los Datos Personales.');
    }
    setModalRealSignInfo(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalRealSignInfo}
        onRequestClose={closeModal}
        style={{
          content: styles.container,
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
            zIndex: 9998 // Asegura que esté detrás del modal pero encima del resto
          }
        }}
        contentLabel="Sign Info Modal"
      >
        <h2 style={{ textAlign: 'center', color: 'blue'}}>Confirmar la creacion del Mitpalel</h2>
        <div>
          <label htmlFor="userNameEsp" style={{ display: "block"}}>Nombre</label>
          <input id="userNameEsp" type="text" name="nombreEspanol" placeholder="Nombre (Español)" style={styles.input} value={formUserSignData.nombre} disabled/>
          
          <label htmlFor="userEmal" style={{ display: "block"}}>Email</label>
          <input id="userEmal" type="email" name="emailPersonal" placeholder="Email" style={styles.input} value={formUserSignData.email} disabled/>

          {isNewUser ?
            <div style={styles.pass_container}>
            <label htmlFor="userPassword" style={{ display: "block" }}>
              Contraseña
            </label>

            {/*Si showPassword es true => type="text", sino => "password"}*/}
            <div style={{ display: 'flex', flexDirection: 'row', flex: 1}}>
                <input
                  id="userPassword"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  style={styles.input}
                  onChange={(e) => setPassword(e)}
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
            <div style={{ fontSize: '0.85rem', color: 'gray', marginTop: 8, marginLeft: 10 }}>
              <p style={{margin: '4px 0'}}>Requerimientos de contraseña:</p>
              <div style={{ marginLeft: 10 }}>
                <div style={{color: (formUserSignData.password || '').length >= 8 ? 'green' : 'red'}}>{(formUserSignData.password || '').length >= 8 ? '✓' : '✕'} Mínimo 8 caracteres</div>
                <div style={{color: /[A-Z]/.test(formUserSignData.password || '') ? 'green' : 'red'}}>{/[A-Z]/.test(formUserSignData.password || '') ? '✓' : '✕'} Una letra mayúscula</div>
                <div style={{color: /[a-z]/.test(formUserSignData.password || '') ? 'green' : 'red'}}>{/[a-z]/.test(formUserSignData.password || '') ? '✓' : '✕'} Una letra minúscula</div>
                <div style={{color: /[0-9]/.test(formUserSignData.password || '') ? 'green' : 'red'}}>{/[0-9]/.test(formUserSignData.password || '') ? '✓' : '✕'} Un número</div>
                <div style={{color: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formUserSignData.password || '') ? 'green' : 'red'}}>{/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formUserSignData.password || '') ? '✓' : '✕'} Un carácter especial (!@#$%^&*...)</div>
              </div>
            </div>
          </div> 

          :
          
          <div style={{ color: 'black', fontWeight: 'bold', marginTop: 10, textAlign: 'center', border: '2px solid yellow', padding: 10, borderRadius: 10 }}>
            ⚠️ Se le enviará un email al Mitpalel para informarle que se le creo una cuenta de <b>GAB<i>AI</i></b> en {logedUser.kehila}.
          </div>

          }

          <button 
            onClick={registerUser} 
            disabled={!isPasswordValid && isNewUser}
            style={{...styles.button, backgroundColor: (!isPasswordValid && isNewUser) ? '#cccccc' : colors.btn_background, cursor: (!isPasswordValid && isNewUser) ? 'not-allowed' : 'pointer'}}>
            {logedUser.rol == "ADMIN" ? "Guardar Mitpalel" : "Registrarse"}
          </button>
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
  pass_container: {
    //position: "relative",  // ← Importante para posicionar el botón
    display: "inline-block"
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
    margin: "20px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    border: "none",
  } as CSSProperties,
  toggleButton: {
    //position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
    marginTop: 35
  } as CSSProperties,
  icon: {
    marginRight: "10px", 
    color: 'black'
  } as CSSProperties,
};