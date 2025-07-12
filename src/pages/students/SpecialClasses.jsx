import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
export default function SpecialClasses() {
    const initialState= {name:"",firstLesson:'',secondLesson:''}
   const [values,setValues]=useState(initialState)
   const [student,setStudent]=useState('')
   const location =useLocation()
   const handleChange=(e)=>{
   const {value,name}=e.target
   setValues({...values,[name]:value})
   }
   const handleSubmit =()=>{

   }
   useEffect(()=>{
   const {state}= location
   if(state){
    console.log('state',state)
    setStudent(state)
   }
   },[])
  return (
    <div className='specialWrapper'>
      <div className='specialContainer'>
        <span>Teacher's Name</span><br/>
        <input name='name' onChange={handleChange} value={values.name} type='text' placeholder='Full Name ...'></input><br/>
        <span>First Lesson</span><br/>
        <input name='firstLesson' onChange={handleChange} value={values.firstLesson} type='date'></input><br/>
        <span>Second Lesson</span><br/>
        <input name='secondLesson' onChange={handleChange} value={values.secondLesson} type='date'></input>
       <div className='specialButton'>
       <button onClick={handleSubmit}>Submit</button>
       </div>
      </div>
    </div>
  )
}
