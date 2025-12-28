import { CSSProperties, useEffect, useState } from 'react';
import { colors } from '../../../../assets/colors';
import { Pencil } from 'lucide-react';
import { ClipLoader } from "react-spinners";

import { changeUserVisitorData, getMinianimList } from '../../../../apis/requests';
import { useConvex } from 'convex/react';
import { toast } from 'react-toastify';

interface VisitorPersonalDataProps {
  logedVisitorUser: any
  setUserChangedSomeProperty: (value: boolean) => void;
}

export const VisitorPersonalForm = ({ logedVisitorUser, setUserChangedSomeProperty }: VisitorPersonalDataProps) => {
  const groupList = ["Cohen", "Levi", "Israel"];
  
  const convex = useConvex();

  const [editingField, setEditingField] = useState<string | null>(null);
  const [minianimList, setMinianimList] = useState<any[]>([]);
  const [changingProperty, setChangingProperty] = useState(false);
  const [newValueToSave, setNewValueToSave] = useState<string | number>("");
  
  const changeVisitorUserPropeties = changeUserVisitorData()

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const getMinianimFromTheList = async () => {
    if (!logedVisitorUser.nombreKehila) {
      return;
    }

    try {
      const minianimListFromLogedUserKehila = await getMinianimList(convex, logedVisitorUser.nombreKehila);
      setMinianimList(minianimListFromLogedUserKehila!);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

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

  useEffect(() => {
    getMinianimFromTheList();
  }, [logedVisitorUser.nombreKehila])

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

  const renderMinianinimListToSelect = () => {
    return (
      <select
        id="minian-select"
        style={styles.input}
        defaultValue=""
        onChange={(e) => {
          setNewValueToSave(e.target.value);
        }}
      >
        <option value="" disabled>
          Elegí un Minian
        </option>
        {minianimList.map((minian: any, index: number) => (
          <option key={index} value={minian.value}>
            {minian}
          </option>
        ))}
      </select>
    );
  }

  const renderGroupListToSelect = () => {
    return (
      <select
        id="group-select"
        style={styles.input}
        defaultValue=""
        onChange={(e) => {
          setNewValueToSave(e.target.value);
        }}
      >
        <option value="" disabled>
          Selecciona tu Grupo Halájico
        </option>
        {groupList.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
    );
  }

  const showUserInfoDates = (label: string, key:string, dayInfo: string, dayKey: string, monthInfo: string, monthKey: string, yearInfo: string, yearKey: string) => {
    return (
      <>
      <label htmlFor={key} style={{ display: "block", fontWeight: 'bold'}}>{label}</label>
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
  
  const showUserInfoData = (label: string, infoToShow: string, key: string, inputLabel: "MINIAN" | "DEFAULT" | "STATUS" = "DEFAULT", canEditProperty: boolean = true) => {
    const isEditing = editingField === key;
    return (
      <>
        <label htmlFor={key} style={{ display: "block", fontWeight: 'bold' }}>{label}</label>
        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
          {isEditing ? (
            inputLabel === "MINIAN" ? renderMinianinimListToSelect() : 
            inputLabel === "STATUS" ? renderGroupListToSelect() : 
            renderNormalEditableField(infoToShow, key)
          ) : (
            <h5 id={key} style={styles.input}>{infoToShow}</h5>
          )}

          { canEditProperty && (
            <button
              type="button"
              style={isEditing ? {...styles.icon, backgroundColor: colors.btn_background, fontSize: "1rem"} : styles.icon}
              onClick={() => isEditing ? saveNewProperty(key, infoToShow) : setEditingField(key)}
            >
              {isEditing ? changingProperty ? <ClipLoader color="white" loading={true} size={35} /> : <b>GUARDAR</b> : <Pencil size={20} color='red' />}
            </button>
          ) }
        </div>
      </>
    );
  };

  


  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "10px", borderRadius: "5px", minHeight: 0 }}>
      <div>
        {showUserInfoData("Nombre Kehila", logedVisitorUser.nombreKehila, "nombreKehila", "DEFAULT", false)}
        
        {showUserInfoData("Minian", logedVisitorUser.minian, "minian", "MINIAN")}

        {showUserInfoData("Apellido", logedVisitorUser.apellido, "apellido", "DEFAULT")}
          
        {showUserInfoData("Nombre Español", logedVisitorUser.nombreEspanol, "nombreEspanol", "DEFAULT")}
        
        {showUserInfoData("Nombre Hebreo", logedVisitorUser.nombreHebreo, "nombreHebreo", "DEFAULT")}

        {showUserInfoDates("Fecha Nacimiento Gregoriano", "fechaNacimientoGregoriano", logedVisitorUser.fechaNacimientoGregoriano?.dia, "userFechaNacGregDia", logedVisitorUser.fechaNacimientoGregoriano?.mes, "userFechaNacGregMes", logedVisitorUser.fechaNacimientoGregoriano?.ano, "userFechaNacGregAno")}
        
        {showUserInfoDates("Fecha Nacimiento Hebreo", "fechaNacimientoHebreo", logedVisitorUser.fechaNacimientoHebreo?.dia, "userFechaNacHebDia", logedVisitorUser.fechaNacimientoHebreo?.mes, "userFechaNacHebMes", logedVisitorUser.fechaNacimientoHebreo?.ano, "userFechaNacHebAno")}
        
        {showUserInfoData("Email Comercial", logedVisitorUser.emailComercial, "emailComercial", "DEFAULT") }
        
        {showUserInfoData("Teléfono", logedVisitorUser.telefono, "telefono") }
        
        {showUserInfoData("Dirección", logedVisitorUser.direccion, "direccion") }
        
        {showUserInfoData("Numero Socio", logedVisitorUser.numeroSocio, "numeroSocio") }

        {showUserInfoData("Estatus Halájico", logedVisitorUser.grupo, "grupo", "STATUS") }
      </div>
    </div>
  )
}

const styles: { [key: string]: CSSProperties }= {
  container: {
    backgroundColor: colors.main_background,
    padding: "10px",
    borderRadius: "25px",
    width: "80%",
    minHeight: "75vh",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "20px auto 0 auto",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  sectionTitle: {
    cursor: "pointer", 
    alignSelf: "center",
    textAlign: 'center', 
    marginRight: 20
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
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
    backgroundColor: colors.btn_background,
    color: "white",
    padding: "10px 15px",
    margin: "10px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    border: "none",
  },
  calculateDateBtnContainer: { 
    display: "flex",
    flexDirection: "row",
    gap: "10px"
  },
  childCardContainer: {
    display: "flex", 
    flexDirection: "row", 
    gap: "10px", 
    marginTop: "10px", 
    flexWrap: "wrap"
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