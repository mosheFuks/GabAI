import { CSSProperties, useState } from 'react';
import Modal from 'react-modal';
import { colors } from '../../../../assets/colors'
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../../firebase-config';
import { toast } from 'react-toastify';

interface ResetPassModal {
  resetPassModal: boolean;
  setResetPassModal: (openAliaModal: boolean) => void;
}

export const ResetPassModal = ({resetPassModal, setResetPassModal}: ResetPassModal) => {
  const [email, setEmail] = useState<string>()

  const resetPass = async () => {
    if (!email) {
      toast.error("Por favor ingresa tu email");
      return;
    }

    try {
      // Configure action code settings
      const actionCodeSettings = {
        url: `${window.location.origin}/signin`, // Redirect to signin after reset
        handleCodeInApp: true,
      };

      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      
      toast.success("Se ha enviado un email de recuperación. Revisa tu bandeja de entrada.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: { backgroundColor: 'green', color: 'white' },
      });
      
      setResetPassModal(false);
    } catch (error: any) {
      console.error("Error al enviar correo:", error);
      
      let errorMessage = "Error al enviar email de recuperación";
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No existe usuario con este email";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "El email no es válido";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Demasiados intentos. Intenta más tarde";
      }
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: { backgroundColor: 'red', color: 'white' },
      });
    }
  }

  const closeModal = async () => {
    setResetPassModal(false)
  }
  
  return (
    <div>
      <Modal
        isOpen={resetPassModal}
        onRequestClose={() => closeModal()}
        style={{
          content: styles.container,
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
            zIndex: 9998 // Asegura que esté detrás del modal pero encima del resto
          }
        }}
        contentLabel="Reset Password Modal"
      >
        <h2 style={{ textAlign: 'center', color: 'blue'}}>Ingresa tu email personal para enviar email de confirmación</h2>
        <div>
          <label htmlFor="email" style={{ display: "block"}}>Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <button onClick={resetPass} style={{...styles.button, backgroundColor: email == "" ? 'gray' : colors.btn_background}} disabled={email == ""}>
            Enviar
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
    overflowX: "hidden" as const
  }  as CSSProperties,
  input: {
    width: "80%",
    padding: "10px",
    margin: "10px 0", 
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    backgroundColor: "white",
    color: "black",
  }  as CSSProperties,
  button: {
    display: "block",
    color: "white",
    padding: "10px 15px",
    margin: "10px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    border: "none",
  }  as CSSProperties,
  switchContainer: {
    display: "flex",
    //justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",
  }  as CSSProperties,
  switch: {
    width: "25px",
    height: "25px",
    accentColor: colors.btn_background, // o el azul de tu estilo
    cursor: "pointer",
  } as CSSProperties,
};