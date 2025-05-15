import React,{useState,useEffect} from 'react'
import axios from 'axios'
export default function MyProjects() {
  const [projects,setProject]=useState([])
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
function getProjects(){
  if(token){
    const url = 'http://127.0.0.1:8000/studentProject/';
    axios.get(url,{headers:{
      'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
      const data=res.data
      setProject(data)
      console.log(res.data)
    })
    .catch(error=>console.log(error))
  }
}
useEffect(()=>{
  getProjects()
 },[token])
 const handleViewProject=(link)=>{
  if (!link.startsWith('http://') && !link.startsWith('https://')) {
    link = 'https://' + link; // add https:// if missing
  }
  window.open(link, '_blank');
 }
useEffect(()=>{
 getToken()
},[])
  return (
    <div className='MyProjectsWrapper'>
        
          {projects.map((item,i)=>{
            return(
          <div key={i} className='MyProjectsContainer'>
            <div className='ProjectsContainerUpper'></div>
            <div  className='ProjectsHolder'>
           <p>{item.title}</p>
           <button onClick={()=>handleViewProject(item.ProjectLink)}>View</button>
          </div>
          </div>
            )
          })}
    </div>
  )
}
