import React ,{useState,useEffect}from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function MyLessons() {
  const [token,setToken]=useState('')
  const [lessons,setLessons]=useState([])
  const navigate=useNavigate()
  function GetMyLessons(){
    if(token){
      const url ='https://api.codingscholar.com/studentLessons/'
      axios.get(url,{headers:{
        'Authorization':`Bearer ${token}`
      }})
      .then(res=>{
        const data =res.data
        console.log('res',res.data)
        // setLessons(data)
        if(Array.isArray(data) && data.length > 0){
          data.forEach(lessons=>{
            const now = new Date(lessons.date_time)
            const time = now.toLocaleTimeString();
            const date=now.toLocaleDateString()
            // const{lesson}=lessons
            const newData={...lessons,...{time:time},...{date:date}}
            setLessons(pre=>([...pre,newData]))
            console.log('newdarsa',newData)
          })
        }else{
          setLessons(pre=>[])
        }
      })
      .catch(error=>console.log(error))
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
const handleToNotes =(notes)=>{
  navigate(`/student/dashboard/StudentNotes/`, { state: notes });
}
useEffect(()=>{
  GetMyLessons()
},[token])
useEffect(()=>{
  getToken()
},[])
  return (
    <div className='MyLessonWrapper'>
      {lessons && lessons.length >0? lessons.map(lesson=>{
        return(
        <div key={lesson.id} className='MyLessonContainer'>
        <div className='lessonModuleWrapper'>
          <h2>Lesson {lesson.lesson.lesson_number}</h2>
        </div>
        <div className='lessonsDetailsWrapper'>
          <h3>{lesson.lesson.title}</h3>
          <p>date:<span>{lesson.date}</span></p>
          <p>time:<span>{lesson.time}</span></p>
          <p>status:{lesson.is_completed===true?<span className='lessonStatus'>complete</span>:<span className='lessonStatus'>Incomplete</span>}</p>
          <div onClick={()=>handleToNotes(lesson.lesson.pdf_notes)}>
          {lesson.is_completed===true?<p>notes: <span style={{color:'blue',textTransform:'capitalize',cursor:"pointer",fontSize:'.8rem',textDecoration:'underline'}}>{lesson.lesson.title}</span></p>:null}
          </div>
        </div>
      </div>
        )
      }):<div className='noLessons'>
        <p>No lesson for today</p>
        </div>}
    </div>
  )
}
