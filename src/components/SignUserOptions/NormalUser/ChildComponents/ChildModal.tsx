import React, { useState } from 'react';
import Modal from 'react-modal';
import { colors } from '../../../../assets/colors';
import { HDate } from "@hebcal/core";
import { Ability, Son, VisitorUser } from '../../../../structs/structs';

Modal.setAppElement('#root');

interface ModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  user: VisitorUser
  setUser: (user: VisitorUser) => void;
  childSelected?: Son;
  setChildSelected: (user: Son) => void;
}

export const CreateChildModalComponent = ({modalIsOpen, setModalIsOpen, user, setUser, childSelected, setChildSelected}: ModalProps) => {

  const [formUserChildData, setFormUserChildData] = useState<Son>({
    nombre: childSelected?.nombre != null ? childSelected.nombre : "",
    nombreHebreo: childSelected?.nombreHebreo != null ? childSelected.nombreHebreo : "",
    apellido: user.apellido ? user.apellido : "",
    genero: childSelected?.genero != null ? childSelected.genero : "",
    fechaNacimiento: childSelected?.genero != null ? childSelected.fechaNacimiento : "",
    fechaNacimientoHebreo: childSelected?.fechaNacimientoHebreo != null ? childSelected.fechaNacimientoHebreo : "",
    fechaBarMitzva: childSelected?.fechaBarMitzva != null ? childSelected.fechaBarMitzva : "",
    fechaBarMitzvaHebreo: childSelected?.fechaBarMitzvaHebreo != null ? childSelected.fechaBarMitzvaHebreo : "",
    perashaBarMitzva: childSelected?.perashaBarMitzva != null ? childSelected.perashaBarMitzva : "",
    fechaBatMitzva: childSelected?.fechaBatMitzva != null ? childSelected.fechaBatMitzva : "",
    fechaBatMitzvaHebreo: childSelected?.fechaBatMitzvaHebreo != null ? childSelected.fechaBatMitzvaHebreo : "",
    habilidades: childSelected?.habilidades != null ? childSelected.habilidades : [],
  });

  const [genero, setGenero] = useState(formUserChildData.genero != null ? formUserChildData.genero : "");

  const habilidades: Ability[] = ["Leer Torah", "Jazan", "Leer Haftara", "Leer Meguila"];
  const [habilidad, setHabilidad] = useState<Ability[]>([])

  const closeModal = () => {
    setModalIsOpen(false);
    console.log("Form user child data", formUserChildData?.nombre);
    
    if (formUserChildData?.nombre != "") {
      const childIsAlreadySavedOnUserChildList = user.hijos?.some(son => son.nombre === childSelected?.nombre);
      childIsAlreadySavedOnUserChildList ? updateUserChildData() : addUserChildData()
      setChildSelected({})
    }
    console.log("Hijo agregado", formUserChildData);
  }

  const addUserChildData = () => {
    setUser({...user, hijos: [...(user.hijos || []), formUserChildData]})
  }

  const updateUserChildData = () => {
    const updatedUserChildData = user.hijos?.map(son => {
      if(son.nombre === childSelected?.nombre) {
        return formUserChildData
      }
      return son
    })
    setUser({...user, hijos: updatedUserChildData})
  }

  const handleChangeChildData = (e: any) => {
    setFormUserChildData({ ...formUserChildData, [e.target.name]: e.target.value }); 
  }

  const handleAddAbility = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Ability;
  
    setHabilidad((prevHabilidades) =>
      e.target.checked
        ? [...prevHabilidades, value] // Agregar si se selecciona
        : prevHabilidades.filter((h) => h !== value) // Quitar si se deselecciona
    );
  
    setFormUserChildData((prevData) => ({
      ...prevData,
      habilidades: e.target.checked
        ? [...(prevData.habilidades || []), value] // Agregar la habilidad al array
        : (prevData.habilidades || []).filter((h) => h !== value) // Quitar si se deselecciona
    }));
  };

  const calculateHebrewDateBtn = (referenceDateValue: string, nameOfThePropertyToChange: string, disabledCondition: boolean) => {
    return (
      <button 
        type="button" 
        style={{...styles.button, backgroundColor: disabledCondition == true ? 'gray' : "red", color: "white"}} 
        onClick={() => calculateHebrewDate(referenceDateValue, nameOfThePropertyToChange)} 
        disabled={disabledCondition}>
        Calcular fecha
      </button>
    )
  }

  const calculateHebrewDate = (date: string, parameterToSave: string) => {
    console.log("Date to calculate is:", date); // Devuelve "2001-10-18"

    // Extraer el año, mes y día manualmente
    const [year, month, day] = date.split("-").map(Number);

    // Crear la fecha sin que JavaScript la convierta automáticamente a UTC
    const gregorianDate = new Date(year, month - 1, day, 12); // Fuerza el mediodía local

    console.log("Gregorian date is:", gregorianDate); // Ahora debería ser el 18 de octubre correctamente

    const hebrewDate = new HDate(gregorianDate);
    console.log("Hebrew date is:", hebrewDate.toString());

    setFormUserChildData({ ...formUserChildData, [parameterToSave]: hebrewDate.toString() });
    setUser({ ...user, [parameterToSave]: hebrewDate.toString() });
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{ content: styles.container }}
        contentLabel="Example Modal"
      >
        <h2 style={{ textAlign: 'center'}}>Ingresa los datos de tu hijo/a</h2>
        <div>
          <label htmlFor="userChildNameEsp" style={{ display: "block"}}>Nombre Hijo Español</label>
          <input id="userChildNameEsp" type="text" name="nombre" placeholder="Nombre (Español)" onChange={handleChangeChildData} style={styles.input} value={formUserChildData.nombre}/>

          <label htmlFor="userChildNameHeb" style={{ display: "block"}}>Nombre Hijo Hebreo</label>
          <input id="userChildNameHeb" type="text" name="nombreHebreo" placeholder="Nombre (Hebreo)" onChange={handleChangeChildData} style={styles.input} value={formUserChildData.nombreHebreo}/>

          <label htmlFor="userChildSurname" style={{ display: "block"}}>Apellido</label>
          <input id="userChildSurname" type="text" name="apellido" placeholder={user.apellido != null ? user.apellido : "Apellido"} onChange={handleChangeChildData} style={styles.input} value={formUserChildData.apellido}/>

          <label htmlFor="userChildBithDate" style={{ display: "block"}}>Fecha Nacimiento</label>
          <input id="userChildBithDate" type="date" name="fechaNacimiento" placeholder="Fecha Nacimiento" onChange={handleChangeChildData} style={styles.input} value={formUserChildData.fechaNacimiento}/>

          <label htmlFor="userChildBithDateHeb" style={{ display: "block"}}>Fecha Nacimiento Hebreo</label>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <input id="userChildBithDateHeb" type="text" name="fechaNacimientoHebreo" placeholder="Fecha Nacimiento Hebreo" onChange={handleChangeChildData} style={styles.input} value={formUserChildData.fechaNacimientoHebreo}/>
            {calculateHebrewDateBtn(formUserChildData.fechaNacimiento!, "fechaNacimientoHebreo", formUserChildData.fechaNacimiento == "")}
          </div>

          <label htmlFor="userChildGender" style={{ display: "block" }}>Género</label>
          <select id="userChildGender" name="genero" onChange={(e) => { 
            handleChangeChildData(e);
            setGenero(e.target.value);
          }} style={styles.input}>
            <option value="" disabled selected>{formUserChildData.genero != null ? formUserChildData.genero : 'Selecciona el género'}</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>

          
          {genero === "Masculino" ? (
            <div>
              <label htmlFor="userChildBarMitzvaDateGreg" style={{ display: "block"}}>Fecha Bar Mitzva</label>
              <input id="userChildBarMitzvaDateGreg" type="date" name="fechaBarMitzva" placeholder="Fecha Bar Mitzva" onChange={handleChangeChildData} style={styles.input} value={formUserChildData.fechaBarMitzva}/>

              <label htmlFor="userChildBarMitzvaDateHeb" style={{ display: "block"}}>Fecha Bar Mitzva Hebreo</label>
              <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <input id="userChildBarMitzvaDateHeb" type="text" name="fechaBarMitzvaHebreo" placeholder="Fecha Bar Mitzva Hebreo" onChange={handleChangeChildData} style={styles.input} value={formUserChildData.fechaBarMitzvaHebreo}/>
                {calculateHebrewDateBtn(formUserChildData.fechaBarMitzva!, "fechaBarMitzvaHebreo", formUserChildData.fechaBarMitzva == "")}
              </div>

              <label htmlFor="userChildPerasha"style={{ display: "block"}}>Perasha Bar Mitzva</label>
              <input id="userChildPerasha" type="text" name="perashaBarMitzva" placeholder="Perasha Bar Mitzva" onChange={handleChangeChildData} style={styles.input} value={formUserChildData.perashaBarMitzva}/>

              <label htmlFor="userChildAbilities" style={{ display: "block" }}>Habilidades</label>
              <div style={styles.input}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {habilidades.map((role) => (
                    <label key={role}>
                      <input
                        type="checkbox"
                        value={role}
                        checked={habilidad.includes(role)}
                        onChange={handleAddAbility} // Evento corregido
                      />
                      {role}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ) : genero === "Femenino" && (
            <div>
              <label htmlFor="userChildBatMitzvaDateGreg" style={{ display: "block"}}>Fecha Bat Mitzva</label>
              <input id="userChildBatMitzvaDateGreg" type="date" name="fechaBatMitzva" placeholder="Fecha Bat Mitzva" onChange={handleChangeChildData} style={styles.input} value={formUserChildData.fechaBatMitzva}/>

              <label htmlFor="userChildBatMitzvaDateHeb" style={{ display: "block"}}>Fecha Bat Mitzva Hebreo</label>
              <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <input id="userChildBatMitzvaDateHeb" type="text" name="fechaBatMitzvaHebreo" placeholder="Fecha Bat Mitzva Hebreo" onChange={handleChangeChildData} style={styles.input} value={formUserChildData.fechaBarMitzvaHebreo}/>
                {calculateHebrewDateBtn(formUserChildData.fechaBatMitzva!, "fechaBatMitzvaHebreo", formUserChildData.fechaBatMitzva == "")}
              </div>
            
            </div>
          )}

          <button onClick={closeModal} style={{...styles.button, backgroundColor: formUserChildData.nombre == "" ? 'gray' : colors.btn_background}} disabled={formUserChildData.nombre == ""}>
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