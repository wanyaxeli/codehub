import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
export default function ScheduleClasses() {
  const initialState={day:'',time:''}
  const [fullDaysdata,setData]=useState([])
  const [days,setDays]=useState(initialState)
  const [lesson,setLesson]=useState('')
  const [lessontype,setLessonType]=useState('')
  const [studentId,setStudentId]=useState('')
  const location=useLocation()
  const handleChange=(e)=>{
  const {name,value}=e.target
  setDays({...days,[name]:value})
  }
  const handleAdd =()=>{
    setData(pre=>[...pre,days])
    setDays(initialState)
  }
  const handleCreateSchedule =()=>{
    if(studentId && lesson && fullDaysdata.length > 0){
      const id = studentId
       // Convert local date & time to UTC
      // const localDateTime = new Date(`${values.date}T${values.time}`);
      // const utcDateTime = localDateTime.toISOString();
      const url=`https://api.codingscholar.com/StudentLesson/${id}`
      const data = {
        lesson_schedule: fullDaysdata,
        roomType:lessontype,
        lessonNumber:parseInt(lesson)
      };
      axios.post(url,data)
      .then(res=>{
        console.log(res.data)
        // SetClassLesson(initialStateforLessonAttendace)
        alert('Class attendance time picked successfully ')
        setData([])
        // setSelectedTimes({})
        // setLessonNumber('')
      })
      .catch(error=>console.log(error))  
    }
  
  }
  const handleLessoType =(e)=>{
    setLessonType(e.target.value)
  }
  useEffect(()=>{  
    const {state}=location
    setStudentId(state)
    },[])
  const handlelesson =(e)=>{
    setLesson(e.target.value)
  }
  const handleClearSchedule =()=>{
    setData([])
  }
  return (
    <div className='ScheduleClassesWrapper'>
        <div className='ScheduleClassesDaysWrapper'>
        <h3>Lesson Attendance</h3>
           <div className='ScheduleClassesDaysInputWrapper'>
           <input value={days.day} name='day' type='text' onChange={handleChange}  placeholder='Enter day'/>
           <input value={days.time} name='time' type='time' onChange={handleChange}  placeholder='Enter day'/> 
           </div>
           <div className='ScheduleClassesDaysBtnWrapper'>
           <button onClick={handleAdd}>add</button>
           </div>
        </div>
        {fullDaysdata.length > 0? <div className='daysDisplayer'>
          <input value={lessontype} name='classtype' type='text' onChange={handleLessoType}  placeholder='Enter class coding/math'/>
          <input onChange={handlelesson} type='text' placeholder='Enter lesson number'/>
           <table>
              <thead>
              <tr>
                 <th>Day</th>
                 <th>Time</th>
              </tr>
              </thead>
              <tbody>
               {fullDaysdata.map((item,i)=>{
                return(
                  <tr key={i}>
                  <td>{item.day}</td>
                  <td>{item.time}</td>
               </tr>
                )
               })}
              </tbody>
           </table>
           <div className='ScheduleClassesDaysBtnWrapper'>
           <button onClick={handleCreateSchedule}>create schedule</button>
           <button onClick={handleClearSchedule}>clear schedule</button>
           </div>
        </div>:''}
    </div>
  )
}
