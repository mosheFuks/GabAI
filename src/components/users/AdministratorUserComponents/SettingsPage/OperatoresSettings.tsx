//Make an OperatorsSettings component that will be used in the sidebar for the operators settings page, it should have a title and a description, and a button to go back to the users list page

import { CSSProperties, useContext, useState } from "react";
import { colors } from "../../../../assets/colors";
import { PageContext } from "../../../../StoreInfo/page-storage";
import { api } from "../../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { getOperatorsList, getOperatorUser } from '../../../../apis/requests';
import { LoaderComponent } from '../../../../assets/loader';
import { deleteUser } from "firebase/auth";
import { toast } from "react-toastify";


export const OperatorsSettings = () => {
    const { logedUser } = useContext(PageContext) as any;
    const [isLoading, setIsLoading] = useState(true);
    
    const operatorsList = getOperatorsList(logedUser.kehila);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    const deleteOperatorUser = useMutation(api.kehila.deleteOperatorUser);

    const deleteOperatorUserFromDB = (nombreKehila: string, email: string) => {
      //Here we would call the api to delete the user from the database
      try {
        deleteOperatorUser({
          nombreKehila: nombreKehila,
          email: email
        });
        toast.success("Operador eliminado exitosamente");
      } catch (error) {
        toast.error("Error al eliminar el operador");
      }
    }

    return (
        <>
        <div style={styles.container}>
            <div>
                <h2 style={styles.title}>Configuración de Operadores</h2>
                <div style={styles.description}>Aquí puedes configurar los operadores de tu Kehila.</div>
            </div>

            {!isLoading ? (
              <div style={{ flex: 1, overflowY: "auto", padding: "10px", borderRadius: "5px" }}>
                {operatorsList && operatorsList.length == 0 ? (
                    <div style={styles.emptyState}>
                      <h3 style={styles.emptyStateText}>No hay usuarios operadores</h3>
                      <p style={styles.emptyStateSubtext}>Para agregar operadores, haz click en el botón "Agregar Operador"</p>
                    </div>
                ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Nombre</th>
                            <th style={styles.th}>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {operatorsList?.map((persona, index) => {
                            const nombre = persona.nombre + " " + persona.apellido;
                            const email = persona.email;
                            
                            return (
                                <tr key={index}>
                                    <td style={styles.td} data-label="Nombre">{nombre}</td>
                                    <td style={styles.td} data-label="Email">{email}</td>
                                    {/*Add a delete user button on click eliminate the user*/}
                                    <button style={styles.button} onClick={() => deleteOperatorUserFromDB(logedUser.kehila, persona.email)}>Eliminar</button>
                                </tr>
                            );
                        })} 
                    </tbody>
                </table>
                )}
              </div>
            )  : (
              LoaderComponent()
            )}
        </div>
        </> 

    )
}  

const styles: { [key: string]: CSSProperties } = {
    container: {
    backgroundColor: colors.main_background,
    //borderRadius: "0",
    //width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    //alignItems: "flex-start",
    margin: "0",
    //textAlign: "left",  
    overflow: "auto",
    //boxSizing: "border-box",
    gap: "24px",
    padding: "24px",  
  } as CSSProperties,
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1f2937",
    margin: 0,
  } as CSSProperties,   
  description: {
    fontSize: "18px",
    color: "#6b7280",
    marginTop: "4px",
  } as CSSProperties,
  

  dashboard: {
    backgroundColor: "black",
    borderRadius: "8px",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: "0",
    textAlign: "left",
    overflow: "auto",
    boxSizing: "border-box",
    gap: "16px",
    padding: "16px",
  } as CSSProperties,
  subtitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "yellow",
    margin: 0,
  } as CSSProperties,
    operatorList: { 
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  } as CSSProperties,
  button: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "8px",
  } as CSSProperties,
  tableContainer: {
    height: 'auto',
    overflowY: 'auto',
    padding: '10px',
    borderRadius: '5px',
  } as CSSProperties,
  table: {
    borderCollapse: 'separate',
    borderSpacing: '10px 12px',
    minWidth: '800px', // ✅ clave para habilitar el scroll horizontal
    width: '100%',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'center',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: '#ffffff',
    fontSize: '0.95rem',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    borderRadius: '8px',
    border: '1px solid #1e40af',
  },
  td: {
    padding: '14px 16px',
    background: '#ffffff',
    fontSize: '0.95rem',
    color: '#1f2937',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    transition: 'all 0.2s ease',
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    textAlign: "center",
  } as CSSProperties,
  emptyStateText: {
    fontSize: "24px",
    color: colors.aliot,
    margin: "0 0 8px 0",
  } as CSSProperties,
  emptyStateSubtext: {
    fontSize: "18px",
    color: "#9ca3af",
    margin: 0,
  } as CSSProperties,
};  