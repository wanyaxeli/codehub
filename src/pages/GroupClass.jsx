import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function GroupClass() {
    const initialState= {name:"",grade:'',firstLessonTime:'',secondLessonTime:"",firstLesson:'',secondLesson:''}
    const [values,setValues]=useState(initialState)
    const navigate= useNavigate()
    const handleChange=(e)=>{
    const {value,name}=e.target
    setValues({...values,[name]:value})
    }
    console.log(values)
    const handleSubmit =()=>{
    if(values && values.firstLesson && values.firstLessonTime && values.grade && values.name && values.secondLesson && values.secondLessonTime){
        const splitName=values.name.trim().split(/\s+/);
        const first_name=splitName[0]
        const last_name=splitName[1]
       
        const data= {...values,...{first_name:first_name,last_name:last_name}}
        console.log(data)
    }else{
        alert('Error fill in all inputs')
    }
    }
    const handleToTeacherClass=()=>{
        navigate('/teacher/dashboard/Teacher Group Class')
    }
  return (
    <div className='GroupClassWrapper'>
        <div className='createGroupClassWrapper'>
            <h3>Create Group Class For Teacher</h3>
            <div className='specialContainer'>
            <span>Teacher's Name</span><br/>
            <input name='name' onChange={handleChange} value={values.name} type='text' placeholder='Full Name ...'></input><br/>
            <span>Grade</span><br/>
            <input name='grade' onChange={handleChange} value={values.grade} type='text' placeholder='Grade ...'></input><br/>
            <span>First Lesson</span><br/>
            <input name='firstLesson' onChange={handleChange} value={values.firstLesson} type='text' placeholder='Monday ...'></input><br/>
            <span>Second Lesson</span><br/>
            <input name='secondLesson' onChange={handleChange} value={values.secondLesson} type='text' placeholder='Friday ...'></input>
            <span>First Lesson Time</span><br/>
            <input name='firstLessonTime' onChange={handleChange} value={values.firstLessonTime} type='time' placeholder='Friday ...'></input>
            <span>Second Lesson Time</span><br/>
            <input name='secondLessonTime' onChange={handleChange} value={values.secondLessonTime} type='time' placeholder='Friday ...'></input>
            <div className='specialButton'>
            <button onClick={handleSubmit}>Submit</button>
            </div>
           </div>
        </div>
        <div className='showGroupClass'>
           <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>grade</th>
                    <th>first last</th>
                    <th>second lesson</th>
                    <th>first lesson time</th>
                    <th>second lesson time</th>
                    <th>number of students</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>elias wanyama</td>
                    <td>6</td>
                    <td>friday</td>
                    <td>monday</td>
                    <td>4:00pm</td>
                    <td>6:00pm</td>
                    <td>6</td>
                    <td><button onClick={handleToTeacherClass}>view</button></td>
                </tr>
                <tr>
                    <td>elias wanyama</td>
                    <td>6</td>
                    <td>friday</td>
                    <td>monday</td>
                    <td>4:00pm</td>
                    <td>6:00pm</td>
                    <td>6</td>
                    <td><button>view</button></td>
                </tr>
                <tr>
                    <td>elias wanyama</td>
                    <td>6</td>
                    <td>friday</td>
                    <td>monday</td>
                    <td>4:00pm</td>
                    <td>6:00pm</td>
                    <td>6</td>
                    <td><button>view</button></td>
                </tr>
            </tbody>
           </table>
         </div>
    </div>
  )
}
