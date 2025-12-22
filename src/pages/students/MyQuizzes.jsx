import React,{useState,useEffect} from 'react'
import { useNavigate,Outlet } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
export default function MyQuizzes() {
  const navigate=useNavigate()
  const [token,setToken]=useState()
  const [quiz,setQuiz]=useState([])
  const [notDonequiz,setNotDoneQuiz]=useState([])
  const [user_id,setUser_id]=useState('')
  const [attemptedquiz,setAttemptedQuiz]=useState([])
  const [complete,setComplete]=useState({})
  const [mathlessonactive,setMathLessonActive]=useState(false)
  const [codinglessonactive,setCodingLessonActive]=useState(true)
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
  if (quiz.length && attemptedquiz.length) {
    const notDone = quiz.filter(q =>
     {
     return  attemptedquiz.every(a => a.quiz.id !== q.id)
     }
    );
    setNotDoneQuiz(notDone)

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
useEffect(()=>{
getDecodeToken()
},[token])
// useEffect(()=>{
//   getStudentClassRoom()
//   },[user_id])
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
      console.log('ressssdd',res.data);
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
