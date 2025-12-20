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
const handleViewProject =(link)=>{
  if (!link.startsWith('http://') && !link.startsWith('https://')) {
    link = 'https://' + link; // add https:// if missing
  }
  window.open(link, '_blank');
}
function getQuiz(){
  if(token){
    const url = 'https://api.codingscholar.com/TeacherQuizes/';
    axios.get(url,{headers:{
      'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
      const data = res.data
      setQuiz(res.data)
    })
    .catch(error=>console.log(error))
  }
}
const handleToReview=(quizId,studentId)=>{
  setStudentId(studentId)
  setQuizId(quizId)
  console.log('idss',quizId,'studeid',studentId)
 if(studentId && quizId ){
  setReview(true)
 }
}
console.log('quiz',quiz)
useEffect(()=>{
  getQuiz()
 },[token])
useEffect(()=>{
 getToken()
},[])
console.log('qui',studentId,quizId)
  return (
    <div className='MyProjectsWrapper'>
        
          {quiz.length >0? quiz.map((item,i)=>{
            return(
          <div key={i} className='MyProjectsContainer'>
          <div className='ProjectsContainerUpper'>
            <h3>{item.student.user.first_name} {item.student.user.last_name}</h3>
          </div>
          <div  className='ProjectsHolder'>
            <p style={{color:'#000'}}>{item.quiz.title}</p>
            <button onClick={()=>handleViewProject(item.project_link)}>View</button>
            {item.review===true?  <button style={{marginLeft:20}}>Reviewed</button>:<button style={{marginLeft:20}} onClick={()=>handleToReview(item.quiz.id,item.student.id)}>Review</button>}
          </div>
          </div>
          )
          }):<p style={{color:"#000"}}>You have no projects from your students for now</p>}
          {review && quizId!=='' && quizId!=='undefined' && studentId!==''&&studentId!=='undefined' && <ReviewPOP getQuiz={getQuiz} studentId={studentId} quizId={quizId} setReview={setReview}/>}
    </div>
  )
}
