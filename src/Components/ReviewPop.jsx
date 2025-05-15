import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'; // Correct import
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function ReviewPOP({setReview,studentId,quizId}) {
    const navigate =useNavigate()
    const [token,setToken]=useState('')
    const [points,setPoints]=useState('')
    const [error,setError]=useState('')
   const handleReview=()=>{
   if(studentId && quizId && token && points){
    const url = 'http://localhost:8000/updateStudentMarks/';
    const data={studentId:studentId,points:points,quizId:quizId}
    axios.put(url,data,{headers:{
        'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
        console.log(res.data)
        setPoints('')
        setReview(false)
    })
    .catch(error=>console.log(error))
   }else{
    setError('Please enter marks for the student')
   }
   }
   const handleClosePopUp =()=>{
    setReview(false)
   }
   const handleChange =(e)=>{
    setPoints(e.target.value)
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
useEffect(()=>{
 getToken()
},[])
  return ReactDOM.createPortal (
    <div className='AlertPOPUpWrapper'>
        <div className='AlertPOPUpContainer'>
            <div className='AlertPOPUp ReviewPopWrapper'>
                {error && <p style={{color:"red",textAlign:'center'}}>{error}</p>}
                <div className='reviewClinBtnWrapper'>
                  <div onClick={handleClosePopUp} className='reviewClinBtnContainer'>
                    <span>&times;</span>
                  </div>
                </div>
                 <input value={points} onChange={handleChange} type='text' placeholder='Enter points'/>
                <div>
                <button style={{color:'#000'}} onClick={handleReview}>Review</button>
                </div>
            </div>
        </div>
    </div>,
    document.getElementById('review')
  )
}