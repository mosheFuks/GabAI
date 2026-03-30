import { useContext, useState, CSSProperties } from "react";

import { useNavigate } from 'react-router-dom';
import { esp_strings } from "../../../assets/strings";
import { colors } from "../../../assets/colors";
import { FaUser } from "react-icons/fa";
import { PageContext } from "../../../StoreInfo/page-storage";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface NavbarProps {
  breadcrumbs?: BreadcrumbItem[];
  additionalButtons?: { label: string; onClick: () => void; style?: CSSProperties }[];
}

export const Navbar = ({ breadcrumbs, additionalButtons }: NavbarProps) => {
  const { logedUser, signOut} = useContext(PageContext) as any;
  const navigate = useNavigate();
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    const newCount = clicks + 1;
    setClicks(newCount);

    if (newCount === 5) {
      alert('¡Hiciste 5 clics!');
      // Podés resetear si querés:
      setClicks(0);
    }
  };
  return (
    <nav style={styles.container}>
      <div style={styles.leftSection}>
        <div style={styles.text} onClick={handleClick}>
          <span style={styles.highlight}>{esp_strings.main_title}<span style={{ fontStyle: "italic" }}>AI</span></span>
        </div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav style={styles.breadcrumbs}>
            {breadcrumbs.map((item, index) => (
              <div key={index} style={styles.breadcrumbItem}>
                <span 
                  onClick={item.onClick} 
                  style={{ cursor: item.onClick ? 'pointer' : 'default', color: item.onClick ? '#3b82f6' : '#6b7280' }}
                >
                  {item.label}
                </span>
                {index < breadcrumbs.length - 1 && <span>/</span>}
              </div>
            ))}
          </nav>
        )}
      </div>
      <div style={styles.buttonContainer}>
        {additionalButtons && additionalButtons.map((btn, index) => (
          <button
            key={index}
            style={{...styles.button, ...btn.style}}
            onClick={btn.onClick}
          >
            {btn.label}
          </button>
        ))}
        { logedUser.rol == "ADMIN" ? (
          <button
            style={styles.button}
            onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = (styles.buttonHover.transform as string) || "scale(1.1)")}
            onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
            onClick={() => navigate("/create-normal-user")}
          >
            {esp_strings.btn_create_user}
          </button>
        ) : null }
        { logedUser.rol == "ADMIN" || logedUser.rol == "OPERADOR" ? (
          <button
            style={styles.button}
            onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = (styles.buttonHover.transform as string) || "scale(1.1)")}
            onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
            onClick={() => navigate("/create-operator-user")}
          >
            {esp_strings.btn_add_opp_user}
          </button>
        ) : null }
        { logedUser.nombre != "" ? (
            <>
              <button
                style={styles.close_ses_button}
                onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = (styles.buttonHover.transform as string) || "scale(1.1)")}
                onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
                onClick={() => signOut()}
              >
                {esp_strings.btn_close_sesion}
              </button>
            </>
        ) : null }
      </div>
    </nav>
  );
};

const styles = {
    container: {
      backgroundColor: "#ffffff",
      padding: "12px 20px",
      borderRadius: "0",
      height: "auto",
      minHeight: "70px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      border: "1px solid #e5e7eb",
      position: "fixed" as const,
      top: 0,
      left: 0,
      zIndex: 1000,
    } as CSSProperties,
    leftSection: {
      display: "flex",
      alignItems: "center",
      gap: "24px",
    } as CSSProperties,
    text: {
      color: "#1f2937",
      fontWeight: "700",
      fontSize: "18px",
      cursor: "pointer",
    } as CSSProperties,
    highlight: {
      fontWeight: "800",
      fontSize: "32px",
      marginLeft: "5px",
      color: colors.home_gabai_tittle,
    } as CSSProperties,
    breadcrumbs: {
      display: "flex",
      gap: "12px",
      fontSize: "14px",
      color: "#6b7280",
      alignItems: "center",
    } as CSSProperties,
    breadcrumbItem: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
    } as CSSProperties,
    buttonContainer: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
    } as CSSProperties,
    button: {
      backgroundColor: colors.btn_background,
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      fontWeight: "600",
      fontSize: "14px",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
      color: "#ffffff",
    } as CSSProperties,
    close_ses_button: {
      backgroundColor: "#ffffff",
      border: `1.5px solid red`,
      padding: "10px 18px",
      borderRadius: "8px",
      fontWeight: "600",
      fontSize: "14px",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
      color: "red",
    } as CSSProperties,
    buttonHover: {
      transform: "scale(1.05)",
    } as CSSProperties,
    iconButton: {
      backgroundColor: colors.btn_background,
      borderRadius: "8px",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
      border: "none",
      color: "#ffffff",
    } as CSSProperties,
    iconButtonHover: {
      transform: "scale(1.05)",
    } as CSSProperties,
};
