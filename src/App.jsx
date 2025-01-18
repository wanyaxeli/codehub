import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home.jsx'
import AppRoutes from './Components/AppRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AppRoutes/>
    </>
  )
}

export default App
