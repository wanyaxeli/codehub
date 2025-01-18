import React from 'react'
import {useNavigate} from 'react-router-dom'
export default function Laptop() {
    const navigate=useNavigate()
    const handleToClassBooking=()=>{
     navigate("/Class booking")
    }
  return (
    <div className='laptopWrapper'>
        <div className='laptopHeader'></div>
        <div className='laptopContainer'>
            <div className='laptop'>
             <p>Do you have a access a laptop that has a camera </p>
             <div className='laptopBtnWrapper'>
                 <button onClick={handleToClassBooking}>Yes</button>
                 <button>no</button>
             </div>
            </div>  
        </div>
    </div>
  )
}
