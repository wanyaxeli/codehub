import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Courses() {
  const navigate=useNavigate()
  const handleToBookings =()=>{
    navigate('/register')
  }
  return (
    <div className='CoursesWrapper'>
        <div className='CoursesContainer'>
          <h3>Choose a coding course that excites your child</h3>
          <div className='courseCardContainer'>
                    <div  className='courseCard firstCourseCard'>
                     <div className='headerforCourse'>
                        <h2>Coding Explorer</h2>
                        <p>Building Blocks of Technology</p>
                     </div>
                     <div className='bodyForCourse'>
                       <div className='contentCourseDiv'>
                          <p style={{color:'#000'}}>Outcome</p>
                          <ul>
                            <li>Build a robot to perform basic tasks</li>
                            <li>Build a robot to perform basic tasks</li>
                            <li>Build a robot to perform basic tasks</li>
                          </ul>
                       </div>
                       <div className='courseActionBtn'>
                        <button onClick={handleToBookings}>Buy this course</button>
                       </div>
                     </div>
                    </div>
                    <div  className='courseCard secondCourseCard'>
                     <div className='headerforCourse'>
                        <h2>Coding Explorer</h2>
                        <p>Building Blocks of Technology</p>
                     </div>
                     <div className='bodyForCourse'>
                       <div className='contentCourseDiv'>
                          <p style={{color:'#000'}}>Outcome</p>
                          <ul>
                            <li>Build a robot to perform basic tasks</li>
                            <li>Build a robot to perform basic tasks</li>
                            <li>Build a robot to perform basic tasks</li>
                          </ul>
                       </div>
                       <div className='courseActionBtn'>
                        <button onClick={handleToBookings}>Buy this course</button>
                       </div>
                     </div>
                    </div>
                    <div  className='courseCard thirdCourseCard'>
                     <div className='headerforCourse'>
                        <h2>Coding Explorer</h2>
                        <p>Building Blocks of Technology</p>
                     </div>
                     <div className='bodyForCourse'>
                       <div className='contentCourseDiv'>
                          <p style={{color:'#000'}}>Outcome</p>
                          <ul>
                            <li>Build a robot to perform basic tasks</li>
                            <li>Build a robot to perform basic tasks</li>
                            <li>Build a robot to perform basic tasks</li>
                          </ul>
                       </div>
                       <div className='courseActionBtn'>
                        <button onClick={handleToBookings}>Buy this course</button>
                       </div>
                     </div>
                    </div>
          </div>
        </div>
    </div>
  )
}
