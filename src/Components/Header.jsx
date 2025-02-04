import React,{useState,useEffect,useContext} from 'react'
import pic from '../assets/codeHubLogo.png'
import { context } from '../App'
import {useNavigate,useLocation} from 'react-router-dom'
import pic1 from '../assets/women1.jpg'
import pic2 from '../assets/man.jpg'
import HeaderDetails from './HeaderDetails';
export default function Header() {
    const [selectedValue, setSelectedValue] = useState('');
    const [token,setToken]=useState('')
    const location = useLocation()
    console.log('location',location)
    const navigate=useNavigate()
    const {teacher,student}=useContext(context)
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
            <HeaderDetails pic2={pic2} token={token} handleToStudentDashboard={handleToStudentDashboard} handleToFreeClass={handleToFreeClass} handleToLogin={handleToLogin}  handleJoinClass={handleJoinClass} handleToDashboard={handleToDashboard} teacher={teacher} student={student}  pic1={pic1}/>
        </div>
    </div>
  )
}
