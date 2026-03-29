import { CSSProperties, useContext, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { VisitorPersonalInfo } from "./UserComponents/UserInfo/VisitorPersonalInfo";
import { VisitorKehilaInfo } from "./UserComponents/UserInfo/VisitorKehilaInfo";
import { VisitorFamilyInfo } from "./UserComponents/UserInfo/VisitorFamilyInfo";
import { VisitorAccountInfo } from "./UserComponents/UserInfo/VisitorAccountInfo";

import { VisitorPerashiotInfo } from "./UserComponents/UserInfo/VisitorPerashiotInfo";
import { colors } from "../../../../assets/colors";
import { NavigationButtonSignUp } from "../../../SignUserOptions/NormalUser/SignUp/NavigationButtonsSignUp";
import { getVisitorUserInfo } from "../../../../apis/requests";
import { PageContext } from "../../../../StoreInfo/page-storage";
import { AddUserToAliaModal } from "../AdministratorPerashiot/AddUserToPerashaModal";
import { LoaderComponent } from "../../../../assets/loader";
import { FaArrowLeft } from "react-icons/fa";

interface UserDashboardProps {
  fromPage: "ANIVERSARIES_PAGE" | "USERS_LIST_PAGE";
}

export const UserDashboard = ({ fromPage }: UserDashboardProps) => {
  const { logedUser } = useContext(PageContext) as any;
  const { id } = useParams();
  const [step, setStep] = useState<number>(1);
  const [openAliaModal, setOpenAliaModal] = useState<boolean>(false)

  const [userName, userSurname] = id!.split("-");
  const navigate = useNavigate();

  const user = getVisitorUserInfo(logedUser.kehila, userName, userSurname)

  return (
    <>
    <div style={styles.container}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", height: "70px", gap: "16px" }}>
        <div style={styles.headerLeft}>
          <button style={styles.backBtn} onClick={() => navigate(fromPage === "ANIVERSARIES_PAGE" ? "/aniversaries" : "/administrator-dashboard")}>
            <FaArrowLeft /> Volver
          </button>
        </div>
        <h2 style={styles.title}>
         {userName} {userSurname}
        </h2>
        <button style={{...styles.button, backgroundColor: colors.btn_background}} onClick={() => setOpenAliaModal(true)}>
          Proxima Alia
        </button>
        
      </div>

      {user === undefined ? (
        LoaderComponent()
      ) : user ? (
        <> 
          <NavigationButtonSignUp step={step} setStep={setStep} fromPage="userDashboardPage"/>
          <div style={{ flex: 1, overflow: 'auto', width: '100%' }}>
            <form style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              {step === 1 && (
                <VisitorPersonalInfo 
                  logedVisitorUser={user}
                />
              )}
              {step === 2 && (
                <VisitorKehilaInfo 
                  logedVisitorUser={user}
                />
              )}
              {step === 3 && ( 
                <VisitorFamilyInfo
                  logedVisitorUser={user} 
                />
              )}
              {step === 4 && (    
                <VisitorAccountInfo 
                  logedVisitorUser={user} 
                />
              )}
              {step === 5 && (    
                <VisitorPerashiotInfo 
                  logedVisitorUser={user} 
                />
              )}
            </form>
          </div>
        </>
      ) : (
        <div style={styles.errorContainer}>
          <h2 style={{ color: colors.btn_background, fontSize: '2rem', marginBottom: '20px' }}>Usuario no encontrado</h2>
          <p style={{ color: colors.btn_background, fontSize: '1.2rem', marginBottom: '30px' }}>
            No se encontró información para el usuario {userName} {userSurname}
          </p>
          <button style={{...styles.button, backgroundColor: "blue"}} onClick={() => navigate(fromPage === "ANIVERSARIES_PAGE" ? "/aniversaries" : "/administrator-dashboard")}>
            {fromPage === "ANIVERSARIES_PAGE" ? "Volver a la lista de aniversarios" : "Volver a la lista de usuarios"}
          </button>
        </div>
      )}
    </div>

    {openAliaModal ? (
      <AddUserToAliaModal 
        setOpenAliaModal={setOpenAliaModal}
        openAliaModal={openAliaModal}
        userToAddInThePerasha={user as any}
      />
    ) : (
      null
    )}
    </>
    
  );
};

const styles: { [key: string]: CSSProperties }= {
  container: {
    flex: 1,
    backgroundColor: colors.main_background,
    borderRadius: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "0",
    padding: "20px",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1f2937",
    borderBottom: "2px solid #3b82f6",
    paddingBottom: "8px",
    margin: "0 20px",
    flex: "1",
    textAlign: "center",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    border: "none",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
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
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: "40px 20px",
  } as CSSProperties,
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  } as CSSProperties,
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#07b45b",
    color: "#ffffff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  } as CSSProperties,
};
