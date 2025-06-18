import React, { CSSProperties, useContext } from 'react';
import { colors } from '../../../../assets/colors';
import { PageContext } from '../../../../StoreInfo/page-storage';


interface NavigationButtonProps {
  step: number;
  setStep: (step: number) => void;
  setModalRealSignInfo: (modalRealSignInfo: boolean) => void;
  fromPage: string;
  saveNewVisitorUserOnUsersList: () => void;
}

export const NavigationButtonSignUp = ({step, setStep, setModalRealSignInfo, fromPage, saveNewVisitorUserOnUsersList}: NavigationButtonProps) => {
    const { logedUser } = useContext(PageContext) as any;
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
    
    return (
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", flexDirection: "row", alignItems: "center"}}>,
            <div style={{ display: "flex", flexDirection: "row", width: "100%", alignContent: "center", justifyContent: "center" }}>
                <h3 onClick={() => setStep(1)} style={{...styles.sectionTitle, color: step === 1 ? colors.btn_background : "black", textDecoration: step === 1 ? "underline" : "none"}}>Datos Personales</h3>
                <h3 onClick={() => setStep(2)} style={{...styles.sectionTitle, color: step === 2 ? colors.btn_background : "black", textDecoration: step === 2 ? "underline" : "none"}}>Datos de Kehila</h3>
                <h3 onClick={() => setStep(3)} style={{...styles.sectionTitle, color: step === 3 ? colors.btn_background : "black", textDecoration: step === 3 ? "underline" : "none"}}>Datos de Familia</h3>
                {fromPage == "homeVisitorUser" || fromPage == "userDashboardPage" ? (<h3 onClick={() => setStep(4)} style={{...styles.sectionTitle, color: step === 4 ? colors.btn_background : "black", textDecoration: step === 4 ? "underline" : "none"}}>Cuenta</h3>) : null}
                {fromPage == "userDashboardPage" ? (<h3 onClick={() => setStep(5)} style={{...styles.sectionTitle, color: step === 5 ? colors.btn_background : "black", textDecoration: step === 5 ? "underline" : "none"}}>Proximas Aliot</h3>) : null}
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "100%", alignContent: "center", justifyContent: "flex-end" }}>
                {step === 1 && (<button type="button" onClick={nextStep} style={styles.button}>Siguiente</button>)}
                {step === 2 && (
                    <div>
                        <button type="button" onClick={prevStep} style={styles.button}>Atrás</button>
                        <button type="button" onClick={nextStep} style={styles.button}>Siguiente</button>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <button type="button" style={styles.button} onClick={prevStep}>Atrás</button>
                        {fromPage === "homeVisitorUser" || fromPage == "userDashboardPage" ? (<button type="button" onClick={nextStep} style={styles.button}>Siguiente</button>) : null}
                        {fromPage == "SignUp" && logedUser.rol == "VISITANTE" ? 
                            (<button type="submit" style={styles.button} onClick={() => saveNewVisitorUserOnUsersList()}>Guardar</button>) : null
                        }
                        { fromPage != "userDashboardPage" ?
                            (<button type="submit" style={styles.regi_button} onClick={() => setModalRealSignInfo(true)}>Registrarse</button>) : null
                        }
                    </div>
                )}
                {step === 4 && (
                    <div>
                        <button type="button" style={styles.button} onClick={prevStep}>Atrás</button>
                        {fromPage == "userDashboardPage" && (<button type="button" onClick={nextStep} style={styles.button}>Siguiente</button>)}
                    </div>
                )}
                {step === 5 && (
                    <div>
                        <button type="button" style={styles.button} onClick={prevStep}>Atrás</button>
                    </div>
                )}
            </div>
        </div>
    )
}

const styles: { [key: string]: CSSProperties }= {
  sectionTitle: {
    cursor: "pointer", 
    alignSelf: "center",
    textAlign: 'center', 
    marginRight: 20
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
  regi_button: {
    backgroundColor: "white",
    color: colors.btn_background,
    padding: "10px 15px",
    margin: "10px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    border: "none",
    fontWeight: 'bolder'
  } 
};
