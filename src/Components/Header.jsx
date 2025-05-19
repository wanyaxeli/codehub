import React,{useState,useEffect,useContext} from 'react'
import pic from '../assets/logoCodeHub.png'
import { context } from '../App'
import {useNavigate,useLocation} from 'react-router-dom'
import pic2 from '../assets/codehubImage.jpeg'
import HeaderDetails from './HeaderDetails';
export default function Header() {
    const [selectedValue, setSelectedValue] = useState('');
    const [token,setToken]=useState('')
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
          <div>
          <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
        </div>
    </div>
  )
}
