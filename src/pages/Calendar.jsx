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
    const classType=clickInfo.event.extendedProps.classType
    const id = clickInfo.event.id
    
    // const lesson=data.filter(item=>item.lesson.title===clickInfo.event.title)
    const lesson = data.filter(item =>
      item.lesson.title === eventTitle &&
      item.date_time === eventStart && 
      item.student.id===studentId && 
      item.classType===classType
      // item.is_completed===false
    );
    console.log('infor clixk',lesson)
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
      console.log('asda',data)
      if(data.length > 0){
        setData(pre=> [...pre,data])
      data.forEach(item=>{
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const {title}=item.lesson
        const studentId=item.student.id
        const localTime = DateTime.fromISO(item.date_time, { zone: 'utc' })
                             .setZone(userTimeZone) // or Intl.DateTimeFormat().resolvedOptions().timeZone
                             .toISO();
        const newdata={id:item.id,title:title,start:localTime, extendedProps: {
          studentId: studentId, // this will be available as clickInfo.event.extendedProps.studentId
        }}
        setCalendarEvent(pre=>([...pre,newdata]))
        // console.log('title',newdata)
      })
      }
    })
    .catch(error=>console.log(error))
    }
  }
  function getTeacherGroupClassSchudule(){
    if(token){
    const url =`https://api.codingscholar.com/teacherGroupClass/`
    axios.get(url,{headers:{
      'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
      // console.log('teacher',res.data)
      const data=res.data
      if(data.length > 0){
         setData( pre=> [...pre,data])
      console.log('group item',data)
      data.forEach(item=>{
        
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
      }
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
function lessonToCalendarEvent(item) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log('item',item)
  const localTime = DateTime
    .fromISO(item.date_time, { zone: 'utc' })
    .setZone(userTimeZone)
    .toISO();

  return {
    id: `${item.id}`, // prevents collisions
    title: item.lesson?.title || 'Class',
    start: localTime,
    extendedProps: {
      studentId: item.student?.id ?? null,
      groupClassId: item.group_class?.id ?? null,
      type: item.lessontype,
      classType:item.group_class?'group':'oneOnone',
    },
  };
}
async function fetchSchedule(url, token) {
  try {
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error(`Failed to fetch ${url}`, err);
    return []; // SAFE fallback
  }
}
async function loadTeacherSchedule() {
  if (!token) return;

  const [
    oneOnOneLessons,
    groupLessons,
  ] = await Promise.all([
    fetchSchedule('https://api.codingscholar.com/teacherSchedule/', token),
    fetchSchedule('https://api.codingscholar.com/teacherGroupClass/', token),
  ]);

  const allLessons = [...oneOnOneLessons, ...groupLessons];

  if (allLessons.length === 0) {
    setCalendarEvent([]); // empty calendar
    return;
  }
   allLessons.forEach(item=>{
    const newData={...item,...{classType:item.group_class?'group':'oneOnone'}}
    setData(pre=>[...pre,newData])
   })
  const events = allLessons.map(lessonToCalendarEvent);
  console.log('aa',allLessons)
  setCalendarEvent(events);
}
useEffect(() => {
  loadTeacherSchedule();
}, [token]);
 console.log('dd',data)
// useEffect(()=>{
//    getTeacherSchudule()
//     getTeacherGroupClassSchudule()
//   },[token])
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
