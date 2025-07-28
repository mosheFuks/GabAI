import React, { createContext, useState, ReactNode } from "react";
import { ToastData } from "../structs/structs";

// Definir el tipo del contexto
interface ToastContextType {
  toastData: ToastData;
  setToastData: (data: ToastData) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children?: ReactNode;
}
 
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toastData, setToastData] = useState<ToastData>({
    type: 'success',
    message: '', 
    show: false
  });


  return (
    <ToastContext.Provider 
      value={{ 
        toastData, setToastData
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
