import { CSSProperties, useState } from 'react';
import Modal from 'react-modal';
import { colors } from '../../../../../assets/colors';
import { LogedUserData, SignInfo, VisitorUser } from '../../../../../structs/structs';
import { Eye, EyeOff } from "lucide-react"
import { toast } from 'react-toastify';
import { addAUserToTheUsuariosList, addAVisitorUserInTheKehila } from '../../../../../apis/requests';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../../firebase-config';

interface RealSignModalProps {
  modalRealSignInfo: boolean,
  setModalRealSignInfo: (modalRealSignInfo: boolean) => void;
  user: VisitorUser;
}

export const CreateNormalUserSignInfoModal = ({modalRealSignInfo, setModalRealSignInfo, user}: RealSignModalProps) => {
  const [formUserSignData, setFormUserSignData] = useState<SignInfo>({
    nombre: user.nombreEspanol != null ? user.nombreEspanol : "",
    email:  user.emailPersonal != null ? user.emailPersonal : "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false)
  
  const setPassword = (e: any) => {
    setFormUserSignData({...formUserSignData, ['password']: e.target.value})
  }

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

  const addVisitorUser = addAVisitorUserInTheKehila();
  const addVisitorUserToUsersList = addAUserToTheUsuariosList();
 
  const closeModal = () => {
    setModalRealSignInfo(false);
  }

  const camposIgnorados = ['aniversarios', 'hijos', 'habilidades', 'cuenta', 'emailComercial', 'nombreEsposaEspanol', 'nombreEsposaHebreo', 'numeroSocio' ];
  const campoIncompleto = Object.entries(user)
    .filter(([key]) => !camposIgnorados.includes(key))
    .find(([, value]) => {
      if (typeof value === 'string') {
        return value.trim() === '';
      }
      if (typeof value === 'object' && value !== null) {
        return Object.keys(value).length === 0;
      }
      return value === null || value === undefined;
    });

  if (campoIncompleto) {
    console.warn("Campo incompleto:", campoIncompleto[0], "con valor:", campoIncompleto[1]);
  }

  const isFormComplete = !campoIncompleto;

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
        await addVisitorUser(user.nombreKehila!, user)
        await addVisitorUserToUsersList(newVisitorUser);
        /*ADD THE USER ON FIREBASE */
        await createUserWithEmailAndPassword(auth, formUserSignData.email!, formUserSignData.password!);
        toast.success('Usuario registrado correctamente', {
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
      } catch (err: any) {
        console.error("Error al registrar usuario:", err);
        if (err.toString().includes("auth/email-already-in-use")) {
          showToastError("Error al registrar usuario: Usuario ya existente")
        }
        showToastError("Ocurrió un error al registrar usuario, intenta nuevamente más tarde");
      }
    } else {
      showToastError('Por favor completa todos los campos')
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
        <h2 style={{ textAlign: 'center', color: 'blue'}}>Ingresa los datos para el inicio de sesion</h2>
        <div>
          <label htmlFor="userNameEsp" style={{ display: "block"}}>Nombre</label>
          <input id="userNameEsp" type="text" name="nombreEspanol" placeholder="Nombre (Español)" style={styles.input} value={formUserSignData.nombre} disabled/>
          
          <label htmlFor="userEmal" style={{ display: "block"}}>Email</label>
          <input id="userEmal" type="email" name="emailPersonal" placeholder="Email" style={styles.input} value={formUserSignData.email} disabled/>

          <div style={styles.pass_container}>
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
          </div>

          <button onClick={registerUser} style={{...styles.button, backgroundColor: formUserSignData.password == "" ? 'gray' : colors.btn_background}} disabled={formUserSignData.password == ""}>
            Registrarse
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
    margin: "10px",
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