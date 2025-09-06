import React,{useState,useEffect} from 'react'
import axios from 'axios';
export default function TodaysQuestions() {
  const[token,setToken]=useState('')
  const[questions,setQuestions]=useState([])
  const[error,setError]=useState('')
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
function getStudentQuestions(){
  if(token){
    const url ='https://api.codingscholar.com/studentQuestions/'
  axios.get(url,{headers:{
    'Authorization':`Bearer ${token}`
  }})
  .then(res=>{
    console.log('quiz',res.data)
    const data=res.data 
    if (Array.isArray(data) && data.length > 0) {
      setQuestions(data);
    } else {
      console.log("No questions found", data);
      setError('No questions found')
    }
  })
  .catch(error=>{
    console.log(error)
  })
  }
}
useEffect(()=>{
  getStudentQuestions()
},[token])
useEffect(()=>{
 getToken()
},[])
  return (
    <div className='TodaysQuestionsWrapper'>
        <div className='TodaysQuestionsContainer'>
          {/* <div>
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
          </div> */}
          {questions.length >0? questions.map((q) => (
          <div key={q.id} className="QuestionBlock">
            <p>{q.quiz}</p>
            <ul>
              {q.answeroptions.map((opt, i) => (
                <li key={i}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={opt}
                      // checked={answer[q.id] === opt}
                      onChange={() => handleSelect(q.id, opt)}
                    />
                    {opt}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )):<p>{error}</p>}
         {questions.length>0? <div className='TodaysQuestionsBtn'>
          <button>Submit</button>
          </div>:''}
        </div>
    </div>
  )
}
