import React,{useState,useEffect,useContext} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { context } from '../App'
import pic from '../assets/codehubImage.jpeg'
export default function TeacherClassDetails() {
    const location =useLocation()
    const navigate=useNavigate()
    const [todayClass,setTodayClass]=useState([])
    const [token,setToken]=useState()
    const {teacher,proPic}=useContext(context)
    useEffect(()=>{
    const {state}=location
    console.log(state)
   if(state){
    state.forEach(item=>{
        console.log('item',item)
        const now = new Date(item.date_time)
        const time = now.toLocaleTimeString();
        const newData={...item,...{time:time}}
        setTodayClass([newData])
    })
   }
    },[])
    const handleToJoinClass=(les,student,id,time)=>{
        const navID=`${les.student.id}${id}`
        navigate(`/class/${navID}`, { state: { id,classType:'NormalClass', time,student} });
    }
    const handleNotes = ( title,les, notes) => {
        // e.preventDefault(); // Prevents default link or form behavior
        console.log('notes', les);
        const id = title
        navigate(`/teacher/dashboard/Notes/`, { state: notes });
    };
    console.log('time',todayClass)
  return (
    <div className='DetailsWrapper'>
         <div className='TeacherDetailsWrapper'>
            <div className='TeacherImageWrapper'>
                <div className='TeacherImageContainer'>
                    {/* <img src={pic}/> */}
                    {proPic?<img src={`https://res.cloudinary.com/dbxsncq5r/${proPic}`}/>:<img src={pic}/>}
                </div>
                {/* <div className='imageChanger'>
                 <div className='imageChangerHolder'>
                 <i class="fa fa-camera" aria-hidden="true"></i>
                 </div>
                </div> */}
            </div>
            <div className='TeacherNameWrapper'>
                {teacher&& <p>{teacher.user.first_name} {teacher.user.last_name}</p>}
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
           <h3>Class</h3>
           </div>
            <div className='todayLessonContainer'>
               {todayClass.map(lesson=>{
                return(
                    <div key={lesson.id} className='TodayClassContainer'>
                    <h4>{lesson.lesson.title}</h4>
                    <p>time:{lesson.time}</p>
                    <p>
                    <a 
                        href="#" 
                        onClick={(e) => {
                        e.preventDefault();  // Prevents the default anchor link behavior
                        handleNotes(lesson.lesson.title, lesson.lesson.pdf_notes);
                        }}
                    >
                        details
                    </a>
                    </p>
                    <button onClick={()=>handleToJoinClass(lesson,lesson.student.id,lesson.lesson.lessonId,lesson.date_time)}>join</button>
                  </div>
                )
               })}
            </div>
        </div>
    </div>
  )
}
