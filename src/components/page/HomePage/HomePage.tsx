import React from "react";
import { CSSProperties } from "react";

import { useNavigate } from 'react-router-dom';
import { colors } from "../../../assets/colors";
import { esp_strings } from "../../../assets/strings";

export default function HomePage() {
    const navigate = useNavigate();
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>
          {esp_strings.home_title}
        </h2>
        <span style={styles.sub_title}>La primera plataforma Web que te ayuda a organizar las aliot y donaciones de tu Kehila</span>
        {/*<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px', marginBottom: '10px', backgroundColor: "red"}}>
          <div style={{ display: "flex", flexDirection: "row", gap: '10px' }}>
            <div style={styles.pendingCard}>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'orange' }}>
                {`Proposito:`}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                Administra las aliot y donaciones de los participantes de una Kehila 
              </div>
            </div>

            <div style={styles.pendingCard}>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'orange' }}>
                {`Proposito:`}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                Administra las aliot y donaciones de los participantes de una Kehila 
              </div>
            </div> 
          </div>
        </div>*/}
        <div style={styles.buttonContainer}>
          <button 
            style={styles.sign_button}
            onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = styles.buttonHover.transform || "scale(1.1)")}
            onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
            onClick={() => navigate("/sign-in")}
          >{esp_strings.btn_signin}</button>
          <button 
            style={styles.regis_button}
            onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = styles.buttonHover.transform || "scale(1.1)")}
            onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
            onClick={() => navigate("/create-normal-user")}
          >{esp_strings.btn_signup}</button>
        </div>
        <p style={styles.linkText}>
          {esp_strings.home_sub_title}{' '}
          <a href="#" style={styles.link}>{esp_strings.home_link}</a>
        </p>
      </div>
    );

    
}

const styles: { [key: string]: CSSProperties } = {
    container: {
      backgroundColor: colors.main_background,
      padding: "10px",
      borderRadius: "25px",
      width: "95%",
      minHeight: "75vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "20px auto 0 auto",
      paddingLeft: "20px",
      paddingRight: "20px",
    } as CSSProperties,
    title: {
      fontSize: '5rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem'
    } as CSSProperties,
    sub_title: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '5rem'
    } as CSSProperties,
    buttonContainer: {
      display: "flex",
      gap: "15px",
    } as CSSProperties,
    sign_button: {
      backgroundColor: colors.btn_background,
      border: "none",
      padding: "15px 15px",
      borderRadius: "20px",
      fontWeight: "bold",
      fontSize: "2rem",
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out",
      color: colors.btn_txt,
    } as CSSProperties,
    regis_button: {
      backgroundColor: colors.btn_txt,
      border: "none",
      padding: "15px 15px",
      borderRadius: "20px",
      fontWeight: "bold",
      fontSize: "2rem",
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out",
      color: colors.btn_background,
    } as CSSProperties,
    buttonHover: {
      transform: "scale(1.1)",
    } as CSSProperties,
    linkText: {
      marginTop: '10%',
      fontSize: '1.3rem'
    } as CSSProperties,
    link: {
      fontWeight: 'bold',
      textDecoration: 'underline',
      color: colors.btn_background
    } as CSSProperties,
    pendingCard: {
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      border: '3px solid orange',
      borderRadius: '20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      backgroundColor: '#f9f9f9'
    } as CSSProperties,
    button: {
      backgroundColor: colors.btn_background,
      color: "white",
      padding: "10px 15px",
      margin: "10px",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "1rem",
      border: "none",
      justifyContent: "center",
      fontWeight: 'bold'
    } as CSSProperties,
  };

  
  