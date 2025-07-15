import React,{useState,useEffect, useId} from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
export default function Slots() {
    const initialState={date:'',time:''}
    const[values,setValues]=useState(initialState)
    const[userID,setUserId]=useState('')
    const[token,setToken]=useState('')
    const[teacherName,setTeacherName]=useState('')
    const [groupedSlots, setGroupedSlots] = useState({});
    const handleChange=(e)=>{
    const {value,name}=e.target
    setValues({...values,[name]:value})
    }
    console.log(values)
    async function getToken(){
      try{
          const token= localStorage.getItem('token') // No need to await
          if (token){
            setToken(token)
            try {
              const decode = jwtDecode(token);
              const { exp, role, user_id } = decode;
              console.log(user_id)
              setUserId(user_id)
            } catch (error) {
              console.error("JWT Decode Error:", error);
            }
          }
      } catch(error) {
          console.log(error);
      }
  }
    function getTeacherDetails(){
      if(userID){
        console.log('user',userID)
        const url = `https://api.codingscholar.com/getTeacher/${userID}`;
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
      if(teacherName){
        const url='https://api.codingscholar.com/TeacherAvailability/'
        const splitName=teacherName.trim().split(/\s+/);
        const first_name=splitName[0]
        const last_name=splitName[1]
         // Convert local date & time to UTC
        const localDateTime = new Date(`${values.date}T${values.time}`);
        const utcDateTime = localDateTime.toISOString();  // Convert to UTC
        const data={...values,...{last_name:last_name,utcDateTime:utcDateTime,first_name:first_name}}
        axios.post(url,data)
        .then(res=>{
          console.log(res.data)
          alert(res.data)
          getMySlots()
          setValues(initialState)
        })
        .catch(error=>console.log(error))
      }
    }
    function getMySlots(){
      if(token){
        const url='https://api.codingscholar.com/Myslots/'
        axios.get(url,{headers:{
          'Authorization':`Bearer ${token}`
        }})
        .then(res=>{
          console.log(res.data)
          const grouped = groupSlotsByDate(res.data);
          setGroupedSlots(grouped);
        })
        .catch(error=>console.log(error))
      }
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
    },[token])
    useEffect(()=>{
    getTeacherDetails()
    },[userID])
    useEffect(()=>{
    getToken()
    },[])
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
