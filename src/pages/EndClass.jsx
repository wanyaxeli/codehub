import React,{useState,useEffect,useContext,useRef} from 'react'
import { context } from '../App';
import { useNavigate,useLocation,useNavigation } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import {Upload, X,Calendar} from 'lucide-react'
export default function EndClass() {
  const location = useLocation()
  const navigate = useNavigate()
  const [classId,setClassId]=useState()
  const [bookingId,setBookingId]=useState('')
  const [studentId,setStudentId]=useState('')
  const [groupstdntdetails,setGroupstudentdetails]=useState([])
  const [teacherId,setTeacherId]=useState('')
  const [booking,setBooking]=useState([])
  const [value,setValue]=useState()
  const [token,setToken]=useState('')
  const [role,setRole]=useState('')
  const [classEnded,setClassEnded]=useState('')
  const [lesson,setLesson]=useState([])
  const [status,setStatus]=useState('Absent')
  const [classcompleted,setClassCompleted]=useState(false)
  const {setClassEndedfully}=useContext(context)
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isopen,setIsOpen]=useState(false)
  const [selectedDate,setSelectedDate]=useState()
  const [selectedTime,setSelectedTime]=useState()
  const [manualreschedule,setManualReschedule]=useState(false)
  const [footering,setFooter]=useState(true)
  function getClass(){
   if(classId && studentId){
    const code= classId
    const url = `https://api.codingscholar.com/currentClass/${(code)}/${studentId}`
    axios.get(url)
    .then(res=>{
      setLesson([res.data])
    })
    .catch(error=>console.log(error))
   }else{
      if(bookingId){
      const code= bookingId
      const url=`https://api.codingscholar.com/trialClass/${code}`
      axios.get(url)
      .then(res=>{
        setBooking([res.data])
      })
      .catch(error=>console.log(error))
      }
   }
  }
  const handleValue=(e)=>{
   setValue(e.target.value)
  }
  // Debounce utility
  function debounceLeading(func, delay) {
    let timeoutId;
    return (...args) => {
      if (!timeoutId) func(...args);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => timeoutId = null, delay);
    };
  }
  // const handlestudentattendance =()=>{
  //   setStatus(prev=>(prev==="Absent"?'Attended':'Absent'))
  // }
  function markClassComplete(){
    const code= classId
      const data={studentId:studentId}
      const url = `https://api.codingscholar.com/ClassAttendedFully/${encodeURIComponent(code)}`
      axios.put(url,data)
      .then(res=>{
        console.log('class res',res.data)
        const data = res.data.message
        setClassEndedfully(true)
        alert(data)
        navigate('/teacher/dashboard/Details')
      })
      .catch(error=>console.log(error))
  }
  const debouncedMarkClassComplete = debounceLeading(markClassComplete, 5000);
  const handleClassEndedFully=()=>{
    if (groupstdntdetails){
      setClassCompleted(true)
      setIsOpen(true)
    }
   if(classId && studentId && lesson.length >0){
    lesson.map(item=>{
      if(item.is_completed===false && item.reason.trim() === "" || item.reason.trim()==="''"||item.reason===""){
      // const code= classId
      // const data={studentId:studentId}
      // const url = `https://api.codingscholar.com/ClassAttendedFully/${encodeURIComponent(code)}`
      // axios.put(url,data)
      // .then(res=>{
      //   console.log('class res',res.data)
      //   const data = res.data.message
      //   setClassEndedfully(true)
      //   alert(data)
      //   navigate('/teacher/dashboard/Details')
      // })
      // .catch(error=>console.log(error))
      debouncedMarkClassComplete()
      }else{
        setClassEndedfully(true)
        alert('Class already marked as completed')
        navigate('/teacher/dashboard/Details')
      }
     })
   }else if(bookingId && teacherId && booking){
    booking.map(item=>{
      if(item.joined===false && item.reason===''){
        const code= bookingId
        const url = `https://api.codingscholar.com/TrailClassAttendedFully/${code}/${teacherId}}`
        axios.put(url)
        .then(res=>{
          console.log(res.data)
          const data = res.data.message
          alert(data)
          navigate('/student/dashboard/Details')
          navigate('/teacher/dashboard/Details')
        })
        .catch(error=>console.log(error))
      }
    })
   }else{
        console.log('error')
   }
  }
  const handleSubmit=()=>{
    if(classId && studentId){
      setIsOpen(true)
      lesson.map(item=>{
        if(item.is_completed===false && value && item.reason===''){
          const code= classId
          const url = `https://api.codingscholar.com/NotAttendedClass/${encodeURIComponent(code)}/${studentId}}`
          axios.put(url,{data:value})
          .then(res=>{
            console.log(res.data)
            const data = res.data.message
            alert(data)
            navigate('/teacher/dashboard/Details') 
          })
          .catch(error=>console.log(error))
        }else{
          setIsOpen(true)
          alert('This Class is already marked')
          navigate('/teacher/dashboard/Details')
        }
      })
    }else{
      booking.map(item=>{
        if(item.joined===false && item.reason===''){
          const code= bookingId
          const url = `https://api.codingscholar.com/NotAttendedTrailClass/${code}/${teacherId}`
          axios.put(url,{data:value})
          .then(res=>{
            console.log(res.data)
            const data = res.data.message
            alert(res.data.message)
            if(data==='Class marked '){
              if(role==='student'){
                navigate('/student/dashboard/Details')
              }else{
                navigate('/teacher/dashboard/Details')
              }
            }
          })
          .catch(error=>console.log(error))
        }else{
          alert("already marked")
          if(role==='student'){
            navigate('/student/dashboard/Details')
          }else{
            navigate('/teacher/dashboard/Details')
          }
        }
      })
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
const handleChangeClassStatus=()=>{
  setClassEnded(false)
}
const handleCancelEndClass =()=>{
  setClassEnded(true)
}
useEffect(()=>{
  getToken()
},[classId])
  useEffect(() => {
   
    if (token) {
      try {
        const decode = jwtDecode(token);
        const {role,user_id}=decode
        console.log("Decoded Token:", role);
        setTeacherId(user_id)
        setRole(role)
      } catch (error) {
        console.error("JWT Decode Error:", error);
      }
    }
  },[token]);
  useEffect(()=>{
    const { state } = location || {}; // Ensure location is not undefined
    // const { id } = state || {};\
    console.log('state ',state)
    const {code,StudentId,classTypes,groupstdntdetails}=state
    if (classTypes==='trial'){
     setBookingId(code)
    
    }else{
      setClassId(code)
      setStudentId(StudentId)
      setGroupstudentdetails(groupstdntdetails)
    }
    // if (state) {
    //     setClassId(state);  // Set the state if it exists
    // }
    // startLocalStream()
},[location])
useEffect(()=>{
  getClass()
},[classId,bookingId,studentId])

const handleCancel=()=>{
  setSelectedFile(null)
  setManualReschedule(false)
  setFooter(true)
  setSelectedDate()
  setSelectedTime()
  setIsOpen(false)
}
const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

 const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile.name);
      // Handle file upload here
      alert(`File uploaded: ${selectedFile.name}`);
      setSelectedFile(null);
      setIsOpen(false);
      setClassCompleted(true)
    }
  };

