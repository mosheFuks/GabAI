import { CSSProperties, useState } from 'react';
import { colors } from '../../../../assets/colors';
import { Ability, VisitorUser } from '../../../../structs/structs';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { Pencil } from 'lucide-react';
import { changeUserVisitorData } from '../../../../apis/requests';

interface FormPersonalDataProps {
  logedVisitorUser: VisitorUser
  setUserChangedSomeProperty: (value: boolean) => void;
}

export const VisitorKehilaForm = ({logedVisitorUser, setUserChangedSomeProperty}: FormPersonalDataProps) => {
  const habilidades: Ability[] = ["Leer Torah", "Jazan", "Leer Haftara", "Leer Meguila"]; 
  
  const changeVisitorUserPropeties = changeUserVisitorData()
  
  const [editingField, setEditingField] = useState<string | null>(null);
  const [changingProperty, setChangingProperty] = useState(false);
  const [newValueToSave, setNewValueToSave] = useState<string | number>("");  
  const [habilidad, setHabilidad] = useState<Ability[]>([]) 

  const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
               
  const updateVisitorUser = async (keyToEdit: string, infoToEdit: string | number) => {
    try {
      await changeVisitorUserPropeties(logedVisitorUser?.nombreKehila!, logedVisitorUser?.nombreEspanol!, logedVisitorUser?.apellido!, { name: keyToEdit, value: infoToEdit });
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
    await updateVisitorUser(keyToEdit, newValueToSave);
    updateVisitorUser(keyToEdit, newValueToSave);
    setNewValueToSave("");
    setEditingField(null);
  };

  
  const showBarMitzvaInfoData = (label: string, dayInfo: any, dayKey: string, monthInfo: any, monthKey: string, yearInfo: any, yearKey: string) => {
    return (
      <>
        <label htmlFor="userBarMitzvaDateHeb" style={{ display: "block", fontWeight: 'bold'}}>{label}</label>
        <div style={{ display: "flex", flexDirection: "row"}}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor={dayKey} style={{ display: "block", fontWeight: 'bold', marginRight: 10}}>Día</label>
            <h5 id={dayKey} style={styles.input}>
              {dayInfo}
            </h5>
          </div> 
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor={monthKey} style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Mes</label>
            <h5 id={monthKey} style={styles.input}>
              {monthInfo}
            </h5>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor={yearKey} style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Año</label>
            <h5 id={yearKey} style={styles.input}>
              {yearInfo}
            </h5>
          </div>
        </div> 
      </>
    )
  }

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

  const renderHabilitiesListToSelect = () => {
    return (
      <div style={styles.input}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {habilidades.map((role: string) => (
            <label key={role}>
              <input
                type="checkbox"
                value={role}
                checked={habilidad.includes(role as Ability)}
                onChange={() => {
                  setHabilidad((prev) => {
                    if (prev.includes(role as Ability)) {
                      return prev.filter((r) => r !== role);
                    } else {
                      return [...prev, role as Ability];
                    }
                  });
                }}
              />
              {role}
            </label>
          ))}
        </div>
      </div>
    );
  }

  const showUserInfoData = (label: string, infoToShow: string, key: string, inputLabel: "HABILIDAD" | "DEFAULT"  = "DEFAULT") => {
    const isEditing = editingField === key;
    return (
      <>
        <label htmlFor={key} style={{ display: "block", fontWeight: 'bold' }}>{label}</label>
        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
          {isEditing ? (
            inputLabel === "HABILIDAD" ? renderHabilitiesListToSelect() : 
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
        {/*<label htmlFor="userBarMitzvaDateHeb" style={{ display: "block", fontWeight: 'bold'}}>Fecha Bar Mitzva Hebreo</label>
        <div style={{ display: "flex", flexDirection: "row"}}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor="userBarMitzvaDateHebDia" style={{ display: "block", fontWeight: 'bold', marginRight: 10}}>Día</label>
            <h5 id="userBarMitzvaDateHebDia" style={styles.input}>
              {logedVisitorUser.fechaNacimientoHebreo?.dia}
            </h5>
          </div> 
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor="userBarMitzvaDateHebMes" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Mes</label>
            <h5 id="userBarMitzvaDateHebMes" style={styles.input}>
              {logedVisitorUser.fechaNacimientoHebreo?.mes}
            </h5>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor="userBarMitzvaDateHebAno" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Año</label>
            <h5 id="userBarMitzvaDateHebAno" style={styles.input}>
              {logedVisitorUser.fechaNacimientoHebreo?.ano}
            </h5>
          </div>
        </div>*/}
        {showBarMitzvaInfoData("Fecha Bar Mitzva Hebreo", logedVisitorUser.fechaBarMitzvaHebreo!.dia!, "userBarMitzvaDateHebDia", logedVisitorUser.fechaBarMitzvaHebreo!.mes!, "userBarMitzvaDateHebMes", logedVisitorUser.fechaBarMitzvaHebreo!.ano!, "userBarMitzvaDateHebAno")}

        {/*<label htmlFor="userBarMitzvaDateGreg" style={{ display: "block", fontWeight: 'bold'}}>Fecha Bar Mitzva Gregoriano</label>
        <div style={{ display: "flex", flexDirection: "row"}}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor="userBarMitzvaDateGregDia" style={{ display: "block", fontWeight: 'bold', marginRight: 10}}>Día</label>
            <h5 id="userBarMitzvaDateGregDia" style={styles.input}>
              {logedVisitorUser.fechaBarMitzvaGregoriano?.dia}
            </h5>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor="userBarMitzvaDateGregMes" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Mes</label>
            <h5 id="userBarMitzvaDateGregMes" style={styles.input}>
              {logedVisitorUser.fechaBarMitzvaGregoriano?.mes}
            </h5>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <label htmlFor="userBarMitzvaDateGregAno" style={{ display: "block", fontWeight: 'bold', marginRight: 10, marginLeft: 10}}>Año</label>
            <h5 id="userBarMitzvaDateGregAno" style={styles.input}>
              {logedVisitorUser.fechaBarMitzvaGregoriano?.ano}
            </h5>
          </div>
        </div>*/}
        {showBarMitzvaInfoData("Fecha Bar Mitzva Gregoriano", logedVisitorUser.fechaBarMitzvaGregoriano!.dia!, "userBarMitzvaDateGregDia", logedVisitorUser.fechaBarMitzvaGregoriano!.mes!, "userBarMitzvaDateGregMes", logedVisitorUser.fechaBarMitzvaGregoriano!.ano!, "userBarMitzvaDateGregAno")}

        {showUserInfoData("Perasha Bar Mitzva", logedVisitorUser.perashaBarMitzva!, "perashaBarMitzva")}
        
        {logedVisitorUser.habilidades!.length > 0 ? (
          <>
            <label htmlFor="userAbilities" style={{ display: "block", fontWeight: 'bold' }}>Conocimientos</label>
            {logedVisitorUser.habilidades!.map((role: any) => (
              <h5 style={styles.input} key={role}>
                {role}
              </h5>
            ))}
          </>
        ) : (
          null
        )}

        {showUserInfoData("Nombre Madre Español", logedVisitorUser.nombreMadreEspanol!, "nombreMadreEspanol")}
        
        {showUserInfoData("Nombre Madre Hebreo", logedVisitorUser.nombreMadreHebreo!, "nombreMadreHebreo")}
        
        {showUserInfoData("Nombre Padre Español", logedVisitorUser.nombrePadreEspanol!, "nombrePadreEspanol")}
        
        {showUserInfoData("Nombre Padre Hebreo", logedVisitorUser.nombrePadreHebreo!, "nombrePadreHebreo")}
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