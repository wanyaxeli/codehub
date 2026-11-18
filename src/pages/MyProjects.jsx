import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {API} from '@/lib/api'
export default function MyProjects() {
  const [projects,setProject]=useState([])
  
function getProjects(){
    const url = `${API}/studentProject/`;
    axios.get(url)
    .then(res=>{
      const data=res.data
      console.log('res',data)
      if(Array.isArray(data) && data.length > 0){
        setProject(data)
      }else{
        setProject([])
      }
      console.log(res.data)
    })
    .catch(error=>console.log(error))
  
}
useEffect(()=>{
  getProjects()
 },[])
 const handleViewProject=(link)=>{
  if (!link.startsWith('http://') && !link.startsWith('https://')) {
    link = 'https://' + link; // add https:// if missing
  }
  window.open(link, '_blank');
 }

  return (
    <div className='MyProjectsWrapper'>
         <div>
         </div>
          {projects && projects.length >0? projects.map((item,i)=>{
            return(
          <div key={i} className='MyProjectsContainer'>
            <div className='ProjectsContainerUpper'></div>
            <div  className='ProjectsHolder'>
           <p>{item.title}</p>
           <button onClick={()=>handleViewProject(item.ProjectLink)}>View</button>
          </div>
          </div>
            )
          }):<p>You have no projects for now</p>}
    </div>
  )
}
