import { createContext, useState, ReactNode, useEffect } from "react";
import { LogedUserData, VisitorUser } from "../structs/structs";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

// Definir el tipo del contexto
interface PageContextType {
  logedUser: LogedUserData;
  setLogedUser: (logedUser: LogedUserData) => void;
  updateLocalUser: (logedUser: LogedUserData) => void;
  logedVisitorUser: VisitorUser;
  setLogedVisitorUser: (logedVisitorUser: VisitorUser) => void;
  updateVisitorUserInfo: (logedVisitorUser: VisitorUser) => void;
  signOut: () => void
}

export const PageContext = createContext<PageContextType | undefined>(undefined);

interface PageProviderProps {
  children?: ReactNode;
}
 
export const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
  const navigate = useNavigate()
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

  useEffect(() => {
    const storedLogedUser = localStorage.getItem('logedUser');
    const storedLogedVisitorUser = localStorage.getItem('logedVisitorUser');

    if (storedLogedUser) {
      setLogedUser(JSON.parse(storedLogedUser));
    }

    if (storedLogedVisitorUser) {
      setLogedVisitorUser(JSON.parse(storedLogedVisitorUser));
    }
  }, []);

  const updateLocalUser = (logedUser: LogedUserData) => {
    setLogedUser(logedUser);
    localStorage.setItem('logedUser', JSON.stringify(logedUser));
  };

  const updateVisitorUserInfo = (logedVisitorUser: VisitorUser) => {
    setLogedVisitorUser(logedVisitorUser);
    localStorage.setItem('logedVisitorUser', JSON.stringify(logedVisitorUser));
  };

  const signOut = async () => {
    try {
      await signOut(); // Cierra la sesión en Firebase
      console.log("✅ Usuario deslogueado");

      localStorage.clear()
      setLogedUser({
        email: '',
        nombre: '',
        rol: '',
        kehila: ''
      })
      setLogedVisitorUser({
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
      })

      // Redirigir al login
      navigate("/sign-in");
    } catch (error) {
      console.error("❌ Error al cerrar sesión:", error);
    }
  }

  return (
    <PageContext.Provider
      value={{
        updateLocalUser,
        logedUser, setLogedUser,
        updateVisitorUserInfo,
        logedVisitorUser, setLogedVisitorUser,
        signOut
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
