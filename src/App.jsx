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
  const [proPic,setProPic]=useState()
  function getProfilePic(token){
   if(token){
    console.log('token www', token)
    const url='http://127.0.0.1:8000/profilePic/'
    axios.get(url,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    .then(res=>{
        console.log('res pic',res.data)
        setProPic(res.data.image)
    })
    .catch(error=>console.log(error)) 
   } 
}  console.log('pro',proPic)
  return (
    <>
    <context.Provider value={{value,email,setEmail,setTeacher,setStudent,teacher,student,setValue,CountryCode,setCountryCode,getProfilePic,proPic,grade,setGrade}}>
    <AppRoutes/>
    </context.Provider>
    </>
  )
}

export default App
