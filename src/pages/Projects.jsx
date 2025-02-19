import React from 'react'

export default function MyProjects() {
  return (
    <div className='MyProjectsWrapper'>
        
          {Array(4).fill(0).map((item,i)=>{
            return(
          <div key={i} className='MyProjectsContainer'>
            <div className='ProjectsContainerUpper'></div>
            <div  className='ProjectsHolder'>
           <p>Introduction to html</p>
           <div className='projectBtnWRapper'>
           <button>View</button>
           <button>Review</button>
           </div>
          </div>
          </div>
            )
          })}
    </div>
  )
}
