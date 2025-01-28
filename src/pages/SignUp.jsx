import React,{useState,useEffect} from 'react'
import Header from '../Components/Header'
import pic from '../assets/student.jpg'
import { useParams, useNavigate } from "react-router-dom";
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import Slider from 'react-slick'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios';
export default function SignUp() {
    const initialState={first_name:'',last_name:'',email:'',
    password:'',confirm_password:''}
    const [countryCode,setCountryCode]=useState('')
    const [teacherValues,setTeacherValues]=useState(initialState)
    const [phone_number,setPhone_number]=useState('')
    const [errors,setErrors]=useState('')
    const { token } = useParams(); // Get the token from the URL
    const navigate = useNavigate();
    console.log('token',token)
    const africanCountries = [
        'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'CG', 'CD', 
        'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'CI', 'KE', 
        'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'YT', 'MA', 'MZ', 'NA', 'NE', 
        'NG', 'RW', 'RE', 'SH', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'TZ', 
        'TG', 'TN', 'UG', 'EH', 'ZM', 'ZW'
      ];
      const handleSignUP =()=>{
        const data ={...teacherValues,...{phone_number:phone_number}}
        console.log('teacher',data)
        const url ='http://127.0.0.1:8000/registerTeacher/'
        axios.post(url,data,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>{
            console.log('res',res.data)
        })
        .catch(error=>{
            console.log(error)
        })
      }
      const handlePhoneChange = (phone) => {
        setErrors('')
        if (phone) {
          const parsed = parsePhoneNumber(phone, "KE"); // Replace "KE" with default country code if needed
          const countryCode = parsed?.countryCallingCode ? `+${parsed.countryCallingCode}` : "";
          const phoneNumber = parsed?.nationalNumber || "";
          const number=countryCode + phoneNumber
          setPhone_number(number)
          setCountryCode(countryCode)
          console.log('phone',number,'code',countryCode)
        //   setValue({ countryCode, phoneNumber }); // Update state with both values
        }
      }
      const customStyle = {
        backgroundColor: "#fff",
        borderRadius: "10px",
        paddingLeft: "10px",
        width:'100%'
      };
      useEffect(() => {
        // Send the token to the backend to verify it
        const verifyToken = async () => {
          if(token){
            try {
                const response = await fetch("http://127.0.0.1:8000/verify-teacher-token/", {
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
        const {value,name}=e.target
        setTeacherValues({...teacherValues,[name]:value})
      }
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
           <h3>Let's get started</h3>
           <div className='loginInputWrapper'>
                <input name='first_name' onChange={handleChange} placeholder='First name' className='signUpInput ' type='text'/>
                <input name='last_name' onChange={handleChange} placeholder='Last name' className='signUpInput upper' type='text'/>
                <input name='email' onChange={handleChange} placeholder='Email' className='signUpInput' type='email'/>
                <div className='LoginCountryCodeWrapper'>
                <PhoneInput
                        placeholder="Enter phone number"
                        value={phone_number}
                        countries={africanCountries}
                        defaultCountry="KE"
                        style={customStyle}
                        onChange={handlePhoneChange}/>
                </div>
                <input name='password' onChange={handleChange} placeholder='Enter Password' className='signUpInput lower' type='password'/>
                <input name='confirm_password' onChange={handleChange} placeholder='Confirm Password' className='signUpInput' type='password'/>
           </div>
           <div className='LoginBtnWrapper'>
            <button onClick={handleSignUP}>Sign up</button>
           </div>
           </div>
        </div>
        </main>
    </div>
</div>
  )
}
