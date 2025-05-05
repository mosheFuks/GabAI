import React, { useState } from "react";

import { esp_strings } from '../../assets/strings';
import { colors } from "../../assets/colors";
import { useNavigate } from 'react-router-dom';


export const Navbar = () => {
  const [] = useState();
  const navigate = useNavigate();

  return (
    <nav style={styles.container}>
      <div style={styles.text}>
        <span style={styles.highlight}>{esp_strings.main_title}</span>
      </div>
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = styles.buttonHover.transform)}
          onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
          onClick={() => navigate("/create-normal-user")}
        >
          {esp_strings.btn_create_user}
        </button>
        <button
          style={styles.button}
          onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = styles.buttonHover.transform)}
          onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
        >
          {esp_strings.btn_close_sesion}
        </button>
        <button
          style={styles.button}
          onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = styles.iconButtonHover.transform)}
          onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
        >
          ⚫
        </button>
      </div>
    </nav>
  );
};

const styles = {
    container: {
      backgroundColor: colors.main_background,
      padding: "10px",
      borderRadius: "100px",
      height: "50px",
      width: "80%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "20px auto 0 auto",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    text: {
      color: "black",
      fontWeight: "bold",
      fontSize: "1.125rem",
    },
    highlight: {
      fontWeight: "800",
      fontSize: "50px",
      marginLeft: "5px",
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
    },
    button: {
      backgroundColor: colors.btn_background,
      border: "none",
      padding: "15px 15px",
      borderRadius: "20px",
      fontWeight: "bold",
      fontSize: "0.9rem",
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out",
      color: colors.btn_txt,
    },
    buttonHover: {
      transform: "scale(1.1)",
    },
    iconButton: {
      backgroundColor: colors.btn_background,
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out",
    },
    iconButtonHover: {
      transform: "scale(1.1)",
    },
};
