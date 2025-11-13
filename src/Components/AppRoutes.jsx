import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedLayout from "./ProtectedRoute.jsx";

//  Lazy-load all heavy pages
const Home = lazy(() => import("../pages/Home.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));
const Laptop = lazy(() => import("../pages/Laptop.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const About = lazy(() => import("../pages/About.jsx"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy.jsx"));
const FeesPayment = lazy(() => import("../pages/FeesPayment.jsx"));
const SignUp = lazy(() => import("../pages/SignUp.jsx"));
const StudentSignUp = lazy(() => import("../pages/StudentSignUp.jsx"));
const WhyUs = lazy(() => import("../pages/WhyUs.jsx"));
const ErrorPage = lazy(() => import("../pages/Error.jsx"));

//  Teacher dashboard
const Teacher = lazy(() => import("../pages/Teacher.jsx"));
const Dashboard = lazy(() => import("../pages/Dashboard.jsx"));
const Details = lazy(() => import("../pages/Details.jsx"));
const BookingsManager = lazy(() => import("../pages/BookingsManager.jsx"));
const Calendar = lazy(() => import("../pages/Calendar.jsx"));
const MyStudents = lazy(() => import("../pages/MyStudents.jsx"));
const Projects = lazy(() => import("../pages/Projects.jsx"));
const AllTeachers = lazy(() => import("../pages/AllTeachers.jsx"));
const AllStudents = lazy(() => import("../pages/AllStudents.jsx"));
const AddTeachers = lazy(() => import("../pages/AddTeachers.jsx"));
const AddStudents = lazy(() => import("../pages/AddStudents.jsx"));
const SetQuiz = lazy(() => import("../pages/SetQuiz.jsx"));
const TeacherClassDetails = lazy(() => import("../pages/TeacherClassDetails.jsx"));
const CreatLessons = lazy(() => import("../pages/CreatLessons.jsx"));
const NotesViewer = lazy(() => import("../pages/NotesViewer.jsx"));
const StudentProfile = lazy(() => import("../pages/StudentProfile.jsx"));
const SpecialClasses = lazy(() => import("../pages/students/SpecialClasses.jsx"));
const ClassGroups = lazy(() => import("../pages/students/ClassGroups.jsx"));
const Math = lazy(() => import("../pages/Math.jsx"));
const GroupClass = lazy(() => import("../pages/GroupClass.jsx"));
const Slots = lazy(() => import("../pages/Slots.jsx"));
const TeacherDetails = lazy(() => import("../pages/TeacherDetails.jsx"));
const TeacherGroupClass = lazy(() => import("../pages/TeacherGroupClass.jsx"));
const Stdent = lazy(() => import("../pages/students/Stdent.jsx"));
const VideoPlayer = lazy(() => import("../pages/VideoPlayer.jsx"));
const UploadVids = lazy(() => import("../pages/UploadVids.jsx"));
const QuestionSetter = lazy(() => import("../pages/QuestionSetter.jsx"));
const Certificates = lazy(() => import("../pages/Certificates.jsx"));

//  Student dashboard
const StudentDashboard = lazy(() => import("../pages/StudentDashboard.jsx"));
const StudentDetails = lazy(() => import("../pages/students/StudentDetails.jsx"));
const MyLessons = lazy(() => import("../pages/students/MyLessons.jsx"));
const MyProjects = lazy(() => import("../pages/MyProjects.jsx"));
const MyQuizzes = lazy(() => import("../pages/students/MyQuizzes.jsx"));
const StudentNotesView = lazy(() => import("../pages/students/StudentNotesView.jsx"));
const Quiz = lazy(() => import("../pages/students/Quiz.jsx"));
const TodaysQuestions = lazy(() => import("../pages/students/TodaysQuestions.jsx"));
const Questions = lazy(() => import("../pages/students/Questions.jsx"));
// import Questions from "../pages/students/Questions.jsx";
const StudentQuestionPage = lazy(() => import("../pages/students/StudentQuestionPage.jsx"));
const AttemptedQuizPage = lazy(() => import("../pages/students/AttemptedQuizPage.jsx"));
const DisplayAttemptedQuiz = lazy(() => import("../pages/students/DisplayAttemptedQuiz.jsx"));
const StudentCertificate = lazy(() => import("../pages/students/StudentCertificate.jsx"));

//  Miscellaneous
const EndClass = lazy(() => import("../pages/EndClass.jsx"));
const ClassBooking = lazy(() => import("../pages/ClassBooking.jsx"));
const Class = lazy(() => import("../pages/Class.jsx"));
const TrialClass = lazy(() => import("../pages/TrialClass.jsx"));
const BookingLoading = lazy(() => import("../pages/BookingLoading.jsx"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="loading-screen">Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/laptop" element={<Laptop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about us" element={<About />} />
        <Route path="/Privacy policy" element={<PrivacyPolicy />} />
        <Route path="/Fee Payment" element={<FeesPayment />} />
        <Route path="/SignUp/:token" element={<SignUp />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/StudentSignup/:token" element={<StudentSignUp />} />
        <Route path="/StudentSignup" element={<StudentSignUp />} />
        <Route path="/Why Us" element={<WhyUs />} />

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          {/* Teacher Dashboard */}
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/teacher/dashboard" element={<Dashboard />}>
            <Route index element={<Details />} />
            <Route path="Details" element={<Details />} />
            <Route path="Booking Manager" element={<BookingsManager />} />
            <Route path="Calendar" element={<Calendar />} />
            <Route path="My students" element={<MyStudents />} />
            <Route path="Projects" element={<Projects />} />
            <Route path="All Teachers" element={<AllTeachers />} />
            <Route path="All Students" element={<AllStudents />} />
            <Route path="Add Teachers" element={<AddTeachers />} />
            <Route path="Add Students" element={<AddStudents />} />
            <Route path="Set Quiz" element={<SetQuiz />} />
            <Route path="Teacher Class Details" element={<TeacherClassDetails />} />
            <Route path="Lessons" element={<CreatLessons />} />
            <Route path="Notes" element={<NotesViewer />} />
            <Route path="Student Profile" element={<StudentProfile />} />
            <Route path="Special Class" element={<SpecialClasses />} />
            <Route path="Special Groups" element={<ClassGroups />} />
            <Route path="Math" element={<Math />} />
            <Route path="Group Class" element={<GroupClass />} />
            <Route path="Slots" element={<Slots />} />
            <Route path="teacher details" element={<TeacherDetails />} />
            <Route path="Teacher Group Class" element={<TeacherGroupClass />} />
            <Route path="student/:id" element={<Stdent />} />
            <Route path="videos" element={<VideoPlayer />} />
            <Route path="upload video" element={<UploadVids />} />
            <Route path="Set Question" element={<QuestionSetter />} />
            <Route path="Certificates" element={<Certificates />} />
          </Route>

          {/*  Student Dashboard */}
          <Route path="/student/dashboard" element={<StudentDashboard />}>
            <Route index element={<StudentDetails />} />
            <Route path="Details" element={<StudentDetails />} />
            <Route path="Today Questions" element={<TodaysQuestions />} />
            <Route path="My lessons" element={<MyLessons />} />
            <Route path="My projects" element={<MyProjects />} />
            <Route path="My quizzes" element={<MyQuizzes />} />
            <Route path="StudentNotes" element={<StudentNotesView />} />
            <Route path="Quiz" element={<Quiz />} />

            {/* Grouped Question Routes */}
            <Route path="Questions" element={<Questions/>}>
              <Route index element={<StudentQuestionPage />} />
              <Route path="questionPage" element={<StudentQuestionPage />} />
              <Route path="attempted-questions" element={<AttemptedQuizPage />} />
            </Route>

            <Route path="certificate" element={<StudentCertificate />} />
            <Route path="display-questions" element={<DisplayAttemptedQuiz />} />
          </Route>
        </Route>

        {/* Misc Pages */}
        <Route path="/End Class" element={<EndClass />} />
        <Route path="/Class booking" element={<ClassBooking />} />
        <Route path="/Class/:name" element={<Class />} />
        <Route path="/TrialClass/:name" element={<TrialClass />} />
        <Route path="/TrialClass/:name/:token" element={<BookingLoading />} />
        <Route path="/Error" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}
