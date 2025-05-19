import React, { useState } from 'react';
import Modal from 'react-modal';
import { Aniversary } from '../../../../../../structs/structs';
import { colors } from '../../../../../../assets/colors';

Modal.setAppElement('#root');

interface AniversaryModalProps {
  modalAniversaryIsOpen: boolean;
  setModalAniversaryIsOpen: (modalAniversaryIsOpen: boolean) => void;
  aniversary?: Aniversary;
  setAniversarySelected: (aniversary: Aniversary) => void;
}

export const CreateAniversaryModalComponent = ({modalAniversaryIsOpen, setModalAniversaryIsOpen, aniversary, setAniversarySelected}: AniversaryModalProps) => {
  const closeModal = () => {
    setModalAniversaryIsOpen(false);
    setAniversarySelected({})
  }
  
  return (
    <div>
      <Modal
        isOpen={modalAniversaryIsOpen}
        onRequestClose={closeModal}
        style={{ content: styles.container }}
        contentLabel="Example Modal"
      >
        <h2 style={{ textAlign: 'center', color: 'blue'}}>{aniversary?.nombreDelAniversario}</h2>
        <div>
          <label htmlFor="userAniversaryMotive" style={{ display: "block" }}>Motivo</label>
          <h5 id="userAniversaryMotive" style={styles.input}>
            {aniversary!.motivo}
          </h5>

          <label htmlFor="userAniversaryPerName" style={{ display: "block"}}>Nombre de la persona</label>
          <h5 id="userAniversaryPerName" style={styles.input}>
            {aniversary!.nombreDelAniversario}
          </h5>

          <label htmlFor="userAniversaryBithDateGreg" style={{ display: "block"}}>Fecha Aniversario Gregoriano</label>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row"}}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userAniversaryBithDateGregDia" style={{ display: "block", marginRight: 10}}>Día</label>
                <h5 id="userAniversaryBithDateGregDia" style={styles.input}>
                  {aniversary!.fecha?.dia}
                </h5>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userAniversaryBithDateGregMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Mes</label>
                <h5 id="userAniversaryBithDateGregMes" style={styles.input}>
                  {aniversary!.fecha?.mes}
                </h5>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userAniversaryBithDateGregAño" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
                <h5 id="userAniversaryBithDateGregAño" style={styles.input}>
                  {aniversary!.fecha?.año}
                </h5>
              </div>
            </div>
          </div>

          <label htmlFor="userAniversaryBithDateHebDia" style={{ display: "block"}}>Fecha Aniversario Hebreo</label>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row"}}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userAniversaryBithDateHebDia" style={{ display: "block", marginRight: 10}}>Día</label>
                <h5 id="userAniversaryBithDateHebDia" style={styles.input}>
                  {aniversary!.fechaHebreo?.dia}
                </h5>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userAniversaryBithDateHebMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Mes</label>
                <h5 id="userAniversaryBithDateHebMes" style={styles.input}>
                  {aniversary!.fechaHebreo?.mes!}
                </h5>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userAniversaryBithDateHebAño" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
                <h5 id="userAniversaryBithDateHebAño" style={styles.input}>
                  {aniversary!.fechaHebreo?.año}
                </h5>
              </div>
            </div>
          </div>
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