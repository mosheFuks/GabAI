import React, { useState } from 'react';
import Modal from 'react-modal';
import { colors } from '../../../../assets/colors'
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../../firebase-config';

Modal.setAppElement('#root');

interface ResetPassModal {
  resetPassModal: boolean;
  setResetPassModal: (openAliaModal: boolean) => void;
}

export const ResetPassModal = ({resetPassModal, setResetPassModal}: ResetPassModal) => {
  const [email, setEmail] = useState<string>()

  const resetPass = () => {
    sendPasswordResetEmail(auth, email!)
        .then(() => {
            setResetPassModal(false)
        })
        .catch((error) => {
            console.error("Error al enviar correo:", error.message);
        });
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
        contentLabel="Example Modal"
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
    overflowX: "hidden"
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
  switchContainer: {
    display: "flex",
    //justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",
  },
  switch: {
    width: "25px",
    height: "25px",
    accentColor: colors.btn_background, // o el azul de tu estilo
    cursor: "pointer",
  },
};