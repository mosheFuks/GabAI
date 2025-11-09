import { CSSProperties, useContext } from 'react';
import Modal from 'react-modal';
import { colors } from '../../../../assets/colors'
import { deleteAllPerashiotInfo, deletePerashaInfo } from '../../../../apis/requests';
import { PageContext } from '../../../../StoreInfo/page-storage';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

interface DelAllPerashiotModalProps {
  action: "DEL_ALL" | "DEL_PERASHA";
  typeOfAliotToDelete?: "DONACION" | "ALIA";
  openDeleteModal: boolean;
  setOpenDeleteModal: (openDeleteModal: boolean) => void;
}

export const DelAllPereashiotInfoModal = ({action, typeOfAliotToDelete, openDeleteModal, setOpenDeleteModal}: DelAllPerashiotModalProps) => {
  const { logedUser } = useContext(PageContext) as any
  const { id } = useParams();
  const deleteAllPerashiot = deleteAllPerashiotInfo()
  const deletePerasha = deletePerashaInfo()

  const showSuccessToast = (message: string) => {
    toast.success(message, {
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
  };

  const deleteInfoOfThePerasha = async () => {
    try {
      if (action == "DEL_ALL") {
        deleteAllPerashiot(logedUser.kehila, typeOfAliotToDelete!)
        showSuccessToast("Se eliminaron las donaciones de todas las parashiot");
      } else {
        deletePerasha(logedUser.kehila, id!, typeOfAliotToDelete!)
        showSuccessToast("Se eliminó la información de todas las donaciones");
      }
    } catch (error) {
      console.error("Error deleting donations of the perasha:", error);
      toast.error("Error al eliminar las donaciones de la parashá.");
    }
  };

  const closeModal = async (deleteInfo: boolean) => {
    if (deleteInfo) {
      if (typeOfAliotToDelete == "DONACION") {
        await deleteInfoOfThePerasha();
      }
    }
    setOpenDeleteModal(false)
  }
  
  return (
    <div>
      <Modal
        isOpen={openDeleteModal}
        onRequestClose={() => setOpenDeleteModal(false)}
        style={{
          content: styles.container,
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
            zIndex: 9998 // Asegura que esté detrás del modal pero encima del resto
          }
        }}
        contentLabel="Delete Perashiot Info Modal"
      >
        <h2 style={{ textAlign: 'center', color: 'blue'}}>{action == "DEL_ALL" ? 
          "¿Queres eliminar la información de las Aliot y sus donaciones de todas las perashiot?" : 
          "¿Queres eliminar la información de las donaciones de esta perasha?" }
        </h2>
        <div style={{ display: 'flex', flexDirection: 'row'}}>
          <button onClick={() => closeModal(true)} style={{...styles.button, backgroundColor: 'green'}}>
            Si
          </button>

          <button onClick={() => closeModal(false)} style={{...styles.button, backgroundColor: 'red'}}>
            No
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
    height: "30%",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflowX: "hidden"
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
    fontWeight: 'bold'
  } as CSSProperties
};