import { CSSProperties, useContext } from 'react';
import { colors } from '../../../../assets/colors';
import { PageContext } from '../../../../StoreInfo/page-storage';


interface NavigationButtonProps {
  step: number;
  setStep: (step: number) => void;
  setModalRealSignInfo?: (modalRealSignInfo: boolean) => void;
  fromPage: string;
  setIsNewUser?: (isNewUser: boolean) => void;
}

export const NavigationButtonSignUp = ({step, setStep, setModalRealSignInfo, fromPage, setIsNewUser}: NavigationButtonProps) => {
    const { logedUser } = useContext(PageContext) as any;
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
    
    return (
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", flexDirection: "row", alignItems: "center"}}>,
            <div style={{ display: "flex", flexDirection: "row", width: "100%", alignContent: "center", justifyContent: "center" }}>
                <h3 onClick={() => setStep(1)} style={{...styles.sectionTitle, color: step === 1 ? "#3b82f6" : "#6b7280", borderBottom: step === 1 ? "2px solid #3b82f6" : "none", paddingBottom: step === 1 ? "8px" : "0"}}>Datos Personales</h3>
                <h3 onClick={() => setStep(2)} style={{...styles.sectionTitle, color: step === 2 ? "#3b82f6" : "#6b7280", borderBottom: step === 2 ? "2px solid #3b82f6" : "none", paddingBottom: step === 2 ? "8px" : "0"}}>Datos de Kehila</h3>
                <h3 onClick={() => setStep(3)} style={{...styles.sectionTitle, color: step === 3 ? "#3b82f6" : "#6b7280", borderBottom: step === 3 ? "2px solid #3b82f6" : "none", paddingBottom: step === 3 ? "8px" : "0"}}>Datos de Familia</h3>
                {fromPage == "homeVisitorUser" || fromPage == "userDashboardPage" ? (<h3 onClick={() => setStep(4)} style={{...styles.sectionTitle, color: step === 4 ? "#3b82f6" : "#6b7280", borderBottom: step === 4 ? "2px solid #3b82f6" : "none", paddingBottom: step === 4 ? "8px" : "0"}}>Cuenta</h3>) : null}
                {fromPage == "userDashboardPage" ? (<h3 onClick={() => setStep(5)} style={{...styles.sectionTitle, color: step === 5 ? "#3b82f6" : "#6b7280", borderBottom: step === 5 ? "2px solid #3b82f6" : "none", paddingBottom: step === 5 ? "8px" : "0"}}>Proximas Aliot</h3>) : null}
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
                        {fromPage == "SignUp" && logedUser.rol == "" ? 
                            (<button type="submit" style={styles.button} onClick={() => {setModalRealSignInfo!(true); setIsNewUser!(true)}}>Registrarse</button>) : null
                        }
                        {logedUser.rol == "ADMIN" && fromPage == "SignUp"?
                            (<button type="submit" style={styles.regi_button} onClick={() => {setModalRealSignInfo!(true); setIsNewUser!(false)}}>Guardar Mitpalel</button>) : null
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
    marginRight: 20,
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    padding: "8px 4px",
  },
  button: {
    backgroundColor: colors.btn_background,
    color: "white",
    padding: "10px 20px",
    margin: "6px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    border: "none",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  regi_button: {
    backgroundColor: "white",
    color: colors.btn_background,
    padding: "10px 20px",
    margin: "6px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    border: `1px solid ${colors.btn_background}`,
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  } 
};
