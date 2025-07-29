import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
export default function SpecialClasses() {
    const initialState= {grade:'',teacher:'',module:""}
   const [values,setValues]=useState(initialState)
   const initialStateforLessonAttendace={first_day:'',second_day:'',
   first_time:'',second_time:''}
   const [studentId,setStudentId]=useState('')
   const [student,setStudent]=useState('')
   const [classManagement,SetClassManagement]=useState(initialState)
   const [classLesson,SetClassLesson]=useState(initialStateforLessonAttendace)
   const location =useLocation()
   const handleChange=(e)=>{
   const {value,name}=e.target
   setValues({...values,[name]:value})
   }
   const handleClassManagementInput =(e)=>{
    const {name,value}=e.target
    if (name === 'teacher') {
     SetClassManagement({ ...classManagement, [name]: value.toUpperCase() });
   } else {
     SetClassManagement({ ...classManagement, [name]: value });
   }
   }
   const handleAddStudentToClass =()=>{
    if(studentId && classManagement.grade && classManagement.module && classManagement.teacher){
     console.log('hello class',studentId,classManagement.teacher)
     const id = studentId
     const url=`https://api.codingscholar.com/createStudentRoom/${id}`
     const splitname = classManagement.teacher.trim().split(/\s+/);
     const first_name=splitname[0]
     const last_name=splitname[1]
     const data={...classManagement,...{first_name:first_name,roomType:'maths',last_name:last_name}}
     console.log('data std',data)
     axios.post(url,data)
     .then(res=>{
       console.log('student res',res.data)
       SetClassManagement(initialState)
       alert(res.data)
     })
     .catch(error=>console.log(error))
    }
   }
   const handleSubmitLessonAttendance =()=>{
    if(studentId){
      const id = studentId
       // Convert local date & time to UTC
      // const localDateTime = new Date(`${values.date}T${values.time}`);
      // const utcDateTime = localDateTime.toISOString();
      const url=`https://api.codingscholar.com/StudentLesson/${id}`
      const data ={...classLesson,...{roomType:'maths'}}
      axios.post(url,data)
      .then(res=>{
        console.log(res.data)
        SetClassLesson(initialStateforLessonAttendace)
        alert('Class attendance time picked successfully ')
      })
      .catch(error=>console.log(error))  
    }
  
    }
   const handleLessonAttendance =(e)=>{
    const {name,value}=e.target
    SetClassLesson({...classLesson,[name]:value})
   }
   useEffect(()=>{
   const {state}= location
   if(state){
    console.log('state',state)
    setStudentId(state)
   }
   },[])
  return (
    <div className='specialWrapper'>
       <div className="studentDetails">
          <h3>class management</h3>
           <div className='studentDetailsClassattendance ActivateStudentWrapper'>
              <p>Place student into class</p>
              <p>allocate teacher to student</p>
              <input value={classManagement.grade} name='grade' onChange={handleClassManagementInput} type='text' placeholder='Grade'/>
              <input value={classManagement.module} name='module' onChange={handleClassManagementInput} type='text' placeholder='Module'/>
              <input value={classManagement.teacher} name='teacher' onChange={handleClassManagementInput} type='text' placeholder='Teacher'/>
           </div>
           <div className='StdBtnWrapper'>
              <button onClick={handleAddStudentToClass}>submit</button>
           </div>
        </div>
        <div className="studentDetails">
          <h3>lesson attendance</h3>
           <div className='studentDetailsClassattendance'>
           <input  value={classLesson.first_day} onChange={handleLessonAttendance} name='first_day' type='text' placeholder='Enter first day of the class'/>
            <input value={classLesson.second_day} onChange={handleLessonAttendance} name='second_day' type='text' placeholder='Enter second day of the class'/>
            <input value={classLesson.first_time} onChange={handleLessonAttendance} name='first_time' type='time'/>
            <input value={classLesson.second_time} onChange={handleLessonAttendance} name='second_time' type='time'/>
           </div>
           <div className='StdBtnWrapper'>
              <button onClick={handleSubmitLessonAttendance}>submit</button>
            </div>
        </div>
      {/* <div className='specialContainer'>
        <span>Teacher's Name</span><br/>
        <input name='name' onChange={handleChange} value={values.name} type='text' placeholder='Full Name ...'></input><br/>
        <span>First Lesson</span><br/>
        <input name='firstLesson' onChange={handleChange} value={values.firstLesson} type='date'></input><br/>
        <span>Second Lesson</span><br/>
        <input name='secondLesson' onChange={handleChange} value={values.secondLesson} type='date'></input>
       <div className='specialButton'>
       <button onClick={handleSubmit}>Submit</button>
       </div>
      </div> */}
    </div>
  )
}
