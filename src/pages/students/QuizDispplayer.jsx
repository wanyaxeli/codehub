import React from 'react'
import { useNavigate,useOutletContext } from 'react-router-dom'
export default function QuizDispplayer() {
    const {notDonequiz,complete} = useOutletContext();
  return (
    <div className='MyQuizzesWrapper'>
      {notDonequiz && notDonequiz.length > 0 ? notDonequiz.map(item => {
      const status = complete[item.id] || 'incomplete';

      return (
        <div key={item.id} className='QuizzCard'>
          <h3>{item.title}</h3>
          <p>Deadline: {item.deadline}</p><br/>
          <p>Status: <span>{status}</span></p>
          {status==='complete'?<button>attempted</button> :<button onClick={() => handleToQuiz(item)}>View</button>}
        </div>
      );
    }) : <p>No quizzes set yet</p>}
      </div>
  )
}
