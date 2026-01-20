import React,{useState} from 'react'

export default function ScheduleClasses() {
  const initialState={day:'',time:'',classtype:''}
  const [data,setData]=useState([])
  const [days,setDays]=useState(initialState)
  const handleChange=(e)=>{
  const {name,value}=e.target
  setDays({...days,[name]:value})
  }
  const handleAdd =()=>{
    setData(pre=>[...pre,days])
    setDays(initialState)
  }
  const handleCreateSchedule =()=>{

  }
  return (
    <div className='ScheduleClassesWrapper'>
        <div className='ScheduleClassesDaysWrapper'>
           <div className='ScheduleClassesDaysInputWrapper'>
           <input value={days.classtype} name='classtype' type='text' onChange={handleChange}  placeholder='Enter class coding/maths'/>
           <input value={days.day} name='day' type='text' onChange={handleChange}  placeholder='Enter day'/>
           <input value={days.time} name='time' type='time' onChange={handleChange}  placeholder='Enter day'/> 
           </div>
           <div className='ScheduleClassesDaysBtnWrapper'>
           <button onClick={handleAdd}>add</button>
           </div>
        </div>
        {data.length > 0? <div className='daysDisplayer'>
          <input type='text' placeholder='Enter lesson number'/>
           <table>
              <thead>
              <tr>
              <th>Class type</th>
                 <th>Day</th>
                 <th>Time</th>
              </tr>
              </thead>
              <tbody>
               {data.map((item,i)=>{
                return(
                  <tr key={i}>
                    <td>{item.classtype}</td>
                  <td>{item.day}</td>
                  <td>{item.time}</td>
               </tr>
                )
               })}
              </tbody>
           </table>
           <div className='ScheduleClassesDaysBtnWrapper'>
           <button onClick={handleCreateSchedule}>create schedule</button>
           </div>
        </div>:''}
    </div>
  )
}
