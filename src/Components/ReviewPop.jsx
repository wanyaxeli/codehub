import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'; // Correct import
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function ReviewPOP({getQuiz,setReview,studentId,quizId}) {
    const navigate =useNavigate()
    const initialState={
      points:'',
      comment:''
    }
    const [token,setToken]=useState('')
    const [values,setValues]=useState(initialState)
    const [error,setError]=useState('')
   const handleReview=()=>{
   if(studentId && quizId && token && values.points !=='undefined' && values.comment !=='undefined' ){
    const url = 'https://api.codingscholar.com/updateStudentMarks/';
    const data={studentId:studentId,points:parseInt(values.points),comment:values.comment,quizId:quizId}
    axios.put(url,data,{headers:{
        'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
        console.log(res.data)
        setValues(initialState)
        getQuiz()
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
    const {name,value}=e.target
    setValues({
      ...values,[name]:value
    })
   }
   console.log(values)
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
                 <input  name='points' value={values.points} onChange={handleChange} type='text' placeholder='Enter points'/>
                 <input name='comment' value={values.comment} onChange={handleChange} type='text' placeholder='Enter comment'/>
                <div>
                <button style={{color:'#000'}} onClick={handleReview}>Review</button>
                </div>
            </div>
        </div>
    </div>,
    document.getElementById('review')
  )
}