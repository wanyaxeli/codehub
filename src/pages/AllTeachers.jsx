import React,{useState,useEffect} from 'react'
import axios from 'axios'
export default function AllTeachers() {
  const [teacher,setTeacher]=useState([])
  
  useEffect(()=>{
    const url ='https://api.codingscholar.com/registerTeacher/'
    axios.get(url,{headers:{
        'Authorization':'application/json'
    }})
    .then(res=>{
        console.log(res.data)
        const data=res.data
        setTeacher(data)
    })
    .catch(error=>{
        console.log(error)
    })
  },[])
  return (
    <div className='AllTeachersWrapper'>
        <h3>All Teachers</h3>
        <div className='AllTeachersContainer'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>Number</th>
                        <th>Country</th>
                        <th>Earning</th>
                    </tr>
                </thead>
                <tbody>
                   {teacher.map(item=>{
                    return(
                        <tr key={item.user.id}>
                        <td>{item.user.first_name} {item.user.last_name}</td>
                        <td>{item.user.email}</td>
                        <td>{item.user.phone_number}</td>
                        <td>{item.country}</td>
                        <td>{item.salary}</td>
                        <td><button>fire</button></td>
                    </tr>
                    )
                   })}
                </tbody>
            </table>
        </div>
    </div>
  )
}
