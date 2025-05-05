import React, { useState } from "react";
import { CSSProperties } from "react";
import { AtSign, Eye, EyeOff } from "lucide-react"

import { colors } from "../../../../assets/colors";
import { esp_strings } from "../../../../assets/strings";
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {
    const [formData, setFormData] = useState({ "email": "", "password": "" });
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate();
    
    const handleEmailChange = (inputEmail: string) => {
      setFormData({ 
        ...formData,
        email: inputEmail
      });
    };

    const handlePassChange = (inputPassword: string) => {
      setFormData({ 
        ...formData,
        password: inputPassword
      });
    };

    const handleSubmit = (e: any) => {
      e.preventDefault();
      console.log("User data on Sign In is:", formData);
      navigate("/visitor-user-info");
    };

    return (
      <div style={styles.container}>
        <h2 style={styles.title}>
          <span style={{ fontWeight: '600', fontSize: "60px" }}>{esp_strings.btn_signin}</span>
        </h2>
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <div>
              <label style={{ fontSize: 20}}>{esp_strings.sign_email}</label>
              <div style={styles.inputContainer}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  style={styles.input}
                  onChange={(email) => handleEmailChange(email.target.value)}
                />
                <AtSign size={25} style={styles.icon}/>  
              </div>
            </div>
            <div>
                <label style={{ fontSize: 20}}>{esp_strings.sign_password}</label>
                <div style={styles.inputContainer}>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        style={styles.input}
                        onChange={(password) => handlePassChange(password.target.value)}
                    />
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ border: "none", backgroundColor: "transparent", cursor: "pointer", color: "black", margin: 0 }}
                    >
                        {showPassword ? <EyeOff size={25} style={styles.icon}/> : <Eye size={25} style={styles.icon}/>}
                    </div>
                </div>
            </div>
            <div>
              <p style={styles.forgotPass}>{esp_strings.sign_password_forgot}</p>
            </div>
        </form>
        
        <div style={styles.buttonContainer}>
          <button 
            style={styles.button}
            onClick={handleSubmit}
            onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = styles.buttonHover.transform || "scale(1.1)")}
            onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
          >{esp_strings.btn_signin}</button>
        </div>
      </div>
    );

    
}

const styles: { [key: string]: CSSProperties } = {
    container: {
      backgroundColor: colors.main_background,
      padding: "10px",
      borderRadius: "25px",
      width: "80%",
      minHeight: "75vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "20px auto 0 auto",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem'
    },
    inputContainer: { 
      width: "400px", 
      height: "50px",
      marginTop: "10px",
      marginBottom: "20px",
      padding: "8px", 
      border: "1px solid #ccc", 
      borderRadius: "50px",
      backgroundColor: colors.btn_txt,
      color: colors.form_txt,
      display: "flex", 
      flexDirection: "row", 
      justifyContent: "space-between", 
      alignItems: "center"
    },
    input: {
      width: "100%", 
      border: "none",
      outline: "none", 
      backgroundColor: "transparent", 
      color: "black",
      marginLeft: "10px",
      marginRight: "10px",
      fontSize: "1.5rem"
    },
    icon: {
      marginRight: "10px", 
      marginTop: "2px"
    },
    forgotPass: {
      color: colors.btn_background, 
      fontSize: "1.3rem", 
      textAlign: "center", 
      cursor: "pointer", 
      textDecoration: "underline"
    },
    buttonContainer: {
      display: "flex",
      gap: "15px",
    },
    button: {
      backgroundColor: colors.btn_background,
      border: "none",
      padding: "15px 15px",
      borderRadius: "20px",
      fontWeight: "bold",
      fontSize: "1.5rem",
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out",
      color: colors.btn_txt,
    },
    buttonHover: {
      transform: "scale(1.1)",
    },
  };
  