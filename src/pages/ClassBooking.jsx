import React,{useState,useContext} from 'react'
import pic from '../assets/teacher.jpg'
import { context } from '../App'
import { v4 as uuidv4 } from "uuid";
import axios from 'axios'
import AlertPOPUp from '../Components/AlertPOPUp';
import { useEffect } from 'react';
 export default function ClassBooking() {

    const {value,email,grade,CountryCode,CountryName}=useContext(context)
    const initialState={date:'',time:""}
    const [booking,setBooking]=useState(initialState)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState('')
    const [fetchloading,setfetchloading]=useState(true)
    const [availability,setAvailability]=useState([])
    const [pickedTime,setPickedTime]=useState([])
    const [bookingMessage,setBookingMessage]=useState("")
    const handleChange=(e)=>{
    const {name,value}=e.target
    setBooking(pre=>({...pre,[name]:value}))
    }
    function GetAvailabeBookingTime(){
        const url='https://api.codingscholar.com/TeacherAvailability/'
        axios.get(url)
        .then(res=>{
            setfetchloading(false)
            const data=res.data
            const today = new Date().toISOString().split('T')[0]
            const time = new Date().toTimeString().split(' ')[0]
            const todayAvailability = data.filter(item => item.date === today && item.time >=time)
            console.log('today',time,todayAvailability)
            todayAvailability.forEach(item=>{
             const timeZoneTime=formatToLocalTime(item.datetime_utc)
             setAvailability(pre=>([...pre,{...item,...{timeZoneTime:timeZoneTime}}]))
            })
            
        })
        .catch(error=>console.log(error))
    }
    function formatToLocalTime(utcStr) {
        // Combine date and time into a single UTC string
        const utcDateTime =utcStr;
        // Convert to a Date object (UTC)
        const date = new Date(utcDateTime);
    
        // Format only the time in the user's local timezone
        return new Intl.DateTimeFormat(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            // second: '2-digit',
            hour12: false // Set to false for 24-hour format
        }).format(date);
    }
    const handleBook=()=>{
        const uniqueId = uuidv4();
        const BookingName = `freeTrial${uniqueId}`
        setLoading(true)
        const url ='https://api.codingscholar.com/booking/'
        if(pickedTime.length>0){
            pickedTime.forEach(item=>{
                // console.log('as',item)
                const {teacher,time,date,datetime_utc}=item
                const first_name=teacher.user.first_name
                const last_name=teacher.user.last_name
                const data={phone_number:value,email:email,
                    first_name:first_name,last_name:last_name,datetime_utc:datetime_utc,time:time,date:date,grade:grade,BookingName:BookingName,countryCode:CountryCode,country:CountryName}
                    axios.post(url,data)
                    .then(res=>{
                        console.log(res.data)
                        const {message}=res.data
                        setBookingMessage(message)
                        setLoading(false)
                    })
                    .catch(error=>{
                        console.log(error)
                    })
            })
        }else{
            setError('Please a suitable time slot for your free trial class')
            setLoading(false)
        }
    }
    const handlePickedTime=(item)=>{
     setPickedTime([item])
    }
    useEffect(()=>{
    GetAvailabeBookingTime()
    },[])
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
                            <p>Helping students discover how they learn best is what teaching is all about.Am So glad to help many kids start their journey</p>
                        </div>
                        <div className='studentPicholder'>
                            <div className='studentPic'>
                                <img  src={pic}/>
                            </div>
                        </div>
                    </div>
                    <div className='copywrightHolder'>
                        <p><span><i className="fa fa-copyright" aria-hidden="true"></i></span> {new Date().getFullYear()} codingscholor.com</p>
                    </div>
                </div>
            </aside>
            <main>
            <div className='registerLogoWRapper rightSideLogo'>
                <div className='rightSideLogoLeft'></div>
                <div className='rightSideLogoRight'>
                    <ul>
                        {/* <li>Are you are teacher </li> */}
                        <li>
                        <i className="fa fa-envelope-open" aria-hidden="true"></i>
                        &nbsp;
                        <a href="mailto:info@codingscholar.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                            support: info@codingscholar.com
                        </a>
                      </li>
                    </ul>
                </div>
            </div>
            <div className='RegisterFormWrapper'>
               <div className='InnerBookingWrapper'>
                {error && <p style={{color:'red'}}>{error}</p>}
                 <h3>Book a free lesson to enter the wonderful world of coding</h3>
                 <p className='timezone'>This will in recorded in your country's time zone</p>
                 <div className='timeSeletorWrapper'>
                    <p>Select date</p>
                    <div className='bookingDateWrapper'>
                        <ul>
                            <li className='activeDay'>today</li>
                            {/* <li>tomorrow</li> */}
                        </ul>
                    </div>
                    <p>Select  time </p>
                    <div className='bookingTimeWrapper'>
                        {/* <span className='selectedTime'>10:10pm</span> */}
                       {fetchloading===true?<i className="fa fa-spinner spinner" aria-hidden="true"></i> :availability.length>0? availability.map(item=>{
                        return(
                            <div key={item.id}>
                                <span className={pickedTime.map(time=>time.id===item.id?'selectedTime':'')} onClick={()=>handlePickedTime(item)}>{item.timeZoneTime}</span>
                            </div>
                        )
                       }):<p>No booking slots available for now!</p>}
                    </div>
                 </div>
                 <div className='bookBtnWrapper'>
                    {loading===false?<button onClick={handleBook}>book now</button>:<button><i className="fa fa-spinner spinner" aria-hidden="true"></i></button>}
                 </div>
               </div>
            </div>
            </main>
        </div>
        {bookingMessage && <AlertPOPUp bookingMessage={bookingMessage}/>}
    </div>
  )
}
