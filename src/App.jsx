import { useState,createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home.jsx'
import AppRoutes from './Components/AppRoutes'
import { useNavigate } from 'react-router-dom'
import CookieConsentComponent from './Components/CookieConsent'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
export const context = createContext()
function App() {
  const [value, setValue] = useState('')
  // const [token, setToken] = useState('')
  const [grade, setGrade] = useState('')
  const [email,setEmail]=useState('')
  const [token,setToken]=useState('')
  const [CountryCode, setCountryCode] = useState('')
  const [CountryName, setCountryName] = useState('')
  const [student,setStudent]=useState('')
  const [teacher,setTeacher]=useState('')
  const [classEndedfully,setClassEndedfully]=useState(false)
  const [proPic,setProPic]=useState('')
  const [seeEarning,setEarning]=useState(true)
  const [DaillyQuizAttempt,setDaillyQuizAttempt]=useState(false)
  const navigate=useNavigate()
  async function getToken(){
    try{
        const token= localStorage.getItem('token') // No need to await
        if (token){
          try {
            setToken(token)
            const decode = jwtDecode(token);
            const { exp, role, user_id } = decode;
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            if (exp > currentTime) {
              localStorage.setItem('token', token);
              // Optionally: setRole(role)
            } else {
            
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
function GetAttemptedDaillyQuiz(){
if(token){
  const attempted=localStorage.getItem('attempted')
  setDaillyQuizAttempt(attempted)
}
}
function UpdateSeeEarning(){
  const earning= localStorage.getItem('earning');
  setEarning(earning)
}
useEffect(()=>{
  GetAttemptedDaillyQuiz()
},[token])
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
    <context.Provider value={{value,DaillyQuizAttempt,setDaillyQuizAttempt,seeEarning,setEarning,email,setEmail,classEndedfully,setClassEndedfully,setTeacher,setStudent,teacher,student,setValue,CountryCode,setCountryCode,CountryName,setCountryName,getProfilePic,proPic,grade,setGrade}}>
    <AppRoutes/>
    {/* <CookieConsentComponent/> */}
    </context.Provider>
    </>
  )
}

export default App
