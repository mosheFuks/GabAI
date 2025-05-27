import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { colors } from '../../../../assets/colors'
import { Alia, Donacion } from '../../../../structs/structs';
import { addADonationToUser, addAnAliaInAPerasha } from '../../../../apis/requests';
import { PageContext } from '../../../../StoreInfo/page-storage';

Modal.setAppElement('#root');

interface AliaModalProps {
  openAliaModal: boolean;
  setOpenAliaModal: (openAliaModal: boolean) => void;
  setAliotList: (aliotList: Alia[]) => void;
  aliotList: Alia[];
  perashaName: string;
  formAliaData: Alia;
  setFormAliaData: (formAliaData: Alia) => void;
}

export const AliaModal = ({setOpenAliaModal, openAliaModal, setAliotList, aliotList, perashaName, formAliaData, setFormAliaData}: AliaModalProps) => {
  const {logedUser, logedVisitorUser} = useContext(PageContext) as any;
  const [agregarDonacion, setAgregarDonacion] = useState<boolean>(false);
  
  const addAlia = addAnAliaInAPerasha();
  const addDonation = addADonationToUser(); 

  const closeModal = async () => {
    if (formAliaData.moneda !== "") {
      await addAlia(logedUser.kehila, perashaName, formAliaData);
      setAliotList([...aliotList, formAliaData]);
      if (agregarDonacion) {
        const newDonation: Donacion = {
          monto: formAliaData.monto,
          tipoMoneda: formAliaData.moneda,
          motivo: `Alia`,
          fecha: {
            dia: new Date().getDate().toString(),
            mes: (new Date().getMonth() + 1).toString(), // Meses en JavaScript son 0-indexados
            ano: new Date().getFullYear().toString()
          },
          perasha: perashaName,
          aclaracion: `Alia ${formAliaData.alia} en ${perashaName}`,
          status: "PENDIENTE"
        };
        await addDonation(logedUser.kehila, formAliaData.nombre, formAliaData.apellido!, newDonation);
      }
    }
  }
  
  return (
    <div>
      <Modal
        isOpen={openAliaModal}
        onRequestClose={() => setOpenAliaModal(false)}
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

          <label htmlFor="aliaApellido" style={{ display: "block"}}>Apellido</label>
          <input
            type="text"
            id="aliaApellido"
            value={formAliaData.apellido}
            onChange={(e) => setFormAliaData({ ...formAliaData, apellido: e.target.value })}
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

          <div style={styles.switchContainer}>
            <label style={{ display: "block"}}>
              ¿Querés agregar esta donación a la lista de donaciones de {formAliaData.nombre}?
            </label>
            <input
              type="checkbox"
              checked={agregarDonacion}
              onChange={(e) => setAgregarDonacion(e.target.checked)}
              style={styles.switch}
            />
          </div>

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