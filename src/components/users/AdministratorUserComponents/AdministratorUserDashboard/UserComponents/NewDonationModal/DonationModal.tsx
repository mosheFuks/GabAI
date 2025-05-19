import React, { useState } from 'react';
import Modal from 'react-modal';
import { Donacion } from '../../../../../../structs/structs';
import { colors } from '../../../../../../assets/colors';


Modal.setAppElement('#root');

interface DonationModalProps {
  modalAniversaryIsOpen: boolean;
  setModalAniversaryIsOpen: (modalAniversaryIsOpen: boolean) => void;
  setCompleteDonationsList: (donation: any) => void;
}

export const DonationModal = ({modalAniversaryIsOpen, setModalAniversaryIsOpen, setCompleteDonationsList}: DonationModalProps) => {

  const [formUserDonationData, setFormUserDonationData] = useState<Donacion>({
    monto: 0,
    tipoMoneda: undefined,
    motivo: "",
    fecha: {  dia: 0, mes: 0, año: 0 },
    perasha: "",
    aclaracion: "",
    status: undefined,
  });

  const closeModal = () => {
    setModalAniversaryIsOpen(false);
    formUserDonationData.monto != 0 && setCompleteDonationsList((prev: Donacion[]) => [...prev, formUserDonationData]);
  }
  
  return (
    <div>
      <Modal
        isOpen={modalAniversaryIsOpen}
        onRequestClose={closeModal}
        style={{ content: styles.container }}
        contentLabel="Example Modal"
      >
        <h2 style={{ textAlign: 'center', color: 'blue'}}>Nueva Donación</h2>
        <div>
          <label htmlFor="userDonationMonto" style={{ display: "block"}}>Monto</label>
          <input
            type="number"
            id="userDonationMonto"
            value={formUserDonationData.monto}
            onChange={(e) => setFormUserDonationData({ ...formUserDonationData, monto: parseFloat(e.target.value) })}
            style={styles.input}
          />

          <label htmlFor="userDonationTipoMoneda" style={{ display: "block"}}>Tipo de Moneda</label>
          <select
            id="userDonationTipoMoneda"
            value={formUserDonationData.tipoMoneda}
            onChange={(e) => setFormUserDonationData({ ...formUserDonationData, tipoMoneda: e.target.value })}
            style={styles.input}
          >
            <option value="">Seleccione una opción</option>
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
          </select>

          <label htmlFor="userDonationMotivo" style={{ display: "block"}}>Motivo</label>
          <input
            type="text"
            id="userDonationMotivo"
            value={formUserDonationData.motivo}
            onChange={(e) => setFormUserDonationData({ ...formUserDonationData, motivo: e.target.value })}
            style={styles.input}
          />

          <label htmlFor="userDonationAclaracion" style={{ display: "block"}}>Aclaración</label>
          <input
            type="text"
            id="userDonationAclaracion"
            value={formUserDonationData.aclaracion}
            onChange={(e) => setFormUserDonationData({ ...formUserDonationData, aclaracion: e.target.value })}
            style={styles.input}
          />
          
          <label htmlFor="userDonationPerasha" style={{ display: "block"}}>Perasha</label>
          <input
            type="text"
            id="userDonationPerasha"
            value={formUserDonationData.perasha}
            onChange={(e) => setFormUserDonationData({ ...formUserDonationData, perasha: e.target.value })}
            style={styles.input}
          />

          <label htmlFor="userDonationFecha" style={{ display: "block"}}>Fecha</label>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "row"}}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userDonationFechaDia" style={{ display: "block", marginRight: 10}}>Día</label>
                <input
                  type="number"
                  id="userDonationFechaDia"
                  value={formUserDonationData.fecha?.dia}
                  onChange={(e) => setFormUserDonationData({ ...formUserDonationData, fecha: { ...formUserDonationData.fecha, dia: e.target.value } })}
                  style={styles.input}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userDonationFechaMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Mes</label>
                <input
                  type="number"
                  id="userDonationFechaMes"
                  value={formUserDonationData.fecha?.mes}
                  onChange={(e) => setFormUserDonationData({ ...formUserDonationData, fecha: { ...formUserDonationData.fecha, mes: e.target.value } })}
                  style={styles.input}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <label htmlFor="userDonationFechaAño" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
                <input
                  type="number"
                  id="userDonationFechaAño"
                  value={formUserDonationData.fecha?.año}
                  onChange={(e) => setFormUserDonationData({ ...formUserDonationData, fecha: { ...formUserDonationData.fecha, año: e.target.value } })}
                  style={styles.input}
                />
              </div>
            </div>
          </div>
          
          <label htmlFor="userDonationStatus" style={{ display: "block"}}>Status</label>
          <select
            id="userDonationStatus"
            value={formUserDonationData.status}
            onChange={(e) => setFormUserDonationData({ ...formUserDonationData, status: e.target.value })}
            style={styles.input}
          >
            <option value="">Seleccione una opción</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="PAGADA">Pagada</option>
          </select>

          <button onClick={closeModal} style={{...styles.button, backgroundColor: formUserDonationData.motivo == "" ? 'gray' : colors.btn_background}} disabled={formUserDonationData.motivo == ""}>
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