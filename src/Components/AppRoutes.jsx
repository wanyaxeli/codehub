import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudents from '../pages/AddStudents.jsx';
import AddTeachers from '../pages/AddTeachers.jsx';
import AllStudents from '../pages/AllStudents.jsx';
import AllTeachers from '../pages/AllTeachers.jsx';
import Calendar from '../pages/Calendar.jsx';
import Class from '../pages/Class.jsx';
import ClassBooking from '../pages/ClassBooking.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Details from '../pages/Details.jsx';
import Home from '../pages/Home.jsx';
import Laptop from '../pages/Laptop.jsx';
import Login from '../pages/Login.jsx';
import MyStudents from '../pages/MyStudents.jsx';
import Projects from '../pages/Projects.jsx';
import Register from '../pages/Register.jsx';
import StudentDashboard from '../pages/StudentDashboard.jsx';
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
        <Route index element={<Details/>}/>
          <Route path='/teacher/dashboard/Details' element={<Details/>}/>
          <Route path='/teacher/dashboard/Calendar' element={<Calendar/>}/>
          <Route path='/teacher/dashboard/My students' element={<MyStudents/>}/>
          <Route path='/teacher/dashboard/Projects' element={<Projects/>}/>
          <Route path='/teacher/dashboard/All Teachers' element={<AllTeachers/>}/>
          <Route path='/teacher/dashboard/All Students' element={<AllStudents/>}/>
          <Route path='/teacher/dashboard/Add Teachers' element={<AddTeachers/>}/>
          <Route path='/teacher/dashboard/Add Students' element={<AddStudents/>}/>
        </Route>
        <Route path='/student/dashboard' element={<StudentDashboard/>}></Route>
        <Route path='/Class booking' element={<ClassBooking/>}/>
        <Route path='/Class ' element={<Class/>}/>
    {/* <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NoPage />} />
    </Route> */}
  </Routes>
  )
}
