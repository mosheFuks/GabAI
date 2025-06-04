import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { colors } from '../../../../assets/colors';
import { Ability, HEBREW_MONTHS } from '../../../../structs/structs';
import { PageContext } from '../../../../StoreInfo/page-storage';
import { changeUserVisitorData, getMinianimList } from '../../../../apis/requests';
import { useConvex } from 'convex/react';

Modal.setAppElement('#root');

interface EditPropertyModalProps {
  setOpenEditPropertyModal: (open: boolean) => void;
  openEditPropertyModal: boolean;
}

const UserProperties = [
  {name: "Nombre Hebreo", value: "nombreHebreo", normalName: "Nombre Hebreo"},
  //{name: "Fecha Nacimiento (Gregoriano)", value: "fechaNacimientoGregoriano"},
  //{name: "Fecha Nacimiento (Hebreo)", value: "fechaNacimientoHebreo"},
  {name: "Email Comercial", value: "emailComercial", normalName: "Email Comercial"},
  {name: "Telefono", value: "telefono", normalName: "Telefono"},
  {name: "Direccion", value: "direccion", normalName: "Direccion"},
  {name: "Minian", value: "minian", normalName: "Minian"},
  {name: "Numero Socio", value: "numeroSocio", normalName: "Numero Socio"},
  {name: "Grupo", value: "grupo", normalName: "Grupo"},
  //{name: "Fecha Bar Mitzva (Gregoriano)", value: "fechaBarMitzvaGregoriano"},
  //{name: "Fecha Bar Mitzva (Hebreo)", value: "fechaBarMitzvaHebreo"},
  {name: "Perasha Bar Mitzva", value: "perashaBarMitzva", normalName: "Perasha Bar Mitzva"},
  {name: "Nombre Madre (Español)", value: "nombreMadreEspanol", normalName: "Nombre Madre (Español)"},
  {name: "Nombre Madre (Hebreo)", value: "nombreMadreHebreo", normalName: "Nombre Madre (Hebreo)"},
  {name: "Nombre Padre (Español)", value: "nombrePadreEspanol", normalName: "Nombre Padre (Español)"},
  {name: "Nombre Padre (Hebreo)", value: "nombrePadreHebreo", normalName: "Nombre Padre (Hebreo)"},
  {name: "Estado Civil", value: "estadoCivil", normalName: "Estado Civil"},
  {name: "Nombre Esposa (Español)", value: "nombreEsposaEspanol", normalName: "Nombre Esposa (Español)"},
  {name: "Nombre Esposa (Hebreo)", value: "nombreEsposaHebreo", normalName: "Nombre Esposa (Hebreo)"},
  {name: "Conocimientos", value: "habilidades", normalName: "Conocimientos"},
]

interface EditedPropertyTypes{
  name: string;
  normalName: string; 
  value: string;
}

