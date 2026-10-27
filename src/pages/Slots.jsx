import React,{useState,useEffect, useId} from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import {API} from '@/lib/api'
export default function Slots() {
    const initialState={date:'',time:''}
    const[values,setValues]=useState(initialState)
  
    const[teacherName,setTeacherName]=useState('')
    const [groupedSlots, setGroupedSlots] = useState({});
    const {user}=useAuth()
    const userID=user.id

    const handleChange=(e)=>{
    const {value,name}=e.target
    setValues({...values,[name]:value})
    }
    console.log(values)
  
    function getTeacherDetails(){
      if(userID){
        console.log('user',userID)
        const url = `${API}/getTeacher/${userID}`;
        axios.get(url)
        .then(res=>{
          const name = `${res.data.user.first_name } ${res.data.user.last_name }`
          setTeacherName(name)
          console.log(name)
        })
        .catch(error=>console.log(error))
      }
    }
    const handleEnterSlot=()=>{
    
        const url=`${API}/TeacherAvailability/`
        // const splitName=teacherName.trim().split(/\s+/);
        // const first_name=splitName[0]
        // const last_name=splitName[1]
         // Convert local date & time to UTC
        const localDateTime = new Date(`${values.date}T${values.time}`);
        const utcDateTime = localDateTime.toISOString();  // Convert to UTC
        const data={...values,...{utcDateTime:utcDateTime}}
        axios.post(url,data,{ withCredentials:true,})
        .then(res=>{
          alert(res.data.message
            )
          getMySlots()
          setValues(initialState)
        })
        .catch(error=>console.log(error))
      
    }
    function getMySlots(){
      
        const url=`${API}/Myslots/`
        axios.get(url)
        .then(res=>{
          console.log(res.data)
          const grouped = groupSlotsByDate(res.data);
          setGroupedSlots(grouped);
        })
        .catch(error=>console.log(error))
      
    }
    console.log('slots',groupedSlots)
    function groupSlotsByDate(slots) {
      return slots.reduce((grouped, slot) => {
        if (!grouped[slot.date]) {
          grouped[slot.date] = [];
        }
        grouped[slot.date].push(slot);
        return grouped;
      }, {});
    }
    function formatTime(datetime) {
      return new Date(datetime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    useEffect(()=>{
      getMySlots()
    },[])
    useEffect(()=>{
    getTeacherDetails()
    },[userID])
   
  return (
    <div className='slotWrapper'>
        <div className='slotContainer'>
            <h3>create  slot</h3>
            <div className='slotInputWrapper'>
                <input value={values.date} name='date' onChange={handleChange} type='date'/>
                <input value={values.time} name='time' onChange={handleChange} type='time'/>
            </div>
            <div className='slotBtnWRapper'>
                    <button onClick={handleEnterSlot}>enter slot</button>
            </div>
        </div>

      {groupedSlots? Object.entries(groupedSlots).map(([date, slots]) => (
        <div key={date} className="slotDisplayer">
          <span><h3>{new Date(date).toLocaleDateString()}</h3></span>
          <ul>
            {slots.map(slot => (
              <li key={slot.id}>{formatTime(slot.datetime_utc)}</li>
            ))}
          </ul>
        </div>
      )):<p>No slots placed for now!</p>}
    </div>
  )
}
