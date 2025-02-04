import React,{useState,useEffect,useContext} from 'react'
import { context } from '../App'
import Header from '../Components/Header'
import { Outlet,useNavigate ,useLocation} from 'react-router-dom'
export default function StudentDashboard() {
    const navigate=useNavigate()
    const [token,setToken]=useState('')
  const location =useLocation()
  const {pathname}=location
  const {getStudent}=useContext(context)
  const dashboardLinks=['/student/dashboard/Details','/student/dashboard']
  const quizLinks=['/student/dashboard/My%20%20quizzes','/student/dashboard/Quiz']
  console.log('path',pathname)
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
  useEffect(()=>{
   if(token){
    getStudent(token)
   }
    },[token])
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
            <li className={pathname==='/student/dashboard/My%20%20lessons'?'active':""} onClick={handleToLessons} >my lessons</li>
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