export const EditPropertyModal = ({setOpenEditPropertyModal, openEditPropertyModal}: EditPropertyModalProps) => {
  const { logedVisitorUser } = useContext(PageContext) as any;
  const convex = useConvex();
  const [propertyToEdit, setPropertyToEdit] = useState<EditedPropertyTypes>({ name: "", value: "", normalName: "" });
  const [editedProperties, setEditedProperties] = useState<EditedPropertyTypes[]>([]);
  const [newDates, setNewDates] = useState<any>({
    fechaNacimientoGregoriano: { dia: "", mes: "", ano: "" },
    fechaNacimientoHebreo: { dia: "", mes: "", ano: "" },
    fechaBarMitzvaGregoriano: { dia: "", mes: "", ano: "" },
    fechaBarMitzvaHebreo: { dia: "", mes: "", ano: "" },
  });
  const [minianimList, setMinianimList] = useState<any[]>([]);
  const [habilidad, setHabilidad] = useState<Ability[]>([])
  const [newValue, setNewValue] = useState<string>("");

  const groupList = ["Cohen", "Levi", "Israel"];
  const habilidades: Ability[] = ["Leer Torah", "Jazan", "Leer Haftara", "Leer Meguila"];

  const closeModal = () => {
    setOpenEditPropertyModal(false);
  }

  const changeVisitorUserPropeties = changeUserVisitorData()

  useEffect(() => {
    console.log("New dates state is:", newDates);
    //console.log("Edited properties state is:", editedProperties);
  }, [newDates, editedProperties]);

  const updateVisitorUser = async () => {
    //setEditedProperties([...editedProperties, newDates]);
    console.log("Edited properties state is:", editedProperties);
    try {
      const updatedUser = await changeVisitorUserPropeties(logedVisitorUser?.nombreKehila, logedVisitorUser?.nombreEspanol, logedVisitorUser?.apellido, editedProperties);
      console.log("Updated user:", updatedUser);
      setOpenEditPropertyModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const changeEditPropertyToEditList = (propertyName: string, value: string, normalName: string) => {
    setEditedProperties(prev => {
      const exists = prev.some(prop => prop.name === propertyName);

      if (exists) {
        // Actualiza el valor si ya existe
        return prev.map(prop =>
          prop.name === propertyName
            ? { ...prop, value, normalName }
            : prop
        );
      } else {
        // Agrega una nueva propiedad si no existe
        return [...prev, { name: propertyName, value, normalName }];
      }
    });
  };

  const changePropertyToEditValue = (property: EditedPropertyTypes) => {
    setPropertyToEdit(property);
    if (property.name == "Minian") getMinianimFromTheList()
    console.log("Property to edit is:", property);
  }
  
  const handleAddAbility = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Ability;
    setHabilidad((prevHabilidades) =>
      e.target.checked
        ? [...prevHabilidades, value] // Agregar si se selecciona
        : prevHabilidades.filter((h) => h !== value) // Quitar si se deselecciona
    );
    changeEditPropertyToEditList(propertyToEdit.value, habilidad.join(", "), propertyToEdit.normalName);
  };

  const getMinianimFromTheList = async () => {
    try {
      const minianimListFromLogedUserKehila = await getMinianimList(convex, logedVisitorUser?.nombreKehila);
      setMinianimList(minianimListFromLogedUserKehila!);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const showHebrewDateInput = (property: string) => {
    return (
      <div style={{ display: "flex", flexDirection: "row"}}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <label htmlFor="userBarMitzvaDateHebDia" style={{ display: "block", marginRight: 10}}>Día</label>
          <input id="userBarMitzvaDateHebDia" type="number" name="fechaBarMitzvaHebreo" placeholder="Día" 
            onChange={(e: any) => setNewDates({
              ...newDates, 
              [property]: { ...newDates[property], dia: e.target.value }
            })}
            style={{...styles.input}}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <label htmlFor="userBarMitzvaDateHebMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>
            Mes
          </label>
          <select
            id="userBarMitzvaDateHebMes"
            name="fechaBarMitzvaHebreo"
            style={styles.input}
            onChange={(e: any) => setNewDates({
              ...newDates, 
              [property]: { ...newDates[property], mes: e.target.value }
            })}
          >
            <option value="" disabled>
              Selecciona un mes
            </option>
            {HEBREW_MONTHS.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <label htmlFor="userBarMitzvaDateHebAno" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
          <input id="userBarMitzvaDateHebAno" type="number" name="fechaBarMitzvaHebreo" placeholder="Año" 
            onChange={(e: any) => setNewDates({
              ...newDates, 
              [property]: { ...newDates[property], ano: e.target.value }
            })} 
            style={{...styles.input}}
          />
        </div>
      </div>
    )
  
  }

  const showGregorianDateInput = (property: string) => {
    return (
      <div style={{ display: "flex", flexDirection: "row"}}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <label htmlFor="userBarMitzvaDateGregDia" style={{ display: "block", marginRight: 10}}>Día</label>
          <input id="userBarMitzvaDateGregDia" type="number" name="fechaBarMitzvaGregoriano" placeholder="Día" 
            onChange={(e: any) => setNewDates({
              ...newDates, 
              [property]: { ...newDates[property], dia: e.target.value }
            })}
            style={{...styles.input}}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <label htmlFor="userBarMitzvaDateGregMes" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Mes</label>
          <input id="userBarMitzvaDateGregMes" type="number" name="fechaBarMitzvaGregoriano" placeholder="Mes" 
          onChange={(e: any) => setNewDates({
              ...newDates, 
              [property]: { ...newDates[property], mes: e.target.value }
            })} 
            style={{...styles.input}}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <label htmlFor="userBarMitzvaDateGregAno" style={{ display: "block", marginRight: 10, marginLeft: 10}}>Año</label>
          <input id="userBarMitzvaDateGregAno" type="number" name="fechaBarMitzvaGregoriano" placeholder="Año" 
            onChange={(e: any) => 
              setNewDates({
                ...newDates, 
                [property]: { ...newDates[property], ano: e.target.value }
              })
            }
            style={{...styles.input}}
          />
        </div>
      </div>
    )
  }

  const showMinianinimListToSelect = () => {
    return (
      <select
        id="minian-select"
        style={styles.input}
        defaultValue=""
        onChange={(e) => {
          changeEditPropertyToEditList(propertyToEdit.value, e.target.value, propertyToEdit.normalName);
        }}
      >
        <option value="" disabled>
          Elegí un Minian
        </option>
        {minianimList.map((minian, index) => (
          <option key={index} value={minian.value}>
            {minian}
          </option>
        ))}
      </select>
    );
  }

  const showGroupListToSelect = () => {
    return (
      <select
        id="group-select"
        style={styles.input}
        defaultValue=""
        onChange={(e) => {
          changeEditPropertyToEditList(propertyToEdit.value, e.target.value, propertyToEdit.normalName);
        }}
      >
        <option value="" disabled>
          Elegí un Grupo
        </option>
        {groupList.map((group, index) => (
          <option key={index} value={group}>
            {group}
          </option>
        ))}
      </select>
    );
  }

  const showAbilitiesListToSelect = () => {
    return (
      <div style={styles.input}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {habilidades.map((role: string) => (
            <label key={role}>
              <input
                type="checkbox"
                value={role}
                checked={habilidad.includes(role)}
                onChange={(e) => {
                  handleAddAbility(e)
                  setNewValue(habilidad.join(", ")); // Update newValue with the selected abilities
                }}
              />
              {role}
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Modal
        isOpen={openEditPropertyModal}
        onRequestClose={closeModal}
        style={{ content: styles.container }}
        contentLabel="Example Modal"
      >
        <h2 style={{ textAlign: 'center', border: '1px solid blue', padding: '10px', borderRadius: '25px', justifyContent: 'center', display: 'flex' }}>Elegí la propiedad a editar</h2>
        <div>
          {/*Select the property to change from UserProperties List */}
          <label htmlFor="property-select" style={{ display: 'block', marginBottom: '10px' }}>Propiedad:</label>
          <select
            id="property-select"
            style={styles.input}
            defaultValue=""
            onChange={(e) => {
              const selectedProperty = UserProperties.find(p => p.value === e.target.value);
              if (selectedProperty) changePropertyToEditValue(selectedProperty);
              setNewValue(""); // Reset new value when changing property
            }}
          >
            <option value="" disabled>
              Elegí una propiedad
            </option>
            {UserProperties.map((property, index) => (
              <option key={index} value={property.value}>
                {property.name}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="new-value" style={{ display: 'block', marginTop: '10px' }}>Nuevo valor:</label>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          { propertyToEdit.name.startsWith("Fecha") && propertyToEdit.name.includes("Hebreo") ? (
            showHebrewDateInput(propertyToEdit.name)
          ) : propertyToEdit.name.startsWith("Fecha") ? (
            showGregorianDateInput(propertyToEdit.name)
          ) : propertyToEdit.name === "Minian" ? (
            showMinianinimListToSelect()
          ) : propertyToEdit.name === "Grupo" ? (
            showGroupListToSelect()
          ) : propertyToEdit.name === "Conocimientos" ? (
            showAbilitiesListToSelect()
          ) : (
            <input
                type="text"
                name={propertyToEdit.name}
                placeholder={`Nuevo valor`}
                onChange={(e) => {
                  setNewValue(e.target.value);
                }}
                //onChange={(e) => changeEditPropertyToEditList(propertyToEdit.value, e.target.value, propertyToEdit.normalName)}
                value={newValue}
                style={styles.input}
                disabled={propertyToEdit.name === "" ? true : false}
              /> 
          )}
          <button style={{...styles.button, backgroundColor: newValue !== "" ? "orange" : "gray",}} disabled={newValue === "" ? true : false} onClick={() => {
            changeEditPropertyToEditList(propertyToEdit.value, newValue, propertyToEdit.normalName);
            setPropertyToEdit({ name: "", value: "", normalName: "" });
          }}>
            Guardar
          </button>
        </div>

        <button style={{...styles.button, backgroundColor: "blue"}} onClick={() => updateVisitorUser()}>
          Editar
        </button>

        { editedProperties.length > 0 && (
          <div>
            <h3>Propiedades editadas:</h3>
            <ul>
              {editedProperties.map((prop, index) => (
                <li key={index}>{`${prop.normalName}: ${prop.value}`}</li>
              ))}
            </ul>
          </div>
        )}
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