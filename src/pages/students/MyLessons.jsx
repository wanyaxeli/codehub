import React ,{useState,useEffect}from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function MyLessons() {
  const [token,setToken]=useState('')
  const [data,setData]=useState([])
  const [lessons,setLessons]=useState([])
  const [activelesson,setActiveLesson]=useState('')
  const [mathlessonactive,setMathLessonActive]=useState(false)
  const [codinglessonactive,setCodingLessonActive]=useState(true)
  const navigate=useNavigate()
  function GetMyLessons(){
    if(token){
      const url ='https://api.codingscholar.com/studentLessons/'
      axios.get(url,{headers:{
        'Authorization':`Bearer ${token}`
      }})
      .then(res=>{
        const data =res.data
        console.log('res hello',res.data)
        // setLessons(data)
        if(Array.isArray(data) && data.length > 0){
          setData(data)
          getcodingLessons()
          // data.forEach(lessons=>{
          //   const now = new Date(lessons.date_time)
          //   const time = now.toLocaleTimeString();
          //   const date=now.toLocaleDateString()
          //   // const{lesson}=lessons
          //   const newData={...lessons,...{time:time},...{date:date}}
          //   setLessons(pre=>([...pre,newData]))
          //   console.log('newdarsa',newData)
          // })
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
function getcodingLessons() {
  if (data) {
    const codingLessons = data
      .filter(lesson => lesson.lessonType === 'coding')
      .map(lesson => {
        const now = new Date(lesson.date_time);
        const time = now.toLocaleTimeString();
        const date = now.toLocaleDateString();
        return { ...lesson, time, date };
      })
      .sort((a, b) => a.lesson.lesson_number - b.lesson.lesson_number); // Sort ascending by lesson number

    setLessons(codingLessons);
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
function getMathsLessons() {
  if (data) {
    const mathsLessons = data
      .filter(lesson => lesson.lessonType === 'math')
      .map(lesson => {
        const now = new Date(lesson.date_time);
        const time = now.toLocaleTimeString();
        const date = now.toLocaleDateString();
        return { ...lesson, time, date };
      })
      .sort((a, b) => a.lesson.lesson_number - b.lesson.lesson_number);

    setLessons(mathsLessons);
  }
}

useEffect(()=>{
  GetMyLessons()
},[token])
useEffect(()=>{
  getcodingLessons()
},[data])
useEffect(()=>{
  getToken()
},[])
  return (
    <div className='MyLessonWrapper'>
     <div className='classtypenavWrapper'>
      {data && data.some(item => item.lessonType === 'coding') && data.some(item => item.lessonType === 'math') && (
      <ul>
        <li onClick={handlecodingLessons} className={codinglessonactive ? 'activelesson' : ''}>coding</li>
        <li onClick={handleMathLessons} className={mathlessonactive ? 'activelesson' : ''}>mathematics</li>
      </ul>
        )}
      </div>
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
          {lesson.is_completed===true?<button onClick={()=>handleToNotes()}>View notes</button>:null}
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
