import React, { createContext, useState, useMemo, ReactNode } from "react";
import { eng_strings, esp_strings } from "../assets/strings";

// Define types for the strings structure
interface LanguageStrings {
  btn_signin: string;
  btn_signup: string;
}

// Define context value type
interface LanguageContextType {
  choosedUserLanguage: string;
  setChoosedUserLanguage: React.Dispatch<React.SetStateAction<string>>;
  strings: LanguageStrings;
}

// Define and export the context
export const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [choosedUserLanguage, setChoosedUserLanguage] = useState("Espanol");

  const changeUserLanguage = (): LanguageStrings => {
    if (choosedUserLanguage === "English" || choosedUserLanguage === "Inglés") {
      return eng_strings;
    }
    return esp_strings;
  };

  const strings = useMemo(() => changeUserLanguage(), [choosedUserLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        choosedUserLanguage,
        setChoosedUserLanguage,
        strings
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
