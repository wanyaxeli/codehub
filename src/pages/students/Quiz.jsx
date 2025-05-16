import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
export default function quiz() {
  const [token,setToken]=useState()
  const [quizId,setQuizid]=useState('')
  const [quiz,setQuiz]=useState('')
  const [link,setLink]=useState('')
  const [error,setError]=useState('')
  const location = useLocation()
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
const handlesubmit =()=>{
if(quizId && link){
  if (isValidURL(link)) {
    // const url = 'http://127.0.0.1:8000/AttemptQuizes/';
    const url = 'http://api.codingscholar.com/AttemptQuizes/';
    const data={link:link,quizId:quizId}
    axios.post(url,data,{headers:{
      'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
      console.log(res.data)
      alert(res.data)
      setLink('')
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
const {id,quiz}=state
console.log(quiz)
setQuiz(quiz)
setQuizid(id)

},[location])
useEffect(()=>{
 getToken()
},[])
  return (
    <div className='QuizWrapper'>
      {error && <p style={{color:'red',textAlign:'center'}}>{error}</p>}
        <h3>Introduction to roblox</h3>
        <div className='quizContainer'>
            <p>{quiz}</p>
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
