import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
export default function MyQuizzes() {
  const navigate=useNavigate()
  const handleToQuiz=()=>{
   navigate("/student/dashboard/Quiz")
  }
  return (
    <div className='MyQuizzes'>
      <div className='QuizzCard'>
          <h3>Introduction to roblox</h3>
          <p>Deadline: 1/22/2025</p>
          <p>status: <span>incomplate</span></p>
           <button onClick={handleToQuiz}>View</button>
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
      <div className='QuizzCard'>
          <h3>Introduction to roblox</h3>
          <p>Deadline: 1/22/2025</p>
          <p>status: <span>incomplate</span></p>
           <button>View</button>
      </div>
    </div>
  )
}
