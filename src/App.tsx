import './App.css'

import { UserDashboard } from './components/users/AdministratorUserComponents/AdministratorUserDashboard/UserDashboard';
import { OldPerashaInfo } from './components/users/AdministratorUserComponents/AdministratorPerashiot/OldPerashaInfo';
import { AdministratorDefaultDashboard } from './components/users/AdministratorUserComponents/DefaultDashboard';
import { HomeVisitorUserComponent } from './components/users/VisitorUserComponents/HomeVisitorUserCompo';
import NormalUserSignUp from './components/SignUserOptions/NormalUser/SignUp/NormalUserSignUp';
import { SignUpOperator } from './components/SignUserOptions/OperatorUser/SignUpOperator';
import { SignIn } from './components/SignUserOptions/NormalUser/SignIn/SignIn';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import HomePage from './components/page/HomePage/HomePage';
import { Navbar } from './components/page/Navbar/Navbar';
import { PageProvider } from './StoreInfo/page-storage';
import { LogedUserData } from './structs/structs';
import { useEffect, useState } from 'react';
import SplashScreen from './components/page/SplashScreen/SplashScreen';
import { ToastProvider } from './StoreInfo/ToastContext';
import { ToastNotification } from './components/page/ToastNotification/ToastNotification';

function App() {
  const [logedUser, setLogedUser] = useState<LogedUserData | null>()
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const storedLogedUser = localStorage.getItem('logedUser');
  const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)
  
  useEffect(() => {
    setLogedUser(JSON.parse(storedLogedUser!))
  }, [])

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }
  
  console.log("Loged user: ", logedUser, ", condition: ", logedUser != null && (logedUser!.rol == "ADMIN" || logedUser!.rol == "OPERATOR")  );
  return (
    <>
    <Router>
      <PageProvider>
      <ConvexProvider client={convex}>
      <ToastProvider>
          <ToastNotification />
          <Navbar />
          <Routes>
            <>
              <Route path='/' element={logedUser != null && (logedUser!.rol == "ADMIN" || logedUser!.rol == "OPERATOR")? <AdministratorDefaultDashboard /> : <HomePage />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/visitor-user-info' element={<HomeVisitorUserComponent />} />
              <Route path='/administrator-dashboard' element={<AdministratorDefaultDashboard />} />
              <Route path='/administrator-user-info/:id' element={<UserDashboard />} />
              <Route path='/perasha-info/:id' element={<OldPerashaInfo />} />
              <Route path='/create-normal-user' element={<NormalUserSignUp />} />
              <Route path='/create-operator-user' element={<SignUpOperator />}/>
            </>
          </Routes>
      </ToastProvider>
      </ConvexProvider>
      </PageProvider>
    </Router>
    </>
  )
}

export default App
