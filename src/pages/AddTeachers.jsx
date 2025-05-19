import React ,{useState}from 'react'
import axios from 'axios'
export default function AddTeachers() {
  const initialState={
    fullname:"",email:'',country:'',phone_number:'',password:'',confirm_password:""
  }
  const [values,setValues]=useState(initialState)
  const [error,setError]=useState('')
  const handleChange=(e)=>{
    const {name,value}=e.target
    setValues({...values,[name]:value})
  }
  const handleAddTeacher =()=>{
    const email = values.email
    if(email){
      const url ='https://api.codingscholar.com/acceptedTeacher/'
    axios.post(url,{email:email},{headers:{
      'Content-Type':"Application/json"
    }})
    .then(res=>{
      res.data
      setValues(initialState)
    })
    .catch(error=>console.log(error))
    }else{
      setError('Please Fill In Email Input')
    }
  }
  console.log("values",values)
  return (
    <div className='AddStudentsWrapper'>
        <h3>Add Teacher</h3>
        {error && <p style={{color:"red"}}>{error}</p>}
        <div className='AddStudentContainer'>
            <div className='AddStudents'>
                <input value={values.fullname} onChange={handleChange} name='fullname'  type='text' placeholder='Full name'/><br/>
                <input value={values.email} onChange={handleChange} name='email' type='email' placeholder='Email'/><br/>
                <input value={values.country} onChange={handleChange} name='country' type='text' placeholder='Country'/><br/>
                <input value={values.phone_number} onChange={handleChange} name='phone_number' type='text' placeholder='Phone Number'/><br/>
                <input value={values.password} onChange={handleChange} name='password' type='password' placeholder='Password'/><br/>
                <input value={values.confirm_password} onChange={handleChange} name='confirm_password' type='password' placeholder='Cornfirm Password'/>
                <div className='AddBtnWrapper'>
                    <button onClick={handleAddTeacher}>Add Teacher</button>
                </div>
            </div>
        </div>
    </div>
  )
}
