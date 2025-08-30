import React from 'react'

export default function TodaysQuestions() {
  return (
    <div className='TodaysQuestionsWrapper'>
        <div className='TodaysQuestionsContainer'>
          <div>
          <p>Which HTML tag is used to create a link?</p>
           <ul>
              <li> <input type='radio'/> {`<img>`}</li>
              <li> <input type='radio'/> {`<img>`}</li>
              <li> <input type='radio'/> {`<img>`}</li>
              <li> <input type='radio'/> {`<img>`}</li>
           </ul>
           <div className='answerDiv'>
             <span></span>
           </div>
           <p>Which HTML tag is used to create a link?</p>
           <ul>
              <li> <input type='radio'/> {`<img>`}</li>
              <li> <input type='radio'/> {`<img>`}</li>
              <li> <input type='radio'/> {`<img>`}</li>
              <li> <input type='radio'/> {`<img>`}</li>
           </ul>
           <p>Which HTML tag is used to create a link?</p>
           <ul>
              <li> <input type='radio'/> {`<img>`}</li>
              <li> <input type='radio'/> {`<img>`}</li>
              <li> <input type='radio'/> {`<img>`}</li>
              <li> <input type='radio'/> {`<img>`}</li>
           </ul>
          </div>
          {/* {questions.map((q) => (
          <div key={q.id} className="QuestionBlock">
            <p>{q.quiz}</p>
            <ul>
              {q.answerOptions.map((opt, i) => (
                <li key={i}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleSelect(q.id, opt)}
                    />
                    {opt}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))} */}
          <div className='TodaysQuestionsBtn'>
          <button>Submit</button>
          </div>
        </div>
    </div>
  )
}
