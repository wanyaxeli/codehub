import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "font-awesome/css/font-awesome.min.css"
import { BrowserRouter as Router } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Router>
    <App/>
   </Router>
  </StrictMode>,
)
