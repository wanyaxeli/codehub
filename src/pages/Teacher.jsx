import React from 'react'
import { useNavigate } from 'react-router-dom'
import pic from '../assets/student.jpg'
export default function Teacher() {
  const navigate=useNavigate()
  const handleToDashboard=()=>{
  navigate('/teacher/dashboard')
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
                    <li>Are you are teacher </li>
                    <li><i className="fa fa-envelope-open" aria-hidden="true"></i>  support:support@codehub.com</li>
                </ul>
            </div>
        </div>
        <div className='RegisterFormWrapper'>
           <div className='InnerLoginWrapper'>
           <h3>Let's get started</h3>
           <div className='loginInputWrapper'>
            <div className='teacherLogin LoginCountryCodeWrapper'>
                <input placeholder='Enter Email' type='email'/>
            </div>
            <input placeholder='Enter Password' className='passwordInput' type='password'/>
           </div>
           <div className='LoginBtnWrapper'>
            <button onClick={handleToDashboard}>Login</button>
           </div>
           </div>
        </div>
        </main>
    </div>
</div>
  )
}
