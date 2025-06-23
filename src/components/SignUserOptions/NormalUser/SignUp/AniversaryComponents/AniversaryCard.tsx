import React, { CSSProperties } from "react";
import { Aniversary } from "../../../../../structs/structs";
import { CalendarRange  } from "lucide-react"

interface AniversaryCardProps {
  setModalAniversaryIsOpen: (modalIsOpen: boolean) => void;
  setAniversarySelected: (aniversarySelected: Aniversary) => void;
  aniversario: Aniversary;
}

export const AniversaryCard = ({aniversario, setModalAniversaryIsOpen, setAniversarySelected}: AniversaryCardProps) => {

    const handleChildSelection = (aniversary: Aniversary) => {
      setAniversarySelected(aniversary);
      setModalAniversaryIsOpen(true);
    }
    return (
        <div style={styles.card} onClick={() => handleChildSelection(aniversario)}>
          <div style={styles.iconContainer}>
            <CalendarRange size={25} color="white" />
          </div>
          <h3 style={styles.title}>{aniversario.motivo}</h3>
        </div>
    )
};

const styles: { [key: string]: CSSProperties } = {
    card: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "12px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "300px",
      cursor: "pointer",
    },
    iconContainer: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#1d9bf0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    },
    title: {
      margin: 0,
      fontSize: "16px",
      fontWeight: 500,
      color: "#333",
    },
  }