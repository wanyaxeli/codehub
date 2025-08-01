import React,{useState,useEffect,useContext} from 'react'
import pic from '../../assets/codehubImage.jpeg'
import { useNavigate } from 'react-router-dom'
import { context } from '../../App';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
export default function StudentDetails() {
    const navigate = useNavigate()
    const [token,setToken]=useState('')
    const [lessons,setLesson]=useState([])
    const [todayClass,setTodayClass]=useState([])
    const [studentId,setStudentId]=useState('')
    const {student,proPic,getProfilePic}=useContext(context)
    const [profilePic,setProfilePic]=useState('')
    console.log('student',student)
    const handleToJoinClass =(les,id,time,title)=>{
        const lessonTime = new Date(les.date_time);       // Converts ISO string to Date object
        const now = new Date();  
        if (lessonTime > now) {
            const navID=`${les.student.id}${id}`
            navigate(`/class/${navID}`, { state: { id,classType:'NormalClass', time,title } });
        } else{
            alert('Your class is yet to start')
        }
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
 function getLessons(){
   if(studentId && token){
    const id = studentId
    const url =`https://api.codingscholar.com/getstudentLessons/${id}`
    axios.get(url)
    .then(res=>{
        const data=res.data
        data.forEach(lesson=>{
            const now = new Date(lesson.date_time)
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();
            const newdata={date:date,time:time}
            setLesson(pre=>([...pre,{...lesson,...newdata}]))
            
        })
        console.log('datas',data)
    })
    .catch(error=>console.log(error))
   }
 }
 function UpdateProfilePic(){
    if(token && profilePic){
        const url = 'https://api.codingscholar.com/profilePic/';
        const formData = new FormData();
        formData.append('image', profilePic);

        axios.post(url,formData,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
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
 const handlechange =(e)=>{
    setProfilePic(e.target.files[0])
}
useEffect(()=>{
 if(student){
    if(student.tokens===0||student.fees ===false){
        navigate('/Fee Payment')
    }
 }
},[student])
 useEffect(()=>{
   if (lessons){
    const date= new Date()
    const today= date.getDate()
    const month=date.getMonth() + 1
    const year= date.getFullYear()
    const fullDate=`${month}/${today}/${year}`
    const todaylesson=lessons.filter(lesson=>lesson.date===fullDate)
    if(todaylesson){
        setTodayClass(todaylesson)
    }
    else{
        setTodayClass([])
    }
    console.log('lesson',todaylesson)
    console.log('alllessons',lessons)
    console.log('fuul',fullDate)
   }
 },[lessons])
 useEffect(()=>{
    UpdateProfilePic()
    },[token,profilePic])
 useEffect(()=>{
  getLessons()
 },[token,studentId])
 useEffect(()=>{
    getProfilePic(token)
},[token])
useEffect(()=>{
    if(token){
        const decoded = jwtDecode(token);
        const {user_id}=decoded
        setStudentId(user_id)
    }
},[token])
useEffect(()=>{
 getToken()
},[])

  return (
    <div className='DetailsWrapper'>
         <div className='TeacherDetailsWrapper'>
            <div className='TeacherImageWrapper'>
                <div className='TeacherImageContainer'>
                    {proPic?<img src={`https://res.cloudinary.com/dbxsncq5r/${proPic}`}/>:<img src={pic}/>}
                </div>
                <div className='imageChanger'>
                 <div className='imageChangerHolder'>
                 <label htmlFor="imageUpload">
                 <i className="fa fa-camera" aria-hidden="true" style={{ cursor: "pointer" }}></i>
                 </label>
                 <input onChange={handlechange} accept="image/*"  type="file" id="imageUpload" style={{ display: "none" }} />
                 </div>
                </div>
            </div>
            <div className='TeacherNameWrapper'>
            {student?.user && (
                <p>
                    {student.user.first_name} {student?.user?.last_name && student?.user?.last_name !== student?.user?.first_name
                    ? student.user.last_name
                    : ''}
                    {/* <span>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                    </span> */}
                </p>
                )}
            </div>
           {student && <div className='TeacherEarnsWrapper'>
                <div>
                    <p>Student Points</p>
                    <p style={{color:'#0097b2'}}>{student.Marks}</p>
                    <p>Student Token</p>
                    <p style={{color:'#0097b2'}}>{student.tokens}</p>
                </div>
            </div>}
        </div>
        <div className='todayLessonWrapper'>
           <div className='todayLessonHeaderwrapper'>
           <h3>today Classes</h3>
           </div>
            <div className='todayLessonContainer'>
               {todayClass.length>0?todayClass.map(lesson=>{
                return(
                    <div key={lesson.id} className='TodayClassContainer'>
                    <h4>{lesson.lesson.title}</h4>
                    {/* <p>time:{lesson.time}</p> */}
                    <p>Time: {lesson.time?.replace(/:\d{2}(?= )/, '')}</p>
                    {/* <p><a href='#'>details</a></p> */}
                    <button onClick={()=>handleToJoinClass(lesson,lesson.lesson.lessonId,lesson.date_time,lesson.lesson.title)}>join</button>
                  </div>
                )
               }):<div className='NoClassDiv'>
                <p>You do not have a class today</p>
                </div>}
            </div>
        </div>
    </div>
  )
}
