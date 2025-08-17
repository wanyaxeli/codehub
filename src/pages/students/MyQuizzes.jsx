import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
export default function MyQuizzes() {
  const navigate=useNavigate()
  const [token,setToken]=useState()
  const [quiz,setQuiz]=useState([])
  const [user_id,setUser_id]=useState('')
  const [attemptedquiz,setAttemptedQuiz]=useState([])
  const [complete,setComplete]=useState({})
  async function getDecodeToken(){
    try{
        if (token){
          try {
            const decode = jwtDecode(token);
            const { exp, role, user_id } = decode;
            setUser_id(user_id)
          } catch (error) {
            console.error("JWT Decode Error:", error);
          }
        }
    } catch(error) {
        console.log(error);
    }
}
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
function getStudentClassRoom(){
   if(user_id){
    const id =user_id
    axios.get(`https://api.codingscholar.com/studentRoom/${id}`)
    .then(res => {
      if (!res.data.error) {
        setAttemptedQuiz(res.data.data || []);
      }
    })
    .catch(console.error);
   }
}
function checkComplete(){
  if (quiz.length &&attemptedquiz.length) {
    const completedStatus = {};

    quiz.forEach(q => {
      const attempted = attemptedquiz.some(a => a.quiz.id === q.id);
      if (attempted) {
        completedStatus[q.id] = 'complete';
      }
    });

    setComplete(completedStatus);
  }
}
console.log('complere',complete)
useEffect(() => {
  checkComplete()
}, [quiz, attemptedquiz]);
useEffect(()=>{
getDecodeToken()
},[token])
useEffect(()=>{
  getStudentClassRoom()
  },[user_id])
useEffect(() => {
  if (token) {
    axios.get('https://api.codingscholar.com/StudentAttemptedQuizes/', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      console.log('attempted res', res.data);
      if (!res.data.error) {
        setAttemptedQuiz(res.data.data || []);
      }
    })
    .catch(console.error);

    axios.get('https://api.codingscholar.com/Getquizes/',{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      console.log('res', res.data);
      if (!res.data.error) {
        setQuiz(res.data || []);

      }
    })
    .catch(console.error);
  }
}, [token]);
useEffect(()=>{
 getToken()
},[])
  const handleToQuiz=(quiz)=>{
   navigate("/student/dashboard/Quiz",{state:quiz})
  }
  return (
    <div className='MyQuizzes'>
      {quiz && quiz.length > 0 ? quiz.map(item => {
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
