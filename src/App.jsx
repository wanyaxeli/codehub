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
  function getTeacher(token){
   if(token){
    const url='http://127.0.0.1:8000/getTeacher'
    console.log('asdas',token)
    axios.get(url,{headers:{
      'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
      console.log('teachers',res.data)
      const data = res.data
      setTeacher(data)
    })
    .catch(error=>console.log(error))
   }
  }
  function getStudent(token){
    console.log('hello token',token)
   if(token){
    const url='http://127.0.0.1:8000/getstudent'
    axios.get(url,{headers:{
      'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
      console.log('student',res.data)
      const data= res.data
      setStudent(data)
    })
    .catch(error=>console.log(error))
   }
  }
  return (
    <>
    <context.Provider value={{value,email,setEmail,getStudent,getTeacher,teacher,student,setValue,CountryCode,setCountryCode,grade,setGrade}}>
    <AppRoutes/>
    </context.Provider>
    </>
  )
}

export default App
