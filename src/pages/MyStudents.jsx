import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function MyStudents() {
    const navigate =useNavigate()
    const handleView =()=>{
        navigate('/teacher/dashboard/Student Profile')
    }
  return (
    <div className='AllTeachersWrapper'>
        <h3>All Students</h3>
        <div className='AllTeachersContainer'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>Number</th>
                        <th>Country</th>
                        <th>payment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>elias wanyama</td>
                        <td>eliwanyax@gmail.com</td>
                        <td>0795962808</td>
                        <td>Kenya</td>
                        <td>yes</td>
                        <td><button onClick={handleView}>view</button></td>
                    </tr>
                    <tr>
                        <td>elias wanyama</td>
                        <td>eliwanyax@gmail.com</td>
                        <td>0795962808</td>
                        <td>Kenya</td>
                        <td>yes</td>
                        <td><button>View</button></td>
                    </tr>
                    <tr>
                        <td>elias wanyama</td>
                        <td>eliwanyax@gmail.com</td>
                        <td>0795962808</td>
                        <td>Kenya</td>
                        <td>no</td>
                        <td><button>View</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}
