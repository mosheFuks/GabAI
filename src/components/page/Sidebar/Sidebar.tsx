import { CSSProperties, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { colors } from "../../../assets/colors";
import { PageContext } from "../../../StoreInfo/page-storage";

export const Sidebar = () => {  
  const navigate = useNavigate();
  let fullUrl = useLocation();
  //get sigen user rol info
 const { logedUser } = useContext(PageContext) as any;
  const [activeNavPath, setActiveNavPath] = useState<string>("/administrator-dashboard");

  // Recuperar la última selección guardada al montar
  useEffect(() => {
    if (fullUrl) {
      setActiveNavPath(fullUrl.pathname == "/" ? "/administrator-dashboard" : fullUrl.pathname);
      console.log("ACTIVE NAV PATH: ", fullUrl.pathname);
      
    }
  }, [fullUrl]);

  // Actualizar la selección cuando se hace clic en un item
  const handleNavClick = (path: string) => {
    setActiveNavPath(path);
    //localStorage.setItem('selectedNavPath', path);
    navigate(path);
  };

  const isActive = (path: string) => {
    const normalizedActive = activeNavPath.replace(/\/+$/, "");
    const normalizedPath = path.replace(/\/+$/, "");
    return normalizedActive.startsWith(normalizedPath);
  };

  const navigationItems = [
    {
      id: 1,
      label: "Mitpalelim",
      icon: "👥",
      path: "/administrator-dashboard/",
      color: colors.users,
      bgActive: "#e0e7ff",
    },
    {
      id: 3,
      label: "Aniversarios",
      icon: "ℹ️",
      path: "/aniversaries",
      color: colors.aniversaries,
      bgActive: "#ede9fe",
    },
    {
      id: 4,
      label: "Aliot",
      icon: "📜",
      path: "/perasha-info/aliot/",
      color: colors.aliot,
      bgActive: "#d1fae5",
    },
    {
      id: 2,
      label: "Donaciones",
      icon: "🎁",
      path: "/perasha-info/donation/",
      color: colors.donation,
      bgActive: "#fef3c7",
    },
  ];

  return (
    <aside style={styles.sidebar}>
      <nav style={styles.sidebarNav}>
        {navigationItems.map((item) => (
          <button
            key={item.id}
            style={{
              ...styles.sidebarBtn,
              backgroundColor: isActive(item.path) ? item.bgActive : "transparent",
              borderLeft: isActive(item.path) ? `4px solid ${item.color}` : "4px solid transparent",
              color: isActive(item.path) ? item.color : "#6b7280",
            }}
            onClick={() => handleNavClick(item.path)}
          >
            <span style={styles.icon}>{item.icon}</span>
            <span style={{ fontWeight: "bold"}}>{item.label}</span>
          </button>
        ))}

        {/*
        //Add one for Configurations with a gear icon
        {
          id: 5,
          label: "Configuraciones",
          icon: "⚙️",
          path: "/configurations",
          color: colors.configurations,
          bgActive: "#f3f4f6",
        }, */}
        {logedUser.rol === "ADMIN" && (
          <button
            key={5}
            style={{
              ...styles.sidebarBtn,
              backgroundColor: isActive("/configurations") ? "#f3f4f6" : "transparent",
              borderLeft: isActive("/configurations") ? `4px solid ${colors.configurations}` : "4px solid transparent",
              color: isActive("/configurations") ? colors.configurations : "#6b7280",
            }}
            onClick={() => handleNavClick("/configurations")}
          >
            <span style={styles.icon}>⚙️</span>
            <span style={{ fontWeight: "bold"}}>Configuracion</span>
          </button>
        )}
      </nav>
      <div style={styles.poweredByContainer}>
        <div style={styles.poweredByText}>
          Powered by{" "}
        </div>
        <span style={styles.poweredByText}>
          <a
            href="https://www.hebcal.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.poweredByLink}
          >
            Hebcal Shabbat Times
          </a>
        </span>
      </div>
    </aside>
  );
};

const styles: { [key: string]: CSSProperties } = {
  sidebar: {
    width: "170px",
    height: "calc(100vh - 70px)",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e5e7eb",
    padding: "20px 0",
    position: "fixed",
    left: 0,
    top: "70px",
    overflowY: "hidden",
    display: "flex",
    flexDirection: "column",
    zIndex: 999,
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
    transition: "all 0.2s ease",
    fontWeight: "500",
  } as CSSProperties,
  icon: {
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
  } as CSSProperties,
  poweredByContainer: {
    marginTop: "auto",
    padding: "16px 20px",
    borderTop: "1px solid #e5e7eb",
  } as CSSProperties,
  poweredByText: {
    fontSize: "11px",
    color: "#9ca3af",
  } as CSSProperties,
  poweredByLink: {
    color: colors.home_gabai_tittle,
    textDecoration: "none",
    fontWeight: "600",
  } as CSSProperties,
};
