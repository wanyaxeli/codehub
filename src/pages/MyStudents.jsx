import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function MyStudents() {
    const navigate =useNavigate()
    const [token,setToken]=useState('')
    const [students,setStudent]=useState([])
    const handleView =()=>{
        navigate('/teacher/dashboard/Student Profile')
    }
    function getMyStudents(){
    if(token){
        const url ='http://127.0.0.1:8000/TeacherStudent/'
        axios.get(url,{headers:{
            'Authorization':`Bearer ${token}`
        }})
        .then(res=>{
            console.log('res',res.data)
            const data = res.data
            data.forEach(item=>{
                console.log('stde',item)
                setStudent([item.student])
            })
        })
        .catch(error=>console.log(error))
    }
    }
    async function getToken(){
        try{
            const token=localStorage.getItem('token') // No need to await
            if (token){
                setToken(token);
            }
        } catch(error) {
            console.log(error);
    }
    }
    useEffect(()=>{
    getToken()
    },[])
    useEffect(()=>{
        getMyStudents()
    },[token])
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
                {students.map(student=>{
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
            </table>
        </div>
    </div>
  )
}
