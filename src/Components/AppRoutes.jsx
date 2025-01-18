import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClassBooking from '../pages/ClassBooking.jsx';
import Home from '../pages/Home.jsx';
import Laptop from '../pages/Laptop.jsx';
import Register from '../pages/Register.jsx';
export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/register' element={<Register/>}/>
        <Route path='/laptop' element={<Laptop/>}/>
        <Route path='/Class booking' element={<ClassBooking/>}/>
    {/* <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NoPage />} />
    </Route> */}
  </Routes>
  )
}
