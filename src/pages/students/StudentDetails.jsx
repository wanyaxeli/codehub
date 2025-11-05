import React,{useState,useEffect,useContext} from 'react'
import pic from '../../assets/codehubImage.jpeg'
import { useNavigate } from 'react-router-dom'
import { context } from '../../App';
import { jwtDecode } from "jwt-decode";
import jsPDF from "jspdf";
import axios from 'axios';
import certpic from '../../assets/cert.png'
import badge from '../../assets/barge1.png'
import badge2 from '../../assets/barge2.png'
import badge3 from '../../assets/barge3.png'
import badge4 from '../../assets/barge4.png'
import badge5 from '../../assets/barge5.png'
import badge6 from '../../assets/barge6.png'
import badge7 from '../../assets/barge7.png'
import badge8 from '../../assets/barge8.png'
import badge9 from '../../assets/barge9.png'
import badge10 from '../../assets/barge10.png'
import badge11 from '../../assets/barge11.png'
import badge12 from '../../assets/barge12.png'
import badge13 from '../../assets/barge13.png'
import badge14 from '../../assets/barge14.png'
import badge15 from '../../assets/barge15.png'
import badge16 from '../../assets/barge16.png'
import badge17 from '../../assets/badge17.png'
import badge18 from '../../assets/badge18.png'
import badge19 from '../../assets/badge19.png'
import badge20 from '../../assets/badge20.png'
import badge21 from '../../assets/bagde21.png'


