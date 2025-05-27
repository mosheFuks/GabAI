import React, { CSSProperties, useContext, useState } from "react";
import { colors } from "../../../assets/colors";
import { VisitorUser, Son, Aniversary, Grupo, Ability } from '../../../structs/structs';
import { VisitorPersonalForm } from "./VisitorUserForm/VisitorPersonalForm";
import { VisitorKehilaForm } from "./VisitorUserForm/VisitorKehilaForm";
import { VisitorFamilyForm } from "./VisitorUserForm/VisitorFamilyForm";
import { VisitorAccountForm } from "./VisitorUserForm/VisitorAccountForm";
import { NavigationButtonSignUp } from "../../SignUserOptions/NormalUser/SignUp/NavigationButtonsSignUp";
import { PageContext } from "../../../StoreInfo/page-storage";

export const HomeVisitorUserComponent = () => {
  const { logedVisitorUser } = useContext(PageContext) as any;
  const [step, setStep] = useState<number>(1);
  const [user, setUser] = useState<VisitorUser>({})
  
  const mockLogedVisitorUser = {
    nombreKehila: "Kehila Agudat Israel",
    nombreEspanol: "Ariel",
    nombreHebreo: "אריאל",
    apellido: "Levy",
  
    fechaNacimientoGregoriano: {
      dia: "12",
      mes: "06",
      ano: "1988",
    },
    fechaNacimientoHebreo: {
      dia: "9",
      mes: "Sivan",
      ano: "5748",
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
      ano: "2001",
    },
    fechaBarMitzvaHebreo: {
      dia: "29",
      mes: "Sivan",
      ano: "5761",
    },
    perashaBarMitzva: "Koraj",
    habilidades: ["Leer Torah", "Jazan"],
  
    nombreMadreEspanol: "Débora",
    nombreMadreHebreo: "דבורה",
    nombrePadreEspanol: "Shlomo",
    nombrePadreHebreo: "שלמה",
  
    estadoCivil: "Casado",
    nombreEsposaEspanol: "Esther",
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
          ano: "2015",
        },
        fechaNacimientoHebreo: {
          dia: "14",
          mes: "Adar",
          ano: "5775",
        },
        fechaBarMitzva: {
          dia: "18",
          mes: "03",
          ano: "2028",
        },
        fechaBarMitzvaHebreo: {
          dia: "17",
          mes: "Adar II",
          ano: "5788",
        },
        perashaBarMitzva: "Vayakhel",
        habilidades: ["Leer Haftara"] as Ability[],
      },
      {
        nombre: "Noam",
        nombreHebreo: "נועם",
        apellido: "Levy",
        genero: "Femenino",
        fechaNacimiento: {
          dia: "11",
          mes: "08",
          ano: "2018",
        },
        fechaNacimientoHebreo: {
          dia: "30",
          mes: "Av",
          ano: "5778",
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
          ano: "2010",
        },
        fechaHebreo: {
          dia: "7",
          mes: "Tishrei",
          ano: "5771",
        },
      },
      {
        motivo: "Aliá",
        nombreDelAniversario: "Aliá a Israel",
        fecha: {
          dia: "01",
          mes: "08",
          ano: "2022",
        },
        fechaHebreo: {
          dia: "4",
          mes: "Av",
          ano: "5782",
        },
      }
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
          ano: "2023",
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
          ano: "2023",
        },
        aclaracion: "Donación para la Kehila",
        status: "PENDIENTE",
      },
      {
        monto: 500,
        tipoMoneda: "USD",
        motivo: "Colegio",
        aclaracion: "Solo para pagos del Colegio, no usar para otra cosa",
        fecha: {
          dia: "15",
          mes: "02",
          ano: "2023",
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
          ano: "2023",
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
          ano: "2023",
        },
        aclaracion: "Donación para la Kehila",
        status: "PAGADA",
      }
    ] as any[],
  };

  return (
    <>
    <div style={styles.container}>
      <h2 style={styles.title}>
        {logedVisitorUser.nombreEspanol} {logedVisitorUser.apellido}
      </h2>
      <NavigationButtonSignUp step={step} setStep={setStep} fromPage="homeVisitorUser"/>
      <form style={{ width: "100%" }}>
        {step === 1 && (
          <VisitorPersonalForm 
            logedVisitorUser={logedVisitorUser}
          />
        )}
        {step === 2 && (
          <VisitorKehilaForm 
            logedVisitorUser={logedVisitorUser}
          />
        )}
        {step === 3 && (    
          <VisitorFamilyForm 
            logedVisitorUser={logedVisitorUser} 
          />
        )}
        {step === 4 && (    
          <VisitorAccountForm 
            logedVisitorUser={logedVisitorUser} 
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
    maxHeight: "80vh",
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
    paddingRight: 10
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
  }
};
