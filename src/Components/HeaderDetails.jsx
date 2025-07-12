import React from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
export default function HeaderDetails({proPic,student,teacher,pic2,handleToFreeClass,handleToStudentDashboard,handleToLogin,handleJoinClass,handleToDashboard}) {
    const location = useLocation()
    console.log('location',student)
    const navigate=useNavigate()
    const {pathname}=location
    if (pathname.includes('/teacher')){
        return(
        <div className='rightHeader dashboardDisplayer'>
            <div onClick={handleToDashboard} className='headerDashlinkWrapper'>
            <p>Dashboard</p>
            </div>
            <div className='dashboardDetailsHolder'>
            {teacher?.user ? (
                <p style={{ textTransform: 'capitalize' }}>
                  {teacher.user.first_name} {teacher.user.last_name}
                </p>
              ) : (
                <p>Loading ...</p>
              )}
              <div className='Dashboardimage'>
                {/* <img src={pic1} alt="Profile" /> */}
                {proPic?<img src={`https://res.cloudinary.com/dbxsncq5r/${proPic}`}/>:<img src={pic2}/>}
              </div>
            </div>
          </div>
        )
    }else if(pathname.includes('/student')){
         return(
        <div className='rightHeader dashboardDisplayer'>
            <div onClick={handleToStudentDashboard} className='headerDashlinkWrapper'>
            <p>Dashboard</p>
            </div>
            <div className='dashboardDetailsHolder'>
                {student?.user && (
                  <p style={{textTransform:'capitalize'}}>{student?.user.first_name}asdadas {student?.user.last_name}</p>
                )}
                  <div className='Dashboardimage'>
                {proPic?<img src={`https://res.cloudinary.com/dbxsncq5r/${proPic}`}/>:<img src={pic2}/>}
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
