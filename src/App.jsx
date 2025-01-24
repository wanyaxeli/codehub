import { useState,createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home.jsx'
import AppRoutes from './Components/AppRoutes'
export const context = createContext()
function App() {
  const [value, setValue] = useState('')
  const [grade, setGrade] = useState('')
  const [CountryCode, setCountryCode] = useState('')

  return (
    <>
    <context.Provider value={{value,setValue,CountryCode,setCountryCode,grade,setGrade}}>
    <AppRoutes/>
    </context.Provider>
    </>
  )
}

export default App
