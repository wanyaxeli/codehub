import React ,{useState}from 'react'
import axios from 'axios'
export default function AddTeachers() {
  const initialState={
    fullname:"",email:'',country:'',phone_number:'',password:'',confirm_password:""
  }
  const [values,setValues]=useState(initialState)
  const handleChange=(e)=>{
    const {name,value}=e.target
    setValues({...values,[name]:value})
  }
  const handleAddTeacher =()=>{
    const email = values.email
    const url ='http://127.0.0.1:8000/acceptedTeacher/'
    axios.post(url,{email:email},{headers:{
      'Content-Type':"Application/json"
    }})
    .then(res=>{
      res.data
    })
    .catch(error=>console.log(error))
  }
  console.log("values",values)
  return (
    <div className='AddStudentsWrapper'>
        <h3>Add Teacher</h3>
        <div className='AddStudentContainer'>
            <div className='AddStudents'>
                <input onChange={handleChange} name='fullname'  type='text' placeholder='Full name'/><br/>
                <input onChange={handleChange} name='email' type='email' placeholder='Email'/><br/>
                <input onChange={handleChange} name='country' type='text' placeholder='Country'/><br/>
                <input onChange={handleChange} name='phone_number' type='text' placeholder='Phone Number'/><br/>
                <input onChange={handleChange} name='password' type='password' placeholder='Password'/><br/>
                <input onChange={handleChange} name='confirm_password' type='password' placeholder='Cornfirm Password'/>
                <div className='AddBtnWrapper'>
                    <button onClick={handleAddTeacher}>Add Teacher</button>
                </div>
            </div>
        </div>
    </div>
  )
}
