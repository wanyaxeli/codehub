import React,{useState,useEffect,useContext} from 'react'
import pic from '../assets/logoCodeHub.png'
import { context } from '../App'
import {useNavigate,useLocation} from 'react-router-dom'
import pic2 from '../assets/codehubImage.jpeg'
import HeaderDetails from './HeaderDetails';
import Sidebar from './sideBar'
import { jwtDecode } from 'jwt-decode'
export default function Header() {
    const [selectedValue, setSelectedValue] = useState('');
    // const [token,setToken]=useState('')
    const [toggleSideBarClass,setToggleSideBarClass]=useState('sideBarWrapper')
    const [toggleSideBar,setToggleSideBar]=useState(false)
    const location = useLocation()
    const navigate=useNavigate()
    const {teacher,student,proPic}=useContext(context)
    const {pathname}=location
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };
    const handleToFreeClass =()=>{
    navigate('/register')
    }
    console.log('path',pathname)
    const handleToLogin=()=>{
      // console.log('token',token)
      // if(token){
      //   try {
      //     const decode = jwtDecode(token);
      //     const {role,user_id}=decode
      //     console.log("Decoded Token:", decode);
      //     // setRole(role)
      //   } catch (error) {
      //     console.error("JWT Decode Error:", error);
      //   }
      // }
      const token=localStorage.getItem('token')
      if (token){
         console.log('adad',token)
           try {
          const decode = jwtDecode(token);
          const {role,user_id}=decode
          console.log("Decoded Token:", decode,role);
          if(role ==='student'){
            navigate('/student/dashboard/Details')
          }else if(role==='teacher'){
              navigate('/teacher/dashboard',{state:token})
          }
            // setRole(role)
        } catch (error) {
          console.error("JWT Decode Error:", error);
        }
    }else{
      navigate('/Login')
    }
    }
    const handleHome =()=>{
      navigate('/')
    }
    const handleToStudentDashboard =()=>{
      navigate('/student/dashboard/Details')
    }
    const handleJoinClass=()=>{
      const token= localStorage.getItem('token')
      if(token){
        try {
          const decode = jwtDecode(token);
          const {role,user_id}=decode
          console.log("Decoded Token:", decode,role);
          if(role ==='student'){
            navigate('/student/dashboard/Details')
          }else if(role==='teacher'){
              navigate('/teacher/dashboard',{state:token})
          }
            // setRole(role)
        } catch (error) {
          console.error("JWT Decode Error:", error);
        }
      }else{
        navigate('/Login')
      }
    }
    const handleToDashboard=()=>{
      navigate('/teacher/dashboard/Details')
    }
    async function getToken(){
      try{
          const token= JSON.parse(localStorage.getItem('token')) // No need to await
          if (token){
              // setToken(token);
          }
      } catch(error) {
          console.log(error);
      }
  }
  const handleToggleSideBar =()=>{
   if(toggleSideBar===false){
    setToggleSideBar(true)
   }else{
    setToggleSideBar(false)
   }
  }
  useEffect(()=>{
  if(toggleSideBarClass==='sideBarWrapper'){
    setToggleSideBarClass('sideBarWrapperOpenner')
  }else{
    setToggleSideBarClass('sideBarWrapper')
  }
  },[toggleSideBar])
  useEffect(()=>{
    setToggleSideBarClass('sideBarWrapper')
  },[])
  const handleLogout =()=>{
    localStorage.removeItem('token')
    navigate('/')
  }
  // useEffect(()=>{
  // getToken()
  // },[])
  return (
    <div className='headerWrapper'>
        <div className='headerContainer'>
            <div className='leftHeader'>
                {/* //logo */}
                <div onClick={handleHome} className='logoWRapper'>
                    <div className='logoContainer'>
                    <img src={pic}/>
                    </div>
                    <h4>codingscholar</h4>
                </div>
                <select value={selectedValue} onChange={handleChange}>
                <option value="" disabled>
                 courses
                </option>
                <option value="option1">python for kids</option>
                <option value="option2">web development</option>
                <option value="option3">scratch programming</option>
                </select>
            </div>
            <HeaderDetails pic2={pic2}  handleToStudentDashboard={handleToStudentDashboard} handleToFreeClass={handleToFreeClass} handleToLogin={handleToLogin}  handleJoinClass={handleJoinClass} handleToDashboard={handleToDashboard} teacher={teacher} student={student}  proPic={proPic}/>
            {pathname==='/'?'':
            <div className='logoutWrapper' onClick={handleLogout}>
            <i  className="fa fa-sign-out" aria-hidden="true"></i>
            <span>Logout</span>
          </div>}
        </div>
        <div className='HeaderForSmallDevices'>
          <div className='logoContainer'>
          <img src={pic}/>
          </div>
          <div className='headerBars'>
          {toggleSideBar===false?<i onClick={handleToggleSideBar} className="fa fa-bars" aria-hidden="true"></i>:
          <i onClick={handleToggleSideBar} className="fa fa-times" aria-hidden="true"></i>
          }
          </div>
          <Sidebar toggleSideBarClass={toggleSideBarClass}/>
        </div>
    </div>
  )
}
