import React,{useState,useEffect,useContext} from 'react'
import pic from '../assets/women1.jpg'
import { context } from '../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { parsePhoneNumberFromString } from "libphonenumber-js";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
// countries.registerLocale(en);
export default function Details() {
    const [booking,setBookings]=useState([])
    const [loading,setLoading]=useState(false)
    const [todayBooking,settodayBooking]=useState([])
    const navigate=useNavigate()
    const {teacher} =useContext(context)
    const handleToAllTeachers=()=>{
    navigate('/teacher/dashboard/All Teachers')
    }
    const handleToAllStudents=()=>{
        navigate('/teacher/dashboard/All Students')
    }
    const handleToAddTeachers=()=>{
        navigate('/teacher/dashboard/Add Teachers')
    }
    const handleToAddStudent=()=>{
        navigate('/teacher/dashboard/Add Students')
    }
    const handleJoinClass =(name)=>{
        console.log(name)
        navigate(`/class/${name}`,{state:name})
    }
    const handleSetQuiz=()=>{
        navigate('/teacher/dashboard/Set Quiz')
    }
    const handleSetLessons=()=>{
        navigate('/teacher/dashboard/Lessons')
    }
    // Register the English locale for i18n-iso-countries
    countries.registerLocale(en);

    // Function to fetch country name by country code
    const getCountryName = (countryCode) => {
    return countries.getName(countryCode, "en") || "Unknown Country";
    };
    useEffect(()=>{
     const url ='http://127.0.0.1:8000/booking/'
     setLoading(true)
     axios.get(url,{headers:{
        'Content-Type':'application/json'
     }})
     .then(res=>{
        console.log("data",res.data)
        const data=res.data
        data.forEach(item=>{
            console.log('item',item)
            const {countryCode,BookingName,phone_number,grade,time,joined,id,email,date} =item
            console.log('countrycode',countryCode)
            // const countryName = getCountryName(countryCode);
             // Parse the phone number
             try {
                // Parse the phone number
                const parsedNumber = parsePhoneNumberFromString(phone_number);
              
                if (parsedNumber) {
                  const countryISO = parsedNumber.country; // Get ISO 3166-1 alpha-2 code (e.g., "KE")
                  const countryName = countries.getName(countryISO, "en"); // Get country name
                //   setCountryName(countryName || "Unknown Country");
                 const newData={countryName:countryName||'Unknown'}
                 console.log('data',item)
                    setBookings(prev => {
                        const exists = prev.some(existingItem => existingItem.id === item.id);
                        return exists ? prev : [...prev, { ...item, ...newData }];
                    });
                 setLoading(false)
                console.log('country',countryName)
                } else {
                //   setCountryName("Invalid Phone Number");
                console.log("Invalid Phone Number")
                }
              } catch (error) {
                // setCountryName("Invalid Phone Number");
                console.log("Invalid Phone Number")
              }
        })
     })
     .catch(error=>{
        console.log(error)
     })
    },[])
    console.log('booking',booking)
    useEffect(()=>{
    if(booking){
       // Get year, month, and day
    const date =new Date()
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0'); // Pad day with leading 0 if necessary

    // Combine them into the desired format (YYYY-MM-DD)
    const fullDate = `${year}-${month}-${day}`;

    console.log('Full Date:', fullDate);
    const todayBookings = booking.filter(item=>item.date===fullDate)
        // booking.filter()
        console.log('totbookings',todayBookings)
        console.log('totbookings',todayBookings)
    settodayBooking(todayBookings)
    }
    },[booking])
    const handleCurriculum =()=>{
        navigate('/StudentSignup')
    }
  return (
    <div className='DetailsWrapper'>
        <div className='TeacherDetailsWrapper'>
            <div className='TeacherImageWrapper'>
                <div className='TeacherImageContainer'>
                    <img src={pic}/>
                </div>
                <div className='imageChanger'>
                 <div className='imageChangerHolder'>
                 <i class="fa fa-camera" aria-hidden="true"></i>
                 </div>
                </div>
            </div>
            <div className='TeacherNameWrapper'>
               {teacher &&  <p>{teacher.user.first_name} {teacher.user.last_name}<span><i className="fa fa-pencil" aria-hidden="true"></i></span></p>}
            </div>
            <div className='TeacherEarnsWrapper'>
                <div>
                    <p>Live earning</p>
                    {teacher && <p>ksh {teacher.salary}</p>}
                </div>
            </div>
        </div>
        <div className='TeacherActionWrapper'>
            <div onClick={handleToAllTeachers} className='actionBtnContainer allTeacher'>
                <p>all teachers</p>
            </div>
            <div onClick={handleToAllStudents} className='actionBtnContainer allstudents'>
                <p>all students</p>
            </div>
            <div onClick={handleToAddTeachers} className='actionBtnContainer addTeacher'>
               <p>add teacher</p>
            </div>
            <div onClick={handleToAddStudent} className='actionBtnContainer addStudent'>
              <p>add student</p>
            </div>
            <div onClick={handleCurriculum} className='actionBtnContainer createcurriculum'>
            <p>curriculum</p>
            </div>
            <div className='actionBtnContainer uploadedvideo'>
            <p>videos</p>
            </div>
            <div onClick={handleSetQuiz} className='actionBtnContainer quiz'>
            <p>Quiz</p>
            </div>
            <div onClick={handleSetLessons} className='actionBtnContainer quiz'>
            <p>class</p>
            </div>
        </div>
        <div className='TodaysClasses'>
            <h3>Today Bookings</h3>
            <table>
                <thead>
                    <tr> 
                         <th> County Code</th>
                        <th>student County</th>
                        <th>student Number</th>
                        <th>student email</th>
                        <th>student grade</th>
                        <th>time</th>
                    </tr>
                </thead>
                <tbody>
                {loading===true?<i className="fa fa-spinner spinner" aria-hidden="true"></i>:todayBooking.length>1?todayBooking.map((item) => (
                <tr key={item.id}>
                    <td>{item.countryCode}</td>
                    <td>{item.countryName}</td>
                    <td>{item.phone_number}</td>
                    <td>{item.email}</td>
                    <td>{item.grade}</td>
                    <td>{item.time}</td>
                    <td><button onClick={()=>handleJoinClass(item.BookingName)}>join</button></td>
                </tr>
                )):<p>No bookings for today</p>}
                </tbody>
            </table>
        </div>
    </div>
  )
}
