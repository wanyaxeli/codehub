import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClassBooking from '../pages/ClassBooking.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Details from '../pages/Details.jsx';
import Home from '../pages/Home.jsx';
import Laptop from '../pages/Laptop.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Teacher from '../pages/Teacher.jsx';
export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/register' element={<Register/>}/>
        <Route path='/laptop' element={<Laptop/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/teacher' element={<Teacher/>}/>
        <Route path='/teacher/dashboard' element={<Dashboard/>}>
          <Route path='/teacher/dashboard/Details' element={<Details/>}/>
        </Route>
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
