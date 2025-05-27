import { createContext, useState, ReactNode } from "react";
import { LogedUserData, VisitorUser } from "../structs/structs";

// Definir el tipo del contexto
interface PageContextType {
  logedUser: LogedUserData;
  setLogedUser: (logedUser: LogedUserData) => void;
  updateLocalUser: (logedUser: LogedUserData) => void;
  logedVisitorUser: VisitorUser;
  setLogedVisitorUser: (logedVisitorUser: VisitorUser) => void;
  updateVisitorUserInfo: (logedVisitorUser: VisitorUser) => void;
}

export const PageContext = createContext<PageContextType | undefined>(undefined);

interface PageProviderProps {
  children?: ReactNode;
}
 
export const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
  const [logedUser, setLogedUser] = useState<LogedUserData>({
    email: '',
    nombre: '',
    rol: '',
    kehila: ''
  });
  const [logedVisitorUser, setLogedVisitorUser] = useState<VisitorUser>({
    tipoUsuario: "",
    nombreKehila: "",
    nombreEspanol: "",
    nombreHebreo: "",
    apellido: "",
    fechaNacimientoGregoriano: {
      dia: "",
      mes: "",
      ano: ""
    },
    fechaNacimientoHebreo: {
      dia: "",
      mes: "",
      ano: ""
    },
    emailPersonal: "",
    emailComercial: "", //Opcional
    telefono: "",
    direccion: "",
    minian: "",
    numeroSocio: "",
    grupo: "",

    fechaBarMitzvaGregoriano: {
      dia: "",
      mes: "",
      ano: ""
    },
    fechaBarMitzvaHebreo: {
      dia: "",
      mes: "",
      ano: ""
    },
    perashaBarMitzva: "",
    habilidades: [""], //Leer tora, haftara, ser jazan
    nombreMadreEspanol: "",
    nombreMadreHebreo: "",
    nombrePadreEspanol: "",
    nombrePadreHebreo: "",

    estadoCivil: "",
    nombreEsposaEspanol: "",
    nombreEsposaHebreo: "",

    hijos: [],
    aniversarios: [],

    cuenta: []
  });

  const updateLocalUser = (logedUser: LogedUserData) => {
    setLogedUser(logedUser);
  };

  const updateVisitorUserInfo = (logedUser: VisitorUser) => {
    setLogedVisitorUser(logedUser);
  };

  return (
    <PageContext.Provider
      value={{
        updateLocalUser,
        logedUser, setLogedUser,
        updateVisitorUserInfo,
        logedVisitorUser, setLogedVisitorUser
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
