import React, { useState } from 'react';
import Modal from 'react-modal';
import { colors } from '../../../../assets/colors'


Modal.setAppElement('#root');

interface Alia {
  alia: string,
  nombre: string,
  nombreHebreo: string,
  monto: number,
  moneda: string
}

interface AliaModalProps {
  openAliaModal: boolean;
  setOpenAliaModal: (openAliaModal: boolean) => void;
  setAliotList: (aliotList: Alia[]) => void;
  aliotList: Alia[];
}

export const AliaModal = ({setOpenAliaModal, openAliaModal, setAliotList, aliotList}: AliaModalProps) => {

  const [formAliaData, setFormAliaData] = useState<Alia>({
    alia: "",
    nombre: "",
    nombreHebreo: "",
    monto: 0,
    moneda: ""
  });

  const closeModal = () => {
    setOpenAliaModal(false);
    formAliaData.moneda != "" && setAliotList([...aliotList, formAliaData]);
  }
  
  return (
    <div>
      <Modal
        isOpen={openAliaModal}
        onRequestClose={closeModal}
        style={{ content: styles.container }}
        contentLabel="Example Modal"
      >
        <h2 style={{ textAlign: 'center', color: 'blue'}}>Nueva Alia</h2>
        <div>
          <label htmlFor="aliaAlia" style={{ display: "block"}}>Alia</label>
          <input
            type="text"
            id="aliaAlia"
            value={formAliaData.alia}
            onChange={(e) => setFormAliaData({ ...formAliaData, alia: e.target.value })}
            style={styles.input}
          />

          <label htmlFor="aliaNombre" style={{ display: "block"}}>Nombre</label>
          <input
            type="text"
            id="aliaNombre"
            value={formAliaData.nombre}
            onChange={(e) => setFormAliaData({ ...formAliaData, nombre: e.target.value })}
            style={styles.input}
          />

          <label htmlFor="aliaNombreHebreo" style={{ display: "block"}}>Nombre Hebreo</label>
          <input
            type="text"
            id="aliaNombreHebreo"
            value={formAliaData.nombreHebreo}
            onChange={(e) => setFormAliaData({ ...formAliaData, nombreHebreo: e.target.value })}
            style={styles.input}
          />
          
          <label htmlFor="aliaMonto" style={{ display: "block"}}>Monto</label>
          <input
            type="number"
            id="aliaMonto"
            value={formAliaData.monto}
            onChange={(e) => setFormAliaData({ ...formAliaData, monto: parseInt(e.target.value) })}
            style={styles.input}
          />

          <label htmlFor="aliaMoneda" style={{ display: "block"}}>Moneda</label>
          <select
            id="aliaMoneda"
            value={formAliaData.moneda}
            onChange={(e) => setFormAliaData({ ...formAliaData, moneda: e.target.value })}
            style={styles.input}
          >
            <option value="">Seleccione una opción</option>
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
          </select>

          <button onClick={closeModal} style={{...styles.button, backgroundColor: formAliaData.moneda == "" ? 'gray' : colors.btn_background}} disabled={formAliaData.moneda == ""}>
            Guardar
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
};