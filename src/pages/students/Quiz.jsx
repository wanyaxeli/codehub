import React,{useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function quiz() {
  const [token,setToken]=useState()
  const [quizId,setQuizid]=useState('')
  const [quiz,setQuiz]=useState('')
  const [quizTitle,setQuizTitle]=useState('')
  const [link,setLink]=useState('')
  const [error,setError]=useState('')
  const location = useLocation()
  const navigate=useNavigate()
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
const handleChange=(e)=>{
  setLink(e.target.value)
}
const isValidURL = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};
console.log('quix',quiz.split('.'))
const handlesubmit =()=>{
if(quizId && link){
  if (isValidURL(link)) {
    // const url = 'http://127.0.0.1:8000/AttemptQuizes/';
    const url = 'https://api.codingscholar.com/AttemptQuizes/';
    const data={link:link,quizId:quizId}
    axios.post(url,data,{headers:{
      'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
      console.log(res.data)
      alert(res.data)
      setLink('')
      navigate('/student/dashboard/My quizzes')
    })
    .catch(error=>console.log(error))
  }else{
    setError('Please Enter Valid link')
  }
}else{
  setError('Please Enter Project Link')
}
}
useEffect(()=>{
const state=location.state
const {id,title,quiz}=state
console.log('q',state)
setQuizTitle(title)
setQuiz(quiz)
setQuizid(id)

},[location])
useEffect(()=>{
 getToken()
},[])
  return (
    <div className='QuizWrapper'>
      {error && <p style={{color:'red',textAlign:'center'}}>{error}</p>}
        <h3>{quizTitle}</h3>
        <div className='quizContainer'>
            {/* <p>{quiz}</p> */}
              <ol>
              {quiz
                .split('.')
                .filter(item => item.trim() !== '') // remove empty item
                .map((item, i) => (
                  <li className='listOfQuizzes' key={i}>{item}</li>
                ))}
            </ol>
            <div className='quizInputWrapper'>
                <input value={link} onChange={handleChange} placeholder='Submit Project Link...'/><br/>
                <div className='quizBtnHolder'>
                <button onClick={handlesubmit}>submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}
