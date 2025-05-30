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
                            <li>Kids take their first steps into coding</li>
                            <li>Learn through stories, games, and animations</li>
                            <li>Ideal for  first-time coders</li>
                          </ul>
                       </div>
                       <div className='courseActionBtn'>
                        <button onClick={handleToBookings}>Buy this course</button>
                       </div>
                     </div>
                    </div>
                    <div  className='courseCard secondCourseCard'>
                     <div className='headerforCourse'>
                        <h2>Coding Innovator</h2>
                        <p>From Curiosity to Creation</p>
                     </div>
                     <div className='bodyForCourse'>
                       <div className='contentCourseDiv'>
                          <p style={{color:'#000'}}>Outcome</p>
                          <ul>
                            <li>Students level up their coding journey</li>
                            <li>Build real apps and design websites</li>
                            <li>Ideal for those with basic coding skills</li>
                          </ul>
                       </div>
                       <div className='courseActionBtn'>
                        <button onClick={handleToBookings}>Buy this course</button>
                       </div>
                     </div>
                    </div>
                    <div  className='courseCard thirdCourseCard'>
                     <div className='headerforCourse'>
                        <h2>Coding Specialist</h2>
                        <p>Where Young Minds Master Big Tech</p>
                     </div>
                     <div className='bodyForCourse'>
                       <div className='contentCourseDiv'>
                          <p style={{color:'#000'}}>Outcome</p>
                          <ul>
                            <li>Dive into Python, JavaScript development</li>
                            <li>Work on advanced, real-world projects</li>
                            <li>Ideal for advanced learners</li>
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
