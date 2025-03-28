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
}

export const FormFamilyInfoData = ({handleChangePersonalData, user, setChildModalIsOpen, setModalAniversaryIsOpen, setChildSelected, setAniversarySelected}: FormFamilyDataProps) => {
  
    return (
      <div style={{ height: "300px", overflowY: "auto", padding: "10px", borderRadius: "5px" }}>
        <label htmlFor="userMaritalStatus "style={{ display: "block" }}>Estado Civil</label>
        <select name="estadoCivil" onChange={(e) => { 
          handleChangePersonalData(e);
        }} style={styles.input}>
          <option value={user.estadoCivil != "" ? user.estadoCivil : ""} disabled selected>{'Selecciona tu estado civil'}</option>
          <option value="Soltero">Soltero</option>
          <option value="Casado">Casado</option>
          <option value="Divorciado">Divorciado</option>
          <option value="Viudo">Viudo</option>
        </select>
      
        <label htmlFor="userWifeNameEsp" style={{ display: "block"}}>Nombre Esposa Español</label>
        <input id="userWifeNameEsp" type="text" name="nombreEsposaEspañol" placeholder="Nombre Esposa (Español)" onChange={handleChangePersonalData} style={styles.input} value={user.nombreEsposaEspañol}/>

        <label htmlFor="userWifeNameHeb" style={{ display: "block"}}>Nombre Esposa Hebreo</label>
        <input id="userWifeNameHeb" type="text" name="nombreEsposaHebreo" placeholder="Nombre Esposa (Hebreo)" onChange={handleChangePersonalData} style={styles.input} value={user.nombreEsposaHebreo}/>

        {user.hijos != null ? (
          <div style={{width: '100%' }} >
            <label style={{ display: "block"}}>Hijos</label>
            <div style={styles.childCardContainer}>
              {user.hijos.map((hijo: Son, index: React.Key | null | undefined) => (
                <ChildCard 
                  hijo={hijo} 
                  key={index} 
                  setChildModalIsOpen={setChildModalIsOpen} 
                  setChildSelected={setChildSelected}/>
              ))}
            </div>
          </div>
        ) : (null)}

        {user.aniversarios != null ? (
          <div style={{width: '100%' }} >
            <label style={{ display: "block"}}>Aniversarios</label>
            <div style={styles.childCardContainer}>
              {user.aniversarios.map((aniversario: Aniversary, index: React.Key | null | undefined) => (
                <AniversaryCard 
                  aniversario={aniversario} 
                  key={index} 
                  setModalAniversaryIsOpen={setModalAniversaryIsOpen} 
                  setAniversarySelected={setAniversarySelected}/>
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