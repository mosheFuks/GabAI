import './App.css'

import { UserDashboard } from './components/users/AdministratorUserComponents/AdministratorUserDashboard/UserDashboard';
import { DonationPerPerashaInfo } from './components/users/AdministratorUserComponents/AdministratorPerashiot/DonationPerPerashaInfo';
import { AdministratorDefaultDashboard } from './components/users/AdministratorUserComponents/DefaultDashboard';
import { HomeVisitorUserComponent } from './components/users/VisitorUserComponents/HomeVisitorUserCompo';
import NormalUserSignUp from './components/SignUserOptions/NormalUser/SignUp/NormalUserSignUp';
import { SignUpOperator } from './components/SignUserOptions/OperatorUser/SignUpOperator';
import { ToastNotification } from './components/page/ToastNotification/ToastNotification';
import { SignIn } from './components/SignUserOptions/NormalUser/SignIn/SignIn';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
/*import SplashScreen from './components/page/SplashScreen/SplashScreen';*/
import { ConvexProvider, ConvexReactClient } from "convex/react";
import HomePage from './components/page/HomePage/HomePage';
import { Navbar } from './components/page/Navbar/Navbar';
import { Sidebar } from './components/page/Sidebar/Sidebar';
import { ToastProvider } from './StoreInfo/ToastContext';
import { PageProvider } from './StoreInfo/page-storage';
import { useContext, useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AliotPerPershaInfo } from './components/users/AdministratorUserComponents/AdministratorPerashiot/AliotPerPerashaInfo';
import { PageContext } from './StoreInfo/page-storage';
import { CSSProperties } from 'react';
import { DonationPerPersha } from './components/users/AdministratorUserComponents/AdministratorPerashiot/DonationPerPerasha';
import { AliotPerPersha } from './components/users/AdministratorUserComponents/AdministratorPerashiot/AliotPerPerasha';
import { ThisWeekAniversariesList } from './components/users/AdministratorUserComponents/AdministratorPerashiot/ThisWeekAniversariesList';
import { ProtectedRoute } from './components/page/ProtectedRoute/ProtectedRoute';

Modal.setAppElement('#root');

function AppLayout() {
  const { logedUser, isAuthLoading } = useContext(PageContext) as any;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showSidebar = !isAuthLoading && logedUser && (logedUser.rol === "ADMIN" || logedUser.rol === "OPERATOR") && !isMobile;
  const mainStyle = showSidebar ? layoutStyles.mainWithSidebar : layoutStyles.main;

  return (
    <div style={layoutStyles.container}>
      <Navbar />
      {!isAuthLoading && logedUser && (logedUser.rol === "ADMIN" || logedUser.rol === "OPERATOR") && !isMobile && (
        <Sidebar />
      )}
      <div style={mainStyle}>
        <Routes>
          <>
            <Route path='/' element={isAuthLoading ? null : logedUser != null && (logedUser!.rol == "ADMIN" || logedUser!.rol == "OPERATOR")? <AdministratorDefaultDashboard /> : <HomePage />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/visitor-user-info' element={<HomeVisitorUserComponent />} />
            <Route path='/create-normal-user' element={<NormalUserSignUp />} />
            <Route path='/create-operator-user' element={<SignUpOperator />}/>

            {/* Rutas protegidas: solo ADMIN u OPERATOR */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN", "OPERATOR"]} />}>
              {/*Admin Dashboard*/}
              <Route path="/administrator-dashboard/">
                <Route index element={<AdministratorDefaultDashboard />} />
                <Route path='/administrator-dashboard/user/:id' element={<UserDashboard fromPage={location.state?.fromPage || "ANIVERSARIES_PAGE"} />} />
              </Route>

              {/*Donations*/}
              <Route path="/perasha-info/donation/">
                <Route index element={<DonationPerPersha />} />
                <Route path=":id" element={<DonationPerPerashaInfo />} />
              </Route>

              {/*Aliot */}
              <Route path="/perasha-info/aliot/">
                <Route index element={<AliotPerPersha />} />
                <Route path=":id" element={<AliotPerPershaInfo />} />
              </Route>

              {/*Aniversaries*/}
              <Route path="/aniversaries/">
                <Route index element={<ThisWeekAniversariesList />} />
                <Route path='/aniversaries/user/:id' element={<UserDashboard fromPage={location.state?.fromPage || "USERS_LIST_PAGE"} />} />
              </Route>
            </Route>
          </>
        </Routes>
      </div>
    </div>
  );
}

function App() {
  /*const [logedUser, setLogedUser] = useState<LogedUserData | null>()*/
  /*const [showSplash, setShowSplash] = useState<boolean>(true);*/
  /*const storedLogedUser = localStorage.getItem('logedUser');*/
  const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)
  
  /*useEffect(() => {
    setLogedUser(JSON.parse(storedLogedUser!))
  }, [])*/

  /*if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }*/

  return (
    <>
    <Router>
      <PageProvider>
      <ConvexProvider client={convex}>
      <ToastProvider>
          <ToastNotification />
          <AppLayout />
      </ToastProvider>
      </ConvexProvider>
      </PageProvider>
    </Router>
    </>
  )
}

const layoutStyles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
  } as CSSProperties,
  main: {
    flex: 1,
    marginTop: "70px",
    marginLeft: "0",
    padding: "0",
    height: "calc(100vh - 70px)",
    width: "100%",
    overflow: "hidden",
  } as CSSProperties,
  mainWithSidebar: {
    flex: 1,
    marginTop: "70px",
    marginLeft: "170px",
    padding: "0",
    height: "calc(100vh - 70px)",
    width: "calc(100% - 170px)",
    overflow: "hidden",
  } as CSSProperties,
};

export default App
