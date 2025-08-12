import React,{useState,useEffect,useContext} from 'react'
import { context } from '../App'
import Header from '../Components/Header'
import { Outlet,useNavigate ,useLocation} from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
export default function StudentDashboard() {
  const navigate=useNavigate()
  const [token,setToken]=useState('')
  const [user_id,setUser_id]=useState('')
  const location =useLocation()
  const {pathname}=location
  const {setStudent}=useContext(context)
  const dashboardLinks=['/student/dashboard/Details','/student/dashboard/Today%20Questions','/student/dashboard']
  const quizLinks=['/student/dashboard/My%20%20quizzes','/student/dashboard/Quiz']
  const lessonLikns=['/student/dashboard/StudentNotes/','/student/dashboard/My%20%20lessons']
  const handleToLessons=()=>{
  navigate('/student/dashboard/My  lessons')
  }
  const handleToMyQuizzes=()=>{
    navigate('/student/dashboard/My  quizzes')
    }
  const handleToMyProjects=()=>{
      navigate('/student/dashboard/My  projects')
      }
  const handleToDashboard=()=>{
        navigate('/student/dashboard/Details')
        }
   useEffect(() => {
          if (token) {
            try {
              const decode = jwtDecode(token);
              const {role,user_id}=decode
              setUser_id(user_id)
              console.log("Decoded Tokens:", user_id);
            } catch (error) {
              console.error("JWT Decode Error:", error);
            }
          }
  }, [token]);
  async function getToken(){
          try{
              const token= localStorage.getItem('token') // No need to await
              if (token){
                  setToken(token);
              }
          } catch(error) {
              console.log(error);
          }
  }
  function Student(){
   if(token && user_id){
    // const url=`http://127.0.0.1:8000/getstudent/${user_id}`
    const url=`https://api.codingscholar.com/getstudent/${user_id}`
    axios.get(url,{headers:{
      'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
      console.log('student',res.data)
      const data= res.data
      setStudent(data)
    })
    .catch(error=>console.log(error))
   }
  }
  useEffect(()=>{
    Student()
    },[token,user_id])
  useEffect(()=>{
  getToken()
  },[])
  return (
    <div className='StudentDashboardWrapper'>
        <Header/>
        <div className='dashBoardContainer '>
        <aside>
          <ul>
            <li className={dashboardLinks.includes(pathname)?'active':""} onClick={handleToDashboard} >dashboard</li>
            <li className={lessonLikns.includes(pathname)?'active':""} onClick={handleToLessons} >my lessons</li>
            <li className={pathname==='/student/dashboard/My%20%20projects'?'active':""} onClick={handleToMyProjects}>my projects</li>
            <li className={quizLinks.includes( pathname)?'active':""} onClick={handleToMyQuizzes}>my quizzes</li>
          </ul>
        </aside>
        <main>
           <div className='mainInnerWrapper'>
           <Outlet/>
           </div>
        </main>
      </div>
    </div>
  )
}
