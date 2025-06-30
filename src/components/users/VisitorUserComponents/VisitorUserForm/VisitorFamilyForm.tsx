import React from 'react'
import { CSSProperties } from 'react';
import { Aniversary, Son} from '../../../../structs/structs';
import { colors } from '../../../../assets/colors';
import { ChildCard } from '../ChildComponents/ChildCard';
import { AniversaryCard } from '../AniversaryComponents/AniversaryCard';
import { UserChildModalComponent } from '../ChildComponents/ChildModal';
import { CreateAniversaryModalComponent } from '../AniversaryComponents/AniversaryModal';

interface FormPersonalDataProps {
  logedVisitorUser: any
}

export const VisitorFamilyForm = ({logedVisitorUser}: FormPersonalDataProps) => {
    const [modalChildIsOpen, setChildModalIsOpen] = React.useState<boolean>(false);
    const [modalAniversaryIsOpen, setModalAniversaryIsOpen] = React.useState<boolean>(false);
    const [aniversarySelected, setAniversarySelected] = React.useState<Aniversary>();
    const [sonSelected, setSonSelected] = React.useState<Son>();
    const [isSonSelected, setIsSonSelected] = React.useState<boolean>(false);

    return (
      <div style={{ height: "400px", overflowY: "auto", padding: "10px", borderRadius: "5px" }}>
        <div>
            <label htmlFor="userMaritalStatus "style={{ display: "block" }}>Estado Civil</label>
            <h5 id="userMaritalStatus" style={styles.input}>
              {logedVisitorUser.estadoCivil}
            </h5>

            <label htmlFor="userWifeNameEsp" style={{ display: "block"}}>Nombre Esposa Español</label>
            <h5 id="userWifeNameEsp" style={styles.input}>
              {logedVisitorUser.nombreEsposaEspanol}
            </h5>

            <label htmlFor="userWifeNameHeb" style={{ display: "block"}}>Nombre Esposa Hebreo</label>
            <h5 id="userWifeNameHeb" style={styles.input}>
              {logedVisitorUser.nombreEsposaHebreo}
            </h5>

            {logedVisitorUser.hijos.length > 0 ? (
              <div style={{width: '100%' }} >
                <label style={{ display: "block", marginBottom: "10px"}}>Hijos</label>
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
                  <label style={{display: "block", marginBottom: "10px"}}>Aniversarios</label>
                  <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{display: "flex", flexDirection: "row", gap: "20px", marginBottom: "10px"}}>
                      {logedVisitorUser.aniversarios.map((aniversario: Aniversary, index: React.Key | null | undefined) => (
                        <AniversaryCard 
                          aniversario={aniversario} 
                          key={index} 
                          setModalAniversaryIsOpen={setModalAniversaryIsOpen}
                          setAniversarySelected={setAniversarySelected}/>
                      ))}
                      <button 
                        style={{...styles.button, backgroundColor: "orange"}}
                        type="button"
                        onClick={() => setChildModalIsOpen(true)}>
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
                setIsSonSelected={setIsSonSelected} /> 
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
    fontWeight: "bold",
  }
};