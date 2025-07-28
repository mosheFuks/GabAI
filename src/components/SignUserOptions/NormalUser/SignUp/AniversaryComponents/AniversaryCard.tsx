import { CSSProperties } from "react";
import { Aniversary } from "../../../../../structs/structs";
import { CalendarRange, Trash2 } from "lucide-react";

interface AniversaryCardProps {
  setModalAniversaryIsOpen: (modalIsOpen: boolean) => void;
  setAniversarySelected: (aniversarySelected: Aniversary) => void;
  aniversario: Aniversary;
  deleteAniversary: (aniversary: Aniversary) => void;
}

export const AniversaryCard = ({
  setModalAniversaryIsOpen,
  setAniversarySelected,
  aniversario,
  deleteAniversary
}: AniversaryCardProps) => {

  const handleCardClick = () => {
    setAniversarySelected(aniversario);
    setModalAniversaryIsOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que el click en el botón borre el card
    deleteAniversary(aniversario);
  };

  return (
    <div style={styles.card} onClick={handleCardClick}>
      <button type="button" style={styles.deleteButton} onClick={handleDeleteClick}>
        <Trash2 size={16} color="white" />
      </button>
      <div style={styles.iconContainer}>
        <CalendarRange size={25} color="white" />
      </div>
      <h3 style={styles.title}>{aniversario.motivo}</h3>
    </div>
  );
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
    position: "relative", // Para posicionar el botón arriba a la derecha
  },
  iconContainer: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#1d9bf0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 500,
    color: "#333",
  },
  deleteButton: {
    position: "absolute",
    top: "8px",
    right: "8px",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#e74c3c",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
};
