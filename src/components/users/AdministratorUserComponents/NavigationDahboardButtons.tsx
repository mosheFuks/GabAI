import { CSSProperties } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface DashboardNavigationButtonsProps {
    step: number
    setStep: (step: number) => void
}

export const NavigationDashboardButtons = ({step, setStep}: DashboardNavigationButtonsProps) => {
    const navigate = useNavigate();
    
    return (
        <div style={styles.buttonsContainer}>
            <div style={styles.buttonGroup}>
                {step > 1 ? (
                    <button style={{...styles.button, ...styles.backButton}} onClick={() => {navigate("/administrator-dashboard"), setStep(1)}}>
                        <FaArrowLeft /> Lista de Mitpalelim
                    </button>
                ) : (
                    null
                )}
                <button style={{...styles.button, ...(step == 2 ? styles.buttonActive : styles.buttonInactive)}} onClick={() =>setStep(2)}>Aniversarios de esta semana</button>
                <button style={{...styles.button, ...(step == 3 ? styles.buttonActive : styles.buttonInactive)}} onClick={() =>{setStep(3)}}>Donaciones</button>
                <button style={{...styles.button, ...(step == 4 ? styles.buttonActive : styles.buttonInactive)}} onClick={() =>{setStep(4)}}>Aliot</button>
            </div>
        </div>
    )
}

const styles: { [key: string]: CSSProperties }= {
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    width: "100%",
    gap: "16px",
    flexWrap: "wrap" as const,
  },
  buttonGroup: {
    display: "flex",
    flex: 1,
    gap: "8px",
    flexWrap: "wrap" as const,
  },
  button: {
    padding: "10px 16px",
    borderRadius: "6px",
    fontWeight: "600",
    border: "1.5px solid transparent",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },
  backButton: {
    backgroundColor: "#10b981",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
    border: "1.5px solid #059669",
  },
  buttonActive: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
    border: "1.5px solid #2563eb",
  },
  buttonInactive: {
    backgroundColor: "#f0f9ff",
    color: "#1e40af",
    border: "1.5px solid #93c5fd",
  },
  rightGroup: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#f9fafb",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    padding: "10px 12px",
    transition: "all 0.2s ease",
  },
  input: {
    backgroundColor: "transparent",
    padding: "8px 10px",
    borderRadius: "4px",
    fontWeight: "600",
    border: "none",
    outline: "none",
    width: "220px",
    color: "#1f2937",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },
};