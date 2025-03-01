import React,{useState,useEffect,useContext} from 'react'
import pic from '../../assets/man.jpg'
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
    const {student}=useContext(context)
    console.log(student)
    const handleToJoinClass =(id)=>{
    navigate(`/class/${id}`,{state:id})
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
    const url =`http://127.0.0.1:8000/getstudentLessons/${id}`
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
  getLessons()
 },[token,studentId])
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
                    <img src={pic}/>
                </div>
                <div className='imageChanger'>
                 <div className='imageChangerHolder'>
                 <i class="fa fa-camera" aria-hidden="true"></i>
                 </div>
                </div>
            </div>
            <div className='TeacherNameWrapper'>
            {student?.user && (
                <p>
                    {student.user.first_name} {student.user.last_name}
                    <span>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                    </span>
                </p>
                )}
            </div>
            <div className='TeacherEarnsWrapper'>
                <div>
                    <p>Live earning</p>
                    <p>ksh 20000</p>
                </div>
            </div>
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
                    <p>time:{lesson.time}</p>
                    <p><a href='#'>details</a></p>
                    <button onClick={()=>handleToJoinClass(lesson.lesson.lessonId)}>join</button>
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
