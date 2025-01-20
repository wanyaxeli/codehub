import React from 'react'
import pic from '../assets/women1.jpg'
import { useNavigate } from 'react-router-dom'
export default function Details() {
    const navigate=useNavigate()
    const handleToAllTeachers=()=>{
    navigate('/teacher/dashboard/All Teachers')
    }
    const handleToAllStudents=()=>{
        navigate('/teacher/dashboard/All Students')
    }
    const handleToAddTeachers=()=>{
        navigate('/teacher/dashboard/Add Teachers')
    }
    const handleToAddStudent=()=>{
        navigate('/teacher/dashboard/Add Students')
    }
    const handleJoinClass =()=>{
        navigate('/class')
    }
  return (
    <div className='DetailsWrapper'>
        <div className='TeacherDetailsWrapper'>
            <div className='TeacherImageWrapper'>
                <div className='TeacherImageContainer'>
                    <img src={pic}/>
                </div>
                <div className='imageChanger'>
                 <div className='imageChangerHolder'>
                 <i class="fa fa-camera" aria-hidden="true"></i>
                 </div>
                </div>
            </div>
            <div className='TeacherNameWrapper'>
                <p>ms gaudencia wanyama <span><i className="fa fa-pencil" aria-hidden="true"></i></span></p>
            </div>
            <div className='TeacherEarnsWrapper'>
                <div>
                    <p>Live earning</p>
                    <p>ksh 20000</p>
                </div>
            </div>
        </div>
        <div className='TeacherActionWrapper'>
            <div onClick={handleToAllTeachers} className='actionBtnContainer allTeacher'>
                <p>all teachers</p>
            </div>
            <div onClick={handleToAllStudents} className='actionBtnContainer allstudents'>
                <p>all students</p>
            </div>
            <div onClick={handleToAddTeachers} className='actionBtnContainer addTeacher'>
               <p>add teacher</p>
            </div>
            <div onClick={handleToAddStudent} className='actionBtnContainer addStudent'>
              <p>add student</p>
            </div>
            <div className='actionBtnContainer createcurriculum'>
            <p>create curriculum</p>
            </div>
            <div className='actionBtnContainer uploadedvideo'>
            <p>uploaded videos</p>
            </div>
        </div>
        <div className='TodaysClasses'>
            <h3>Today Bookings</h3>
            <table>
                <thead>
                    <tr>
                        <th>student name</th>
                        <th>student Number</th>
                        <th>student grade</th>
                        <th>time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>elias wanyama</td>
                        <td>0715310742</td>
                        <td>2</td>
                        <td>10:01pm</td>
                        <td><button onClick={handleJoinClass}>join</button></td>
                    </tr>
                    <tr>
                        <td>elias wanyama</td>
                        <td>0715310742</td>
                        <td>2</td>
                        <td>10:01pm</td>
                        <td><button>join</button></td>
                    </tr>
                    <tr>
                        <td>elias wanyama</td>
                        <td>0715310742</td>
                        <td>2</td>
                        <td>10:01pm</td>
                        <td><button>join</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}
