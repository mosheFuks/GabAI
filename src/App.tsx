import './App.css'
import HomePage from '../src/components/HomePage/HomePage'
import { Navbar } from './components/Navbar/Navbar'
import NormalUserSignUp from './components/SignUserOptions/NormalUser/SignUp/NormalUserSignUp'
import { SignIn } from './components/SignUserOptions/NormalUser/SignIn/SignIn'
import { ToastNotification } from './components/ToastNotification/ToastNotification'
import { ToastProvider } from './StoreInfo/ToastContext'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
    <Router>
      <ToastProvider>
          <ToastNotification />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/create-normal-user" element={<NormalUserSignUp />} />
          </Routes>
      </ToastProvider>
    </Router>
    </>
  )
}

export default App
