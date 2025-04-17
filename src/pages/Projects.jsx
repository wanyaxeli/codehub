import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ReviewPOP from '../Components/ReviewPop'
export default function MyProjects() {
  const [quiz,setQuiz]=useState([])
  const [quizId,setQuizId]=useState('')
  const [studentId,setStudentId]=useState('')
  const [token,setToken]=useState()
  const [review,setReview]=useState(false)
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
function getQuiz(){
  if(token){
    const url = 'http://127.0.0.1:8000/TeacherQuizes/';
    axios.get(url,{headers:{
      'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
      const data = res.data
      data.forEach(item=>{
        console.log(item)
        setQuizId(item.quiz.id)
        setStudentId(item.student.id)
      })
      setQuiz(res.data)
    })
    .catch(error=>console.log(error))
  }
}
const handleToReview=()=>{
  setReview(true)
}
useEffect(()=>{
  getQuiz()
 },[token])
useEffect(()=>{
 getToken()
},[])
  return (
    <div className='MyProjectsWrapper'>
        
          {quiz.map((item,i)=>{
            return(
          <div key={i} className='MyProjectsContainer'>
            <div className='ProjectsContainerUpper'></div>
            <div  className='ProjectsHolder'>
           <p>{item.quiz.title}</p>
           <button>View</button>
           <button onClick={handleToReview}>Review</button>
          </div>
          </div>
            )
          })}
          {review && <ReviewPOP studentId={studentId} quizId={quizId} setReview={setReview}/>}
    </div>
  )
}
