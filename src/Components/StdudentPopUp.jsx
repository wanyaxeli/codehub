import React,{useState} from 'react'
import ReactDOM from 'react-dom'; // Correct import
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
export default function StudentPopUp({setDaillyQuizAttempt,day,setStudentChoices,marks,setMarks,getStudentQuestions}) {
    const[res,setRes]=useState('')
    const[token,setToken]=useState('')
    const[userId,setUser_id]=useState('')
    const navigate=useNavigate()
    const handleToHome =()=>{
     if(userId && marks){
        const url =`https://api.codingscholar.com/updateStudentMarks/${userId}`
        console.log('ur',userId)
        const data= marks
        axios.put(url,data)
        .then(res=>{
            console.log(res.data)
            localStorage.setItem('attempted',day)
            navigate('/student/dashboard/Details')
        })
        .catch(error=>console.log(error))
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
    const handleTryAgain =()=>{
      setStudentChoices([])
        setMarks(false)
        getStudentQuestions()
    }
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
    useEffect(() => {
        if (token) {
          try {
            const decode = jwtDecode(token);
            const {role,user_id}=decode
            setUser_id(user_id)
            console.log("Decoded Token:", user_id);
            // setRole(role)
          } catch (error) {
            console.error("JWT Decode Error:", error);
          }
        }
      }, [token]);
      useEffect(()=>{
      confettiShow()
      },[marks])
    useEffect(()=>{
    getToken()
    },[])
  return ReactDOM.createPortal (
    <div className='AlertPOPUpWrapper'>
    <div className='AlertPOPUpContainer'>
        <div className='AlertPOPUp DeleteAlertPOPUp'>
        <p style={{textAlign:'center'}}>🎉 Congratulations! You scored <b>{marks}%</b> in today’s quiz.</p>
            <div>
            <button style={{color:'#fff'}} onClick={handleToHome}>go to dashboard</button>
            <button style={{color:'#fff'}} onClick={handleTryAgain}>try again</button>
            </div>
        </div>
     </div>
   </div>,
    document.getElementById('alert')
  )
}


