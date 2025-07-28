import React from 'react'
import { CSSProperties } from 'react';
import { Aniversary, Son, VisitorUser } from '../../../../../../structs/structs';
import { ChildCard } from '../../ChildComponents/ChildCard';
import { AniversaryCard } from '../../AniversaryComponents/AniversaryCard';

interface FormFamilyDataProps {
  handleChangePersonalData: any,
  user: VisitorUser,
  setChildModalIsOpen: any,
  setModalAniversaryIsOpen: (isOpen: boolean) => void,
  setChildSelected: any,
  setAniversarySelected: (aniversary: Aniversary) => void
  deleteAniversary: (aniversary: Aniversary) => void; // Si se necesita una función para eliminar aniversarios
}

export const FormFamilyInfoData = ({handleChangePersonalData, user, setChildModalIsOpen, setModalAniversaryIsOpen, setChildSelected, setAniversarySelected, deleteAniversary}: FormFamilyDataProps) => {

    return (
      <div  style={{ flex: 1, overflowY: "auto", padding: "10px", borderRadius: "5px", minHeight: 0 }}>
        <label htmlFor="userMaritalStatus "style={{ display: "block", fontWeight: "bold" }}>Estado Civil</label>
        <select name="estadoCivil" onChange={(e) => { 
          handleChangePersonalData(e);
        }} style={styles.input}>
          <option value={user.estadoCivil != "" ? user.estadoCivil : ""} disabled selected>{'Selecciona tu estado civil'}</option>
          <option value="Soltero">Soltero</option>
          <option value="Casado">Casado</option>
          <option value="Divorciado">Divorciado</option>
          <option value="Viudo">Viudo</option>
        </select>
      
        <label htmlFor="userWifeNameEsp" style={{ display: "block", fontWeight: "bold"}}>Nombre Esposa Español</label>
        <input id="userWifeNameEsp" type="text" name="nombreEsposaEspanol" placeholder="Nombre Esposa (Español)" onChange={handleChangePersonalData} style={styles.input} value={user.nombreEsposaEspanol}/>

        <label htmlFor="userWifeNameHeb" style={{ display: "block", fontWeight: "bold"}}>Nombre Esposa Hebreo</label>
        <input id="userWifeNameHeb" type="text" name="nombreEsposaHebreo" placeholder="Nombre Esposa (Hebreo)" onChange={handleChangePersonalData} style={styles.input} value={user.nombreEsposaHebreo}/>

        {user.hijos!.length > 0 ? (
          <div style={{width: '100%' }} >
            <label style={{ display: "block", fontWeight: "bold"}}>Hijos</label>
            <div style={styles.childCardContainer}>
              {user.hijos!.map((hijo: Son, index: React.Key | null | undefined) => (
                <ChildCard 
                  hijo={hijo} 
                  key={index} 
                  setChildModalIsOpen={setChildModalIsOpen} 
                  setChildSelected={setChildSelected}/>
              ))}
            </div>
          </div>
        ) : (null)}

        {user.aniversarios!.length > 0 ? (
          <div style={{width: '100%' }} >
            <label style={{ display: "block", fontWeight: "bold"}}>Aniversarios</label>
            <div style={styles.childCardContainer}>
              {user.aniversarios!.map((aniversario: Aniversary, index: React.Key | null | undefined) => (
                <AniversaryCard 
                  aniversario={aniversario} 
                  key={index} 
                  setModalAniversaryIsOpen={setModalAniversaryIsOpen} 
                  setAniversarySelected={setAniversarySelected}
                  deleteAniversary={deleteAniversary}
                />
              ))}
            </div>
          </div>
        ) : (null)}
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
  childCardContainer: {
    display: "flex", 
    flexDirection: "row", 
    gap: "10px", 
    marginTop: "10px", 
    flexWrap: "wrap"
  },
};