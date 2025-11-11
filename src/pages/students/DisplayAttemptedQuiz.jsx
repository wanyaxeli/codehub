import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
export default function DisplayAttemptedQuiz() {
    const [quiz,setQuiz]=useState([])
    const location=useLocation()
    useEffect(() => {
     const {state}=location
     console.log(state)
     if(state){
        setQuiz(state)
     }
    },[])
    
  return (
    <div className='DisplayAttemptedQuiz'>
      {quiz.length > 0?quiz.map((item,i)=>{
        return(
        <div key={i} className='questionCardHolder'>
        <p>{item.quiz}</p>
        <div className='answerQrapper'>
             <div className='InneranswerQrapper'>
                <p>Answer:{item.answer}</p>
             </div>
        </div>
      </div>
        )
      }):<p>loading ...</p>}
    </div>
  )
}
