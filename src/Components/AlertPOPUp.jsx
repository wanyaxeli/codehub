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
                <p >{bookingMessage}</p>
                <p >Link for class sent to your email</p>
                <div>
                <button style={{color:'#fff'}} onClick={handleToHome}>okay</button>
                </div>
            </div>
        </div>
    </div>,
    document.getElementById('alert')
  )
}
