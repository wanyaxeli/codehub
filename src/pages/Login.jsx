import React,{useState,useEffect} from 'react'
import Header from '../Components/Header'
import { useNavigate } from 'react-router-dom'
import pic from '../assets/student.jpg'
import axios from 'axios'

export default function Login() {
    const navigate =useNavigate()
    const initialState={
        email:"",
        password:''
    }
    const [values,setValues]=useState(initialState)
    const handleChange =(e)=>{
    const {value,name}=e.target
    setValues({...values,[name]:value})
    }
    const handleToSignUp =()=>{
     const url='http://127.0.0.1:8000/api/token/'
      axios.post(url,values,{headers:{
        'Content-Type':'application/json'
      }})
      .then(res=>{
        const data = res.data
        const{access, refresh, role}=data
        localStorage.setItem('token',access)
        console.log(access)
        if(role ==='student'){
            navigate('/student/dashboard/Details')
        }else if(role==='teacher'){
            navigate('/teacher/dashboard/Details')
        }
      })
      .catch(error=>{
        console.log(error)
      })
    }
    console.log('va',values)
    const handleTeacher =()=>{
        
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
                    <li onClick={handleTeacher}>Are you are teacher </li>
                    <li><i className="fa fa-envelope-open" aria-hidden="true"></i>  support:support@codehub.com</li>
                </ul>
            </div>
        </div>
        <div className='RegisterFormWrapper'>
           <div className='InnerLoginWrapper'>
           <h3>Let's get started</h3>
           <div className='loginInputWrapper'>
            <div className='LoginCountryCodeWrapper'>
                {/* <div className='loginCountryCode'></div> */}
                <input name='email' onChange={handleChange} placeholder='Enter email' type='email'/>
            </div>
            <input name='password' onChange={handleChange} placeholder='Enter Password' className='passwordInput' type='password'/>
           </div>
           <div className='LoginBtnWrapper'>
            <button onClick={handleToSignUp}>Login</button>
           </div>
           </div>
        </div>
        </main>
    </div>
</div>
  )
}
