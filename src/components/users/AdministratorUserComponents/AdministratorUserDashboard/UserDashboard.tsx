import React, { CSSProperties, useEffect, useState } from "react";
import { VisitorUser, Son, Aniversary, Grupo, Ability } from '../../../../structs/structs';

import { useNavigate, useParams } from "react-router-dom";
import { VisitorPersonalInfo } from "./UserComponents/UserForm/VisitorPersonalInfo";
import { VisitorKehilaInfo } from "./UserComponents/UserForm/VisitorKehilaInfo";
import { VisitorFamilyInfo } from "./UserComponents/UserForm/VisitorFamilyInfo";
import { VisitorAccountInfo } from "./UserComponents/UserForm/VisitorAccountInfo";

import {FaArrowLeft } from "react-icons/fa";
import { VisitorPerashiotInfo } from "./UserComponents/UserForm/VisitorPerashiotInfo";
import { colors } from "../../../../assets/colors";
import { NavigationButtonSignUp } from "../../../SignUserOptions/NormalUser/SignUp/NavigationButtonsSignUp";

export const UserDashboard = () => {
  const [step, setStep] = useState<number>(1);
  const [user, setUser] = useState<VisitorUser>({})

  const { id } = useParams();
  console.log("id", id);

  const navigate = useNavigate();

  const mockLogedVisitorUser = {
    nombreKehila: "Kehila Agudat Israel",
    nombreEspañol: "Ariel",
    nombreHebreo: "אריאל",
    apellido: "Levy",
  
    fechaNacimientoGregoriano: {
      dia: "12",
      mes: "06",
      año: "1988",
    },
    fechaNacimientoHebreo: {
      dia: "9",
      mes: "Sivan",
      año: "5748",
    },
  
    emailPersonal: "ariel.levy@gmail.com",
    emailComercial: "contacto@levytech.uy",
    telefono: "+59891234567",
    direccion: "Av. Italia 4567, Montevideo",
    minian: "Minian Shajarit",
    numeroSocio: "45789",
    grupo: "Levi" as Grupo,
  
    fechaBarMitzvaGregoriano: {
      dia: "20",
      mes: "06",
      año: "2001",
    },
    fechaBarMitzvaHebreo: {
      dia: "29",
      mes: "Sivan",
      año: "5761",
    },
    perashaBarMitzva: "Koraj",
    habilidades: ["Leer Torah", "Jazan"],
  
    nombreMadreEspañol: "Débora",
    nombreMadreHebreo: "דבורה",
    nombrePadreEspañol: "Shlomo",
    nombrePadreHebreo: "שלמה",
  
    estadoCivil: "Casado",
    nombreEsposaEspañol: "Esther",
    nombreEsposaHebreo: "אסתר",
  
    hijos: [
      {
        nombre: "Eitan",
        nombreHebreo: "איתן",
        apellido: "Levy",
        genero: "Masculino",
        fechaNacimiento: {
          dia: "05",
          mes: "03",
          año: "2015",
        },
        fechaNacimientoHebreo: {
          dia: "14",
          mes: "Adar",
          año: "5775",
        },
        fechaBarMitzva: {
          dia: "18",
          mes: "03",
          año: "2028",
        },
        fechaBarMitzvaHebreo: {
          dia: "17",
          mes: "Adar II",
          año: "5788",
        },
        perashaBarMitzva: "Vayakhel",
        habilidades: ["Leer Torah", "Jazan", "Leer Haftara", "Leer Meguila"] as Ability[],
      },
      {
        nombre: "Noam",
        nombreHebreo: "נועם",
        apellido: "Levy",
        genero: "Femenino",
        fechaNacimiento: {
          dia: "11",
          mes: "08",
          año: "2018",
        },
        fechaNacimientoHebreo: {
          dia: "30",
          mes: "Av",
          año: "5778",
        },
      }
    ] as Son[],
  
    aniversarios: [
      {
        motivo: "Boda",
        nombreDelAniversario: "Casamiento con Esther",
        fecha: {
          dia: "15",
          mes: "09",
          año: "2010",
        },
        fechaHebreo: {
          dia: "7",
          mes: "Tishrei",
          año: "5771",
        },
      },
      {
        motivo: "Aliá",
        nombreDelAniversario: "Aliá a Israel",
        fecha: {
          dia: "01",
          mes: "08",
          año: "2022",
        },
        fechaHebreo: {
          dia: "4",
          mes: "Av",
          año: "5782",
        },
      },
      {
        motivo: "Iortzai",
        nombreDelAniversario: "Iortzai de mi padre",
        fecha: {
          dia: "15",
          mes: "10",
          año: "2020",
        },
        fechaHebreo: {
          dia: "7",
          mes: "Cheshvan",
          año: "5781",
        },
      },
      {
        motivo: "Iortzai",
        nombreDelAniversario: "Iortzai de mi madre",
        fecha: {
          dia: "22",
          mes: "03",
          año: "2018",
        },
        fechaHebreo: {
          dia: "6",
          mes: "Nisan",
          año: "5778",
        },
      },
      {
        motivo: "Iortzai",
        nombreDelAniversario: "Iortzai de mi abuelo",
        fecha: {
          dia: "01",
          mes: "07",
          año: "1995",
        },
        fechaHebreo: {
          dia: "3",
          mes: "Tammuz",
          año: "5755",
        },
      },
      {
        motivo: "Iortzai",
        nombreDelAniversario: "Iortzai de mi hermano",
        fecha: {
          dia: "09",
          mes: "12",
          año: "2005",
        },
        fechaHebreo: {
          dia: "8",
          mes: "Kislev",
          año: "5766",
        },
      },
      
    ] as Aniversary[],

    cuenta: [
      {
        monto: 1000,
        tipoMoneda: "USD",
        motivo: "Alia",
        perasha: "Vayikra",
        fecha: {
          dia: "01",
          mes: "01",
          año: "2023",
        },
        status: "PENDIENTE",
      },
      {
        monto: 123,
        tipoMoneda: "USD",
        motivo: "Escuela",
        aclaracion: "Solo para el colegio",
        perasha: "Vayikra",
        fecha: {
          dia: "01",
          mes: "01",
          año: "2023",
        },
        status: "PENDIENTE",
      },
      {
        monto: 500,
        tipoMoneda: "ARS",
        motivo: "Otro",
        fecha: {
          dia: "15",
          mes: "02",
          año: "2023",
        },
        aclaracion: "Donación para la Kehila",
        status: "PENDIENTE",
      },
      {
        monto: 500,
        tipoMoneda: "ARS",
        motivo: "Otro",
        fecha: {
          dia: "15",
          mes: "02",
          año: "2023",
        },
        aclaracion: "Donación para la Kehila",
        status: "PENDIENTE",
      },
      {
        monto: 500,
        tipoMoneda: "USD",
        motivo: "Otro",
        fecha: {
          dia: "15",
          mes: "02",
          año: "2023",
        },
        aclaracion: "Donación para la Kehila",
        status: "PAGADA",
      }
    ] as any[],
  };

  const searchPropertyByName = (key: string) => {
    const properties = Object.entries(mockLogedVisitorUser); // Convierte a array de [clave, valor]
    
    const filtered = properties.filter(([propName, _]) =>
      propName.startsWith(key.toLowerCase()) || propName.includes(key.toLowerCase())
    );
  
    console.log("Propiedades que coinciden:", filtered);
  };
  
  useEffect(() => {
    console.log("User data on Sign UP is:", user);
  }, [user])

  return (
    <>
    <div style={styles.container}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", height: "70px" }}>
        <button style={{...styles.button, backgroundColor: "green"}} onClick={() => navigate("/administrator-dashboard")}>
          <FaArrowLeft className="text-black" /> Lista de usuarios
        </button>
        <h2 style={styles.title}>
         {id?.replace(/([a-z])([A-Z])/g, '$1 $2')}
        </h2>
        <div style={{...styles.button, backgroundColor: colors.main_background, color: colors.main_background, cursor: '-moz-grab'}}></div>
      </div>
      <NavigationButtonSignUp step={step} setStep={setStep} fromPage="userDashboardPage"/>
      <form style={{ width: "100%" }}>
        {step === 1 && (
          <VisitorPersonalInfo 
            logedVisitorUser={mockLogedVisitorUser}
          />
        )}
        {step === 2 && (
          <VisitorKehilaInfo 
            logedVisitorUser={mockLogedVisitorUser}
          />
        )}
        {step === 3 && ( 
          <VisitorFamilyInfo
            logedVisitorUser={mockLogedVisitorUser} 
          />
        )}
        {step === 4 && (    
          <VisitorAccountInfo 
            logedVisitorUser={mockLogedVisitorUser} 
          />
        )}
        {step === 5 && (    
          <VisitorPerashiotInfo 
            logedVisitorUser={mockLogedVisitorUser} 
          />
        )}
      </form>
    </div>
    </>
  );
};

const styles: { [key: string]: CSSProperties }= {
  container: {
    backgroundColor: colors.main_background,
    padding: "10px",
    borderRadius: "25px",
    width: "80%",
    minHeight: "75vh",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "20px auto 0 auto",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    border: `2px solid ${colors.btn_background}`,
    borderColor: colors.btn_background,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 100
  },
  button: {
    backgroundColor: colors.btn_background,
    color: "white",
    padding: "10px 15px",
    margin: "10px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    border: "none",
    justifyContent: "center"
  },
  rightGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    backgroundColor: colors.btn_background,
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    border: "none",
    outline: "none",
    width: "180px",
    color: "white",
    fontSize: "16px",
  },
};
