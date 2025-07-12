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
import MyProjects from '../pages/MyProjects.jsx';
import MyStudents from '../pages/MyStudents.jsx';
import Projects from '../pages/Projects.jsx';
import Register from '../pages/Register.jsx';
import StudentDashboard from '../pages/StudentDashboard.jsx';
import MyLessons from '../pages/students/MyLessons.jsx';
import MyQuizzes from '../pages/students/MyQuizzes.jsx';
import StudentDetails from '../pages/students/StudentDetails.jsx';
import Teacher from '../pages/Teacher.jsx';
import Quiz from '../pages/students/Quiz.jsx';
import SetQuiz from '../pages/SetQuiz.jsx';
import StudentProfile from '../pages/StudentProfile.jsx';
import SignUp from '../pages/SignUp.jsx';
import Error from '../pages/Error.jsx';
import StudentSignUp from '../pages/StudentSignUp.jsx';
import Stdent from '../pages/students/Stdent.jsx';
import CreatLessons from '../pages/CreatLessons.jsx';
import TeacherClassDetails from '../pages/TeacherClassDetails.jsx';
import NotesViewer from '../pages/NotesViewer.jsx';
import BookingsManager from '../pages/BookingsManager.jsx';
import TrialClass from '../pages/TrialClass.jsx';
import StudentNotesView from '../pages/students/StudentNotesView.jsx';
import EndClass from '../pages/EndClass.jsx';
import BookingLoading from '../pages/BookingLoading.jsx';
import FeesPayment from '../pages/FeesPayment.jsx';
import SpecialClasses from '../pages/students/SpecialClasses.jsx';
import ClassGroups from '../pages/students/ClassGroups.jsx';
import GroupClass from '../pages/GroupClass.jsx';
import Math from '../pages/Math.jsx';
import TeacherGroupClass from '../pages/teacherGroupClass.jsx';
export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/register' element={<Register/>}/>
        <Route path='/laptop' element={<Laptop/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Fee Payment' element={<FeesPayment/>}/>
        <Route path='/SignUp/:token' element={<SignUp/>}/>
        <Route path='/SignUp/' element={<SignUp/>}/>
        <Route path='/StudentSignup/:token' element={<StudentSignUp/>}/>
        <Route path='/StudentSignup' element={<StudentSignUp/>}/>
        <Route path='/teacher' element={<Teacher/>}/>
        <Route path='/teacher/dashboard' element={<Dashboard/>}>
          <Route index element={<Details/>}/>
          <Route path='/teacher/dashboard/Details' element={<Details/>}/>
          <Route path='/teacher/dashboard/Booking Manager' element={<BookingsManager/>}/>
          <Route path='/teacher/dashboard/Calendar' element={<Calendar/>}/>
          <Route path='/teacher/dashboard/My students' element={<MyStudents/>}/>
          <Route path='/teacher/dashboard/Projects' element={<Projects/>}/>
          <Route path='/teacher/dashboard/All Teachers' element={<AllTeachers/>}/>
          <Route path='/teacher/dashboard/All Students' element={<AllStudents/>}/>
          <Route path='/teacher/dashboard/Add Teachers' element={<AddTeachers/>}/>
          <Route path='/teacher/dashboard/Add Students' element={<AddStudents/>}/>
          <Route path='/teacher/dashboard/Set Quiz' element={<SetQuiz/>}/>
          <Route path='/teacher/dashboard/Teacher Class Details' element={<TeacherClassDetails/>}/>
          <Route path='/teacher/dashboard/Lessons' element={<CreatLessons/>}/>
          <Route path='/teacher/dashboard/Notes/' element={<NotesViewer/>}/>
          <Route path='/teacher/dashboard/Student Profile' element={<StudentProfile/>}/>
          <Route path='/teacher/dashboard/Special Class' element={<SpecialClasses/>}/>
          <Route path='/teacher/dashboard/Special Groups' element={<ClassGroups/>}/>
          <Route path='/teacher/dashboard/Math' element={<Math/>}/>
          <Route path='/teacher/dashboard/Group Class' element={<GroupClass/>}/>
          <Route path='/teacher/dashboard/Teacher Group Class' element={<TeacherGroupClass/>}/>
          <Route path='/teacher/dashboard/student/:id' element={<Stdent/>}/>
        </Route>
        <Route path='/student/dashboard' element={<StudentDashboard/>}>
          <Route index element={<StudentDetails/>}/>
          <Route path='/student/dashboard/Details' element={<StudentDetails/>}/>
          <Route path='/student/dashboard/My  lessons' element={<MyLessons/>}/>
          <Route path='/student/dashboard/My  projects' element={<MyProjects/>}/>
          <Route path='/student/dashboard/My  quizzes' element={<MyQuizzes/>}/>
          <Route path='/student/dashboard/StudentNotes/' element={<StudentNotesView/>}/>
          <Route path='/student/dashboard/Quiz' element={<Quiz/>}/>
        </Route>
        <Route path='/Class booking' element={<ClassBooking/>}/>
        <Route path='/End Class' element={<EndClass/>}/>
        <Route path='/Class/:name' element={<Class/>}/>
        <Route path='/TrialClass/:name' element={<TrialClass/>}/>
        <Route path="/TrialClass/:name/:token" element={<BookingLoading />} />
        <Route path='/Error' element={<Error/>}/>
    {/* <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NoPage />} />
    </Route> */}
  </Routes>
  )
}
