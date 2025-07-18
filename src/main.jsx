import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "font-awesome/css/font-awesome.min.css"
// import 'https://cdn.jsdelivr.net/npm/@flaticon/icons/font/flaticon.css';
import { BrowserRouter as Router } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import 'react-phone-number-input/style.css'
import "slick-carousel/slick/slick-theme.css";
import { WherebyProvider } from '@whereby.com/browser-sdk/react';
import { Buffer } from "buffer";
import { HelmetProvider } from 'react-helmet-async';
window.global = window;  // Define global to avoid ReferenceError
window.Buffer = Buffer;  // Fix Buffer issue if needed
createRoot(document.getElementById('root')).render(
  // <StrictMode>
   <Router basename='/'>
    <WherebyProvider>
    <HelmetProvider>
    <App/>
    </HelmetProvider>
    </WherebyProvider>
   </Router>
  // </StrictMode>,
)
