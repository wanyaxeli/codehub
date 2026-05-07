import React ,{useState,useEffect, useMemo}from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
export default function MyLessons() {
  const [token,setToken]=useState('')
  const [fullData,setData]=useState([])
  const [lessons,setLessons]=useState([])
  const [activelesson,setActiveLesson]=useState('')
  const [mathlessonactive,setMathLessonActive]=useState(false)
  const [codinglessonactive,setCodingLessonActive]=useState(true)
  const [searchvalue,setSearchValue]=useState('')
  const navigate=useNavigate()
  function GetMyLessons(){
    if(token){
      const url ='https://api.codingscholar.com/studentLessons/'
      axios.get(url,{headers:{
        'Authorization':`Bearer ${token}`
      }})
      .then(res=>{
        const data =res.data
        
        // setLessons(data)
        if(Array.isArray(data) && data.length > 0){
          setData(data)
          data.forEach(lessons=>{
            const now = new Date(lessons.date_time)
            const time = now.toLocaleTimeString();
            const date=now.toLocaleDateString()
            // const{lesson}=lessons
            const newData={...lessons,...{time:time},...{date:date}}
            setLessons(pre=>([...pre,newData]))
         
          })
        }else{
          setLessons(pre=>[])
        }
      })
      .catch(error=>console.log(error))
    }
  }

  console.log("lessons...",lessons)
  function GetGroupClassMyLessons(){
    if(token){
      const url ='https://api.codingscholar.com/student_class_groups/'
      axios.get(url,{headers:{
        'Authorization':`Bearer ${token}`
      }})
      .then(res=>{
        const data =res.data
       
        // setLessons(data)
        if(Array.isArray(data) && data.length > 0){
          setData(data)
          data.forEach(lessons=>{
            const now = new Date(lessons.date_time)
            const time = now.toLocaleTimeString();
            const date=now.toLocaleDateString()
            // const{lesson}=lessons
            const newData={...lessons,...{time:time},...{date:date}}
            setLessons(pre=>([...pre,newData]))
            
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
const handleToNotes =(notesurl,videourl)=>{
  // console.log('resources001...',vediourl)
  const resources={
    notesurl,
    videourl
  }
  
  navigate(`/student/dashboard/StudentNotes/`, { state: resources });
}
function getcodingLessons() {
  if (fullData.length>0) {
    const codingLessons = fullData
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
  if (fullData.length >0) {
    const mathsLessons = fullData
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

const sortedlessons=lessons.sort((a,b)=>{

  return a.lesson.lesson_number-b.lesson.lesson_number
})
const filteredlessons=useMemo(()=>{
  return sortedlessons.filter((lesson)=>{
    return lesson.lesson.title.toLowerCase().includes(searchvalue.toLowerCase())
  })
},[searchvalue,lessons])

console.log('filteredlessons', lessons)

useEffect(()=>{
  GetMyLessons()
  GetGroupClassMyLessons()
},[token])
useEffect(()=>{
  if(fullData.length>0){
    const lessonTypes = fullData.map(item => item.lessonType);
  
    if (lessonTypes.includes('coding') && lessonTypes.includes('math')) {
      getcodingLessons();
      
    } else if (lessonTypes.includes('coding')) {
      getcodingLessons();
   
    } else if (lessonTypes.includes('math')) {
      getMathsLessons();
      
    }
  }
},[fullData])
useEffect(()=>{
  getToken()
},[])
  return (
    <div className='MyLessonWrapper'>
     <div className='classtypenavWrapper'>
      {fullData && fullData.some(item => item.lessonType === 'coding') && fullData.some(item => item.lessonType === 'math') && (
      <ul>
        <li onClick={handlecodingLessons} className={codinglessonactive ? 'activelesson' : ''}>coding</li>
        <li onClick={handleMathLessons} className={mathlessonactive ? 'activelesson' : ''}>mathematics</li>
      </ul>
        )}
      </div>
       <div className="flex-1 max-w-md hidden sm:flex  !p-3">
        <div className="relative w-full ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search lessons..."
            value={searchvalue}
            onChange={(e)=>setSearchValue(e.target.value)}
            className="!pl-10 bg-white border-border rounded-lg text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>
      {filteredlessons && filteredlessons.length >0? filteredlessons.map(lesson=>{
        return(
        <div key={lesson.id} className='MyLessonContainer'>
        <div className='lessonModuleWrapper'>
          <h2>Lesson {lesson.lesson.lesson_number}</h2>
        </div>
        <div className='lessonsDetailsWrapper'>
          <h3>{lesson.lesson.title}</h3>
          <p>date:<span>{lesson.date}</span></p>
          <p>time:<span>{lesson.time?.replace(/:\d{2}(?= )/, '')}</span></p>
          <p>status:{lesson.is_completed===true?<span className='lessonStatus'>complete</span>:<span className='lessonStatus'>Incomplete</span>}</p>
          <div onClick={()=>handleToNotes(lesson.lesson.pdf_notes,lesson.video_url)}>
          {lesson.is_completed===true?<button onClick={()=>handleToNotes()}>View class</button>:null}
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
