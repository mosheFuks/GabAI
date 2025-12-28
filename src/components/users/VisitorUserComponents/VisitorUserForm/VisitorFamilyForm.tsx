import React, { useState } from 'react'
import { CSSProperties } from 'react';
import { Aniversary, Son} from '../../../../structs/structs';
import { colors } from '../../../../assets/colors';
import { ChildCard } from '../ChildComponents/ChildCard';
import { AniversaryCard } from '../AniversaryComponents/AniversaryCard';
import { UserChildModalComponent } from '../ChildComponents/ChildModal';
import { CreateAniversaryModalComponent } from '../AniversaryComponents/AniversaryModal';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { Pencil } from 'lucide-react';
import { changeUserVisitorData } from '../../../../apis/requests';

interface FormPersonalDataProps {
  logedVisitorUser: any
  setUserChangedSomeProperty: (value: boolean) => void;
}

export const VisitorFamilyForm = ({logedVisitorUser, setUserChangedSomeProperty}: FormPersonalDataProps) => {
    const [modalChildIsOpen, setChildModalIsOpen] = React.useState<boolean>(false);
    const [modalAniversaryIsOpen, setModalAniversaryIsOpen] = React.useState<boolean>(false);
    const [aniversarySelected, setAniversarySelected] = React.useState<Aniversary>();
    const [sonSelected, setSonSelected] = React.useState<Son>();
    const [isSonSelected, setIsSonSelected] = React.useState<boolean>(false);
    const [isAniversarySelected, setIsAniversarySelected] = React.useState<boolean>(false);

    const [editingField, setEditingField] = useState<string | null>(null);
    const [changingProperty, setChangingProperty] = useState(false);
    const [newValueToSave, setNewValueToSave] = useState<string | number>("");
    const changeVisitorUserPropeties = changeUserVisitorData()

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const statusList = ["Soltero", "Casado", "Divorciado", "Viudo"];

    const updateVisitorUser = async (keyToEdit: string, infoToEdit: string | number) => {
      try {
        await changeVisitorUserPropeties(logedVisitorUser?.nombreKehila, logedVisitorUser?.nombreEspanol, logedVisitorUser?.apellido, { name: keyToEdit, value: infoToEdit });
        toast.success("Se modificó la información correctamente", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored", 
          style: { backgroundColor: 'green', color: 'white' },
        });
        setUserChangedSomeProperty(true);
      } catch (error) {
        toast.error("Ocurrió un error al intentar cambiar el valor de las propiedadeas seleccionadas", {
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
        console.error("Error updating user:", error);
      }
      setChangingProperty(false);
    };
    
    const saveNewProperty = async (keyToEdit: string, oldValue: string | number) => {
      console.log("Old Value: ", oldValue, ", New Value: ", newValueToSave);
      
      if (newValueToSave === "" || newValueToSave === null || newValueToSave === undefined) {
        toast.error("El campo no puede estar vacío", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          style: { backgroundColor: "red", color: "white" }
        });
        return;
      }

      if (newValueToSave === oldValue) {
        toast.error("No se realizaron cambios en el valor", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          style: { backgroundColor: "red", color: "white" }
        });
        setEditingField(null);
        return;
      }

      setChangingProperty(true);
      await sleep(3000)
      updateVisitorUser(keyToEdit, newValueToSave);
      setNewValueToSave("");
      setEditingField(null);
  };

  const renderNormalEditableField = (infoToShow: string, key: string) => {
    return (
      <input
        id={key + "Edit"}
        type="text"
        defaultValue={infoToShow}
        style={{ ...styles.input, marginLeft: 10 }}
        autoFocus={true}
        onChange={(e) => {
          setNewValueToSave(e.target.value);
        }}
      />
    );
  }

  const renderStatusListToSelect = () => {
    return (
      <select
        id="status-select"
        style={styles.input}
        defaultValue=""
        onChange={(e) => {
          setNewValueToSave(e.target.value);
        }}
      >
        <option value="" disabled>
          Selecciona tu Estado Civil
        </option>
        {statusList.map((status: any, index: number) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    );
  }

  const showUserInfoData = (label: string, infoToShow: string, key: string, inputLabel: "DEFAULT" | "STATUS" = "DEFAULT") => {
    const isEditing = editingField === key;
    return (
      <>
        <label htmlFor={key} style={{ display: "block", fontWeight: 'bold' }}>{label}</label>
        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
          {isEditing ? (
            inputLabel === "STATUS" ? renderStatusListToSelect() : 
            renderNormalEditableField(infoToShow, key)
          ) : (
            <h5 id={key} style={styles.input}>{infoToShow}</h5>
          )}

          <button
            type="button"
            style={isEditing ? {...styles.icon, backgroundColor: colors.btn_background, fontSize: "1rem"} : styles.icon}
            onClick={() => isEditing ? saveNewProperty(key, infoToShow) : setEditingField(key)}
          >
            {isEditing ? changingProperty ? <ClipLoader color="white" loading={true} size={35} /> : <b>GUARDAR</b> : <Pencil size={20} color='red' />}
          </button>
        </div>
      </>
    );
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "10px", borderRadius: "5px", minHeight: 0 }}>
      <div>
          {showUserInfoData("Estado Civil", logedVisitorUser.estadoCivil, "estadoCivil", "STATUS")}

          {showUserInfoData("Nombre Esposa Español", logedVisitorUser.nombreEsposaEspanol, "nombreEsposaEspanol")}
          
          {showUserInfoData("Nombre Esposa Hebreo", logedVisitorUser.nombreEsposaHebreo, "nombreEsposaHebreo")}

          {logedVisitorUser.hijos.length > 0 ? (
            <div style={{width: '100%' }} >
              <label style={{ display: "block", fontWeight: 'bold', marginBottom: "10px"}}>Hijos</label>
              <div style={{display: "flex", flexDirection: "row"}}>
                <div style={{display: "flex", flexDirection: "row", gap: "30px", marginBottom: "10px"}}>
                  {logedVisitorUser.hijos.map((hijo: Son, index: React.Key | null | undefined) => (
                    <div>
                      <ChildCard 
                        son={hijo} 
                        key={index} 
                        setChildModalIsOpen={setChildModalIsOpen}
                        setSonSelected={setSonSelected}
                        setIsSonSelected={setIsSonSelected} />
                    </div>
                  ))}
                  <button 
                    style={{...styles.button, backgroundColor: "orange"}}
                    type="button"
                    onClick={() => setChildModalIsOpen(true)}>
                      Agregar Hijo
                  </button>
                </div>
              </div>
            </div>
          ) : (null)}
          
          {logedVisitorUser.aniversarios.length > 0 ? (
              <div style={{width: '100%' }} >
                <label style={{display: "block", fontWeight: 'bold', marginBottom: "10px"}}>Aniversarios</label>
                <div style={{display: "flex", flexDirection: "row"}}>
                  <div style={{display: "flex", flexDirection: "row", gap: "20px", marginBottom: "10px"}}>
                    {logedVisitorUser.aniversarios.map((aniversario: Aniversary, index: React.Key | null | undefined) => (
                      <AniversaryCard 
                        setModalAniversaryIsOpen={setModalAniversaryIsOpen}
                        key={index}
                        aniversario={aniversario} 
                        setAniversarySelected={setAniversarySelected}
                        setIsAniversarySelected={setIsAniversarySelected}
                      />
                    ))}
                    <button 
                      style={{...styles.button, backgroundColor: "orange"}}
                      type="button"
                      onClick={() => setModalAniversaryIsOpen(true)}>
                        Agregar Aniversario
                    </button>
                  </div>
                </div>
              </div>
          ) : (null)}

          {modalChildIsOpen ? 
            <UserChildModalComponent 
              modalChildIsOpen={modalChildIsOpen} 
              setChildModalIsOpen={setChildModalIsOpen} 
              son={sonSelected}
              setSonSelected={setSonSelected}
              isSonSelected={isSonSelected}
              setIsSonSelected={setIsSonSelected}
              setUserChangedSomeProperty={setUserChangedSomeProperty}
            />
            :
            null
          }
          {modalAniversaryIsOpen ? 
            <CreateAniversaryModalComponent 
              modalAniversaryIsOpen={modalAniversaryIsOpen} 
              setModalAniversaryIsOpen={setModalAniversaryIsOpen} 
              aniversary={aniversarySelected}
              setAniversarySelected={setAniversarySelected}
              isAniversarySelected={isAniversarySelected}
              setIsAniversarySelected={setIsAniversarySelected}
              setUserChangedSomeProperty={setUserChangedSomeProperty}
            />
            :
            null
          }
      </div>
    </div>
  )
}

const styles: { [key: string]: CSSProperties }= {
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
    backgroundColor: colors.btn_background,
    color: "white",
    padding: "10px 15px",
    margin: "10px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    border: "none",
    fontWeight: "bold",
  },
  icon: {
    marginRight: "10px", 
    //color: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main_background,
    borderRadius: 15,
    padding: 10,
    marginLeft: 10,
    cursor: 'pointer',
    border: 'none',
  } as CSSProperties,
};