import React,{useState,useEffect,useContext} from 'react'
import { context } from '../App';
import { useNavigate,useLocation,useNavigation } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
export default function EndClass() {
  const location = useLocation()
  const navigate = useNavigate()
  const [classId,setClassId]=useState()
  const [bookingId,setBookingId]=useState('')
  const [studentId,setStudentId]=useState('')
  const [booking,setBooking]=useState([])
  const [value,setValue]=useState()
  const [token,setToken]=useState('')
  const [role,setRole]=useState('')
  const [classEnded,setClassEnded]=useState('')
  const [lesson,setLesson]=useState([])
  const {setClassEndedfully}=useContext(context)
  function getClass(){
   if(classId){
    const id= classId
    const url = `http://api.codingscholar.com/currentClass/${id}`
    axios.get(url)
    .then(res=>{
      console.log(res.data)
      setLesson([res.data])
    })
    .catch(error=>console.log(error))
   }else{
      if(bookingId){
      const code= bookingId
      const url=`http://api.codingscholar.com//trialClass/${code}`
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
  const handleClassEndedFully=()=>{
   if(classId){
    lesson.map(item=>{
      if(item.is_completed===false && item.reason===''){
      const id= classId
      const data={studentId:studentId}
      const url = `http://api.codingscholar.com/ClassAttendedFully/${id}`
      axios.put(url,data)
      .then(res=>{
        console.log(res.data)
        const data = res.data.message
        setClassEndedfully(true)
        if(data==='Class marked as complete'){
          if(role==='student'){
            navigate('/student/dashboard/Details')
          }else{
            navigate('/teacher/dashboard/Details')
          }
        }
      })
      .catch(error=>console.log(error))
      }else{
        setClassEndedfully(true)
        if(role==='student'){
          navigate('/student/dashboard/Details')
        }else{
          navigate('/teacher/dashboard/Details')
        }
      }
     })
   }else if(bookingId){
    booking.map(item=>{
      if(item.joined===false && item.reason===''){
        const id= bookingId
        const url = `http://api.codingscholar.com/TrailClassAttendedFully/${id}`
        axios.put(url)
        .then(res=>{
          console.log(res.data)
          const data = res.data.message
          if(data==='Trial Class marked as complete'){
            if(role==='student'){
              navigate('/student/dashboard/Details')
            }else{
              navigate('/teacher/dashboard/Details')
            }
          }
        })
        .catch(error=>console.log(error))
      }
    })
   }else{
        console.log('error')
   }
  }
  const handleSubmit=()=>{
    if(classId){
      lesson.map(item=>{
        if(item.is_completed===false && value && item.reason===''){
          const id= classId
          const url = `http://api.codingscholar.com/NotAttendedClass/${id}`
          axios.put(url,{data:value})
          .then(res=>{
            console.log(res.data)
            const data = res.data.message
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
          if(role==='student'){
            navigate('/student/dashboard/Details')
          }else{
            navigate('/teacher/dashboard/Details')
          }
        }
      })
    }else{
      booking.map(item=>{
        if(item.joined===false && item.reason===''){
          const id= bookingId
          const url = `http://api.codingscholar.com/NotAttendedTrailClass/${id}`
          axios.put(url,{data:value})
          .then(res=>{
            console.log(res.data)
            const data = res.data.message
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
        setRole(role)
      } catch (error) {
        console.error("JWT Decode Error:", error);
      }
    }
  }, [token]);
  useEffect(()=>{
    const { state } = location || {}; // Ensure location is not undefined
    // const { id } = state || {};\
    console.log('state ',state)
    const {code,StudentId,classTypes}=state
    if (classTypes==='trial'){
     setBookingId(code)
    
    }else{
      setClassId(code)
      setStudentId(StudentId)
    }
    // if (state) {
    //     setClassId(state);  // Set the state if it exists
    // }
    // startLocalStream()
},[location])
useEffect(()=>{
  getClass()
},[classId,bookingId])
  return (
    <div className='EndClassWrapper'>
      <div className='EndClassContainer'>
         <p>Did the class  end?</p>
         {classEnded===true||classEnded===''? <div>
          <button onClick={handleClassEndedFully}>yes</button>
          <button onClick={handleChangeClassStatus}>no</button>
         </div>:''}
         <div className={classEnded===true||classEnded==='' ?"reasonsWrapper":'reasonsContainer'}>
         <ul>
          <li><input type="radio"  onChange={handleValue} value="student didn't attend class"  name="reason" /> The student didn't attend class</li> 
          <li><input type="radio"  onChange={handleValue} value="teacher didn't attend class"  name="reason" /> The teacher didn't attend class</li>
          <li><input type="radio"  onChange={handleValue} value="network issues"  name="reason" /> Network issues</li>
        </ul>
         <div className='endClassSumbitBtn'>
         <button onClick={handleSubmit}>submit</button>
         <button onClick={handleCancelEndClass}>cancel</button>
         </div>
         </div>
      </div>
    </div>
  )
}
