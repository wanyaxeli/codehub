import React,{useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import pic from '../assets/student.jpg'
export default function TeacherClassDetails() {
    const location =useLocation()
    const navigate=useNavigate()
    const [todayClass,setTodayClass]=useState([])
    useEffect(()=>{
    const {state}=location
    console.log(state)
   if(state){
    state.forEach(item=>{
        const now = new Date(item.date_time)
        const time = now.toLocaleTimeString();
        const newData={...item,...{time:time}}
        setTodayClass([newData])
    })
   }
    },[])
    const handleToJoinClass=(id)=>{
        navigate(`/class/${id}`,{state:id})
    }
    const handleNotes = ( title, notes) => {
        // e.preventDefault(); // Prevents default link or form behavior
        console.log('notes', notes);
        navigate(`/teacher/dashboard/Notes/${title}`, { state: notes });
    };
    console.log('time',todayClass)
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
                {/* {student&& <p>{student.user.first_name} {student.user.last_name} <span><i className="fa fa-pencil" aria-hidden="true"></i></span></p>} */}
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
                    <button onClick={()=>handleToJoinClass(lesson.lesson.lessonId)}>join</button>
                  </div>
                )
               })}
            </div>
        </div>
    </div>
  )
}
