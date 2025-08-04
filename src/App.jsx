import { useState,createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home.jsx'
import AppRoutes from './Components/AppRoutes'
import { useNavigate } from 'react-router-dom'
import CookieConsent from "react-cookie-consent";
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
export const context = createContext()
function App() {
  const [value, setValue] = useState('')
  // const [token, setToken] = useState('')
  const [grade, setGrade] = useState('')
  const [email,setEmail]=useState('')
  const [CountryCode, setCountryCode] = useState('')
  const [CountryName, setCountryName] = useState('')
  const [student,setStudent]=useState('')
  const [teacher,setTeacher]=useState('')
  const [classEndedfully,setClassEndedfully]=useState(false)
  const [proPic,setProPic]=useState('')
  const [seeEarning,setEarning]=useState(true)
  const navigate=useNavigate()
  async function getToken(){
    try{
        const token= localStorage.getItem('token') // No need to await
        if (token){
          try {
            const decode = jwtDecode(token);
            const { exp, role, user_id } = decode;
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            if (exp > currentTime) {
              console.log("Token is valid");
              console.log("Decoded Token:", decode);
              localStorage.setItem('token', token);
              // Optionally: setRole(role)
            } else {
              console.warn("Token has expired, not storing.");
              localStorage.removeItem('token',token)
              navigate('/Login')
            }
          } catch (error) {
            console.error("JWT Decode Error:", error);
          }
        }
    } catch(error) {
        console.log(error);
    }
}
function UpdateSeeEarning(){
  const earning= localStorage.getItem('earning');
  setEarning(earning)
}
useState(()=>{
UpdateSeeEarning()
getToken()
},[])
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
} 
  return (
    <>
    <context.Provider value={{value,seeEarning,setEarning,email,setEmail,classEndedfully,setClassEndedfully,setTeacher,setStudent,teacher,student,setValue,CountryCode,setCountryCode,CountryName,setCountryName,getProfilePic,proPic,grade,setGrade}}>
    <AppRoutes/>
    </context.Provider>
    </>
  )
}

export default App
