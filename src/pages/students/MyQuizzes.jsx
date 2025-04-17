import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function MyQuizzes() {
  const navigate=useNavigate()
  const [token,setToken]=useState()
  const [quiz,SetQuiz]=useState([])
  async function getToken(){
    try{
        const token= localStorage.getItem('token') // No need to await
        if (token){
            setToken(token);
        }
    } catch(error) {
        console.log(error);
}
} 
function getQuizzes(){
  if(token){
    const url = 'http://127.0.0.1:8000/Getquizes/';
    axios.get(url,{headers:{
      'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
      console.log(res.data)
      SetQuiz(res.data)
    })
    .catch(error=>console.log(error))
  }
}
useEffect(()=>{
getQuizzes()
},[token])
useEffect(()=>{
 getToken()
},[])
  const handleToQuiz=(quiz)=>{
   navigate("/student/dashboard/Quiz",{state:quiz})
  }
  return (
    <div className='MyQuizzes'>
      {quiz.map(item=>{
        return(
          <div key={item.id} className='QuizzCard'>
              <h3>{item.title}</h3>
              <p>Deadline: {item.deadline}</p>
              <p>status: <span>incomplate</span></p>
              <button onClick={()=>handleToQuiz(item)}>View</button>
          </div>
        )
      })}
      <div className='QuizzCard'>
          <h3>Introduction to roblox</h3>
          <p>Deadline: 1/22/2025</p>
          <p>status: <span>incomplate</span></p>
           <button>View</button>
      </div>
      <div className='QuizzCard'>
          <h3>Introduction to roblox</h3>
          <p>Deadline: 1/22/2025</p>
          <p>status: <span>incomplate</span></p>
           <button>View</button>
      </div>
      <div className='QuizzCard'>
          <h3>Introduction to roblox</h3>
          <p>Deadline: 1/22/2025</p>
          <p>status: <span>incomplate</span></p>
           <button>View</button>
      </div>
      <div className='QuizzCard'>
          <h3>Introduction to roblox</h3>
          <p>Deadline: 1/22/2025</p>
          <p>status: <span>incomplate</span></p>
           <button>View</button>
      </div>
      <div className='QuizzCard'>
          <h3>Introduction to roblox</h3>
          <p>Deadline: 1/22/2025</p>
          <p>status: <span>incomplate</span></p>
           <button>View</button>
      </div>
      <div className='QuizzCard'>
          <h3>Introduction to roblox</h3>
          <p>Deadline: 1/22/2025</p>
          <p>status: <span>incomplate</span></p>
           <button>View</button>
      </div>
    </div>
  )
}
