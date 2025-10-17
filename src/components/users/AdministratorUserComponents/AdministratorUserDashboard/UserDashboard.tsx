import { CSSProperties, useContext, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { VisitorPersonalInfo } from "./UserComponents/UserInfo/VisitorPersonalInfo";
import { VisitorKehilaInfo } from "./UserComponents/UserInfo/VisitorKehilaInfo";
import { VisitorFamilyInfo } from "./UserComponents/UserInfo/VisitorFamilyInfo";
import { VisitorAccountInfo } from "./UserComponents/UserInfo/VisitorAccountInfo";

import {FaArrowLeft } from "react-icons/fa";
import { VisitorPerashiotInfo } from "./UserComponents/UserInfo/VisitorPerashiotInfo";
import { colors } from "../../../../assets/colors";
import { NavigationButtonSignUp } from "../../../SignUserOptions/NormalUser/SignUp/NavigationButtonsSignUp";
import { getVisitorUserInfo } from "../../../../apis/requests";
import { PageContext } from "../../../../StoreInfo/page-storage";

export const UserDashboard = () => {
  const { logedUser } = useContext(PageContext) as any;
  const { id } = useParams();
  const [step, setStep] = useState<number>(1);

  const [userName, userSurname] = id!.split("-");
  const navigate = useNavigate();

  const user = getVisitorUserInfo(logedUser.kehila, userName, userSurname)

  return (
    <>
    <div style={styles.container}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", height: "70px" }}>
        <button style={{...styles.button, backgroundColor: "green"}} onClick={() => navigate("/administrator-dashboard")}>
          <FaArrowLeft className="text-black" /> Lista de usuarios
        </button>
        <h2 style={styles.title}>
         {userName} {userSurname}
        </h2>
        <div style={{...styles.button, backgroundColor: colors.main_background, color: colors.main_background, cursor: '-moz-grab'}}></div>
      </div>
      <NavigationButtonSignUp step={step} setStep={setStep} fromPage="userDashboardPage"/>
      <div style={{ flex: 1, overflow: 'auto', width: '100%' }}>
        {user != undefined ? (
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
        ) : (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '3rem' }}>
            <h5 style={{ color: colors.btn_background }}>No se encontro información de ese Mitpalel</h5>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

const styles: { [key: string]: CSSProperties }= {
  container: {
    flex: 1,
    backgroundColor: colors.main_background,
    borderRadius: "25px",
    width: "95%",
    minWidth: "720px",
    minHeight: "79vh", // altura fija
    display: "flex",
    flexDirection: "column",
    margin: "20px auto 0 auto",
    padding: "10px 20px",
    overflow: "hidden", // oculta desbordes
    marginBottom: "20px",
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
