import React,{useState,useEffect} from 'react'
import Header from '../Components/Header'
import pic from '../assets/student.jpg'
import { useParams, useNavigate } from "react-router-dom";
import {  parsePhoneNumber } from 'react-phone-number-input';
import { isValidPhoneNumber, isPossiblePhoneNumber } from "libphonenumber-js";
import Slider from 'react-slick'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from 'axios';
import { parsePhoneNumberFromString } from "libphonenumber-js";
import countries from "i18n-iso-countries";
// import "react-phone-number-input/style.css";
import en from "i18n-iso-countries/langs/en.json";
import Login from './Login';
export default function SignUp() {
    const initialState={first_name:'',last_name:'',email:'',
    password:'',confirm_password:''}
    // Register the English locale for i18n-iso-countries
    countries.registerLocale(en);
    const [countryCode,setCountryCode]=useState('')
    const [teacherValues,setTeacherValues]=useState(initialState)
    const [phone_number,setPhone_number]=useState('')
    const [loading,setLoading]=useState(false)
    const [errors,setErrors]=useState('')
    const { token } = useParams(); // Get the token from the URL
    const navigate = useNavigate();
    console.log('token',token)
    const africanCountries = [
      "dz", "ao", "bj", "bw", "bf", "bi", "cv", "cm", "cf", "td", "km", "cd",
      "dj", "eg", "gq", "er", "sz", "et", "ga", "gm", "gh", "gn", "gw", "ci",
      "ke", "ls", "lr", "ly", "mg", "mw", "ml", "mr", "mu", "ma", "mz", "na",
      "ne", "ng", "rw", "st", "sn", "sc", "sl", "so", "za", "ss", "sd", "tz",
      "tg", "tn", "ug", "zm", "zw"
    ];

      const handleSignUP =()=>{
        const cleanedNumber = phone_number.toString();
        console.log('cleaned',cleanedNumber)
        if (isValidPhoneNumber(phone_number)) {
                     // Parse the phone number
            const parsedNumber = parsePhoneNumberFromString(phone_number);
            if (parsedNumber) {
                      const countryISO = parsedNumber.country; // Get ISO 3166-1 alpha-2 code (e.g., "KE")
                      const countryName = countries.getName(countryISO, "en"); // Get country name
                    //   setCountryName(countryName || "Unknown Country");
                        const country={countryName:countryName||'Unknown'}
                        const data ={...teacherValues,...{phone_number:phone_number},...country}
                        console.log('teacherc',data)
                        isValidEmail(data) 
                        
              }
         
        } else {
          // setError("Invalid phone number");
          console.log('errororoe')
        }
      //  if (phone_number && isValidPhoneNumber(phone_number)){
      //   try {
      //       // Parse the phone number
      //       const parsedNumber = parsePhoneNumberFromString(phone_number);
      //       setLoading(true)
      //       if (parsedNumber) {
      //         const countryISO = parsedNumber.country; // Get ISO 3166-1 alpha-2 code (e.g., "KE")
      //         const countryName = countries.getName(countryISO, "en"); // Get country name
      //       //   setCountryName(countryName || "Unknown Country");
      //           const country={countryName:countryName||'Unknown'}
      //           const data ={...teacherValues,...{phone_number:phone_number},...country}
      //           isValidEmail(data) 
      //           console.log('teacherc',countryName)
      //       } else {
      //       //   setCountryName("Invalid Phone Number");
      //       setErrors("Invalid Phone Number")
      //       setLoading(false)
      //       }
      //     } catch (error) {
      //       // setCountryName("Invalid Phone Number");
      //       setErrors("Invalid Phone Number")
      //       setLoading(false)
      //     }
      //  }else{
      //   setErrors('Something went wrong while creating the user. Please try again.');
      //  }
      }
      function isValidEmail(data) {
        console.log('askladlasksld',data)
        const email=data.email
        console.log('mea',email)
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(pattern.test(email)){
            login(data)
        }else{
             setErrors('Invalid email')
        }
    }
    console.log('number',phone_number)
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
            localStorage.setItem('token',access)
            setLoading(false)
            navigate('/teacher/dashboard/Details')
        })
        .catch(error=>{
            setLoading(false)
            if (error.response) {
                // The server responded with a status code outside of 2xx range
                setErrors('Something went wrong while creating the user. Please try again.');
              } else if (error.request) {
                // The request was made but no response was received
                setErrors('Something went wrong while creating the user. Please try again.');
              }
              else if (error.response.status === 500) {
                setErrors('Something went wrong while creating the user. Please try again.');
              }
              else {
                // Something else happened in setting up the request
                setErrors(error.message);
              }
          
              setErrors(error.config); // For debugging the Axios config
        })
    }
      const handlePhoneChange = (phone) => {
        setErrors('')
        const formattedNumber = `+${phone}`;
         setPhone_number(formattedNumber)
        console.log('fo',formattedNumber)
        // if (phone) {
        //   const parsed = parsePhoneNumber(phone, "KE"); // Replace "KE" with default country code if needed
        //   const countryCode = parsed?.countryCallingCode ? `+${parsed.countryCallingCode}` : "";
        //   const phoneNumber = parsed?.nationalNumber || "";
        //   const number=countryCode + phoneNumber
        //   setPhone_number(number)
        //   setCountryCode(countryCode)
        //   console.log('phone',number,'code',countryCode)
        // //   setValue({ countryCode, phoneNumber }); // Update state with both values
        // }
      }
      const customStyle = {
        backgroundColor: "#fff",
        borderRadius: "10px",
        paddingLeft: "10px",
        width:'100%'
      };
      console.log('error',errors)
      useEffect(() => {
        // Send the token to the backend to verify it
        const verifyToken = async () => {
          if(token){
            try {
                const response = await fetch("https://api.codingscholar.com/verify-teacher-token/", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ token }),
                });
        
                if (response.ok) {
                  const data = await response.json();
                  console.log("Verified email:", data.email);
                  // Redirect to a form or auto-fill the email field
                     navigate('/SignUp')
                } else {
                  console.error("Invalid or expired token.");
                  navigate("/error");
                }
              } catch (error) {
                console.error("Error verifying token:", error);
                navigate("/Error");
              }
          }
        };
    
        verifyToken();
      }, [token]);
      const handleChange=(e)=>{
        setErrors('')
        const {value,name}=e.target
        setTeacherValues({...teacherValues,[name]:value})
      }
      useEffect(()=>{
      setLoading(false)
      },[errors])
  return (
    <div className='RegisterWRapper'>
    <div className='RegisterContainer'>
        <aside>
            <div className='registerLogoWRapper'></div>
            <div className='studentComment'>
                <div className='innerstudentComment'>
                    <div className='quoteHolder'>
                        <p></p>
                    </div>
                    <div className='studentQuote'> 
                        <p>My teacher at Codehub was the best guide I could've asked for as they really customized the classes to match my learning style.</p>
                    </div>
                    <div className='studentPicholder'>
                        <div className='studentPic'>
                            <img  src={pic}/>
                        </div>
                    </div>
                </div>
                <div className='copywrightHolder'>
                    <p><span><i className="fa fa-copyright" aria-hidden="true"></i></span> 2025 CodeHub.</p>
                </div>
            </div>
        </aside>
        <main>
        <div className='registerLogoWRapper rightSideLogo'>
            <div className='rightSideLogoLeft'></div>
            <div className='rightSideLogoRight'>
                <ul>
                    <li> </li>
                    <li><i className="fa fa-envelope-open" aria-hidden="true"></i>  support:support@codehub.com</li>
                </ul>
            </div>
        </div>
        <div className='RegisterFormWrapper'>
           <div className='InnerSignWrapper'>
           {errors && <p style={{textAlign:'center',color:"red"}}>{errors}</p>}
           <h3>Let's get started</h3>
           <div className='loginInputWrapper'>
                <input name='first_name' onChange={handleChange} placeholder='First name' className='signUpInput ' type='text'/>
                <input name='last_name' onChange={handleChange} placeholder='Last name' className='signUpInput upper' type='text'/>
                <input name='email' onChange={handleChange} placeholder='Email' className='signUpInput' type='email'/>
                <div className='LoginCountryCodeWrapper'>
                {/* <PhoneInput
                        placeholder="Enter phone number"
                        value={phone_number}
                        countries={africanCountries}
                        defaultCountry="KE"
                        style={customStyle}
                        rules={{validate: (value) => isPossiblePhoneNumber(`${value}`)}}
                        onChange={handlePhoneChange}/> */}
                         <PhoneInput
                        country={"ke"} // Default country (Kenya)
                        value={phone_number}
                        containerClass="custom_container"
                        inputClass="custom_input"
                        regions={'africa'}
                        // onlyCountries={africanCountries} // Restrict to African countries
                        placeholder="Enter phone number"
                        onChange={handlePhoneChange}
                        style={customStyle}
                      />
                </div>
                <input name='password' onChange={handleChange} placeholder='Enter Password' className='signUpInput lower' type='password'/>
                <input name='confirm_password' onChange={handleChange} placeholder='Confirm Password' className='signUpInput' type='password'/>
           </div>
           <div className='LoginBtnWrapper'>
            <button onClick={handleSignUP}>{loading===false?'Sign up':<i className="fa fa-spinner spinner" aria-hidden="true"></i>}</button>
           </div>
           </div>
        </div>
        </main>
    </div>
</div>
  )
}
