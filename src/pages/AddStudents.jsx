import React,{useState,useEffect} from 'react'
import axios from 'axios'
export default function AddStudents() {
  const initialState={
    first_name:'',
    last_name:'',
    email:"",
    country:"",
    phone_number:"",
    grade:'',
    password:"",
    confirm_password:''
  }
  const [student,setStudent]=useState(initialState)
  const [error,setError]=useState('')
  const handleChange=(e)=>{
   const {name,value}=e.target
   setStudent({...student,[name]:value})
  }
 const handleAddStudent =()=>{
  const email = student.email
  // const url ='https://api.codingscholar.com/acceptedStudent/'
  // axios.post(url,{email:email},{headers:{
  //   'Content-Type':"Application/json"
  // }})
  // .then(res=>{
  //   console.log(res.data)
  // })
  // .catch(error=>console.log(error))
  if(email && student.confirm_password && student.first_name && student.last_name && student.password && student.country){
    isValidEmail(student)
  }
 }
 function isValidEmail(data) {
  console.log('askladlasksld',data)
  const email=data.email
  console.log('mea',email)
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(pattern.test(email)){
      login(data)
  }else{
       setError('Invalid email')
  }
}
function login(data){
  // const url ='http://127.0.0.1:8000/registerTeacher/'
  const url ='https://api.codingscholar.com/student/'
  axios.post(url,data,{
      headers:{
          'Content-Type':'application/json'
      }
  })
  .then(res=>{
      console.log('res',res.data)
      const data = res.data
      const {access}=data
      setStudent(initialState)
  })
  .catch(error=>{
      if (error.response) {
          // The server responded with a status code outside of 2xx range
          setError('Something went wrong while creating the user. Please try again.');
        } else if (error.request) {
          // The request was made but no response was received
          setError('Something went wrong while creating the user. Please try again.');
        }
        else if (error.response.status === 500) {
          setError('Something went wrong while creating the user. Please try again.');
        }
        else {
          // Something else happened in setting up the request
          setError(error.message);
        }
    
        setError(error.config); // For debugging the Axios config
  })
}
  return (
    <div className='AddStudentsWrapper'>
        <h3>Add Students</h3>
        {error && <p style={{color:"red",textAlign:'center'}}>{error}</p>}
        <div className='AddStudentContainer'>
            <div className='AddStudents'>
                <input value={student.first_name} name='first_name' onChange={handleChange} placeholder='First name' className='signUpInput ' type='text'/><br/>
                <input value={student.last_name} name='last_name' onChange={handleChange} placeholder='Last name' className='signUpInput upper' type='text'/><br/>
                <input value={student.email} name='email' onChange={handleChange} type='email' placeholder='Email'/><br/>
                <input value={student.country} name='country' onChange={handleChange} type='text' placeholder='Country'/><br/>
                <input value={student.phone_number} name='phone_number' onChange={handleChange} type='text' placeholder='Phone Number'/><br/>
                <input value={student.grade} name='grade' onChange={handleChange} type='text' placeholder='Grade'/><br/>
                <input value={student.password} name='password' onChange={handleChange} type='password' placeholder='Password'/><br/>
                <input value={student.confirm_password} name='confirm_password' onChange={handleChange} type='password' placeholder='Cornfirm Password'/>
                <div className='AddBtnWrapper'>
                    <button onClick={handleAddStudent}>Add Student</button>
                </div>
            </div>
        </div>
    </div>
  )
}
