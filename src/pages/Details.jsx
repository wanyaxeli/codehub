import React,{useState,useEffect,useContext} from 'react'
import pic from '../assets/codehubImage.jpeg'
import { context } from '../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { parsePhoneNumberFromString } from "libphonenumber-js";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { jwtDecode } from 'jwt-decode'
// countries.registerLocale(en);
export default function Details() {
    const [booking,setBookings]=useState([])
    const [loading,setLoading]=useState(false)
    const [token,setToken]=useState('')
    const [userId,setUser_id]=useState('')
    const [todayBooking,settodayBooking]=useState([])
    const navigate=useNavigate()
    const {teacher,proPic,getProfilePic,seeEarning,setEarning} =useContext(context)
    const [profilePic,setProfilePic]=useState('')
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
    const handleJoinClass =(data)=>{
      console.log('asd',data)
       if(userId){
        const name = data.BookingName
        // navigate(`/Trial Class/${name}`,{state:userId})
        // navigate(`/Trial Class/${name}`,{state:{id:userId,role:'teacher'}})
        const decodedName = decodeURIComponent(name);
        const  codeName = decodedName;
        const numberFromId = codeName.replace(/\D/g, ""); // Removes all non-digit characters

        const codeNameInt = parseInt(numberFromId, 10);
        navigate(`/class/${codeNameInt}`,{state:{id:userId ,classType:'trial'  ,code:codeNameInt,role:'teacher',booking_id:name}})
       }
    }
    const handleSetQuiz=()=>{
        navigate('/teacher/dashboard/Set Quiz')
    }
    const handleSetLessons=()=>{
        navigate('/teacher/dashboard/Lessons')
    }
    async function getToken(){
        try{
            const token= localStorage.getItem('token') // No need to await
            if (token){
                setToken(token);
            }
        } catch(error) {
            console.log(error);
  }
}
    // Register the English locale for i18n-iso-countries
    countries.registerLocale(en);

    // Function to fetch country name by country code
    const getCountryName = (countryCode) => {
    return countries.getName(countryCode, "en") || "Unknown Country";
    };
    const handlechange =(e)=>{
        setProfilePic(e.target.files[0])
    }
    const handleSlots =()=>{
      navigate('/teacher/dashboard/Slots')
    }
    function UpdateProfilePic(){
    if(token && profilePic){
        const url = 'https://api.codingscholar.com/profilePic/';
        const formData = new FormData();
        formData.append('image', profilePic);

        axios.post(url,formData,{
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            alert(response.data.message)
            console.log(response.data)
            getProfilePic(token)
        })
        .catch(error => console.error(error));
    }
    }
    // function getProfilePic(){
    //     const url='http://127.0.0.1:8000/profilePic/'
    //     axios.get(url,{
    //         headers:{
    //             'Authorization':`Bearer ${token}`
    //         }
    //     })
    //     .then(res=>{
    //         console.log('res',res.data)
    //     })
    //     .catch(error=>console.log(error))  
    // }
    useEffect(() => {
   
        if (token) {
          try {
            const decode = jwtDecode(token);
            const {role,user_id}=decode
            setUser_id(user_id)
            console.log("Decoded Token:", role);
            // setRole(role)
          } catch (error) {
            console.error("JWT Decode Error:", error);
          }
        }
      }, [token]);
    useEffect(()=>{
    UpdateProfilePic()
    },[token,profilePic])
    useEffect(()=>{
        getProfilePic(token)
    },[token])
    useEffect(()=>{
    if(token){
        const url ='https://api.codingscholar.com/Teacherbooking/'
        setLoading(true)
        axios.get(url,{headers:{
           'Content-Type':'application/json',
           'Authorization':`Bearer ${token}`
        }})
        .then(res=>{
           const data=res.data
           setLoading(false)
           if (data){ 
           data.forEach(item=>{
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
                    
                   console.log('country',countryName)
                   } else {
                   //   setCountryName("Invalid Phone Number");
                   console.log("Invalid Phone Number")
                   }
                 } catch (error) {
                   // setCountryName("Invalid Phone Number");
                   console.log("Invalid Phone Number")
                 }
           })}
        })
        .catch(error=>{
           console.log(error)
        })
    }
    },[token])
    async function getToken(){
        try{
            const token= localStorage.getItem('token') // No need to await
            if (token){
                setToken(token);
            }
        } catch(error) {
            console.log(error);
  }
}
    useEffect(()=>{
    if(booking){
       // Get year, month, and day
    const date =new Date()
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0'); // Pad day with leading 0 if necessary

    // Combine them into the desired format (YYYY-MM-DD)
    const fullDate = `${year}-${month}-${day}`;

    const todayBookings = booking.filter(item=>item.date===fullDate)
    todayBookings.forEach(item=>{
        const timeZoneTime=formatToLocalTime(item.datetime_utc)
        settodayBooking(pre=>([...pre,{...item,...{timeZoneTime:timeZoneTime}}]))
    })
    // settodayBooking(todayBookings)
    }
    },[booking])
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
    const handleCurriculum =()=>{
        navigate('/StudentSignup')
    }
    const handleToMath =()=>{
      navigate('/teacher/dashboard/Math')
    }
    const handleGroupClass =()=>{
      navigate('/teacher/dashboard/Group Class')
    }
    const handleBookingManager=()=>{
        navigate('/teacher/dashboard/Booking Manager')
    }
    const handleUploadVids=()=>{
      navigate('/teacher/dashboard/upload video')
    }
    const handleSettodayQuiz =()=>{
      navigate('/teacher/dashboard/Set Question')
    }
    const handleCertificates =()=>{
      navigate('/teacher/dashboard/Certificates')
    }
    useEffect(()=>{
    getToken()
    },[])
    const handleToSeeEarning =()=>{
      if(seeEarning===true){
        setEarning(false)
        localStorage.setItem('earning', seeEarning);
      }else{
        setEarning(true)
        localStorage.setItem('earning', seeEarning);
      }
    }
    console.log('teacher',teacher)
  return (
    <div className='DetailsWrapper'>
        <div className='TeacherDetailsWrapper'>
            <div className='TeacherImageWrapper'>
                <div className='TeacherImageContainer'>
                    {proPic?<img loading="lazy" alt='codingscholar' src={`https://res.cloudinary.com/dbxsncq5r/${proPic}`}/>:<img src={pic} alt="codingscholar"/>}
                </div>
                <div className='imageChanger'>
                 <div className='imageChangerHolder'>
                 <label  htmlFor="imageUpload">
                 <i className="fa fa-camera" aria-hidden="true" style={{ cursor: "pointer" }}></i>
                 </label>
                 <input onChange={handlechange} accept="image/*"  type="file" id="imageUpload" style={{ display: "none" }} />
                 </div>
                </div>
            </div>
            <div className='TeacherNameWrapper'>
               {/* {teacher && teacher!='undefined' &&  <p>{teacher.user.first_name} {teacher.user.last_name}<span><i className="fa fa-pencil" aria-hidden="true"></i></span></p>} */}

               {teacher?.user ? (
                <p style={{ textTransform: 'capitalize' }}>
                  {teacher.user.first_name} {teacher.user.last_name}
                  <span><i className="fa fa-pencil" aria-hidden="true"></i></span>
                </p>
              ) : (
                <p>Loading ...</p>
              )}
            </div>
            <div className='TeacherEarnsWrapper'>
                <div>
                    <p>Live earning</p>
                    {teacher && <p>ksh {seeEarning===true?teacher.salary:""} <span style={{color:'#0097b2',cursor:'pointer'}} onClick={handleToSeeEarning}>{seeEarning===false?<i className="fa fa-eye" aria-hidden="true"></i>:<i className="fa fa-eye-slash" aria-hidden="true"></i>}</span> </p>}
                </div>
            </div>
        </div>
  {teacher?.user?.is_admin ? (
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
    <div onClick={handleUploadVids} className='actionBtnContainer createcurriculum'>
      <p>videos</p>
    </div>
    <div onClick={handleToMath} className='actionBtnContainer uploadedvideo'>
      <p>math</p>
    </div>
    <div className='actionBtnContainer slotholder' onClick={handleSlots}>
      <p>Slots</p>
    </div>
    <div onClick={handleGroupClass} className='actionBtnContainer uploadedvideo'>
      <p>Group Class</p>
    </div>
    <div onClick={handleSetQuiz} className='actionBtnContainer quiz'>
      <p>Quiz</p>
    </div>
    <div onClick={handleSettodayQuiz} className='actionBtnContainer quiz'>
      <p>Set Question</p>
    </div>
    <div onClick={handleSetLessons} className='actionBtnContainer lessonsBtn'>
      <p>class</p>
    </div>
    <div onClick={handleBookingManager} className='actionBtnContainer bookingsManagerBtn'>
      <p>Bookings</p>
    </div>
    <div onClick={handleCertificates} className='actionBtnContainer bookingsManagerBtn'>
      <p>Certificates</p>
    </div>
  </div>
) :(
  <div className='nonadminWrapper'>
  <div className='actionBtnContainer slotholder' onClick={handleSlots}>
     <p>Slots</p>
   </div>
   <div className='actionBtnContainer slotholder' onClick={handleUploadVids}>
     <p>videos</p>
   </div>
 </div>
)}
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
                {loading === true ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center' }}>
                      <i className="fa fa-spinner spinner" aria-hidden="true"></i>
                    </td>
                  </tr>
                ) : todayBooking.length > 0 ? (
                  todayBooking.map((item) => (
                    <tr key={item.id}>
                      <td>{item.countryCode}</td>
                      <td>{item.countryName}</td>
                      <td>{item.phone_number}</td>
                      <td>{item.email}</td>
                      <td>{item.grade}</td>
                      <td>{item.timeZoneTime}</td>
                      <td>
                        <button onClick={() => handleJoinClass(item)}>join</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center' }}>
                      No bookings for today
                    </td>
                  </tr>
                )}
            </tbody>
            </table>
        </div>
    </div>
  )
}
