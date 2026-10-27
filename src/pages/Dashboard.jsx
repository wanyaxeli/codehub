import React ,{useEffect,useState,useContext}from 'react'
import Header from '../Components/global-layoutss/Header'
import { context } from '../App'
import { Outlet,useNavigate ,useLocation} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { API } from '@/lib/api'
export default function Dashboard() {
  const navigate=useNavigate()
  const location =useLocation()
 
  const [NotReviewed,setNotReviewed]=useState('')
  const {setTeacher}= useContext(context)

  const {user}=useAuth()
  const user_id=user.id
  const role=user.role
  // const [teacher,setTeacher]=useState('')
  const {pathname}=location
  const dashboardLinks=['/teacher/dashboard/teacher%20details','/teacher/dashboard/Math','/teacher/dashboard/Slots','/teacher/dashboard/Teacher%20Group%20Class','/teacher/dashboard/Group%20Class','/teacher/dashboard/Details','/teacher/dashboard/Special%20Groups','/teacher/dashboard/Special%20Class','/teacher/dashboard/student/:id','/teacher/dashboard/Lessons','/teacher/dashboard','/teacher/dashboard/Add%Students','/teacher/dashboard/All%20Teachers',
  '/teacher/dashboard/All%20Students','/teacher/dashboard/Add%20Teachers','/teacher/dashboard/Set%20Quiz']
  const studentLink=['/teacher/dashboard/Student%20Profile','/teacher/dashboard/My%20students']
  const calendarLinks=['/teacher/dashboard/Notes/','/teacher/dashboard/Calendar','/teacher/dashboard/Teacher%20Class%20Details',]
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
  console.log('\n USER role.....',user)

 


function getQuiz(){

    const url = `${API}/TeacherQuizes/`;
    axios.get(url)
    .then(res=>{
      const data = res.data
      const review= data.filter(item=>item.review === false)
      setNotReviewed(review.length)
    })
    .catch(error=>console.log(error))
  
}
  function getTeacher(){
   
    if( user_id && role ==='teacher'){
     const url=`${API}/getTeacher/${user_id}`
     console.log('\nUSERROLE.....',role)
     axios.get(url)
     .then(res=>{
       console.log('teachers',res.data)
       const data = res.data
       setTeacher(data)
     })
     .catch(error=>console.log(error))
    }
  }
  

  useEffect(()=>{
    getQuiz()
   },[])
  useEffect(()=>{
    getTeacher()
    },[user_id,role])
  return (
    <div className='DashboardWrapper'>
        <Header />
      <div className='dashBoardContainer '>
        <aside>
          <ul>
            <li className={dashboardLinks.includes(pathname)?'active':""} onClick={handleToDashboard} >dashboard</li>
            <li className={calendarLinks.includes(pathname)?'active':""} onClick={handleToCalendar} >calendar</li>
            <li className={`reviewHolder ${pathname==='/teacher/dashboard/Projects'?'active':""}`} onClick={handleToProjects}>projects
             {pathname!=='/teacher/dashboard/Projects'?
              <div className='reviewWrapper'>
               <p>{NotReviewed}</p>
             </div>
             :""}
            </li>
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
