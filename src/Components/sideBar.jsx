import React from 'react'
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
export default function Sidebar({toggleSideBarClass}) {
  const navigate=useNavigate()
  const handleToHome=()=>{
    navigate('/')
  }
  const handleToTrial=()=>{
    navigate('/register')
  }
  const handleToLogin=()=>{
    navigate('/Login')
  }
  return ReactDOM.createPortal(
    <div className={toggleSideBarClass}>
      <div className='sideBarContainer'>
           <ul>
            <li onClick={handleToHome}>Home</li>
            <li onClick={handleToTrial}>Book trial</li>
            <li onClick={handleToLogin}>login</li>
           </ul>
      </div>
    </div>,
    document.getElementById('sideBar')
  );
}

