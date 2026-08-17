import React,{useState,useContext,useEffect} from 'react'
import pic from '../assets/student.jpg'
import { context } from '../App'
import { parsePhoneNumber } from 'react-phone-number-input';
import { isValidPhoneNumber, isPossiblePhoneNumber } from "libphonenumber-js";
import Slider from 'react-slick'
import PhoneInput from 'react-phone-number-input'
import { parsePhoneNumberFromString } from "libphonenumber-js";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json"
import {useNavigate, useSearchParams}from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import axios from 'axios';
export default function Register() {
    const [selectedValue, setSelectedValue] = useState('');
    const [error,setErrors]=useState('')
    const [referralcode,setReferralCode]=useState()
    const [searchParams]=useSearchParams()
    const [isSaving,setIsSaving]=useState(false)
    const [wasReferred, setWasReferred] = useState(false)
    countries.registerLocale(en); // Register country names in English
    const africanCountries = [
        'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'CG', 'CD', 
        'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'CI', 'KE', 
        'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'YT', 'MA', 'MZ', 'NA', 'NE', 
        'NG', 'RW', 'RE', 'SH', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'TZ', 
        'TG', 'TN', 'UG', 'EH', 'ZM', 'ZW'
      ];

      const {value,setValue,email,setEmail,CountryCode,setCountryName,setCountryCode,grade,setGrade,setName,name,course, setCourse}=useContext(context)
    //  const API_URL = import.meta.env.VITE_API_URL;
    const API_URL='http://127.0.0.1:8000'
    console.log('VITE_API_URL...',API_URL)
    // const validateCode=async()=>{
    //     // validateCode()
    //       await 
    // }
    

        useEffect(() => {
          console.log('hellloo....')
          const ref = searchParams.get('ref')
          console.log('referral code...',ref)
          // const existing = localStorage.getItem('referral_code');
          // if (!ref) return;
    
          const existing_code= localStorage.getItem('referral_code');
          const existingValid = existing_code && Date.now() < Number(localStorage.getItem('referral_expiry'));
          console.log('existing..jj..',existing_code)
          setReferralCode(existing_code)
          setWasReferred(true)
          if (existingValid) return; // first valid touch wins, don't overwrite
          
           fetch(`${API_URL}/referrals/validate?code=${ref}`)
            .then(res => res.json())
            .then(({ valid }) => {
              if (valid) {
                console.log('valid....',valid)
                localStorage.setItem('referral_code', ref);
                localStorage.setItem('referral_expiry', String(Date.now() + 1 * 864e5));
                setReferralCode(ref)
                setWasReferred(true)
              }
                 // if invalid, store NOTHING — leaves room for a real one to land later
            });
           
        }, [searchParams]);

        const handleReferredToggle = (e) => {
           const checked = e.target.checked
           setWasReferred(checked)
           if (!checked) setReferralCode('') // clear code if unchecked
            }
          const existing_code= localStorage.getItem('referral_code');
          // setReferralCode(existing_code)

        const handleReferralCodeChange = (e) => {
          setReferralCode(e.target.value)
        }

        const registerLead=async()=>{
          try{
            setIsSaving(true)
            const leaddata={
              name,
              email,
              phoneNumber,
              grade,
              course,
              referralcode
            }
            console.log('Register_data',leaddata)
            const res=await axios.post(`${API_URL}/save-lead`,leaddata)
            if (res.status==200){
              setIsSaving(false)
            }

          }catch(e){
            console.error("error in registering lead..")
          }finally{
            setIsSaving(false)
          }
        }


      
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
        const handleEmail =(e)=>{
            setErrors('')
            setEmail(e.target.value)
        }
        const handleName =(e)=>{
          setErrors('')
          setName(e.target.value)
      }
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
    // const handleToTeacherLogin=()=>{
    //     navigate('/teacher') 
    // }
  const handleToLapTop = async () => {
  setErrors('')

  if (!(grade && value && email && name && course)) {
    setErrors('Please fill in all fields.')
    return
  }

  if (!isValidPhoneNumber(value)) {
    setErrors('Invalid phone number')
    return
  }

  if (!isValidemail(email)) {
    setErrors('Invalid email address')
    return
  }

  try {
    setIsSaving(true)
    const ref_code=referralcode?referralcode:localStorage.getItem('referral_code')?localStorage.getItem('referral_code'):''
    const leaddata = {
      name,
      email,
      phoneNumber: value,   // was `phoneNumber`, which didn't exist
      grade,
      course,
      ref_code          // make sure this is defined/sourced somewhere
    }
    console.log('Register_data', leaddata)
    const res = await axios.post(`${API_URL}/save_lead`, leaddata)
    if (res.status === 200) {
      navigate('/laptop')
      // handle success — e.g. navigate('/laptop'), reset form, show confirmation
    }
  } catch (e) {
    console.error("error in registering lead:", e)
    setErrors('Something went wrong. Please try again.')
  } finally {
    setIsSaving(false)
  }
}

    function isValidemail(email) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}
    function isValidEmail(email) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(pattern.test(email)){
            const parsedNumber = parsePhoneNumberFromString(value);
            if (parsedNumber) {
                const countryISO = parsedNumber.country; // Get ISO 3166-1 alpha-2 code (e.g., "KE")
                const countryName = countries.getName(countryISO, "en"); // Get country name
              //   setCountryName(countryName || "Unknown Country");
                  const country=countryName||'Unknown'
                //   const data ={...teacherValues,...{phone_number:phone_number},...country}
                  setCountryName(country) 
                  // navigate('/laptop')      
           }
        }else{
             setErrors('Invalid email')
        }
    }
    const handleChange = (event) => {
        setErrors('')
        setSelectedValue(event.target.value);
      };
    const handleCourseChange =(e)=>{
      setErrors('')
     setCourse(e.target.value)
    }
    useEffect(()=>{
    setGrade(selectedValue)
    },[selectedValue])
  return (
    <>
    <Helmet>
        <title>Home - codingscholar</title>
        <meta name="description" content="Welcome to codingscholar -Let your kid learn coding with experts!" />
        <meta name="keywords" content="coding,coding for kids, education, online classes,online classes for kids, programming for kids, programming" />
        <link rel="canonical" href="https://www.codingscholar.com/" />
      </Helmet>
    <div className='RegisterWRapper'>
        <div className='RegisterContainer'>
            <aside>
                <div className='registerLogoWRapper'></div>
                <div className='studentComment'>
                  <div className="absolute top-4 left-9 z-10">
                    <Link   to="/"  className="back-button"  aria-label="Back to home">
                      <ChevronLeft className="w-5 h-5" />
                      <span>Back</span>
                   </Link>
                  </div>
                    <div className='innerstudentComment'>
                        {/* <div className='quoteHolder'>
                            <p></p>
                        </div> */}
                        <div className='quoteHolder'>
                        <i  className="fa fa-quote-left" aria-hidden="true"></i>
                    </div>
                        <div className='studentQuote'> 
                        <p>I’m still on my learning journey with <strong>codingscholar</strong>, but I can already see how much I’ve grown thanks to the structure, clarity, and dedication my teacher brings to every session.</p>
                        </div>
                        <div className='studentPicholder'>
                            <div className='studentPic'>
                                <img  src={pic} alt="Kids learning coding online in Kenya"/>
                            </div>

                            <div className='studentpicname '>
                            <p className='stdntname font-semibold flex'>Joy Hassan </p>
                            <p className='stdntdescription text-sm'>Active Student, Ghana</p>

                        </div>

                        </div>
                    </div>
                    <div className='copywrightHolder'>
                        <p><span><i className="fa fa-copyright" aria-hidden="true"></i></span> {new Date().getFullYear()} codingscholar.com</p>
                    </div>
                </div>
            </aside>
            <main>
            <div className='registerLogoWRapper rightSideLogo'>
                {/* <div className='rightSideLogoLeft'></div> */}
                {/* <div className='rightSideLogoRight'> */}
                    {/* <ul> */}
                        {/* <li onClick={handleToTeacherLogin}>Are you are teacher </li> */}
                      {/* <li> */}
                      <p>
                        <i className="fa fa-envelope-open" aria-hidden="true"></i>
                        &nbsp;
                        <a
                        href="https://mail.google.com/mail/?view=cm&to=info@codingscholar.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit' }}>
                            support: info@codingscholar.com
                        </a>
                        </p>
                      {/* </li>
                    </ul> */}
            </div>
            <div className='RegisterFormWrapper'>
                {/* <div className="md:opacity-0  absolute top-4 left-28  z-10">
                  <Link   to="/"  className="back-button"  aria-label="Back to home">
                    <ChevronLeft className="w-5 h-5" />
                      <span >Back</span>
                    </Link>
                 </div> */}
               <div className='InnerRegisterFormWrapper login-margintop'>
                 <h3 >Let's get started</h3>
                 {/* <h4>Enter your WhatsApp phone number</h4> */}
                 {error &&  <p className='errorPara'>{error}</p>}
                 <div className='formInputWrapper'>
                     {/* <div className='InputCodeWrapper'> </div> */}
                      <input onChange={handleName} type='text' placeholder='Enter Student Name'/> 
                     <input onChange={handleEmail} type='email' placeholder='Enter Email'/>
                     <PhoneInput
                    placeholder="Enter WhatsApp phone number"
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
                 <div className='gradeSelectorHolder'>
                    <select value={course} onChange={handleCourseChange}>
                    <option value="" disabled>
                     course
                    </option>
                    <option value="coding">coding</option>
                    <option value="mathematics">mathematics</option>
                    </select>
                 </div>
                 <div className='flex flex-col gap-2.5 !my-3.5'>
  <label className='flex items-center gap-2 !text-sm cursor-pointer select-none'>
    <input
      type='checkbox'
      checked={wasReferred}
      onChange={handleReferredToggle}
      className='h-4 w-4 cursor-pointer accent-[#0097B2]'
    />
    <span>I was referred by someone</span>
  </label>

  {wasReferred && (
    <input
      onChange={handleReferralCodeChange}
      value={referralcode}
      type='text'
      placeholder='Enter referral code'
      className='w-full !px-3 !py-2.5 !text-sm rounded-lg border border-[#D0D5DD] outline-none focus:border-[#0097B2] focus:ring-1 focus:ring-[#0097B2]'
    />
  )}
</div>
                 <div className='formBtnwrapper'>
                    <button 
                    onClick={handleToLapTop}
                    disabled={isSaving}
                    >proceed to take a free lesson</button>
                 </div>
                 <div className='registerPromptWrapper'>
                    <p><span><i className="fa fa-pencil" aria-hidden="true"></i></span> Grab your free slot for coding class on our platform!</p>
                 </div>
                 <div className='registerPolicyWrapper'>
                    {/* <p>By signing up, you agree to the Terms of Service and Privacy Policy. You also agree that you have parental consent. Important updates will be sent via email, SMS & WhatsApp, and class reminders will be sent via call.</p> */}
                    <p>By signing up, you agree to our Terms and Privacy Policy and consent to receive updates via email, SMS, WhatsApp, or phone.</p>
                  </div>
               </div>
            </div>
            </main>
        </div>
    </div>
    </>
  )
}
