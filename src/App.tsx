import './App.css'
import FirstPage from './components/FirstPage/FirstPage'
import { Navbar } from './components/Navbar/Navbar'
import NormalUserSignUp from './components/SignUserOptions/NormalUserSignUp'
import { SignIn } from './components/SignUserOptions/SignIn'

function App() {

  return (
    <>
      <Navbar />
      {/*<FirstPage />*/}
      {/*<SignIn />*/}
      <NormalUserSignUp />
    </>
  )
}

export default App
