import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'; // Correct import
import { isValidPhoneNumber, isPossiblePhoneNumber } from "libphonenumber-js";
import Slider from 'react-slick'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from 'axios';
import { parsePhoneNumberFromString } from "libphonenumber-js";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
export default function RegisterStudentModal({trailClass,openStudentRegistrationform,setopenStudentRegistrationform}) {
    const initialState={name:'',email:'',
    password:'',country:'',phone_number:'',confirm_password:'',grade:""}
    // Register the English locale for i18n-iso-countries
    countries.registerLocale(en);
    const [countryCode,setCountryCode]=useState('')
    const [error,setError]=useState('')
    const [studentValues,setStudentValues]=useState(initialState)
    // const [phone_number,setPhone_number]=useState('')
 useEffect(()=>{
  if(trailClass){
    trailClass.forEach(booking=>{
      setStudentValues(prev => ({
        ...prev,
        name: booking.name || '',
        email: booking.email || '',
        phone_number: booking.phone_number || '',
        country: booking.country || '',
        grade:  `Grade ${booking.grade}` || ''
      }));
    })
  }
 },[])
  const handleCloseForm =()=>{
    setopenStudentRegistrationform('CloseRegisterStudentModal')
  }
  const handleChange =(e)=>{
   const {name,value}=e.target
   setStudentValues({...studentValues,[name]:value})
  }
  const handleRegister =(e)=>{
   e.preventDefault()
   const allFieldsFilled = Object.values(studentValues).every(value => value !== '')
   if (allFieldsFilled) {
    // Proceed with form submission
    if(studentValues.password===studentValues.confirm_password){
      isValidEmail(studentValues)
    }else{
      setError("Please input matching password and confirm password")
    }
  } else {
    // Show error / warning
    console.log('Please Fill All Inputs')
    setError('Please Fill All Inputs')
  }
  }
  function isValidEmail(data) {
    console.log('askladlasksld',data)
    const email=data.email
    console.log('mea',email)
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(pattern.test(email)){
      const splitName=studentValues.name.split(' ')
      const first_name=splitName[0]
      const splitGrade=studentValues.grade.split(' ')
      const last_name=splitName[1]
      console.log('nae',last_name,'funname',splitName,'grade',splitGrade[1])
      const fulldata={first_name:first_name,last_name:last_name,grade:splitGrade[1],
      country:studentValues.country,phone_number:studentValues.phone_number,password:studentValues.password,
      confirm_password:studentValues.confirm_password}
      const url ='http://localhost:8000/student/'
      axios.post(url,fulldata,{
          headers:{
              'Content-Type':'application/json'
          }
      })
      .then(res=>{
          console.log('res',res.data)
          const data = res.data
          setStudentValues(initialState)
          // const {access}=data
          // localStorage.setItem('token',access)
          setLoading(false)
        
      })
      .catch(error=>{
          setLoading(false)
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
    }else{
         setError('Invalid email')
    }
}
  console.log('student',studentValues)
    return  ReactDOM.createPortal(
    <div className={openStudentRegistrationform}>
       <div className='InnerRegisterStudentModal'>
        <div className='InnerRegisterStudentModalBtnClosewrapper'>
           <div className='ModalBtnCloseContainer' onClick={handleCloseForm}>
            <span>&times;</span>
           </div>
        </div>
        <div className='registerstudentFormwrapper'>
            <form>
                <input name='name' value={studentValues.name} onChange={handleChange} type='text' placeholder='Name'/>
                <input name='email' value={studentValues.email} onChange={handleChange} type='email' placeholder='Email'/>
                <input name='phone_number' value={studentValues.phone_number} onChange={handleChange} type='text' placeholder='Phone Number'/>
                <input name='country' value={studentValues.country} onChange={handleChange} type='text' placeholder='Country'/>
                <input name='grade' value={studentValues.grade} onChange={handleChange} type='text' placeholder='Grade'/>
                <input name='password' value={studentValues.password} onChange={handleChange} type='text' placeholder='Password'/>
                <input name='confirm_password' value={studentValues.confirm_password} onChange={handleChange} type='text' placeholder= 'Confirm Password'/>
                <div className='registerStudentBntWrapper'>
                <button onClick={handleRegister} type='submit'>register</button>
                </div>
            </form>
           </div>
       </div>
    </div>,
    document.getElementById('register')
  )
}
