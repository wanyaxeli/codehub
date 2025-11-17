import React,{useState,useEffect} from 'react'
import { useOutletContext } from 'react-router-dom';
import { useNavigate,Outlet } from 'react-router-dom'
export default function StudentQuestionPage() {
    const { fullQuestions } = useOutletContext();
    const navigate= useNavigate()
    const handleToQuestion =(item)=>{
        console.log(item)
        navigate('/student/dashboard/Today Questions',{state:{questions:item.questions,groupedQuiz:item}})
    }
   
  return (
    <div className='questionHolder'>
          {fullQuestions && fullQuestions.length>0 ? fullQuestions.map((item,i)=>{
            return (
            <div key={i} className='questionCard'>
             <h4>{item.quiz_name}</h4>
             <p>Expire:<span>{item.dateforquestionset}</span></p>
             <button onClick={()=>handleToQuestion(item)}>Attempt</button>
          </div>
            )
          }):<p>Please no questions found at the moment</p>}
      </div>
  )
}
