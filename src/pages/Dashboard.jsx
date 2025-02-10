import React ,{useEffect,useState,useContext}from 'react'
import Header from '../Components/Header'
import { context } from '../App'
import { Outlet,useNavigate ,useLocation} from 'react-router-dom'
export default function Dashboard() {
  const navigate=useNavigate()
  const location =useLocation()
  const [token,setToken]=useState('')
  const {getTeacher}= useContext(context)
  const {pathname}=location
  const dashboardLinks=['/teacher/dashboard/Details','/teacher/dashboard/student/:id','/teacher/dashboard/Lessons','/teacher/dashboard','/teacher/dashboard/Add%Students','/teacher/dashboard/All%20Teachers',
  '/teacher/dashboard/All%20Students','/teacher/dashboard/Add%20Teachers','/teacher/dashboard/Set%20Quiz']
  console.log('pa',pathname)
  const studentLink=['/teacher/dashboard/Student%20Profile','/teacher/dashboard/My%20students']
  const handleToCalendar=()=>{
  navigate('/teacher/dashboard/Calendar')
  }
  const handleToMystudents=()=>{
    navigate('/teacher/dashboard/My students')
    }
  const handleToProjects=()=>{
      navigate('/teacher/dashboard/Projects')
      }
  const handleToDashboard=()=>{
        navigate('/teacher/dashboard/Details')
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
    getTeacher(token)
   }
    },[token])
  useEffect(()=>{
  getToken()
  },[])
  return (
    <div className='DashboardWrapper'>
        <Header/>
      <div className='dashBoardContainer '>
        <aside>
          <ul>
            <li className={dashboardLinks.includes(pathname)?'active':""} onClick={handleToDashboard} >dashboard</li>
            <li className={pathname==='/teacher/dashboard/Calendar'?'active':""} onClick={handleToCalendar} >calendar</li>
            <li className={pathname==='/teacher/dashboard/Projects'?'active':""} onClick={handleToProjects}>projects</li>
            <li className={studentLink.includes(pathname)?'active':""} onClick={handleToMystudents}>my students</li>
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
