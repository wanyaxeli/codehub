import React from 'react'

export default function SetQuiz() {
  return (
    <div className='SetQuizWrapper'>
        <h3>set quiz for students</h3>
        <div className='quizContainer'>
            <input type='text' placeHolder='Quiz name...'/><br/>
            <input type='text' placeHolder='Grade...'/><br/>
            <textarea placeholder='Quiz...'/>
            <div className='QuizBtnWrapper'>
                <button>submit</button>
            </div>
        </div>
    </div>
  )
}
