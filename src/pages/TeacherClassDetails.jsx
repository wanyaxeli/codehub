import React,{useState,useEffect,useContext} from 'react'
import { data, useLocation,useNavigate } from 'react-router-dom'
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
    const [groupName,setGroupName]=useState('')
    const [openPortal,setopenPortal]=useState(false)
    const [RescheduleBtn,setRescheduleBtn]=useState(false)
    const [token,setToken]=useState()
    const [dates,setDates]=useState()
    const [studentId,setStudentId]=useState()
    const {teacher,proPic,seeEarning,setEarning}=useContext(context)
    // const [aboutlesson,]
    useEffect(()=>{
    const {state}=location
   if(state){
    console.log('lesson...',state)
    const [item]=state
    // state.forEach(item=>{
        
        // const id= item.student.user.id
        // setStudentId(id)
        const now = new Date(item.date_time)
        const time = now.toLocaleTimeString();
        const newData={...item,...{time:time}}
        setTodayClass([newData])
        // if(item.classType==='oneOnone'){}
        let name
        if (item.classType==='oneOnone'){
            name=`${item.student.user.first_name} ${item.student.user.last_name}`
            setStudentName(name)
            setStudent([item.student.user])
        }else{
            setGroupName(item.group_class.group_name)
           const g_students=item.group_students.map(gstudents=>gstudents.user)
           const updatestudents=async(g_students)=>{
               const allstudes=await getStudentProfilePic(g_students)
               console.log('all studes',allstudes)
               setStudent(allstudes)
           }

           updatestudents(g_students)
        }
        
    // })
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
                    const lessontype=les.lessonType
                    const lesid=les.id
                    // const studentUserId=les.student.user.id
                    const groupId=les.group_class.id
                    // navigate(`/class/${id}`, { state: { id,typeOfClass:'group',classType:'NormalClass',studentName, time,student,studentUserId,notes,studentDetails,studentPic} }); 
                    navigate(`/class/${id}`, { state: { id,typeOfClass:'group',classType:'NormalClass',groupName, time,student,groupId,notes,studentDetails,lessontype,lesid} }); 
                }else{
                    const studentUserId=les.student.user.id
                    const title=les.lesson.title 
                    const url=les.lesson.pdf_notes  
                    const id=Lessonid
                    const navID=`${les.student.id}${id}`
                    const notes={title:title,url:url}
                    const lessontype=les.lessonType
                    const lesid=les.id
                    // console.log(studentUserId) 
                    navigate(`/class/${navID}`, { state: { id,typeOfClass:'oneOnone',classType:'NormalClass',studentName, time,student,studentUserId,notes,studentDetails,studentPic,lessontype,lesid} }); 
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

   async function getStudentProfilePic(studentDetails){
    console.log('students details',studentDetails)
    if( studentDetails.length === 0) return
        const updatedstudents=await Promise.all(
            studentDetails.map(async(item)=>{
                const studentId=item.id
                const url =`https://api.codingscholar.com/getprofilePic/${studentId}`;
                try{
                const res=await  axios.get(url)
                const data=res.data
                return{
                        ...item,
                        studentpic:data.error?"":data.image
                }
               
                 }catch(error){
                    console.error(error)
                    return {
                        ...item,
                        studentpic:''
                    }
                }
                    })
        )
        console.log('updated',updatedstudents)
         return updatedstudents
                  
   }

   console.log('Todays class',todayClass)
   useEffect(()=>{
    getStudentProfilePic()
   },[studentDetails])
   const handleCloseBtn =()=>{
    setRescheduleBtn(false)
   }
  
   const handleOpenSchedule =()=>{
    setRescheduleBtn(true)
   }
   const [todayclassobj]=todayClass
  const  RescheduleClass =(lesson)=>{
   console.log(lesson)
   console.log(dates)
   const id=lesson.id
   const studentId=lesson.student.id
   const url=`https://api.codingscholar.com/reschedulingClassToAnotherDay/${id}`
   const data={
    student_id:studentId,
    date:dates
   }
   console.log('data',data)
   axios.put(url,data,{
    'headers':{
        'Authorization':`Bearer ${token}`
    }
   })
   .then(res=>{
    console.log(res.data)
    const data=res.data
    if(data.message==='Lesson rescheduled successfully'){
        setDates('')
        setRescheduleBtn(false)
        navigate('/teacher/dashboard/Calendar')
    }
   })
   .catch(error=>console.log(error))
  }
  const handleDateInputs =(e)=>{
   setDates(e.target.value)
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
  useEffect(()=>{
   getToken()
  },[])
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
           <div className='todayLessonHeaderwrapper flex gap-4'>
            {groupName && <h3>{groupName}</h3>}
           <h3>{todayclassobj?.classType==='oneOnone'? 'One To One Class':' Group Class'}</h3>
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
                         {todayclassobj?.classType==='oneOnone'?
                          <div onClick={handleOpenSchedule} className='showMoreWrapper'>
                          <span ><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                      </div>
                         :""}
                       {RescheduleBtn===true? <Portal>
                        <div className='RescheduleWrapper'>`
                            <div className='InnerRescheduleWrapper'>
                                <div className='InnerRescheduleBtnWrapper'>
                                    <div className='InnerRescheduleBtnHolder' onClick={handleCloseBtn}>
                                        &times;
                                    </div>
                                </div>
                            <div>
                            <h2>reschedule class</h2>
                            </div>
                            <div className='rescheduleInputWrapper'>
                                <input value={dates} type='datetime-local' onChange={handleDateInputs}/>
                            </div>
                            <div className='rescheduleBtnWrapper'>
                                <button onClick={()=>RescheduleClass(lesson)}>reschedule</button>
                            </div>
                            </div>
                        </div>
                        </Portal>:''}
                  </div>
                )
               })}
            </div>

            {
                groupName && (
                    <div className='groupstdnt-container'>
                        <h1 className='text-black flex items-center justify-center font-bold'>Students </h1>

                        <table className='w-[95%] st-table' >
                            <thead>
                                <tr className='border-b border-slate-700 bg-white rounded-sm'>
                                <th className='table-header text-left font-semibold text-[#1a1a2e] '>
                                    Profile Pic
                                </th>
                                <th className='table-header text-left font-semibold text-[#1a1a2e] '>
                                     Name
                                </th>
                                <th className='table-header text-left font-semibold text-[#1a1a2e] '>
                                     Email
                                </th>
                                <th className='table-header text-left font-semibold text-[#1a1a2e] '>
                                     Phone Number
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    studentDetails.map((student)=>(
                                        <tr key={student.id}
                                        className='border-b border-slate-700 bg-slate-200'>
                                            <td className="table-header">
                                                 <div className='flex justify-center items-center'>
                                                     <img
                                                        src={student.studentpic !== '' ? `https://res.cloudinary.com/dbxsncq5r/${student.studentpic}` : pic}
                                                        alt="student"
                                                        style={{
                                                            width: '50px',       // fixed width
                                                            height: '50px',      // fixed height
                                                            objectFit: 'cover',  // crop and fit nicely
                                                            borderRadius: '50%'  // optional: make it circular
                                                        }}
                                                    />
                                                </div></td>
                                            <td className='table-header text-[#1a1a2e]'>{student.first_name} {student.last_name}</td>
                                            <td className='table-header text-[#1a1a2e]'>{student.email}</td>
                                            <td className='table-header text-[#1a1a2e]'>{student.phone_number}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
            {studentName && studentDetails.map(item=>{
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
