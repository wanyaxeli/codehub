import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { context } from '../../App';
import { useContext } from 'react';
import StudentPopUp from '../../Components/StdudentPopUp';
export default function TodaysQuestions() {
  const[token,setToken]=useState('')
  const[questions,setQuestions]=useState([])
  const[fullQuestions,setFullQuestions]=useState([])
  const[answers,setAnswer]=useState([])
  const[studentChoices,setStudentChoices]=useState([])
  const[error,setError]=useState('')
  const[day,setDay]=useState('')
  const[marks,setMarks]=useState('')
  const [mathlessonactive,setMathLessonActive]=useState(false)
  const [codinglessonactive,setCodingLessonActive]=useState(true)
  const[showMarks,setshowMarks]=useState(false)
  const {DaillyQuizAttempt,setDaillyQuizAttempt}=useContext(context)
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
const handleSelect = (id, option, answer) => {
  const studentChoice = { id: id, choice: option };

  setStudentChoices(prevChoices => {
    // remove any existing choice with the same id
    const filtered = prevChoices.filter(choice => choice.id !== id);

    // add the new choice
    return [...filtered, studentChoice];
  });
};
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
      setFullQuestions(data);
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
function getcodingLessons() {
  if (fullQuestions.length>0) {
    const codingLessons = fullQuestions.filter(lesson => lesson.quiztype === 'coding')
    setQuestions(codingLessons);
  }
}
function getMathsLessons() {
  if (fullQuestions.length >0) {
    const mathsLessons = fullQuestions.filter(lesson => lesson.quiztype === 'math')
    setQuestions(mathsLessons);
  }
}
const handlecodingLessons =()=>{
  setCodingLessonActive(true)
  setMathLessonActive(false)
  getcodingLessons()
}
const handleMathLessons=()=>{
  setCodingLessonActive(false)
  setMathLessonActive(true)
  getMathsLessons()
}
useEffect(()=>{
 if(questions.length>0){
  questions.map(question=>{
   
    const todayDate=question.dateforquestionset
    const date = new Date(todayDate);

    // Get day of the week (e.g., "Tuesday")
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    console.log('qasd',dayName)
    setDay(dayName)
  })
 }
},[questions])
useEffect(()=>{
  if(fullQuestions.length>0){
    const lessonTypes = fullQuestions.map(item => item.quiztype);
    console.log('type',lessonTypes)
    if (lessonTypes.includes('coding') && lessonTypes.includes('math')) {
      getcodingLessons();
      console.log('both',lessonTypes)
    } else if (lessonTypes.includes('coding')) {
      getcodingLessons();
      console.log('coding',lessonTypes)
    } else if (lessonTypes.includes('math')) {
      getMathsLessons();
      console.log('math',lessonTypes)
    }
  }
},[fullQuestions])
useEffect(()=>{
 if(questions.length > 0){
  questions.forEach(question=>{
    console.log(question.answer)
    setAnswer(pre=>[...pre,question.answer])
  })
 }
},[questions])
const handleSubmit = () => {
  if (studentChoices.length === answers.length) {

    // Extract only the choices from studentChoices
    const selected = studentChoices.map(c => c.choice);

    // Compare with answers
    const correct = selected.filter(choice => answers.includes(choice));
    const wrong = selected.filter(choice => !answers.includes(choice));

    const total = answers.length; // e.g., 5
    const score = correct.length;
    const percentage = (score / total) * 100;
    setMarks(percentage)
  } else {
    setError("Please answer all questions");
  }
};
useEffect(()=>{
  setshowMarks(true)
},[marks])
useEffect(()=>{
  getStudentQuestions()
},[token])
console.log('dai',DaillyQuizAttempt)
useEffect(()=>{
 getToken()
},[])
  return (
    <div className='TodaysQuestionsWrapper'>
        <div className='TodaysQuestionsContainer'>
      <div className='classtypenavWrapper'>
          {DaillyQuizAttempt!==day?fullQuestions && fullQuestions.some(item => item.quiztype === 'coding') && fullData.some(item => item.quiztype === 'math') && (
          <ul>
            <li onClick={handlecodingLessons} className={codinglessonactive ? 'activelesson' : ''}>coding</li>
            <li onClick={handleMathLessons} className={mathlessonactive ? 'activelesson' : ''}>mathematics</li>
          </ul>
            ):''}
      </div>
         {error && <p style={{color:'red'}}>{error}</p>}
          {DaillyQuizAttempt!==day? questions.length >0? questions.map((q) => (
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
                      onChange={() => handleSelect(q.id, opt,q.answer)}
                    />
                    {opt}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )):<p>{error}</p>:<div className='attemptedWrapper'>
           <p>You have already attempted todays' questions let's meet tomorrow</p>
          </div>}
         {DaillyQuizAttempt !==day? questions.length>0? <div className='TodaysQuestionsBtn'>
          <button onClick={handleSubmit}>Submit</button>
          </div>:'':''}
        </div>
        {showMarks && marks && <StudentPopUp marks={marks} setDaillyQuizAttempt={setDaillyQuizAttempt} day={day} setStudentChoices={setStudentChoices} setMarks={setMarks} getStudentQuestions={getStudentQuestions}/>}
    </div>
  )
}
