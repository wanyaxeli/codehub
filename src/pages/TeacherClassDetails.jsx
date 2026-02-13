import React,{useState,useEffect,useContext} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { context } from '../App'
import pic from '../assets/codehubImage.jpeg'
import axios from 'axios'
import Portal from '../Components/Portal'
export default function TeacherClassDetails() {
    const location =useLocation()
    const navigate=useNavigate()
    const [todayClass,setTodayClass]=useState([])
    const [studentDetails,setStudent]=useState([])
    const [studentName,setStudentName]=useState('')
    const [studentPic,setStudentPic]=useState('')
    const [token,setToken]=useState()
    const [studentId,setStudentId]=useState()
    const {teacher,proPic,seeEarning,setEarning}=useContext(context)
    useEffect(()=>{
    const {state}=location
   if(state){
    state.forEach(item=>{
        
        const id= item.student.user.id
        setStudentId(id)
        const now = new Date(item.date_time)
        const time = now.toLocaleTimeString();
        const newData={...item,...{time:time}}
        setTodayClass([newData])
        const name=`${item.student.user.first_name} ${item.student.user.last_name}`
        setStudent([item.student.user])
        setStudentName(name)
    })
   }
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
    const handleToJoinClass=(les,student,Lessonid,time)=>{
        todayClass.forEach(item=>{
            if(item.is_completed===false){
                if(les.group_class){
                    console.log(les)
                    const title=les.lesson.title 
                    const id=`${les.group_class.group_name}-${Lessonid}`
                    const url=les.lesson.pdf_notes 
                    const notes={title:title,url:url}
                    const studentUserId=les.student.user.id
                    navigate(`/class/${id}`, { state: { id,typeOfClass:'group',classType:'NormalClass',studentName, time,student,studentUserId,notes,studentDetails,studentPic} }); 
                }else{
                    const studentUserId=les.student.user.id
                    const title=les.lesson.title 
                    const url=les.lesson.pdf_notes  
                    const id=Lessonid
                    const navID=`${les.student.id}${id}`
                    const notes={title:title,url:url}
                    console.log(studentUserId) 
                    navigate(`/class/${navID}`, { state: { id,typeOfClass:'oneOnone',classType:'NormalClass',studentName, time,student,studentUserId,notes,studentDetails,studentPic} }); 
                }
            }else{
                alert('this class is completed')
            }
        })
    }
    const handleNotes = ( title,les, notes) => {
        // e.preventDefault(); // Prevents default link or form behavior
        const id = title
        navigate(`/teacher/dashboard/Notes/`, { state: les });
    };

   function getStudentProfilePic(){
    if( studentDetails.length > 0){
        studentDetails.map(item=>{
            const studentId=item.id
            const url =`https://api.codingscholar.com/getprofilePic/${studentId}`;
            axios.get(url)
            .then(res=>{
                const data=res.data
                if(data.error){
                    setStudentPic('')
                }else{
                    setStudentPic(data.image)
                }
            })
            .catch(error=>{console.log(error)})
                })
            }
   }
   useEffect(()=>{
    getStudentProfilePic()
   },[studentDetails])
  return (
    <div className='DetailsWrapper'>
         <div className='TeacherDetailsWrapper'>
            <div className='TeacherImageWrapper'>
                <div className='TeacherImageContainer'>
                    {/* <img src={pic}/> */}
                    {proPic?<img loading="lazy" src={`https://res.cloudinary.com/dbxsncq5r/${proPic}`}/>:<img src={pic}/>}
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
                    {teacher && <p>ksh {seeEarning===true?teacher.salary:""} <span style={{color:'#0097b2',cursor:'pointer'}} onClick={handleToSeeEarning}>{seeEarning===false?<i className="fa fa-eye" aria-hidden="true"></i>:<i className="fa fa-eye-slash" aria-hidden="true"></i>}</span> </p>}
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
                        <p>time:{lesson.time?.replace(/:\d{2}(?= )/, '')}</p>
                        <p>
                        <a  style={{color:'#000'}}
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
                        <div className='showMoreWrapper'>
                            <span><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                        </div>
                        {/* <Portal>
                        <div className='RescheduleWrapper'>
                            <p>reschedule</p>
                        </div>
                        </Portal> */}
                  </div>
                )
               })}
            </div>
            {studentDetails && studentDetails.map(item=>{
                return(
                    <div className='stdntDetails'>
                    <div className='stdntImageWrapper'>
                        <div className='stdntImage'>
                            {studentPic!==''?<img src={`https://res.cloudinary.com/dbxsncq5r/${studentPic}`}/>:<img src={pic}/>}
                         </div>
                        <div className='stdntname'>
                            <span>{item.first_name}</span>
                            <span>{item.last_name}</span>
                         </div>
                    </div>
                    <div className='studentInformationWrapper'>
                        <span>information</span>
                        <div className='stdentContactWrapper'>
                            <div className='emailWrapper'>
                                <h4>Email</h4>
                                <p>{item.email}</p>
                            </div>
                            <div className='phoneWrapper'>
                                <h4>phone </h4>
                                <p>{item.phone_number}</p>
                            </div>
                        </div>
                        <span></span>
                    </div>
                </div>
                )
            })}
        </div>
    </div>
  )
}
