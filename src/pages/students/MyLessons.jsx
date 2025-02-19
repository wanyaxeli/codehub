import React ,{useState,useEffect}from 'react'
import axios from 'axios'
export default function MyLessons() {
  const [token,setToken]=useState('')
  const [lessons,setLessons]=useState([])
  function GetMyLessons(){
    if(token){
      const url ='http://127.0.0.1:8000/studentLessons/'
      axios.get(url,{headers:{
        'Authorization':`Bearer ${token}`
      }})
      .then(res=>{
        const data =res.data
        console.log('res',res.data)
        // setLessons(data)
        data.forEach(lessons=>{
          const now = new Date(lessons.date_time)
          const time = now.toLocaleTimeString();
          const date=now.toLocaleDateString()
          // const{lesson}=lessons
          const newData={...lessons,...{time:time},...{date:date}}
          setLessons(pre=>([...pre,newData]))
          console.log('newdarsa',newData)
        })
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
useEffect(()=>{
  GetMyLessons()
},[token])
useEffect(()=>{
  getToken()
},[])
  return (
    <div className='MyLessonWrapper'>
      {lessons.map(lesson=>{
        return(
        <div key={lesson.id} className='MyLessonContainer'>
        <div className='lessonModuleWrapper'>
          <h2>Lesson {lesson.lesson.lesson_number}</h2>
        </div>
        <div className='lessonsDetailsWrapper'>
        <h3>{lesson.lesson.title}</h3>
        <p>date:<span>{lesson.date}</span></p>
        <p>date:<span>{lesson.time}</span></p>
        <p>status:{lesson.is_complate===true?<span className='lessonStatus'>complete</span>:<span className='lessonStatus'>Incomplete</span>}</p>
        <p>notes:<span>992020</span></p>
        </div>
      </div>
        )
      })}
    </div>
  )
}
