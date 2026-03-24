import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

interface SidebarProps {
  activeStep?: number;
  onItemClick?: (step: number) => void;
}

export const Sidebar = ({ activeStep = 1, onItemClick }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <aside style={styles.sidebar}>
      <nav style={styles.sidebarNav}>
        <button
          style={{
            ...styles.sidebarBtn,
            backgroundColor: activeStep === 1 ? "#e0e7ff" : "transparent",
            borderLeft: activeStep === 1 ? "4px solid #3b82f6" : "4px solid transparent",
          }}
          onClick={() => {
            navigate("/administrator-dashboard");
            onItemClick?.(1);
          }}
        >
          <FaHome /> Dashboard
        </button>
        <button
          style={{
            ...styles.sidebarBtn,
            backgroundColor: activeStep !== 1 ? "#e0e7ff" : "transparent",
            borderLeft: activeStep !== 1 ? "4px solid #3b82f6" : "4px solid transparent",
          }}
          onClick={() => onItemClick?.(2)}
        >
          📋 Lista de usuarios
        </button>
      </nav>
    </aside>
  );
};

const styles: { [key: string]: CSSProperties } = {
  sidebar: {
    width: "240px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e5e7eb",
    padding: "20px 0",
  } as CSSProperties,
  sidebarNav: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  } as CSSProperties,
  sidebarBtn: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "transparent",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px",
    color: "#6b7280",
    borderLeft: "4px solid transparent",
    transition: "all 0.2s",
    fontWeight: "500",
  } as CSSProperties,
};
