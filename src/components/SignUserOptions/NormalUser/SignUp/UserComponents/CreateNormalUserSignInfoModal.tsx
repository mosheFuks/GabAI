import React, { useState } from 'react';
import Modal from 'react-modal';
import { colors } from '../../../../../assets/colors';
import { LogedUserData, SignInfo, VisitorUser } from '../../../../../structs/structs';
import { Eye, EyeOff } from "lucide-react"
import { toast } from 'react-toastify';
import { addAUserToTheUsuariosList, addAVisitorUserInTheKehila } from '../../../../../apis/requests';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../../firebase-config';

Modal.setAppElement('#root');

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
    console.log("Password: ", formUserSignData.password);
  }

  const addVisitorUser = addAVisitorUserInTheKehila();
  const addVisitorUserToUsersList = addAUserToTheUsuariosList();
 
  const closeModal = () => {
    setModalRealSignInfo(false);
    console.log("Form user child data", formUserSignData?.nombre);
  }

  const registerUser = async () => {
    console.log("Registering user with data:");
    try {
      /*ADD THE USER ON FIREBASE */
      const userCredential = await createUserWithEmailAndPassword(auth, formUserSignData.email!, formUserSignData.password!);
      console.log("Usuario registrado:", userCredential.user.email);
      /*ADD THE USER ON THE BACKEND */
      const newVisitorUser: LogedUserData = {
        nombre: formUserSignData.nombre!,
        email: formUserSignData.email!,
        rol: "VISITANTE",
        kehila: user.nombreKehila!,
      }
      await addVisitorUser(user.nombreKehila!, user)
      await addVisitorUserToUsersList(newVisitorUser);
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
      toast.error('Error al registrar el usuario', {
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
  }

  return (
    <div>
      <Modal
        isOpen={modalRealSignInfo}
        onRequestClose={closeModal}
        style={{ content: styles.container }}
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
  },
  pass_container: {
    //position: "relative",  // ← Importante para posicionar el botón
    display: "inline-block"
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
    display: "block",
    color: "white",
    padding: "10px 15px",
    margin: "10px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    border: "none",
  },
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
  },
  icon: {
    marginRight: "10px", 
    color: 'black'
  },
};