import { CSSProperties, useContext, useEffect, useState } from "react";
import { colors } from "../../../assets/colors";
import { VisitorPersonalForm } from "./VisitorUserForm/VisitorPersonalForm";
import { VisitorKehilaForm } from "./VisitorUserForm/VisitorKehilaForm";
import { VisitorFamilyForm } from "./VisitorUserForm/VisitorFamilyForm";
import { VisitorAccountForm } from "./VisitorUserForm/VisitorAccountForm";
import { NavigationButtonSignUp } from "../../SignUserOptions/NormalUser/SignUp/NavigationButtonsSignUp";
import { PageContext } from "../../../StoreInfo/page-storage";
import { EditPropertyModal } from "./EditPropertyModal/EditPropertyModal";
import { getVisitorUserInfoOnSignIn } from "../../../apis/requests";
import { useConvex } from "convex/react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

export const HomeVisitorUserComponent = () => {
  const { logedVisitorUser, logedUser, updateVisitorUserInfo } = useContext(PageContext) as any;
  const [step, setStep] = useState<number>(1);
  const [openEditPropertyModal, setOpenEditPropertyModal] = useState<boolean>(false);
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
      { !userChangedSomeProperty ? (
        <>
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
          <div style={{ flex: 1, overflow: 'auto', width: '100%' }}>
            <form style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                  setUserChangedSomeProperty={setUserChangedSomeProperty}
                />
              )}
              {step === 4 && (    
                <VisitorAccountForm 
                  logedVisitorUser={logedVisitorUser} 
                />
              )}

              {openEditPropertyModal && (
                <div>
                  <EditPropertyModal 
                    openEditPropertyModal={openEditPropertyModal} 
                    setOpenEditPropertyModal={setOpenEditPropertyModal}
                    setUserChangedSomeProperty={setUserChangedSomeProperty}
                  />
                </div>
              )}
            </form>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '3rem', justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100%', flexDirection: 'column' }}>
          <ClipLoader color="black" loading={true} size={50} />
          <h6 style={{ color: colors.btn_background, fontSize: '1.5rem' }}>Actualizando información del Mitpalel...</h6>
        </div>
      )}
    </div>
    </>
  );
};

const styles: { [key: string]: CSSProperties }= {
  container: {
    backgroundColor: colors.main_background,
    borderRadius: "25px",
    width: "95%",
    height: "79vh", // altura fija
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
