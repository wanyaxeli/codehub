import React from 'react'

export default function QuestionSetter() {
  return (
    <div className='QuestionSetterWrapper'>
         <h2>Create daily questions for students</h2>
         <div className='questionsInputContainer'>
            <input placeholder='Enter Question type coding/math'/><br/>
            <input placeholder='Enter grade'/><br/>
            <input placeholder='Enter module'/><br/>
            <textarea placeholder='Enter question'/><br/>
            <input placeholder='Enter answer'/><br/>
            <div className='optionsInputWrapper'>
            <input placeholder='Enter Question type optins'/>   
            <button>add</button>
            </div>  
            

         </div>
    </div>
  )
}
