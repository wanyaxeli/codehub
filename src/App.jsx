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
  const [CountryName, setCountryName] = useState('')
  const [student,setStudent]=useState('')
  const [teacher,setTeacher]=useState('')
  const [classEndedfully,setClassEndedfully]=useState(false)
  const [proPic,setProPic]=useState('')
  function getProfilePic(token){
   if(token){
    const url='https://api.codingscholar.com/profilePic/'
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
    <context.Provider value={{value,email,setEmail,classEndedfully,setClassEndedfully,setTeacher,setStudent,teacher,student,setValue,CountryCode,setCountryCode,CountryName,setCountryName,getProfilePic,proPic,grade,setGrade}}>
    <AppRoutes/>
    </context.Provider>
    </>
  )
}

export default App
