import React from 'react'
import { useNavigate,useOutletContext } from 'react-router-dom'
export default function AttemptedQuizPage() {
    const navigate= useNavigate()
    const {Attemptedquestions} = useOutletContext();
    const handleToQuestion =(items)=>{
        
        items.forEach(item=>{
          console.log(item.questions)
           navigate('/student/dashboard/display-questions',{state:item.questions})
        })
        
    }
  return (
    <div className='questionHolder'>
    {Attemptedquestions ? Attemptedquestions.map((item,i)=>{
      return (
      <div key={i} className='questionCard'>
       <h4>{item.quiz_name}</h4>
       <p>Marks:<span>{`${item.quiz_marks}/100`}</span></p>
       <button onClick={()=>handleToQuestion(item.questions)}>view</button>
    </div>
      )
    }):<p>loading ....</p>}
</div>
  )
}