const handleRescheduleDateTime =()=>{
   if (selectedDate && selectedTime) {
      console.log(`[v0] Rescheduling to ${selectedDate} at ${selectedTime}`);
      alert(`Rescheduled to ${selectedDate} at ${selectedTime}`);
      setSelectedDate('');
      setSelectedTime('');
      setIsOpen(false);
    }
}

const handlemanualreschedule=()=>{
  setManualReschedule(true)
  setFooter(false)
}
const handleRescheduleNextClass = () => {
    console.log('[v0] Rescheduling to next class on timetable');
    alert('Rescheduled to next class on timetable');
    setIsOpen(false);
  };
  return (
    <div className='EndClassWrapper flex flex-col items-center justify-center '>
      {/* <div className='bg-blue-300'> */}

      {/* {classcompleted && groupstdntdetails && (
        <div className='endclsgroups w-1/2'>
           <h1 className='text-black flex items-center justify-center font-bold padding-four'> Students Attendance</h1>
            <table className='w-[95%] st-table-endclass' >
              <thead>
              <tr className='border-b border-slate-700 bg-white rounded-sm'>
                <th className='padding-three text-left font-semibold text-[#1a1a2e] '>
                     Name
                </th>
                <th className='padding-three text-left font-semibold text-[#1a1a2e] '>
                   Email
                </th>
                <th className='padding-three text-left font-semibold text-[#1a1a2e] '>
                   Mark Student
                </th>
              </tr>
              </thead>
              <tbody>
              {
                groupstdntdetails.map((student)=>(
                  <tr key={student.id}
                  className='border-b border-slate-700 bg-slate-200'>
                  <td className='padding-three text-[#1a1a2e]'>{student.first_name} {student.last_name}</td>
                  <td className='padding-three text-[#1a1a2e]'>{student.email}</td>
                  <td className='padding-three text-center'>
                    <button className="view-btn"
                      onClick={()=>handlestudentattendance()}>
                               <span className={`table-stcount inline-block rounded-full  text-sm font-medium ${
                                        status ==='Attended'?'bg-green-500/20 text-green-400':'bg-slate-600/20 text-slate-400'
                                    }`}>
                                       { status}
                                    </span>
                    </button>
                  </td>
                 </tr>
               ))
              }
              </tbody>
            </table>
           </div>
      )} */}

      {isopen && groupstdntdetails &&(
          <div className="paddingfour fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
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
            <div className="flex gap-3 p-6 all-groups border-t border-slate-100">
              <button
                // variant="outline"
                onClick={handleCancel}
                className="flex-1 bg-slate-300 text-black paddingone rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile}
                className="flex-1 bg-[#0097b2] paddingone rounded-lg "
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
      {/* </div> */}
      <div className='EndClassContainer  items-center justify-center '>
         <p>Did the class  end?</p>
         {classEnded===true||classEnded===''? <div>
          <button onClick={handleClassEndedFully}>yes</button>
          <button onClick={handleChangeClassStatus}>no</button>
         </div>:''}
         {<div className={classEnded===true||classEnded==='' ?"reasonsWrapper":'reasonsContainer'}>
          
         <ul>
          <li><input type="radio"  onChange={handleValue} value="student didn't attend class"  name="reason" /> {groupstdntdetails?'The group students did not attend':'The student did not attend class'}</li> 
          <li><input type="radio"  onChange={handleValue} value="teacher didn't attend class"  name="reason" /> The teacher didn't attend class</li>
          <li><input type="radio"  onChange={handleValue} value="network issues"  name="reason" /> Network issues</li>
        </ul>
         <div className='endClassSumbitBtn'>
         <button onClick={handleSubmit}>submit</button>
         <button onClick={handleCancelEndClass}>cancel</button>
         </div>
         </div> }

         {isopen && studentId &&(
          <div className="paddingfour fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            {/* Header */}
            <div className="padding-three text-black/70 border-slate-200 flex flex-row items-center justify-between p-6 border-b">
              <h2 className="text-lg paddingone font-semibold">Reschedule Class</h2>
              <button
                onClick={handleCancel}
                className="paddingone p-1  hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            { manualreschedule && <div className="all-groups">
              {/* Option 1: Date and Time */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                 Choose Date & Time
                </h3>

                <div className="space-y-3 spacing-y-three">
                  {/* Date Input */}
                  <div className="space-y-2 spacing-y-one">
                    <label htmlFor="date" className="text-sm font-medium text-gray-700">
                      Select Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full inputone px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Time Input */}
                  <div className="space-y-2">
                    <label htmlFor="time" className="text-sm font-medium text-gray-700">
                      Select Time
                    </label>
                    <input
                      id="time"
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full inputone px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Reschedule Button */}
                  <button
                    onClick={handleRescheduleDateTime}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full mt-2"
                  >
                    Reschedule
                  </button>
                </div>
              </div>

              
             
            </div>}

            {/* Footer */}
            {footering && <div className="flex gap-3 p-6 paddingfour border-t border-slate-100">
              <button 
                // variant="outline"
                onClick={handlemanualreschedule}
                className="flex-1 bg-slate-300 text-black paddingone rounded-lg"
              >
               Custom  Reschedule
              </button>
              <button
                onClick={handleRescheduleNextClass}
                disabled={!selectedFile}
                className="flex-1 bg-[#0097b2] paddingone rounded-lg "
              >
                Auto Reschedule
              </button>
            </div>}
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
