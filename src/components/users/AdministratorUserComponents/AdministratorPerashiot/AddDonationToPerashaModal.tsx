import { CSSProperties, useContext, useState } from 'react';
import Modal from 'react-modal';
import { colors } from '../../../../assets/colors'
import { Alia, Donacion } from '../../../../structs/structs';
import { addADonationToUser, addADonationInAPerasha } from '../../../../apis/requests';
import { PageContext } from '../../../../StoreInfo/page-storage';
import { toast } from 'react-toastify';

interface AliaModalProps {
  openAliaModal: boolean;
  setOpenAliaModal: (openAliaModal: boolean) => void;
  setAliotList: (aliotList: Alia[]) => void;
  aliotList: Alia[];
  perashaName: string;
}

export const AddDonationToPerashaModal = ({setOpenAliaModal, openAliaModal, setAliotList, aliotList, perashaName}: AliaModalProps) => {
  const {logedUser} = useContext(PageContext) as any;
  const [addDonationToUser, setAddDonationToUser] = useState<boolean>(false);
  const [formAliaData, setFormAliaData] = useState<Alia>({
    alia: "",
    nombre: "",
    nombreHebreo: "",
    apellido: "",
    monto: 0,
    moneda: "",
    tipoAlia: "DONACION"
  });
  
  const addAlia = addADonationInAPerasha();
  const addDonation = addADonationToUser(); 

  const campoIncompleto = Object.entries(formAliaData)
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

  const closeModal = async () => {
    let errorAddingDonationToUser = false
    if (isFormComplete) {
      if (addDonationToUser) {
        try {
          const newDonation: Donacion = {
            monto: formAliaData.monto,
            tipoMoneda: formAliaData.moneda,
            motivo: "Alia",
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
          toast.success(`Donacion agregada al Mitpalel ${formAliaData.nombre} ${formAliaData.apellido}.`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored", 
            style: { backgroundColor: 'green', color: 'white' },
          })
        } catch (error) {
          toast.error(`No se econtro al Mitpalel ${formAliaData.nombre} ${formAliaData.apellido} en la lista de Mitpalelim.`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored", 
            style: { backgroundColor: 'red', color: 'white' },
          })
          errorAddingDonationToUser = true
        }
      }
      if (errorAddingDonationToUser == false) {
        await addAlia(logedUser.kehila, perashaName, formAliaData);
        setAliotList([...aliotList, formAliaData]);
      }
    }
    setOpenAliaModal(false)
  }
  
  return (
    <div>
      <Modal
        isOpen={openAliaModal}
        onRequestClose={() => setOpenAliaModal(false)}
        style={{
          content: styles.container,
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
            zIndex: 9998 // Asegura que esté detrás del modal pero encima del resto
          }
        }}
        contentLabel="Alia Modal"
      >
        <h2 style={{ textAlign: 'center', color: 'blue'}}>Nueva Donación</h2>
        <div>
          <label htmlFor="aliaAlia" style={{ display: "block", fontWeight: 'bold'}}>Alia</label>
          <input
            type="text"
            id="aliaAlia"
            value={formAliaData.alia}
            onChange={(e) => setFormAliaData({ ...formAliaData, alia: e.target.value })}
            style={styles.input}
          />

          <label htmlFor="aliaNombre" style={{ display: "block", fontWeight: 'bold'}}>Nombre</label>
          <input
            type="text"
            id="aliaNombre"
            value={formAliaData.nombre}
            onChange={(e) => setFormAliaData({ ...formAliaData, nombre: e.target.value })}
            style={styles.input}
          />

          <label htmlFor="aliaApellido" style={{ display: "block", fontWeight: 'bold'}}>Apellido</label>
          <input
            type="text"
            id="aliaApellido"
            value={formAliaData.apellido}
            onChange={(e) => setFormAliaData({ ...formAliaData, apellido: e.target.value })}
            style={styles.input}
          />

          {formAliaData.nombre.length >= 2 && formAliaData.apellido!.length >= 2 && (
            <div style={styles.switchContainer}>
              <label style={{ display: "block", fontWeight: 'bold'}}>
                ¿Querés agregar esta donación a la lista de donaciones de {formAliaData.nombre} {formAliaData.apellido}?
              </label>
              <input
                type="checkbox"
                checked={addDonationToUser}
                onChange={(e) => setAddDonationToUser(e.target.checked)}
                style={styles.switch}
              />
            </div>
          )}

          <label htmlFor="aliaNombreHebreo" style={{ display: "block", fontWeight: 'bold'}}>Nombre Hebreo</label>
          <input
            type="text"
            id="aliaNombreHebreo"
            value={formAliaData.nombreHebreo}
            onChange={(e) => setFormAliaData({ ...formAliaData, nombreHebreo: e.target.value })}
            style={styles.input}
          />
          
          <label htmlFor="aliaMonto" style={{ display: "block", fontWeight: 'bold'}}>Monto</label>
          <input
            type="number"
            id="aliaMonto"
            value={formAliaData.monto}
            onChange={(e) => setFormAliaData({ ...formAliaData, monto: parseInt(e.target.value) })}
            style={styles.input}
          />

          <label htmlFor="aliaMoneda" style={{ display: "block", fontWeight: 'bold'}}>Moneda</label>
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
    overflowX: "hidden",
    zIndex: 9999
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
    display: "block", fontWeight: 'bold',
    color: "white",
    padding: "10px 15px",
    margin: "10px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    border: "none",
  } as CSSProperties,
  switchContainer: {
    display: "flex",
    //justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",
    border: "1px solid orange",
    borderRadius: "10px",
    padding: "10px",
  } as CSSProperties,
  switch: {
    width: "25px",
    height: "25px",
    accentColor: colors.btn_background, // o el azul de tu estilo
    cursor: "pointer",
  } as CSSProperties,
};