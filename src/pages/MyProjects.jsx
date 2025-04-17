import React,{useState,useEffect} from 'react'
import axios from 'axios'
export default function MyProjects() {
  const [quiz,setQuiz]=useState()
  const [token,setToken]=useState()
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
function getQuiz(){
  if(token){
    const url = 'http://127.0.0.1:8000/AttemptQuizes/';
    axios.get(url,{headers:{
      'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
      console.log(res)
    })
    .catch(error=>console.log(err))
  }
}
useEffect(()=>{
 getToken()
},[])
  return (
    <div className='MyProjectsWrapper'>
        
          {Array(4).fill(0).map((item,i)=>{
            return(
          <div key={i} className='MyProjectsContainer'>
            <div className='ProjectsContainerUpper'></div>
            <div  className='ProjectsHolder'>
           <p>Introduction to html</p>
           <button>View</button>
          </div>
          </div>
            )
          })}
    </div>
  )
}
