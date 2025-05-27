import './App.css'

import NormalUserSignUp from './components/SignUserOptions/NormalUser/SignUp/NormalUserSignUp'
import { SignIn } from './components/SignUserOptions/NormalUser/SignIn/SignIn'
import { ToastContext, ToastProvider } from './StoreInfo/ToastContext'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './components/page/HomePage/HomePage'
import { Navbar } from './components/page/Navbar/Navbar'
import { ToastNotification } from './components/page/ToastNotification/ToastNotification';
import { HomeVisitorUserComponent } from './components/users/VisitorUserComponents/HomeVisitorUserCompo';
import { AdministratorDefaultDashboard } from './components/users/AdministratorUserComponents/DefaultDashboard';
import { UserDashboard } from './components/users/AdministratorUserComponents/AdministratorUserDashboard/UserDashboard';
import { OldPerashaInfo } from './components/users/AdministratorUserComponents/AdministratorPerashiot/OldPerashaInfo';
import { SignUpOperator } from './components/SignUserOptions/OperatorUser/SignUpOperator';

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { PageProvider } from './StoreInfo/page-storage';

function App() {
  const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

  return (
    <>
    <Router>
      <PageProvider>
      <ConvexProvider client={convex}>
      <ToastProvider>
          <ToastNotification />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/create-normal-user" element={<NormalUserSignUp />} />
            <Route path='/create-operator-user' element={<SignUpOperator />}/>
            <Route path='/visitor-user-info' element={<HomeVisitorUserComponent />} />
            <Route path='/administrator-user-info/:id' element={<UserDashboard />} />
            <Route path='/administrator-dashboard' element={<AdministratorDefaultDashboard />} />
            <Route path='/perasha-info/:id' element={<OldPerashaInfo />} />
          </Routes>
      </ToastProvider>
      </ConvexProvider>
      </PageProvider>
    </Router>
    </>
  )
}

export default App
