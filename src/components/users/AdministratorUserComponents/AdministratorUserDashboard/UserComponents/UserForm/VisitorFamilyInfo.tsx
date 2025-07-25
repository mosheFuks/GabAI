import React from 'react'
import { CSSProperties } from 'react';
import { ChildCard } from '../ChildComponents/ChildCard';
import { AniversaryCard } from '../AniversaryComponents/AniversaryCard';
import { UserChildModalComponent } from '../ChildComponents/ChildModal';
import { CreateAniversaryModalComponent } from '../AniversaryComponents/AniversaryModal';
import { Aniversary, Son } from '../../../../../../structs/structs';
import { colors } from '../../../../../../assets/colors';


interface FormPersonalDataProps {
  logedVisitorUser: any
}

export const VisitorFamilyInfo = ({logedVisitorUser}: FormPersonalDataProps) => {
    const [modalChildIsOpen, setChildModalIsOpen] = React.useState<boolean>(false);
    const [modalAniversaryIsOpen, setModalAniversaryIsOpen] = React.useState<boolean>(false);
    const [aniversarySelected, setAniversarySelected] = React.useState<Aniversary>();
    const [sonSelected, setSonSelected] = React.useState<Son>();

    return (
      <div style={{ flex: 1, overflowY: "auto", padding: "10px", borderRadius: "5px", minHeight: 0 }}>
        <div>
            <label htmlFor="userMaritalStatus "style={{ display: "block", fontWeight: 'bold' }}>Estado Civil</label>
            <h5 id="userMaritalStatus" style={styles.input}>
                {logedVisitorUser.estadoCivil}
            </h5>

            <label htmlFor="userWifeNameEsp" style={{ display: "block", fontWeight: 'bold'}}>Nombre Esposa Español</label>
            <h5 id="userWifeNameEsp" style={styles.input}>
                {logedVisitorUser.nombreEsposaEspanol}
            </h5>

            <label htmlFor="userWifeNameHeb" style={{ display: "block", fontWeight: 'bold'}}>Nombre Esposa Hebreo</label>
            <h5 id="userWifeNameHeb" style={styles.input}>
                {logedVisitorUser.nombreEsposaHebreo}
            </h5>

            {logedVisitorUser.hijos.length > 0 ? (
              <div style={{width: '100%' }} >
                <label style={{ display: "block", fontWeight: 'bold', marginBottom: "10px"}}>Hijos</label>
                <div style={{display: "flex", flexDirection: "row", gap: "30px", marginBottom: "10px"}}>
                  {logedVisitorUser.hijos.map((hijo: Son, index: React.Key | null | undefined) => (
                    <div>
                      <ChildCard 
                        son={hijo} 
                        key={index} 
                        setChildModalIsOpen={setChildModalIsOpen}
                        setSonSelected={setSonSelected} />
                    </div>
                  ))}
                </div>
           
              </div>
            ) : (null)}
            
            {logedVisitorUser.aniversarios.length > 0 ? (
                <div style={{width: '100%' }} >
                    <label style={{display: "block", fontWeight: 'bold', marginBottom: "10px"}}>Aniversarios</label>
                    <div style={{display: "flex", flexDirection: "row", gap: "20px", marginBottom: "10px"}}>
                      {logedVisitorUser.aniversarios.map((aniversario: Aniversary, index: React.Key | null | undefined) => (
                        <AniversaryCard 
                          aniversario={aniversario} 
                          key={index} 
                          setModalAniversaryIsOpen={setModalAniversaryIsOpen}
                          setAniversarySelected={setAniversarySelected}/>
                      ))}
                    </div>
                </div>
            ) : (null)}

            {modalChildIsOpen ? 
                <UserChildModalComponent 
                  modalChildIsOpen={modalChildIsOpen} 
                  setChildModalIsOpen={setChildModalIsOpen} 
                  son={sonSelected}
                  setSonSelected={setSonSelected}/> 
                : 
                  null
            }
            {modalAniversaryIsOpen ? 
                <CreateAniversaryModalComponent 
                  modalAniversaryIsOpen={modalAniversaryIsOpen} 
                  setModalAniversaryIsOpen={setModalAniversaryIsOpen} 
                  aniversary={aniversarySelected}
                  setAniversarySelected={setAniversarySelected} />
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
  }
};