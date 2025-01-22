import React from 'react'
import pic from '../../assets/man.jpg'
import { useNavigate } from 'react-router-dom'
export default function StudentDetails() {
    const navigate = useNavigate()
    const handleToJoinClass =()=>{
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
                <p>elias wanyama <span><i className="fa fa-pencil" aria-hidden="true"></i></span></p>
            </div>
            <div className='TeacherEarnsWrapper'>
                <div>
                    <p>Live earning</p>
                    <p>ksh 20000</p>
                </div>
            </div>
        </div>
        <div className='todayLessonWrapper'>
            <h3>today Classes</h3>
            <div className='todayLessonContainer'>
                <table>
                    <thead>
                        <tr>
                            <th>class name</th>
                            <th>class time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> html begginer level</td>
                            <td>10:10 pm</td>
                            <td><button onClick={handleToJoinClass}>Join</button></td>
                        </tr>
                        <tr>
                            <td> html begginer level</td>
                            <td>10:10 pm</td>
                            <td><button>Join</button></td>
                        </tr>
                        <tr>
                            <td> html begginer level</td>
                            <td>10:10 pm</td>
                            <td><button>Join</button></td>
                        </tr>
                        <tr>
                            <td> html begginer level</td>
                            <td>10:10 pm</td>
                            <td><button>Join</button></td>
                        </tr>
                        <tr>
                            <td> html begginer level</td>
                            <td>10:10 pm</td>
                            <td><button>Join</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
