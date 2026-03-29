import { CSSProperties, useContext, useEffect, useState } from "react";
import { colors } from "../../../assets/colors";
import { VisitorPersonalForm } from "./VisitorUserForm/VisitorPersonalForm";
import { VisitorKehilaForm } from "./VisitorUserForm/VisitorKehilaForm";
import { VisitorFamilyForm } from "./VisitorUserForm/VisitorFamilyForm";
import { VisitorAccountForm } from "./VisitorUserForm/VisitorAccountForm";
import { NavigationButtonSignUp } from "../../SignUserOptions/NormalUser/SignUp/NavigationButtonsSignUp";
import { PageContext } from "../../../StoreInfo/page-storage";
import { getVisitorUserInfoOnSignIn } from "../../../apis/requests";
import { useConvex } from "convex/react";
import { toast } from "react-toastify";

export const HomeVisitorUserComponent = () => {
  const { logedVisitorUser, logedUser, updateVisitorUserInfo } = useContext(PageContext) as any;
  const [step, setStep] = useState<number>(1);
  const [userChangedSomeProperty, setUserChangedSomeProperty] = useState<boolean>(false);

  const convex = useConvex();

  const updateSignedInVisitorUser = async () => {
    try {
      const updatedUser = await getVisitorUserInfoOnSignIn(convex, logedUser.kehila, logedUser.email);
      updateVisitorUserInfo(updatedUser);
      await new Promise(resolve => setTimeout(resolve, 5000)); // ⏱️ pausa de 5 segundos
      setUserChangedSomeProperty(false);
    } catch (error) {
      toast.error("Ocurrio un error al actualizar los datos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", 
        style: { backgroundColor: 'red', color: 'white' },
      });
    }
  };

  useEffect(() => {
    if (userChangedSomeProperty) {
      updateSignedInVisitorUser();
    }
  }, [userChangedSomeProperty]);

  return (
    <>
    <div style={styles.container}>
        <>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", paddingTop: "8px", paddingBottom: "4px" }}>
            <h2 style={styles.title}>
              {logedVisitorUser.nombreEspanol} {logedVisitorUser.apellido}
            </h2>
            <div style={{ display: "flex", flexDirection: "row", gap: "12px", marginTop: "4px" }}>
              <span style={styles.badgeKehila}>{logedVisitorUser.nombreKehila}</span>
              <span style={styles.badgeMinian}>{logedVisitorUser.minian}</span>
              <span style={styles.badgeGrupo}>{logedVisitorUser.grupo}</span>
            </div>
          </div>
          <NavigationButtonSignUp step={step} setStep={setStep} fromPage="homeVisitorUser"/>
          <div style={{ flex: 1, overflow: 'auto', width: '100%' }}>
            <form style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              {step === 1 && (
                <VisitorPersonalForm 
                  logedVisitorUser={logedVisitorUser}
                  setUserChangedSomeProperty={setUserChangedSomeProperty}
                />
              )}
              {step === 2 && (
                <VisitorKehilaForm 
                  logedVisitorUser={logedVisitorUser}
                  setUserChangedSomeProperty={setUserChangedSomeProperty}
                />
              )}
              {step === 3 && (    
                <VisitorFamilyForm 
                  logedVisitorUser={logedVisitorUser} 
                  setUserChangedSomeProperty={setUserChangedSomeProperty}
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
    </div>
    </>
  );
};

const styles: { [key: string]: CSSProperties }= {
  container: {
    backgroundColor: colors.main_background,
    borderRadius: "20px",
    width: "95%",
    height: "82vh",
    display: "flex",
    flexDirection: "column",
    margin: "16px auto 0 auto",
    padding: "24px 32px",
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e8ecf4",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "700",
    color: "#1f2937",
    margin: 0,
  },
  badgeKehila: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#1e40af",
    backgroundColor: "#dbeafe",
    border: "1px solid #93c5fd",
    padding: "3px 10px",
    borderRadius: "12px",
  } as CSSProperties,
  badgeMinian: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#065f46",
    backgroundColor: "#d1fae5",
    border: "1px solid #6ee7b7",
    padding: "3px 10px",
    borderRadius: "12px",
  } as CSSProperties,
  badgeGrupo: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#92400e",
    backgroundColor: "#fef3c7",
    border: "1px solid #fcd34d",
    padding: "3px 10px",
    borderRadius: "12px",
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
  }
};
