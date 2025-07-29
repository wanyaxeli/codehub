import React ,{useEffect,useState,useContext}from 'react'
import Header from '../Components/Header'
import { context } from '../App'
import { Outlet,useNavigate ,useLocation} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
export default function Dashboard() {
  const navigate=useNavigate()
  const location =useLocation()
  const [token,setToken]=useState('')
  const [role,setRole]=useState('')
  const [user_id,setUser_id]=useState('')
  const {setTeacher}= useContext(context)
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
  console.log('role',role)
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
  useEffect(() => {
    if (location.state) {
      setToken(location.state); // Assuming you passed a token as state
    } else {
      console.log('No state found in location');
    }
  }, [location]);
useEffect(()=>{
  console.log("running getToken effect");
getToken()
},[])
console.log("Component mounted");
  function getTeacher(){
    console.log('tea',token)
    if(token && user_id && role ==='teacher'){
     const url=`https://api.codingscholar.com/getTeacher/${user_id}`
     console.log('user',role)
     axios.get(url,{headers:{
      //  'Authorization':`Bearer ${token}`
     }})
     .then(res=>{
       console.log('teachers',res.data)
       const data = res.data
       setTeacher(data)
     })
     .catch(error=>console.log(error))
    }
  }
  useEffect(() => {
    if (token) {
      try {
        const decode = jwtDecode(token);
        const {role,user_id}=decode
        setUser_id(user_id)
        setRole(role)
        console.log("Decoded Tokens:", user_id);
      } catch (error) {
        console.error("JWT Decode Error:", error);
      }
    }
  }, [token]);
  useEffect(()=>{
    getTeacher()
    },[token,user_id,role])
  return (
    <div className='DashboardWrapper'>
        <Header />
      <div className='dashBoardContainer '>
        <aside>
          <ul>
            <li className={dashboardLinks.includes(pathname)?'active':""} onClick={handleToDashboard} >dashboard</li>
            <li className={calendarLinks.includes(pathname)?'active':""} onClick={handleToCalendar} >calendar</li>
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
