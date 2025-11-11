import React,{useState} from 'react'
import ReactDOM from 'react-dom'; // Correct import
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
export default function StudentPopUp({setDaillyQuizAttempt,day,setStudentChoices,fullQuestions,marks,setMarks,getStudentQuestions}) {
    const[res,setRes]=useState('')
    const[token,setToken]=useState('')
    const[userId,setUser_id]=useState('')
    const navigate=useNavigate()
    const handleToHome =()=>{
     if(userId && marks){
        const url =`https://api.codingscholar.com/updateStudentMarks/${userId}`
        const data= marks
        axios.put(url,data)
        .then(res=>{
            markQuestionsCompleter()
        })
        .catch(error=>console.log(error))
     }
    }
    function markQuestionsCompleter(){
     if(fullQuestions.length>0){
      fullQuestions.forEach(item=>{
        const id = item.id
        const data={marks:marks,quiz_name:item.quiz_name,questions:fullQuestions}
        const url =`https://api.codingscholar.com/StudentMarks/`
        axios.post(url,data,{headers:{
          'Authorization':`Bearer ${token}`
        }})
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


