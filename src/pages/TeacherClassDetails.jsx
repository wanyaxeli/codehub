import React,{useState,useEffect,useContext,useRef} from 'react'
import { data, useLocation,useNavigate } from 'react-router-dom'
import { context } from '../App'
import pic from '../assets/codehubImage.jpeg'
import axios from 'axios'
import Portal from '../Components/Portal'
import {Upload, X,Calendar} from 'lucide-react'
export default function TeacherClassDetails() {
    const location =useLocation()
    const fileInputRef = useRef(null);
    const navigate=useNavigate()
    const [todayClass,setTodayClass]=useState([])
    const [studentDetails,setStudent]=useState([])
    const [GroupstudentDetails,setGroupStudent]=useState([])
    const [isopen,setIsOpen]=useState(false)
    const [isLoading,setIsLoading]=useState(false)
    const [studentName,setStudentName]=useState('')
    const [video,setVideo]=useState('')
    const [studentUserId,setStudentUserId]=useState('')
    const [lessonId,setLessonId]=useState('')
    const [studentPic,setStudentPic]=useState('')
    const [groupName,setGroupName]=useState('')
    
    const [openPortal,setopenPortal]=useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [RescheduleBtn,setRescheduleBtn]=useState(false)
    const [token,setToken]=useState()
    const [dates,setDates]=useState()
    const [studentId,setStudentId]=useState()
    const {teacher,proPic,seeEarning,setEarning}=useContext(context)
    // const [aboutlesson,]
    useEffect(()=>{
    const {state}=location
   if(state){
   
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
        }else if(item.classType==='group'){
    
            setGroupName(item.group_class.group_name)
           const g_students=item.group_students.map(gstudents=>gstudents.user)
           setStudent(g_students)
          //  const updatestudents=async(g_students)=>{
          //      const allstudes=await getStudentProfilePic(g_students)
          //      console.log('all studes',allstudes)
          //      console.log('hello studne',g_students)
              
          //  }

          //  updatestudents(g_students)
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

   async function getStudentProfilePic(){
    
    if(studentDetails.length <1) return
   
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
       
        //  return updatedstudents
        setGroupStudent( updatedstudents)
                  
   }
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
   const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  function GetClassVideo(){
   if(lessonId && studentUserId){
    const id=lessonId
    const studentId = studentUserId
    const url =`https://api.codingscholar.com/get_student_video/${id}/${studentId}`;
    axios.get(url)
    .then(res=>{
      const data=res.data
      console.log('dsd',res.data)
      setVideo(data.video_url)
    })
    .catch(error=>console.log(error))
   }
  }
   const uploadFileToS3 = async (file, token) => {
    const chunkSize = 5 * 1024 * 1024; // 5MB
    const totalChunks = Math.ceil(file.size / chunkSize);
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    // 1. Start upload
    const startRes = await axios.post(
      "https://api.codingscholar.com/start-upload/",
      { filename:cleanName},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  
    const { uploadId, key } = startRes.data;
  
    let parts = [];
  
    // 2. Upload chunks
    for (let i = 0; i < totalChunks; i++) {
      const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
  
      const urlRes = await axios.post(
        "https://api.codingscholar.com/get-chunk-url/",
        {
          uploadId,
          key,
          partNumber: i + 1,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      const { url } = urlRes.data;
  
      const uploadRes = await fetch(url, {
        method: "PUT",
        body: chunk,
      });
  
      const etag = uploadRes.headers.get("ETag");
  
      parts.push({
        ETag: etag,
        PartNumber: i + 1,
      });
    }
  
    // 3. Complete upload
    const completeRes = await axios.post(
      "https://api.codingscholar.com/complete-upload/",
      {
        uploadId,
        key,
        parts,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  
    return completeRes.data.url;
  };
   const handleUpload = async() => {
    if (selectedFile && lessonId && studentUserId && token) {
      
      setIsLoading(true)
      try{
        
        const id = lessonId
      
        const group_vediosAPI=`https://api.codingscholar.com/upload_videos/`
        // 1. upload to S3
        const fileUrl = await uploadFileToS3(selectedFile, token);
       
            const data={
              lessonId:lessonId,
              studentId:studentUserId,
              video_url: fileUrl,
            }
            // const formdata=new FormData()
            // formdata.append('vid',selectedFile)
            // formdata.append('lessonId',lessonId)
            // formdata.append('studentId',student.id)
            // for (let [key, value] of formdata.entries()) {
            //   console.log(key, value);
            // }
            axios.post(group_vediosAPI,data,
          {
            headers:{

              "Authorization":`Bearer ${token}`
            }
  
          }
          )
          .then(res=>{
            console.log('laooo',res)
                if(res.data=='Video uploaded successfully'){
                  setIsLoading(false)
                  setIsOpen(false)
                 console.log( ' file sent to student successfully', groupstdntdetails[index].name)
                }else{
                  console.error('failed to  send file to student ',groupstdntdetails[index],success_res.reason)
                }
                if(res.status!==200){
                  alert('An Error Occured while uploading')
                }
        
          })

        console.log('sendingfile response...')

        // alert(`File uploaded: ${selectedFile.name}`);
        // setSelectedFile(null);
        // setIsOpen(false);
        // setClassCompleted(true)

      }catch(e){
        console.error('errror in uploading file to student::',e)
      }
      

    }
  };
  const  RescheduleClass =(lesson)=>{
  
   const id=lesson.id
   const studentId=lesson.student.id
   const url=`https://api.codingscholar.com/reschedulingClassToAnotherDay/${id}`
   const data={
    student_id:studentId,
    date:dates
   }

   axios.put(url,data,{
    'headers':{
        'Authorization':`Bearer ${token}`
    }
   })
   .then(res=>{
   
    const data=res.data
    if(data.message==='Lesson rescheduled successfully'){
        setDates('')
        setRescheduleBtn(false)
        navigate('/teacher/dashboard/Calendar')
    }
   })
   .catch(error=>console.log(error))
  }
  const handleOpenUploadPortal =()=>{
    setIsOpen(true)
  }
  const handleCancel =()=>{
    setIsOpen(false)
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
  GetClassVideo()
 },[lessonId,studentUserId])
  useEffect(()=>{
  if(todayClass && todayClass.length >0){
    todayClass.forEach(item=>{
       
        if(item.classType!=='group'){
          setLessonId(item.lesson.lessonId )
          setStudentUserId(item.student.user.id)
        }
       })
  }
  },[todayClass])
  
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
                            Notes Details
                        </a>
                        </p>
                        {todayclassobj?.classType==='oneOnone'?
                        <p>
                        <a  style={{color:'#000'}}
                            href="#" 
                            onClick={(e) => {
                            e.preventDefault();  // Prevents the default anchor link behavior
                           
                        }}
                        >
                            Class Video 
                           
                        </a>
                       {video!==''?  <span >{video.length > 20 ? video.slice(0, 20) + '...' : video}</span>:  <span onClick={handleOpenUploadPortal}>Upload</span>}
                        </p>
                         :' '}
                        <button onClick={()=>handleToJoinClass(lesson,lesson.student.id,lesson.lesson.lessonId,lesson.date_time)}>join</button>
                         {todayclassobj?.classType==='oneOnone'?
                          <div onClick={handleOpenSchedule} className='showMoreWrapper'>
                          <span ><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
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
                            <h2>reschedule NclassName</h2>
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
                                    GroupstudentDetails.map((student)=>(
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
            {studentName && studentDetails.map((item,i)=>{
                return(
                    <div key={i} className='stdntDetails'>
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
        {isopen && <div className="paddingfour fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
          {/* Header */}
          <div className="paddingfour text-black/70 border-slate-200 flex flex-row items-center justify-between p-6 border-b">
            <h2 className="text-lg paddingone font-semibold">Upload Your Recording</h2>
            <button
              onClick={handleCancel}
              className="paddingone p-1  hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="all-groups p-6">
            <p className="privacy-infocollect-description text-blue-300 mb-6 text-center">
              Please upload your recording
            </p>

            {/* File Input Area */}
            <div
              className="groupstdnt-container border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 mxauto mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 font-medium mb-1">
                Click to select a file
              </p>
              <p className="text-sm text-gray-500">
                or drag and drop your file here
              </p>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="*/*"
            />

            {/* Selected File Display */}
            {selectedFile && (
              <div className="mt-4 mtopfour padding-three p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-blue-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-700">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="p-1 paddingone hover:bg-gray-200 rounded transition-colors"
                >
                  <X className="w-4 h-4 bg-red-300" />
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {isLoading===false?<div className="flex gap-3 p-6 all-groups border-t border-slate-100">
            <button
              // variant="outline"
              onClick={handleCancel}
              className="cancelUploadBtn flex-1 bg-slate-300 text-black paddingone rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!selectedFile}
              className="uploadBtn flex-1 bg-[#0097b2] paddingone rounded-lg "
            >
              Upload
            </button>
          </div>:<div className='loaderWrapper'>
          <i className="fa fa-spinner spinner" aria-hidden="true"></i>
           <p>Uploading ...</p>
          </div>}
        </div>
      </div>}
    </div>
  )
}
