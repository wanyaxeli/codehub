import React from 'react'

export default function quiz() {
  return (
    <div className='QuizWrapper'>
        <h3>Introduction to roblox</h3>
        <div className='quizContainer'>
            <p>Can you create a game in Roblox where players need to collect hidden treasures on an island while avoiding traps? The game should have a timer, and players should win if they collect all treasures before time runs out!</p>
            <div className='quizInputWrapper'>
                <input placeholder='Enter Link'/><br/>
                <div className='quizBtnHolder'>
                <button>submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}
