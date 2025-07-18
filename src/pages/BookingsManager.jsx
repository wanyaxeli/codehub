import React,{useEffect,useState} from 'react'
import axios from 'axios'
export default function BookingsManager() {
  const initialState={
    teacher:'',
    time:'',
    date:''
  }
  const [values,setValues]=useState(initialState)
  const [res,setRes]=useState('')
  const handleChange=(e)=>{
   const {value,name}=e.target
   if(name==='teacher'){
    setValues({...values,[name]:value.toUpperCase()})
   }else{
    setValues({...values,[name]:value})
   }
  }
  console.log('valu',values)
  const handleSubmit=()=>{
    const url='https://api.codingscholar.com/TeacherAvailability/'
    const splitName=values.teacher.trim().split(/\s+/);
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
      setValues(initialState)
    })
    .catch(error=>console.log(error))
  }
  return (
    <div className='BookingsManagerWrapper'>
        <div className='BookingsManagerContainer'>
          <input  value={values.teacher} name='teacher' onChange={handleChange} placeholder='Teacher Name' type='text'/><br/>
          <input value={values.date} name='date' onChange={handleChange} type='date'/><br/>
          <input value={values.time} name='time' onChange={handleChange} type='time'/><br/>
          <div>
            <button onClick={handleSubmit}>submit</button>
          </div>
        </div>
    </div>
  )
}
