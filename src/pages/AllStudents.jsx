import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function AllStudents() {
    const [student,setStudent]=useState([])
    const navigate=useNavigate()
    function getStudent(){
    const url='http://127.0.0.1:8000/student/'
    axios.get(url,{headers:{
        'Authorization':'application/json'
    }})
    .then(res=>{
        const data=res.data
        setStudent(data)
        console.log(res.data)
    })
    .catch(error=>console.log(error))
    }
    const handleStudent =(id)=>{
     console.log('id',id)
     navigate(`/student/dashboard/student/${id}`)
    }
    useEffect(()=>{
    getStudent()
    },[])
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
                   {student.map(item=>{
                    return(
                        <tr key={item.user.id}>
                        <td>{item.user.first_name} {item.user.last_name}</td>
                        <td>{item.user.email}</td>
                        <td>{item.user.phone_number}</td>
                        <td>{item.country}</td>
                        <td>{item.fees===false?'No':'Yes'}</td>
                        <td><button onClick={()=>handleStudent(item.user.id)}>view</button></td>
                       </tr>
                    )
                   })}
                </tbody>
            </table>
        </div>
    </div>
  )
}
