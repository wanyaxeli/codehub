import { useState,createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home.jsx'
import AppRoutes from './Components/AppRoutes'
import axios from 'axios'
export const context = createContext()
function App() {
  const [value, setValue] = useState('')
  const [grade, setGrade] = useState('')
  const [email,setEmail]=useState('')
  const [CountryCode, setCountryCode] = useState('')
  const [student,setStudent]=useState('')
  const [teacher,setTeacher]=useState('')
  return (
    <>
    <context.Provider value={{value,email,setEmail,setTeacher,setStudent,teacher,student,setValue,CountryCode,setCountryCode,grade,setGrade}}>
    <AppRoutes/>
    </context.Provider>
    </>
  )
}

export default App
