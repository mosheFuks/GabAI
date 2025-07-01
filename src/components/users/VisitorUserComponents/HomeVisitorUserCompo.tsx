import { CSSProperties, useContext, useState } from "react";
import { colors } from "../../../assets/colors";
import { VisitorPersonalForm } from "./VisitorUserForm/VisitorPersonalForm";
import { VisitorKehilaForm } from "./VisitorUserForm/VisitorKehilaForm";
import { VisitorFamilyForm } from "./VisitorUserForm/VisitorFamilyForm";
import { VisitorAccountForm } from "./VisitorUserForm/VisitorAccountForm";
import { NavigationButtonSignUp } from "../../SignUserOptions/NormalUser/SignUp/NavigationButtonsSignUp";
import { PageContext } from "../../../StoreInfo/page-storage";
import { EditPropertyModal } from "./EditPropertyModal/EditPropertyModal";

export const HomeVisitorUserComponent = () => {
  const { logedVisitorUser } = useContext(PageContext) as any;
  const [step, setStep] = useState<number>(1);
  const [openEditPropertyModal, setOpenEditPropertyModal] = useState<boolean>(false);

  return (
    <>
    <div style={styles.container}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", height: "70px" }}>
        <div style={{...styles.button, backgroundColor: colors.main_background, color: colors.main_background, cursor: '-moz-grab'}}></div>
        <h2 style={styles.title}>
          {logedVisitorUser.nombreEspanol} {logedVisitorUser.apellido}
        </h2>
        <button style={{...styles.button, backgroundColor: "green"}} onClick={() => setOpenEditPropertyModal(true)}>
          Editar información
        </button>
      </div>
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

        {openEditPropertyModal && (
          <div>
            <EditPropertyModal openEditPropertyModal={openEditPropertyModal} setOpenEditPropertyModal={setOpenEditPropertyModal} />
          </div>
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
    width: "95%",
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
