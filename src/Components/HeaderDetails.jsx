import React from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
export default function HeaderDetails({pic1,pic2,handleToFreeClass,handleToLogin,handleJoinClass,handleToDashboard}) {
    const location = useLocation()
    console.log('location',location)
    const navigate=useNavigate()
    const {pathname}=location
    console.log('lo',pathname)
    if (pathname.includes('/teacher')){
        return(
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
        )
    }else if(pathname.includes('/student')){
         return(
        <div className='rightHeader dashboardDisplayer'>
            <div onClick={handleToDashboard} className='headerDashlinkWrapper'>
            <p>Dashboard</p>
            </div>
            <div className='dashboardDetailsHolder'>
              <p>Elias wanyama</p>
              <div className='Dashboardimage'>
                <img src={pic2} alt="Profile" />
              </div>
            </div>
          </div>
        )
    }else{
    return (
        <div className='rightHeader'>
                <button onClick={handleToLogin}>Login</button>
                <button onClick={handleJoinClass}>Join Class</button>
                <button onClick={handleToFreeClass}>Book Free Class</button>
        </div>
    )
    }

}
