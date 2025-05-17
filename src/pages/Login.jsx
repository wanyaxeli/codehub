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
    const [error,setError]=useState('')
    const handleChange =(e)=>{
    const {value,name}=e.target
    setValues({...values,[name]:value})
    }
    const handleToSignUp =()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
        if(values.email){
            if (emailRegex.test(values.email)) {
                if(values.password){
                    // const url='http://127.0.0.1:8000/api/token/'
                    const url='https://api.codingscholar.com/api/token/'
                    axios.post(url,values,{headers:{
                      'Content-Type':'application/json'
                    }})
                    .then(res=>{
                      const data = res.data
                      const{access, refresh, role}=data
                      localStorage.setItem('token',access)
                      console.log(access,role)
                      if(role ==='student'){
                          navigate('/student/dashboard/Details')
                      }else if(role==='teacher'){
                          navigate('/teacher/dashboard',{state:access})
                      }
                    })
                    .catch(error=>{
                      if (error.response) {
                          // The request was made, but the server responded with an error status code
                          console.log('Error Status:', error.response.status); // Example: 401
                          if( error.response.status===400){
                             setError('Please Fill All Inputs')
                          }else if( error.response.status===404){ 
                             setError('Please No User Found')
                          }else if( error.response.status===401){
                             setError("Please Enter Correct Password ")
                          }
                          console.log('Error Data:', error.response.data); // The server response
                          console.log('Error Headers:', error.response.headers);
                      } else if (error.request) {
                          // The request was made but no response was received
                          console.log('No response received:', error.request);
                          setError('Bad Request')
                      } else {
                          // Something else happened in setting up the request
                          console.log('Axios Error:', error.message);
                          if(error.message ==="Network Error"){
                               setError("Network error! Please check your internet connection or server.")
                          }
                      }
                    })
                }else{
                 setError('Please Enter Password')
                }
            }else{
                setError("Email is invalid")
            }
        }else{
            setError("Please Enter Email")
        }
    }
    const handleSupport =()=>{
        
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
                    <li  onClick={handleSupport}><i className="fa fa-envelope-open" aria-hidden="true"></i>  support:support@codehub.com</li>
                </ul>
            </div>
        </div>
        <div className='RegisterFormWrapper'>
           <div className='InnerLoginWrapper'>
           <h3>Let's get started</h3>
           <div className='loginInputWrapper'>
            {error && <p style={{color:'red'}}>{error}</p>}
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
