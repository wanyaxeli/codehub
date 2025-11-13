// App.jsx
import React, { useState, useEffect, createContext, Suspense, lazy } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const context = createContext()

//  lazy-load AppRoutes
const AppRoutes = lazy(() => import('./Components/AppRoutes'))

function App() {
  const [value, setValue] = useState('')
  const [grade, setGrade] = useState('')
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [CountryCode, setCountryCode] = useState('')
  const [CountryName, setCountryName] = useState('')
  const [student, setStudent] = useState('')
  const [teacher, setTeacher] = useState('')
  const [classEndedfully, setClassEndedfully] = useState(false)
  const [proPic, setProPic] = useState('')
  const [seeEarning, setEarning] = useState(true)
  const [DaillyQuizAttempt, setDaillyQuizAttempt] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        setToken(token)
        const decode = jwtDecode(token)
        const { exp } = decode
        if (exp <= Math.floor(Date.now() / 1000)) {
          localStorage.removeItem('token')
          navigate('/Login')
        }
      } catch (error) {
        console.error('JWT Decode Error:', error)
      }
    }
  }, [navigate])

  useEffect(() => {
    if (token) {
      const attempted = localStorage.getItem('attempted')
      setDaillyQuizAttempt(attempted)
    }
  }, [token])

  useEffect(() => {
    const earning = localStorage.getItem('earning')
    setEarning(earning)
  }, [])

  const getProfilePic = (token) => {
    if (token) {
      axios
        .get('https://api.codingscholar.com/profilePic/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setProPic(res.data.image))
        .catch(console.error)
    }
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
