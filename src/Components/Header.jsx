import React,{useState,useEffect,useContext} from 'react'
import pic from '../assets/logoCodeHub.png'
import { context } from '../App'
import {useNavigate,useLocation} from 'react-router-dom'
import pic2 from '../assets/codehubImage.jpeg'
import HeaderDetails from './HeaderDetails';
import Sidebar from './sideBar'
export default function Header() {
    const [selectedValue, setSelectedValue] = useState('');
    const [token,setToken]=useState('')
    const [toggleSideBarClass,setToggleSideBarClass]=useState('sideBarWrapper')
    const [toggleSideBar,setToggleSideBar]=useState(false)
    const location = useLocation()
    console.log('location',location)
    const navigate=useNavigate()
    const {teacher,student,proPic}=useContext(context)
    const {pathname}=location
    console.log('teacher',teacher)
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };
    const handleToFreeClass =()=>{
    navigate('/register')
    }
    const handleToLogin=()=>{
      navigate('/Login')
    }
    const handleHome =()=>{
      navigate('/')
    }
    const handleToStudentDashboard =()=>{
      navigate('/student/dashboard/Details')
    }
    const handleJoinClass=()=>{
      if(token){
        navigate('/student/dashboard')
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
              setToken(JSON.parse(token));
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
  useEffect(()=>{
  getToken()
  },[])
  return (
    <div className='headerWrapper'>
        <div className='headerContainer'>
            <div className='leftHeader'>
                {/* //logo */}
                <div onClick={handleHome} className='logoWRapper'>
                    <div className='logoContainer'>
                    <img src={pic}/>
                    </div>
                    <h4>CodingScholar</h4>
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
            <HeaderDetails pic2={pic2} token={token} handleToStudentDashboard={handleToStudentDashboard} handleToFreeClass={handleToFreeClass} handleToLogin={handleToLogin}  handleJoinClass={handleJoinClass} handleToDashboard={handleToDashboard} teacher={teacher} student={student}  proPic={proPic}/>
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
