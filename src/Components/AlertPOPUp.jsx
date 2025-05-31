import React from 'react'
import ReactDOM from 'react-dom'; // Correct import
import { useNavigate } from 'react-router-dom';
export default function AlertPOPUp({bookingMessage}) {
    const navigate =useNavigate()
   const handleToHome=()=>{
    navigate('/')
   }
  return ReactDOM.createPortal (
    <div className='AlertPOPUpWrapper'>
        <div className='AlertPOPUpContainer'>
            <div className='AlertPOPUp'>
                <p style={{color:'white'}}>{bookingMessage}</p>
                <p style={{color:'white'}}>Link sent to your email</p>
                <div>
                <button onClick={handleToHome}>okay</button>
                </div>
            </div>
        </div>
    </div>,
    document.getElementById('alert')
  )
}
