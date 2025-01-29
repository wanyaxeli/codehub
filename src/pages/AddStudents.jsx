import React,{useState,useEffect} from 'react'

export default function AddStudents() {
  const initialState={
    name:'',
    email:"",
    country:"",
    phone_number:"",
    grade:'',
    password:"",
    confirm_password:''
  }
  const [student,setStudent]=useState(initialState)
  const handleChange=(e)=>{
   const {name,value}=e.target
   setStudent({...student,[name]:value})
  }
  console.log(student)
  return (
    <div className='AddStudentsWrapper'>
        <h3>Add Students</h3>
        <div className='AddStudentContainer'>
            <div className='AddStudents'>
                <input name='name' onChange={handleChange} type='text' placeholder='Full name'/><br/>
                <input name='email' onChange={handleChange} type='email' placeholder='Email'/><br/>
                <input name='country' onChange={handleChange} type='text' placeholder='Country'/><br/>
                <input name='phone_number' onChange={handleChange} type='text' placeholder='Phone Number'/><br/>
                <input name='grade' onChange={handleChange} type='text' placeholder='Grade'/><br/>
                <input name='password' onChange={handleChange} type='password' placeholder='Password'/><br/>
                <input name='confirm_password' onChange={handleChange} type='password' placeholder='Cornfirm Password'/>
                <div className='AddBtnWrapper'>
                    <button>Add Student</button>
                </div>
            </div>
        </div>
    </div>
  )
}
