import React,{useState,useEffect} from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Calendar() {
  const [data,setData]=useState([])
  const [token,setToken]=useState()
  const [calendarEvent,setCalendarEvent]=useState([])
  const navigate=useNavigate()
  const handleEventClick = (clickInfo) => {
    // alert(`Event: ${clickInfo.event.title}\nStart: ${clickInfo.event.start}`);

    const lesson=data.filter(item=>item.lesson.title===clickInfo.event.title)
    if(lesson){
      navigate('/teacher/dashboard/Teacher Class Details',{state:lesson})
    }
    console.log('fiste',lesson)
    // Example: Navigate to event details page
    // window.location.href = `/event/${clickInfo.event.id}`;
  };
  function getTeacherSchudule(){
    if(token){
    const url =`http://127.0.0.1:8000/teacherSchedule/`
    axios.get(url,{headers:{
      'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
      console.log('teacher',res.data)
      const data=res.data
      setData(data)
      data.forEach(item=>{
        console.log('item',item)
        const {title}=item.lesson
        const newdata={id:item.id,title:title,start:item.date_time}
        setCalendarEvent(pre=>([...pre,newdata]))
        // console.log('title',newdata)
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
      eventClick={handleEventClick} // Event click handler
      eventDidMount={(info) => {
        info.el.style.cursor = "pointer"; // Apply pointer cursor only on events
      }}
    />
    </div>
  )
}
