// App.jsx
import React, { useState, useEffect, createContext, Suspense, lazy } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import useClarityPageView from './Components/UseclarityPageView'
import { API } from './lib/api'

export const context = createContext()


//  lazy-load AppRoutes
const AppRoutes = lazy(() => import('./Components/AppRoutes'))

function App() {

  useClarityPageView();

  const [value, setValue] = useState('')
  const [grade, setGrade] = useState('')
  const [course, setCourse] = useState('')
  const [email, setEmail] = useState('')

  const [name, setName] = useState('')
  const [CountryCode, setCountryCode] = useState('')
  const [CountryName, setCountryName] = useState('')
  const [student,setStudent] = useState('')
  const [teacher, setTeacher] = useState('')
  const [classEndedfully, setClassEndedfully] = useState(false)
  const [proPic, setProPic] = useState('')
  const [seeEarning, setEarning] = useState(true)
  const [DaillyQuizAttempt, setDaillyQuizAttempt] = useState(false)
  

  const navigate = useNavigate()



  useEffect(() => {
      const attempted = localStorage.getItem('attempted')
      setDaillyQuizAttempt(attempted)
    
  }, [])

  useEffect(() => {
    const earning = localStorage.getItem('earning')
    setEarning(earning)
  }, [])

  const getProfilePic = () => {
      axios
        .get(`${API}/profilePic/`)
        .then((res) => setProPic(res.data.image))
        .catch(console.error)
  }

  return (
    <context.Provider
      value={{
        value,
        DaillyQuizAttempt,
        setDaillyQuizAttempt,
        seeEarning,
        setEarning,
        email,
        setEmail,
        classEndedfully,
        setClassEndedfully,
        setTeacher,
        setStudent,
        teacher,
        student,
        setValue,
        CountryCode,
        setCountryCode,
        CountryName,
        setCountryName,
        getProfilePic,
        proPic,
        grade,
        setGrade,
        setName,
        name,
        course, 
        setCourse
      }}
    >
      {/*  wrap lazy import in Suspense */}
      <Suspense fallback={<div>Loading app...</div>}>
        <AppRoutes />
      </Suspense>
    </context.Provider>
  )
}

export default App
