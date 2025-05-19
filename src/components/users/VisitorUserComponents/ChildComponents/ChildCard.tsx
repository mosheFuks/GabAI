import React, { CSSProperties } from "react";
import { CircleUser } from "lucide-react"
import { Son } from "../../../../structs/structs";

interface ChildCardProps {
  setChildModalIsOpen: (modalIsOpen: boolean) => void;
  key: React.Key | null | undefined
  son: Son;
  setSonSelected: (son: Son) => void;
}

export const ChildCard = ({son, setChildModalIsOpen, setSonSelected}: ChildCardProps) => {

  const handleChildSelection = (child: Son) => {
    setChildModalIsOpen(true)
    console.log("Hijo seleccionado", child)
    setSonSelected(child)
  }
  
  return (
    <div style={styles.card} onClick={() => handleChildSelection(son)}>
      <div style={styles.iconContainer}>
        <CircleUser size={30} color="white" />
      </div>
      <h3 style={styles.title}>{son.nombre}</h3>
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