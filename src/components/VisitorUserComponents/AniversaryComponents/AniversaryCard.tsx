import React, { CSSProperties } from "react";
import { Aniversary } from "../../../structs/structs"
import { CalendarRange  } from "lucide-react"

interface AniversaryCardProps {
  setModalAniversaryIsOpen: (modalIsOpen: boolean) => void;
  key: React.Key | null | undefined,
  aniversario: Aniversary;
  setAniversarySelected: (aniversary: Aniversary) => void;
}

export const AniversaryCard = ({aniversario, key, setModalAniversaryIsOpen, setAniversarySelected}: AniversaryCardProps) => {

    const handleAniversarySelection = (aniversary: Aniversary ) => {
      setModalAniversaryIsOpen(true);
      console.log("Hijo seleccionado", aniversary)
      setAniversarySelected(aniversary!);
    }
    return (
        <div style={styles.card} onClick={() => handleAniversarySelection(aniversario)}>
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
      width: "150px",
      maxWidth: "200px",
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