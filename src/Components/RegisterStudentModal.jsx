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
export default function RegisterStudentModal({openStudentRegistrationform,setopenStudentRegistrationform}) {
    const initialState={name:'',email:'',
    password:'',country:'',phone_number:'',confirm_password:'',grade:""}
    // Register the English locale for i18n-iso-countries
    countries.registerLocale(en);
    const [countryCode,setCountryCode]=useState('')
    const [studentValues,setStudentValues]=useState(initialState)
    // const [phone_number,setPhone_number]=useState('')

  const handleCloseForm =()=>{
    setopenStudentRegistrationform('CloseRegisterStudentModal')
  }
  const handleChange =(e)=>{
   const {name,value}=e.target
   setStudentValues({...studentValues,[name]:value})
  }
  const handleRegister =(e)=>{
   e.preventDefault()
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
                <input name='name' onChange={handleChange} type='text' placeholder='Name'/>
                <input name='email' onChange={handleChange} type='email' placeholder='Email'/>
                <input name='phone_number' onChange={handleChange} type='text' placeholder='Phone Number'/>
                <input name='country' onChange={handleChange} type='text' placeholder='Country'/>
                <input name='grade' onChange={handleChange} type='text' placeholder='Grade'/>
                <input name='password' onChange={handleChange} type='text' placeholder='Password'/>
                <input name='confirm_password' onChange={handleChange} type='text' placeholder= 'Confirm Password'/>
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
