import React from 'react'

export default function Courses() {
  return (
    <div className='CoursesWrapper'>
        <div className='CoursesContainer'>
          <h3>Choose a coding course that excites your child</h3>
          <div className='courseCardContainer'>
             {Array(8).fill(0).map((item,i)=>{
                return(
                    <div key={i} className='courseCard'></div>
                )
             })}
          </div>
        </div>
    </div>
  )
}
