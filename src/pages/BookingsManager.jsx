import React,{useEffect,useState} from 'react'
import axios from 'axios'
export default function BookingsManager() {
  const initialState={
    teacher:'',
    time:'',
    date:''
  }
  const [values,setValues]=useState(initialState)
  const handleChange=(e)=>{
   const {value,name}=e.target
   setValues({...values,[name]:value})
  }
  console.log('valu',values)
  const handleSubmit=()=>{
    const url='http://127.0.0.1:8000/TeacherAvailability/'
    const splitName=values.teacher.split(' ')
    const first_name=splitName[0]
    const last_name=splitName[1]
    const data={...values,...{last_name:last_name,first_name:first_name}}
    axios.post(url,data)
    .then(res=>console.log(res.data))
    .catch(error=>console.log(error))
  }
  return (
    <div className='BookingsManagerWrapper'>
        <div className='BookingsManagerContainer'>
          <input name='teacher' onChange={handleChange} placeholder='Teacher Name' type='text'/><br/>
          <input name='date' onChange={handleChange} type='date'/><br/>
          <input name='time' onChange={handleChange} type='time'/><br/>
          <div>
            <button onClick={handleSubmit}>submit</button>
          </div>
        </div>
    </div>
  )
}
