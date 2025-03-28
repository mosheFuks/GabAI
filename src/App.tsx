import './App.css'
import FirstPage from './components/FirstPage/FirstPage'
import { Navbar } from './components/Navbar/Navbar'
import NormalUserSignUp from './components/SignUserOptions/NormalUser/SignUp/NormalUserSignUp'
import { SignIn } from './components/SignUserOptions/SignIn'
import { ToastNotification } from './components/ToastNotification/ToastNotification'
import { ToastProvider } from './StoreInfo/ToastContext'

function App() {

  return (
    <>
      <ToastProvider>
        <ToastNotification />
        <Navbar />
        {/*<FirstPage />*/}
        {/*<SignIn />*/}
        <NormalUserSignUp />
      </ToastProvider>
    </>
  )
}

export default App