export default function StudentDetails() {
    const data=[{id:1,img:badge,name:'hello world hero'},{id:2,img:badge2,name:'tech titan'},{id:3,img:badge3,name:'keyboard worrier'},{id:4,img:badge4,name:'code rockstar'},{id:5,img:badge5,name:'coding wizard '},{id:6,img:badge6,name:'brainy builder'},{id:7,img:badge7,name:'code rockstar'},{id:8,img:badge8,name:'next gen ninja'},{id:9,img:badge9,name:'level up coder'},{id:10,img:badge10,name:'future developer'},
    {id:11,img:badge11,name:'coding explorer'},{id:12,img:badge12,name:'logic legend'},{id:13,img:badge13,name:'algorithm ace'},{id:14,img:badge14,name:'syntax superstar'},{id:15,img:badge15,name:'bug buster hero'},{id:16,img:badge16,name:'code champion'},
    {id:1,img:badge17,name:'math guru'},{id:2,img:badge18,name:'number ninja'},{id:4,img:badge19,name:'problem solver'},{id:5,img:badge20,name:'math genius 2'},{id:6,img:badge21,name:'math genius'}]
    const navigate = useNavigate()
    const [token,setToken]=useState('')
    const [lessons,setLesson]=useState([])
    const [cert,setCert]=useState([])
    const [previewUrl, setPreviewUrl] = useState([]);
    const [todayClass,setTodayClass]=useState([])
    const [studentBadge,setStudentbadge]=useState([])
    const [studentId,setStudentId]=useState('')
    const {student,proPic,getProfilePic}=useContext(context)
    const [profilePic,setProfilePic]=useState('')
    const handleToJoinClass =(les,id,time,title)=>{
        const lessonTime = new Date(les.date_time);       // Converts ISO string to Date object
        const studentUserId=les.student.user.id
        const now = new Date();  
        // if (lessonTime > now) {
        const navID=`${les.student.id}${id}`
        navigate(`/class/${navID}`,{state:{id,classType:'NormalClass',time,title,studentUserId } });
        // } else{
        //     alert('The time ')
        // }
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
 function getCertificate(){
    if(token){
        const url = `https://api.codingscholar.com/getCert/`;
        axios.get(url,{headers:{
            'Authorization':`Bearer ${token}`
        }})
        .then(res=>{
            const data = res.data
            console.log('cert',res.data)
            setCert(data)
        })
        .catch(error=>{console.log(error)})
    }
 }
 function getStudentBadge(){
   if(student){
    const id = student.id
    const url = `https://api.codingscholar.com/getbadge/${id}`;
    axios.get(url)
    .then(res=>{
        const data=res.data
        StudentBadge(data)
    })
    .catch(error=>console.log(error))
   }
 }
  const generatePDF = () => {
   if(cert.length >0 && student){
    cert.forEach(item=>{
        const name =`${student.user.first_name} ${student.user.last_name}`
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [768, 1087], // match your image resolution
        });
    
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
    
        // background
        doc.addImage(certpic, "JPG", 0, 0, pageWidth, pageHeight);
    
        const centerX = pageWidth / 2;
        const Datecenter = pageWidth / 1.8;
        const Certcenter = pageWidth / 1.75;
        // Title
        // doc.setFont("helvetica", "bold");
        // doc.setFontSize(32);
        // doc.text("CERTIFICATE OF COMPLETION", centerX, pageHeight * 0.30, { align: "center" });
    
        // Recipient name
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 151, 178); // teal-blue like your template
        doc.setFontSize(54);
        doc.text(name, centerX, pageHeight * 0.50, { align: "center" });
    
        // Course line
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 151, 178);
        doc.setFontSize(40);
        doc.text(
          `${item.certificate}`,
          centerX,
          pageHeight * 0.35,
          { align: "center" }
        );
    
        // Date
        doc.setFontSize(18);
        doc.text(item.time_achieved, Datecenter, pageHeight * 0.66, { align: "center" });
        //certificate id
    
        doc.setFontSize(18);
        doc.text(item.certificate_id, Certcenter, pageHeight * 0.91, { align: "center" });
        const blob = doc.output("blob");
        const url = URL.createObjectURL(blob);
        setPreviewUrl(pre=>([...pre,url]));
    })
   }
  };

 function StudentBadge(b){
    b.forEach(barge=>{
        const filterData=data.filter(item=>item.name === barge.badge_name)
        setStudentbadge(pre=>[...pre,filterData])
    })
 }
 const handlechange =(e)=>{
    setProfilePic(e.target.files[0])
}
const handleQuiz=()=>{
    navigate('/student/dashboard/Today Questions')
}
useEffect(()=>{
    getStudentBadge()
},[student])
useEffect(()=>{
 if(student){
    if(student.tokens===0||student.fees ===false){
        navigate('/Fee Payment')
    }
 }
},[student])
useEffect(()=>{
    getCertificate()
},[token])
useEffect(()=>{
    generatePDF()
},[cert,student])
 useEffect(()=>{
   if (lessons){
    const now = new Date();

    // Format today's date in user's local timezone
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const todayFormatted = formatter.format(now); // e.g., "8/6/2025"

    // Filter lessons matching today in user's timezone
    const todayLessons = lessons.filter((lesson) => {
      const lessonDate = new Date(lesson.date_time);
      const formattedLessonDate = formatter.format(lessonDate);
      return formattedLessonDate === todayFormatted;
    });

    setTodayClass(todayLessons.length > 0 ? todayLessons : []);

   }
 },[lessons])
 const flatData=studentBadge.flat()
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
        <div className='questionsofthedayWrapper'>
             <div>
             <p>Have you attempted today's questions?</p>
             </div>
             <div>
                <button onClick={handleQuiz}>go to questions <i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>
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
                    <p>Time: {lesson.time?.replace(/:\d{2}(?= )/, '')}</p>
                    {lesson.is_completed===false?<button onClick={()=>handleToJoinClass(lesson,lesson.lesson.lessonId,lesson.date_time,lesson.lesson.title)}>join</button>:
                    <button>Completed</button>}
                  </div>
                )
               }):<div className='NoClassDiv'>
                <p>You do not have a class today</p>
                </div>}
            </div>
            {studentBadge.length >0 ?
            <>
            <div className='todayLessonHeaderwrapper studentBadgesWrapper'>
            <h3>badges</h3>
            </div>
            <div className='StedentbadgeHolder'>
                {flatData.map(item=>{
                    return(
                    <div className='Stedentbadge'>
                    <img src={item.img}/>
                    </div>
                    )
                })}
            </div>
            </>
            :''}
            {previewUrl.length >0 ?
            <>
            <div className='todayLessonHeaderwrapper studentBadgesWrapper'>
            <h3>certificates</h3>
            </div>
            <div className='StedentbadgeHolder'>
                {previewUrl.map((item,i)=>{
                    return(
                    <div key={i} className='Certificates'>
                    <iframe
                            src={item}
                            title="Certificate Preview"
                            width="100%"
                            height="100%"
                            // style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                        />
                    </div>
                    )
                })}
            </div>
            </>
            :''}
        </div>
    </div>
  )
}
