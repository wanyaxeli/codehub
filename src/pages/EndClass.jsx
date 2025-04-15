import React,{useState,useEffect} from 'react'
import { useNavigate,useLocation,useNavigation } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
export default function EndClass() {
  const location = useLocation()
  const navigate = useNavigate()
  const [classId,setClassId]=useState()
  const [value,setValue]=useState()
  const [token,setToken]=useState('')
  const [role,setRole]=useState('')
  const [classEnded,setClassEnded]=useState('')
  const [lesson,setLesson]=useState([])
  function getClass(){
   if(classId){
    const id= classId
    const url = `http://127.0.0.1:8000/currentClass/${id}`
    axios.get(url)
    .then(res=>{
      console.log(res.data)
      setLesson([res.data])
    })
    .catch(error=>console.log(error))
   }
  }
  const handleValue=(e)=>{
   setValue(e.target.value)
  }
  console.log('value',value)
  const handleClassEndedFully=()=>{
   lesson.map(item=>{
    if(item.is_completed===false && item.reason===''){
    const id= classId
    const url = `http://127.0.0.1:8000/ClassAttendedFully/${id}`
    axios.put(url)
    .then(res=>{
      console.log(res.data)
      const data = res.data.message
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
      if(role==='student'){
        navigate('/student/dashboard/Details')
      }else{
        navigate('/teacher/dashboard/Details')
      }
    }
   })
  }
  const handleSubmit=()=>{
    lesson.map(item=>{
    if(item.is_completed===false && value){
      const id= classId
      const url = `http://127.0.0.1:8000/NotAttendedClass/${id}`
      axios.put(url,{data:value})
      .then(res=>{
        console.log(res.data)
        const data = res.data.message
        if(data==='Class marked as complete'){
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
},[])
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
    if (state) {
        setClassId(state);  // Set the state if it exists
    }
    // startLocalStream()
},[location])
useEffect(()=>{
  getClass()
},[classId])
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
          {role!=='student'?<li><input type="radio"  onChange={handleValue} value="student didn't attend class"  name="reason" /> The student didn't attend class</li>: <li><input type="radio"  onChange={handleValue} value="teacher didn't attend class"  name="reason" /> The teacher didn't attend class</li>}
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
