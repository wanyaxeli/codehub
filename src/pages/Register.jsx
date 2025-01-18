import React,{useState} from 'react'
import pic from '../assets/student.jpg'
import Slider from 'react-slick'
import {useNavigate}from 'react-router-dom'
export default function Register() {
    const [selectedValue, setSelectedValue] = useState('');
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
    const handleToLapTop=()=>{
    navigate('/laptop')
    }
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };
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
                        <li>Are you are teacher </li>
                        <li><i className="fa fa-envelope-open" aria-hidden="true"></i>  support:support@codehub.com</li>
                    </ul>
                </div>
            </div>
            <div className='RegisterFormWrapper'>
               <div className='InnerRegisterFormWrapper'>
                 <h3>Let's get started</h3>
                 <h4>Enter your WhatsApp phone number</h4>
                 <div className='formInputWrapper'>
                     <div className='InputCodeWrapper'> </div>
                     <input type='text'/>
                 </div>
                 <div className='gradeSelectorHolder'>
                    <select value={selectedValue} onChange={handleChange}>
                    <option value="" disabled>
                    courses
                    </option>
                    <option value="option1">python for kids</option>
                    <option value="option2">web development</option>
                    <option value="option3">scratch programming</option>
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
