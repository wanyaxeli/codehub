import React,{useState} from 'react'
import pic from '../assets/codeHubLogo.png'
import {useNavigate,useLocation} from 'react-router-dom'
import pic1 from '../assets/women1.jpg'
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
    const handleJoinClass=()=>{
      navigate('/')
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
            {pathname==='/teacher/dashboard'?<div className='rightHeader dashboardDisplayer'>
              <p>Dashboard</p>
              <div className='dashboardDetailsHolder'>
                <p>Ms  Gaundencia</p>
                <div className='Dashboardimage'>
                  <img src={pic1}/>
                </div>
              </div>
            </div>: <div className='rightHeader'>
                <button onClick={handleToLogin}> login</button>
                <button onClick={handleJoinClass}>join class</button>
                <button onClick={handleToFreeClass}>book free class</button>
            </div>}
        </div>
    </div>
  )
}
