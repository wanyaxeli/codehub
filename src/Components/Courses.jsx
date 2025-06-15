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
                    <div  className='courseCard'>
                     <div className='headerforCourse'>
                        <h2>Coding Explorer</h2>
                        <p>Building Blocks of Technology</p>
                     </div>
                     <div className='bodyForCourse'>
                       <div className='contentCourseDiv'>
                          <p style={{color:'#000',paddingBottom:10}}>Outcome</p>
                          <ul>
                            <li><span><i className="fa fa-star" aria-hidden="true"></i> </span> Kids take their first steps into coding</li>
                            <li><span><i className="fa fa-star" aria-hidden="true"></i> </span> Learn through stories, games, and animations</li>
                            <li><span><i className="fa fa-star" aria-hidden="true"></i> </span> Ideal for  first-time coders</li>
                          </ul>
                       </div>
                       <div className='courseActionBtn'>
                        <button onClick={handleToBookings}>Buy this course</button>
                       </div>
                     </div>
                    </div>
                    <div  className='courseCard '>
                     <div className='headerforCourse'>
                        <h2>Coding Innovator</h2>
                        <p>From Curiosity to Creation</p>
                     </div>
                     <div className='bodyForCourse'>
                       <div className='contentCourseDiv'>
                          <p style={{color:'#000',paddingBottom:10}}>Outcome</p>
                          <ul>
                            <li><span><i className="fa fa-star" aria-hidden="true"></i> </span> Students level up their coding journey</li>
                            <li><span><i className="fa fa-star" aria-hidden="true"></i> </span> Build real apps and design websites</li>
                            <li><span><i className="fa fa-star" aria-hidden="true"></i> </span> Ideal for those with basic coding skills</li>
                          </ul>
                       </div>
                       <div className='courseActionBtn'>
                        <button onClick={handleToBookings}>Buy this course</button>
                       </div>
                     </div>
                    </div>
                    <div  className='courseCard '>
                     <div className='headerforCourse'>
                        <h2>Coding Specialist</h2>
                        <p>Where Young Minds Master Big Tech</p>
                     </div>
                     <div className='bodyForCourse'>
                       <div className='contentCourseDiv'>
                          <p style={{color:'#000',paddingBottom:10}}>Outcome</p>
                          <ul>
                            <li><span><i className="fa fa-star" aria-hidden="true"></i> </span> Dive into Python, JavaScript development</li>
                            <li><span><i className="fa fa-star" aria-hidden="true"></i> </span> Work on advanced, real-world projects</li>
                            <li><span><i className="fa fa-star" aria-hidden="true"></i> </span> Ideal for advanced learners</li>
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
