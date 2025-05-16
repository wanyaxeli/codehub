import React,{useState,useEffect} from 'react'
import pic from '../../assets/student.jpg'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
export default function Stdent() {
  const initialState={grade:'',teacher:'',module:""}
  const initialStateforLessonAttendace={first_day:'',second_day:'',
  first_time:'',second_time:''}
  const [fees,setFees]=useState('')
  const [studentId,setStudentId]=useState('')
  const [student,setStudent]=useState('')
  const location = useLocation()
  const [classManagement,SetClassManagement]=useState(initialState)
  const [classLesson,SetClassLesson]=useState(initialStateforLessonAttendace)
  const handleFees =(e)=>{
  setFees(e.target.value)
  }
  const handleClassManagementInput =(e)=>{
   const {name,value}=e.target
   SetClassManagement({...classManagement,[name]:value})
  }
  const handleActivate =()=>{
   if (studentId && fees){
      const id = studentId
      const url=`http://api.codingscholar.com/updateFee/${id}`
      const data={studentId:studentId,fees:fees}
      axios.put(url,data,{headers:{
        'Content-Type':'application/json'
      }})
      .then(res=>{
        console.log(res.data)
      })
      .catch(error=>console.log(error))
   }
  }
  const handleAddStudentToClass =()=>{
   if(studentId){
    const id = studentId
    const url=`http://api.codingscholar.com/createStudentRoom/${id}`
    const splitname=classManagement.teacher.split(' ')
    const first_name=splitname[0]
    const last_name=splitname[1]
    const data={...classManagement,...{first_name:first_name,last_name:last_name}}
    axios.post(url,data)
    .then(res=>{
      console.log(res.data)
    })
    .catch(error=>console.log(error))
   }
  }
  const handleLessonAttendance =(e)=>{
   const {name,value}=e.target
   SetClassLesson({...classLesson,[name]:value})
  }
  console.log(classLesson)
  function GetStudent(){
    const id = studentId
    const url=`http://api.codingscholar.com/specificStudent/${id}`
    axios.get(url)
    .then(res=>{
      console.log(res.data)
      const {student} = res.data
      setStudent(student)
    })
  }
  const handleSubmitLessonAttendance =()=>{
  if(studentId){
    const id = studentId
     // Convert local date & time to UTC
    // const localDateTime = new Date(`${values.date}T${values.time}`);
    // const utcDateTime = localDateTime.toISOString();
    const url=`http://api.codingscholar.com/StudentLesson/${id}`
    axios.post(url,classLesson)
    .then(res=>{
      console.log(res.data)
    })
    .catch(error=>console.log(error))  
  }

  }
   useEffect(()=>{  
   const {state}=location
   console.log(state)
   setStudentId(state)
   },[ ])
   useEffect(()=>{
    GetStudent()
   },[studentId])
   function convertToUTC(dayOfWeek, timeString) {
    const daysMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
  
    const now = new Date();
    const currentDay = now.getDay();
    const targetDay = daysMap[dayOfWeek];
  
    // Calculate how many days ahead the target day is
    const dayDiff = (targetDay + 7 - currentDay) % 7;
    now.setDate(now.getDate() + dayDiff);
  
    // Parse time string like "08:20 PM"
    const [time, meridiem] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
  
    if (meridiem === 'PM' && hours !== 12) hours += 12;
    if (meridiem === 'AM' && hours === 12) hours = 0;
  
    // Set time
    now.setHours(hours, minutes, 0, 0);
  
    // Return UTC version
    return now.toISOString(); // Or use now.toUTCString() if you prefer
  }
  return (
    <div className='StudentWrapper'>
        <div className='studentDetailsWrapper'>
            <img src={pic}/>
           {student? <div>
                <p>{student.user.first_name} {student.user.last_name}</p>
                <p>Recent fee Paid:<span>{student.paymentMade}</span></p>
                <p>Total fees :<span>{student.TotalpaymentMade}</span></p>
            </div>:<i className="fa fa-spinner spinner" aria-hidden="true"></i>}
        </div>
        <div className="studentDetails">
          <h3>Update student account</h3>
           <div className='studentDetailsClassattendance ActivateStudentWrapper'>
            <p>Enter Amount Paid</p>
            <p>Activate Student Class</p>
            <input onChange={handleFees} type='text' placeholder='Amount'/>
            {/* <input type='time'/> */}
            <button onClick={handleActivate}>Activate</button>
           </div>
        </div>
        <div className="studentDetails">
          <h3>class management</h3>
           <div className='studentDetailsClassattendance ActivateStudentWrapper'>
              <p>Place student into class</p>
              <p>allocate teacher to student</p>
              <input name='grade' onChange={handleClassManagementInput} type='text' placeholder='Grade'/>
              <input name='module' onChange={handleClassManagementInput} type='text' placeholder='Module'/>
              <input name='teacher' onChange={handleClassManagementInput} type='text' placeholder='Teacher'/>
           </div>
           <div className='StdBtnWrapper'>
              <button onClick={handleAddStudentToClass}>submit</button>
           </div>
        </div>
        <div className="studentDetails">
          <h3>lesson attendance</h3>
           <div className='studentDetailsClassattendance'>
           <input onChange={handleLessonAttendance} name='first_day' type='text' placeholder='Enter first day of the class'/>
            <input onChange={handleLessonAttendance} name='second_day' type='text' placeholder='Enter second day of the class'/>
            <input onChange={handleLessonAttendance} name='first_time' type='time'/>
            <input onChange={handleLessonAttendance} name='second_time' type='time'/>
           </div>
           <div className='StdBtnWrapper'>
              <button onClick={handleSubmitLessonAttendance}>submit</button>
            </div>
        </div>
    </div>
  )
}
