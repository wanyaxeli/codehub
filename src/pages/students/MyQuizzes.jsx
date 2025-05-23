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
    const url = 'https://api.codingscholar.com/Getquizes/';
    axios.get(url,{headers:{
      'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
      console.log('res',res.data)
      if (!res.data.error) {
        SetQuiz(res.data);
      }
    })
    .catch(error=>console.log(error))
  }
}
console.log('quix',quiz)
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
      {quiz && quiz.length > 0? quiz.map(item=>{
        return(
          <div key={item.id} className='QuizzCard'>
              <h3>{item.title}</h3>
              <p>Deadline: {item.deadline}</p>
              <p>status: <span>incomplate</span></p>
              <button onClick={()=>handleToQuiz(item)}>View</button>
          </div>
        )
      }):<p>No quizzes set yet</p>}
    </div>
  )
}
