import React,{useState} from 'react'
import pic from '../assets/codeHubLogo.png'
import {useNavigate,useLocation} from 'react-router-dom'
import pic1 from '../assets/women1.jpg'
import pic2 from '../assets/man.jpg'
import HeaderDetails from './HeaderDetails';
export default function Header() {
    const [selectedValue, setSelectedValue] = useState('');
    const location = useLocation()
    console.log('location',location)
    const navigate=useNavigate()
    const {pathname}=location
    console.log('lo',pathname)
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
      navigate('/student/dashboard')
    }
    const handleToDashboard=()=>{
      navigate('/teacher/dashboard/Details')
    }
  return (
    <div className='headerWrapper'>
        <div className='headerContainer'>
            <div className='leftHeader'>
                {/* //logo */}
                <div onClick={handleHome} className='logoWRapper'>
                    <img src={pic}/>
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
            <HeaderDetails pic2={pic2} handleToStudentDashboard={handleToStudentDashboard} handleToFreeClass={handleToFreeClass} handleToLogin={handleToLogin}  handleJoinClass={handleJoinClass} handleToDashboard={handleToDashboard}  pic1={pic1}/>
            {/* {pathname.includes('/teacher') ? (
              <div className='rightHeader dashboardDisplayer'>
                <div onClick={handleToDashboard} className='headerDashlinkWrapper'>
                <p>Dashboard</p>
                </div>
                <div className='dashboardDetailsHolder'>
                  <p>Ms Gaundencia</p>
                  <div className='Dashboardimage'>
                    <img src={pic1} alt="Profile" />
                  </div>
                </div>
              </div>
            ) : (
              <div className='rightHeader'>
                <button onClick={handleToLogin}>Login</button>
                <button onClick={handleJoinClass}>Join Class</button>
                <button onClick={handleToFreeClass}>Book Free Class</button>
              </div>
            )} */}
        </div>
    </div>
  )
}
