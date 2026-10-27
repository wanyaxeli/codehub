import React,{useState} from 'react'
import ReactDOM from 'react-dom'; // Correct import
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { API } from '@/lib/api';
export default function StudentPopUp({fullQuestions,marks,studentChoices}) {
    const[res,setRes]=useState('')

   
    const {user}=useAuth()
    const userId=user.id
    const navigate=useNavigate()
    const handleToHome =()=>{
     if(userId && marks){
        const url =`${API}/updateStudentMarks/${userId}`
        const data= marks
        axios.put(url,data,{withCredentials:true})
        .then(res=>{
            markQuestionsCompleter()
        })
        .catch(error=>console.log(error))
     }
    }
    console.log('choice',studentChoices)
    function markQuestionsCompleter(){
     if(studentChoices && fullQuestions.length>0){
      fullQuestions.forEach(item=>{
        const id = item.id
        const data={marks:marks,quiz_name:item.quiz_name,questions:{question:fullQuestions,studentChoices:studentChoices}}
        const url =`${API}/StudentMarks/`
        axios.post(url,data,{withCredentials:true})
        .then(res=>{
          navigate('/student/dashboard/Questions')
        })
        .catch(error=>console.log(error))
      })
     }
    }
    function confettiShow() {
      if (marks && marks > 59) {
        const duration = 10 * 1000; // runs for 2 seconds
        const end = Date.now() + duration;
    
        (function frame() {
          confetti({
            particleCount: 10,
            startVelocity: 30,
            spread: 360,
            origin: {
              x: Math.random(),
              y: Math.random() - 0.2, // a bit higher than the bottom
            },
          });
    
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();
      }
    }
    // const handleTryAgain =()=>{
    //   setStudentChoices([])
    //     setMarks(false)
    //     navigate('/student/dashboard/Today Questions',{state:fullQuestions})
    // }
  
  
      useEffect(()=>{
      confettiShow()
      },[marks])
   
    // useEffect(()=>{
    // markQuestionsCompleter()
    // },[fullQuestions])

  return ReactDOM.createPortal (
    <div className='AlertPOPUpWrapper'>
    <div className='AlertPOPUpContainer'>
        <div className='AlertPOPUp DeleteAlertPOPUp'>
        <p style={{textAlign:'center'}}>🎉 Congratulations! You scored <b>{marks}%</b> in today’s quiz.</p>
            <div>
            <button style={{color:'#fff'}} onClick={handleToHome}>okay</button>
            {/* <button style={{color:'#fff'}} onClick={handleTryAgain}>try again</button> */}
            </div>
        </div>
     </div>
   </div>,
    document.getElementById('alert')
  )
}


