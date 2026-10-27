import React,{useState,useEffect} from 'react'
import { useNavigate,Outlet } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { API } from '@/lib/api'
import { useAuth } from '../context/AuthContext'
export default function MyQuizzes() {
  const navigate=useNavigate()
  const [quiz,setQuiz]=useState([])
  const [notDonequiz,setNotDoneQuiz]=useState([])
  const [user_id,setUser_id]=useState('')
  const [attemptedquiz,setAttemptedQuiz]=useState([])
  const [complete,setComplete]=useState({})
  const [mathlessonactive,setMathLessonActive]=useState(false)
  const [codinglessonactive,setCodingLessonActive]=useState(true)
  const {user}=useAuth()
  const role=user.role
  const id=user.id

 
function getStudentClassRoom(){
   if(user_id){
    const id =user_id
    axios.get(`${API}/studentRoom/${id}`)
    .then(res => {
      console.log('aaaaa',res.data)
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
function UnDoneQuizzes() {
  if (quiz.length >0 && attemptedquiz.length > 0 ) {
    const notDone = quiz.filter(q =>
     {
     return  attemptedquiz.every(a => a.quiz.id !== q.id)
     }
    );
    setNotDoneQuiz(notDone)

  }else{
    setNotDoneQuiz(quiz)
  }

 
}
// const handleToQuizes=()=>{
//   navigate('quizzes')
// }
console.log('complere',complete,'aat',attemptedquiz)
useEffect(() => {
  checkComplete()
  UnDoneQuizzes()
}, [quiz, attemptedquiz]);

// useEffect(()=>{
//   getStudentClassRoom()
//   },[user_id])
useEffect(() => {
  
    axios.get(`${API}/StudentAttemptedQuizes/`)
    .then(res => {
      console.log('attempted res', res.data);
      if (!res.data.error) {
        setAttemptedQuiz(res.data.data || []);
      }
    })
    .catch(console.error);

    axios.get(`${API}/Getquizes/`)
    .then(res => {
      console.log('ressssdd',res.data);
      if (!res.data.error) {
        setQuiz(res.data || []);

      }
    })
    .catch(console.error);
  }
, []);

const handlecodingLessons =()=>{
  setCodingLessonActive(true)
  setMathLessonActive(false)
  navigate('quizzes')
}
const handleMathLessons=()=>{
  setCodingLessonActive(false)
  setMathLessonActive(true)
  navigate('Attemptedquizzes')
}
  const handleToQuiz=(quiz)=>{
   navigate("/student/dashboard/Quiz",{state:quiz})
  }
  return (
    <div className='MyQuizzes'>
      <div className='classtypenavWrapper'>
        <ul>
          <li onClick={handlecodingLessons} className={codinglessonactive ? 'activelesson' : ''}>quiz</li>
          <li onClick={handleMathLessons} className={mathlessonactive ? 'activelesson' : ''}>attempted quiz</li>
        </ul>
      </div>
      <Outlet context={{notDonequiz,attemptedquiz,complete,handleToQuiz}}/>  
    </div>
  )
}
