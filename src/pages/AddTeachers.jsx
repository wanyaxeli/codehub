import React ,{useState}from 'react'
import axios from 'axios'
export default function AddTeachers() {
  const initialState={
    last_name:'',first_name:"",email:'',countryName:'',phone_number:'',password:'',confirm_password:""
  }
  const [values,setValues]=useState(initialState)
  const [error,setError]=useState('')
  const handleChange=(e)=>{
    const {name,value}=e.target
    setError('')
    setValues({...values,[name]:value})
  }
  const handleAddTeacher =()=>{
    const email = values.email
    if(email && values.confirm_password && values.first_name && values.last_name && values.password && values.countryName){
    //   const url ='https://api.codingscholar.com/acceptedTeacher/'
    // axios.post(url,{email:email},{headers:{
    //   'Content-Type':"Application/json"
    // }})
    // .then(res=>{
    //   res.data
    //   setValues(initialState)
    // })
    // .catch(error=>console.log(error))
    isValidEmail(values)
    }else{
      setError('Please Fill In Email Input')
    }
  }
  console.log("values",values)
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
    const url ='https://api.codingscholar.com/registerTeacher/'
    axios.post(url,data,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>{
        console.log('res',res.data)
        const data = res.data
        const {access}=data
        setValues(initialState)
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
        <h3>Add Teacher</h3>
        {error && <p style={{color:"red",textAlign:'center'}}>{error}</p>}
        <div className='AddStudentContainer'>
            <div className='AddStudents'>
                {/* <input value={values.fullname} onChange={handleChange} name='fullname'  type='text' placeholder='Full name'/><br/> */}
                <input value={values.first_name} name='first_name' onChange={handleChange} placeholder='First name' className='signUpInput ' type='text'/><br/>
                <input value={values.last_name} name='last_name' onChange={handleChange} placeholder='Last name' className='signUpInput upper' type='text'/><br/>
                <input value={values.email} onChange={handleChange} name='email' type='email' placeholder='Email'/><br/>
                <input value={values.countryName} onChange={handleChange} name='countryName' type='text' placeholder='Country'/><br/>
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
