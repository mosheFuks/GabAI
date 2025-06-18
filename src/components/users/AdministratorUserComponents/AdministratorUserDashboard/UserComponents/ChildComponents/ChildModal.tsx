import React, { useState } from 'react';
import Modal from 'react-modal';
import { Ability, Son } from '../../../../../../structs/structs';
import { colors } from '../../../../../../assets/colors';


Modal.setAppElement('#root');

interface UserChildModalProps {
  modalChildIsOpen: boolean;
  setChildModalIsOpen: (modalChildIsOpen: boolean) => void;
  son: Son | undefined;
  setSonSelected: (son: Son) => void;
}

export const UserChildModalComponent = ({modalChildIsOpen, setChildModalIsOpen, son, setSonSelected}: UserChildModalProps) => {

  const closeModal = () => {
    setChildModalIsOpen(false);
    setSonSelected({})
  }

  return (
    <div>
      <Modal
        isOpen={modalChildIsOpen}
        onRequestClose={closeModal}
        style={{
          content: styles.container,
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
            zIndex: 9998 // Asegura que esté detrás del modal pero encima del resto
          }
        }}
        contentLabel="Example Modal"
      >
        <h2 style={{ textAlign: 'center', color: 'blue'}}>{son!.nombre}</h2>
        <div>
          <label htmlFor="userChildNameHeb" style={{ display: "block"}}>Nombre Hebreo</label>
          <h5 id="userChildNameHeb" style={styles.input}>
            {son!.nombreHebreo}
          </h5>

          <label htmlFor="userChildSurname" style={{ display: "block"}}>Apellido</label>
          <h5 id="userChildSurname" style={styles.input}>
            {son!.apellido}
          </h5>

          <label htmlFor="userChildBithDateGreg" style={{ display: "block"}}>Fecha Nacimiento Gregoriano</label>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row"}}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userChildBithDateGregDia" style={{ display: "block", marginRight: 10}}>Día</label>
                <h5 id="userChildBithDateGregDia" style={styles.input}>
                  {son!.fechaNacimiento?.dia}
                </h5>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userChildBithDateGregMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Mes</label>
                <h5 id="userChildBithDateGregMes" style={styles.input}>
                  {son!.fechaNacimiento?.mes}
                </h5>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userChildBithDateGregAno" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
                <h5 id="userChildBithDateGregAno" style={styles.input}>
                  {son!.fechaNacimiento?.ano}
                </h5>
              </div>
            </div>
          </div>

          <label htmlFor="userChildBithDateHeb" style={{ display: "block"}}>Fecha Nacimiento Hebreo</label>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row"}}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userChildBithHebDia" style={{ display: "block", marginRight: 10}}>Día</label>
                <h5 id="userChildBithHebDia" style={styles.input}>
                  {son!.fechaNacimientoHebreo?.dia}
                </h5>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userChildBithHebMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Mes</label>
                <h5 id="userChildBithHebMes" style={styles.input}>
                  {son!.fechaNacimientoHebreo?.mes}
                </h5>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userFechaNacHebAno" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
                <h5 id="userChildBithHebAno" style={styles.input}>
                  {son!.fechaNacimientoHebreo?.ano}
                </h5>
              </div>
            </div>
          </div>

          <label htmlFor="userChildGender" style={{ display: "block" }}>Género</label>
          <h5 id="userChildGender" style={styles.input}>
            {son!.genero}
          </h5>

          
          {son!.genero === "Masculino" ? (
            <div>
              <label htmlFor="userBarMitzvaDateHeb" style={{ display: "block"}}>Fecha Bar Mitzva Hebreo</label>
              <div style={{ display: "flex", flexDirection: "row"}}>
                <div style={{ display: "flex", flexDirection: "row"}}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userChildBarMitzvaDateHebDia" style={{ display: "block", marginRight: 10}}>Día</label>
                    <h5 id="userChildBarMitzvaDateHebDia" style={styles.input}>
                      {son!.fechaBarMitzvaHebreo?.dia}
                    </h5>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userChildBarMitzvaDateHebMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>
                      Mes
                    </label>
                    <h5 id="userChildBarMitzvaDateHebMes" style={styles.input}>
                      {son!.fechaBarMitzvaHebreo?.mes}
                    </h5>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userChildBarMitzvaDateHebAno" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
                    <h5 id="userChildBarMitzvaDateHebAno" style={styles.input}>
                      {son!.fechaBarMitzvaHebreo?.ano}
                    </h5>
                  </div>
                </div>
              </div>
              <label htmlFor="userBarMitzvaDateGreg" style={{ display: "block"}}>Fecha Bar Mitzva Gregoriano</label>
              <div style={{ display: "flex", flexDirection: "row"}}>
                <div style={{ display: "flex", flexDirection: "row"}}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userChildBarMitzvaDateGregDia" style={{ display: "block", marginRight: 10}}>Día</label>
                    <h5 id="userChildBarMitzvaDateGregDia" style={styles.input}>
                      {son!.fechaBarMitzva?.dia}
                    </h5>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userChildBarMitzvaDateGregMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Mes</label>
                    <h5 id="userChildBarMitzvaDateGregMes" style={styles.input}>
                      {son!.fechaBarMitzva?.mes}
                    </h5>
                  </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="userChildBarMitzvaDateGregAno" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
                    <h5 id="userChildBarMitzvaDateGregAno" style={styles.input}>
                      {son!.fechaBarMitzva?.ano}
                    </h5>
                  </div>
              </div>

              <label htmlFor="userChildPerasha"style={{ display: "block"}}>Perasha Bar Mitzva</label>
              <h5 id="userChildPerasha" style={styles.input}>
                {son!.perashaBarMitzva}
              </h5>

              <label htmlFor="userChildAbilities" style={{ display: "block" }}>Conocimientos</label>
              {son!.habilidades?.map((habilidad: Ability, index: React.Key | null | undefined) => (
                <h5 id="userChildAbilities" style={styles.input}>
                  {habilidad}
                </h5>
              ))}
            </div>
          ) :  (null)}
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
};