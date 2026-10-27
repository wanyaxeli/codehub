import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {API} from '@/lib/api'
export default function MyStudents() {
    const navigate =useNavigate()
    const [token,setToken]=useState('')
    const [students,setStudent]=useState([])
    const handleView =()=>{
        navigate('/teacher/dashboard/Student Profile')
    }
    function getMyStudents(){
    if(token){
        const url =`${API}/TeacherStudent/`
        axios.get(url)
        .then(res=>{
            console.log('res',res.data)
            const data = res.data
            data.forEach(item=>{
                console.log('stde',item)
                setStudent(pre=>([...pre,item.student]))
            })
        })
        .catch(error=>console.log(error))
    }
    }
  
   
    useEffect(()=>{
        getMyStudents()
    },[])
  return (
    <div className='AllTeachersWrapper'>
        <h3>All My Students</h3>
        <div className='myStudentContainer '>
            {students.length>0?<table className='myStudentWrapper'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>Number</th>
                        <th>Country</th>
                        <th>payment</th>
                    </tr>
                </thead>
                { students.map(student=>{
                    return(
                    <tbody>
                        <tr>
                            <td>{student.user.first_name} {student.user.last_name}</td>
                            <td>{student.user.email}</td>
                            <td>{student.user.phone_number}</td>
                            <td>{student.country}</td>
                            <td>{student.fees===true?'Yes':'No'}</td>
                            <td><button onClick={handleView}>view</button></td>
                        </tr>
                    </tbody>
                    )
                })}
            </table>:<p>No Student asigned to you yet</p>}
        </div>
    </div>
  )
}
