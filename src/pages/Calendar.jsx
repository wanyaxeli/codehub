import React,{useState,useEffect} from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DateTime } from "luxon";
export default function Calendar() {
  const [data,setData]=useState([])
  const [token,setToken]=useState()
  const [calendarEvent,setCalendarEvent]=useState([])
  const navigate=useNavigate()
  const handleEventClick = (clickInfo) => {
    // alert(`Event: ${clickInfo.event.title}\nStart: ${clickInfo.event.start}`);
    const eventStart = clickInfo.event.start.toISOString().split('.')[0] + 'Z';
    const eventTitle = clickInfo.event.title;
    const studentId=clickInfo.event.extendedProps.studentId
    const id = clickInfo.event.id
    console.log('infor clixk',eventStart)
    // const lesson=data.filter(item=>item.lesson.title===clickInfo.event.title)
    const lesson = data.filter(item =>
      item.lesson.title === eventTitle &&
      item.date_time === eventStart && 
      item.student.id===studentId 
      // item.is_completed===false
    );
    if(lesson.length > 0){
      navigate('/teacher/dashboard/Teacher Class Details',{state:lesson})
    }else{
      alert('unexpected error occured please try again')
    }
    // console.log('fiste',eventStart)
    // console.log('fisterdd',eventTitle)
    // console.log('event',lesson)
   
    // window.location.href = `/event/${clickInfo.event.id}`;
  };
  function getTeacherSchudule(){
    if(token){
    const url =`https://api.codingscholar.com/teacherSchedule/`
    axios.get(url,{headers:{
      'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
      // console.log('teacher',res.data)
      const data=res.data
      setData(data)
      data.forEach(item=>{
        console.log('item',item)
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const {title}=item.lesson
        const studentId=item.student.id
        console.log('item studnet',studentId)
        const localTime = DateTime.fromISO(item.date_time, { zone: 'utc' })
                             .setZone(userTimeZone) // or Intl.DateTimeFormat().resolvedOptions().timeZone
                             .toISO();
        const newdata={id:item.id,title:title,start:localTime, extendedProps: {
          studentId: studentId, // this will be available as clickInfo.event.extendedProps.studentId
        }}
        setCalendarEvent(pre=>([...pre,newdata]))
        // console.log('title',newdata)
      })
    })
    .catch(error=>console.log(error))
    }
  }
  console.log('data events',calendarEvent)
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
   getTeacherSchudule()
  },[token])
useEffect(()=>{
getToken()
},[])
  return (
    <div className='CalendarWrapper'>
      <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={calendarEvent}
      timeZone="local"
      eventClick={handleEventClick} // Event click handler
      eventDidMount={(info) => {
        info.el.style.cursor = "pointer"; // Apply pointer cursor only on events
      }}
    />
    </div>
  )
}
