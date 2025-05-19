import { CSSProperties } from "react";
import { colors } from "../../../assets/colors";
import { FaArrowLeft, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface DashboardNavigationButtonsProps {
    peopleList: any[],
    peopleFilter: any[],
    step: number
    setPeopleFilter: (peopleFilter: any[]) => void
    setStep: (step: number) => void
}

export const NavigationDashboardButtons = ({peopleList, peopleFilter, step, setPeopleFilter, setStep}: DashboardNavigationButtonsProps) => {
    const navigate = useNavigate();

    const searchPeopleByName = (key: string) => {
        let people_filtered: any= []
        if (peopleList.length > 0) {
            people_filtered = peopleList.filter(
                peop => peop.nombreEspañol.toLowerCase().startsWith(key) || peop.apellido.toLowerCase().startsWith(key)
            )
        }
        setPeopleFilter(people_filtered)
    }
    
    return (
        <div style={styles.buttonsContainer}>
            <div style={styles.buttonGroup}>
                {step > 1 ? (
                    <button style={{...styles.button}} onClick={() => {navigate("/administrator-dashboard"), setStep(1)}}>
                        <FaArrowLeft className="text-black" /> Lista de usuarios
                    </button>
                ) : (
                    null
                )}
                <button style={styles.button} onClick={() =>setStep(2)}>Aniversarios de esta semana</button>
                <button style={styles.button} onClick={() =>setStep(3)}>Perashiot</button>
            </div>
            {step == 1 ? (
                <div style={styles.rightGroup}>
                    <FaFilter className="text-black" />
                    <input
                        type="text"
                        placeholder="Busca por nombre"
                        style={styles.input}
                        onChange={(e) => searchPeopleByName(e.target.value)}
                    />
                </div>
            ) : (
                null
            )}
        </div>
    )
}

const styles: { [key: string]: CSSProperties }= {
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.btn_background,
    borderRadius: "30px",
    padding: "10px 20px",
    maxWidth: "900px",
    marginTop: "20px",
    width: "100%"
  },
  buttonGroup: {
    display: "flex",
    flex: 1,
    gap: "10px",
  },
  button: {
    backgroundColor: "green",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    border: "1px solid green",
    cursor: "pointer",
    color: "white",
    fontSize: "16px",
  },
  rightGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    backgroundColor: "white",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    border: "none",
    outline: "none",
    width: "180px",
    color: "black",
    fontSize: "16px",
  },
};