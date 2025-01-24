import Reactm,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import NoLaptopModal from '../Components/NoLaptopModal'
export default function Laptop() {
    const navigate=useNavigate()
    const [noLaptop,setLaptop]=useState(false)
    const handleToClassBooking=()=>{
     navigate("/Class booking")
    }
    const handleCancel =()=>{
        setLaptop(true)
    }
    const handleDelayingClass =()=>{
      navigate("/")
    }
  return (
    <div className='laptopWrapper'>
        <div className='laptopHeader'></div>
        <div className='laptopContainer'>
            {noLaptop===false?<div className='laptop'>
             <p>Do you have a access a laptop that has a camera </p>
             <div className='laptopBtnWrapper'>
                 <button onClick={handleToClassBooking}>Yes</button>
                 <button onClick={handleCancel}>no</button>
             </div>
             {/* <NoLaptopModal/> */}
            </div>  :<div className='laptop'>
            <p>Please make sure that you have a laptop with a good camera before booking for a class </p>
            <div className='laptopBtnWrapper'>
                 <button onClick={handleDelayingClass}>okay</button>
             </div>
            </div>}
        </div>
    </div>
  )
}
