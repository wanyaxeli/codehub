import React,{useState,useContext,useEffect} from 'react'
import pic from '../assets/student.jpg'
import { context } from '../App'
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import Slider from 'react-slick'
import PhoneInput from 'react-phone-number-input'
import {useNavigate}from 'react-router-dom'
export default function Register() {
    const [selectedValue, setSelectedValue] = useState('');
    const [error,setErrors]=useState('')
    const africanCountries = [
        'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'CG', 'CD', 
        'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'CI', 'KE', 
        'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'YT', 'MA', 'MZ', 'NA', 'NE', 
        'NG', 'RW', 'RE', 'SH', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'TZ', 
        'TG', 'TN', 'UG', 'EH', 'ZM', 'ZW'
      ];
      const {value,setValue,CountryCode,setCountryCode,grade,setGrade}=useContext(context)
      const handlePhoneChange = (phone) => {
        setErrors('')
        if (phone) {
          const parsed = parsePhoneNumber(phone, "KE"); // Replace "KE" with default country code if needed
          const countryCode = parsed?.countryCallingCode ? `+${parsed.countryCallingCode}` : "";
          const phoneNumber = parsed?.nationalNumber || "";
          const number=countryCode + phoneNumber
          setValue(number)
          setCountryCode(countryCode)
          console.log('phone',number,'code',countryCode)
        //   setValue({ countryCode, phoneNumber }); // Update state with both values
        }
      };
        const customStyle = {
            backgroundColor: "#fff",
            borderRadius: "10px",
            paddingLeft: "10px",
            width:'100%'
          };
        console.log('grade',selectedValue)
    var settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        
    }
    const navigate=useNavigate()
    const handleToTeacherLogin=()=>{
        navigate('/teacher') 
    }
    const handleToLapTop=()=>{
    // navigate('/laptop')
    console.log('grade',grade)
    console.log('number',value)
    if (isValidPhoneNumber(value)) {
        if(grade){
            navigate('/laptop')
        }else{
            setErrors('please grade cannot be empty');
        }
      } else {
        setErrors('Invalid phone number');
      }
    }
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };
    useEffect(()=>{
    setGrade(selectedValue)
    },[selectedValue])
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
                        <li onClick={handleToTeacherLogin}>Are you are teacher </li>
                        <li><i className="fa fa-envelope-open" aria-hidden="true"></i>  support:support@codehub.com</li>
                    </ul>
                </div>
            </div>
            <div className='RegisterFormWrapper'>
               <div className='InnerRegisterFormWrapper'>
                 <h3>Let's get started</h3>
                 <h4>Enter your WhatsApp phone number</h4>
                 {error &&  <p className='errorPara'>{error}</p>}
                 <div className='formInputWrapper'>
                     {/* <div className='InputCodeWrapper'> </div> */}
                     <PhoneInput
                    placeholder="Enter phone number"
                    value={value}
                    countries={africanCountries}
                    defaultCountry="KE"
                    style={customStyle}
                    onChange={handlePhoneChange}/>
                 </div>
                 <div className='gradeSelectorHolder'>
                    <select value={selectedValue} onChange={handleChange}>
                    <option value="" disabled>
                    grade
                    </option>
                    <option value="1">grade 1</option>
                    <option value="2">grade 2</option>
                    <option value="3">grade 3</option>
                    <option value="4">grade 4</option>
                    <option value="5">grade 5</option>
                    <option value="6">grade 6</option>
                    <option value="7">grade 7</option>
                    <option value="8">grade 8</option>
                    <option value="9">grade 9</option>
                    </select>
                 </div>
                 <div className='formBtnwrapper'>
                    <button onClick={handleToLapTop}>proceed to take a free lesson</button>
                 </div>
                 <div className='registerPromptWrapper'>
                    <p><span><i className="fa fa-pencil" aria-hidden="true"></i></span> Register now, grab your free slot for coding class!</p>
                 </div>
                 <div>
                    <p>By signing up, you agree to the Terms of Service and Privacy Policy. You also agree that you have parental consent. Important updates will be sent via email, SMS & WhatsApp, and class reminders will be sent via call.</p>
                 </div>
               </div>
            </div>
            </main>
        </div>
    </div>
  )
}
