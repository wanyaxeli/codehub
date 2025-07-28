import React ,{useEffect,useState}from 'react'
import { useLocation ,useNavigate} from 'react-router-dom'
import axios from 'axios'
export default function TeacherDetails() {
    const location =useLocation()
    const [teacherID,setTeacherId]=useState()
    const [debit,setDebit]=useState('')
    const [earning,setEarning]=useState('')
    const [error,setError]=useState('')
    const [credit,setCredit]=useState('')
    const navigate=useNavigate()
    const handleToVideo=()=>{
    navigate('/teacher/dashboard/videos')
    }
    const handleCredit =(e)=>{
      setError('')
    setCredit(e.target.value)
    }
   
    const handleDebit=(e)=>{
      setError('')
    setDebit(e.target.value)
    }
    const CreditClicks =()=>{
     if(credit && teacherID){
      const id = teacherID
      const url =`https://api.codingscholar.com/creditTeacher/${id}`
      axios.post(url,{credit:credit})
      .then(res=>{
        const data = res.data
        alert(data.message)
        setEarning(data.salary)
        console.log(res.data)
      })
      .catch(error=>console.log(error))
     }else{
      setError('Invalid Input')
     }
    }
    function getTeacherVids(){
     if(teacherID){
      const url =`https://api.codingscholar.com/teacherVids/${id}`
      axios.get(url)
      .then(res=>{
        console.log(res.data)
      })
      .catch(error=>console.log(error))
     }
    }
    const DebitClicks=()=>{
        if(debit && teacherID){
          const id = teacherID
          const url =`https://api.codingscholar.com/debitTeacher/${id}`
          axios.post(url,{debit:debit})
          .then(res=>{
            console.log(res.data)
            const data = res.data
            alert(data.message)
            setEarning(data.salary)
          })
          .catch(error=>console.log(error))
        }else{
          setError('Invalid Input')
        }
    }
    useEffect(()=>{
     const {state}=location
     if(state){
      const {id,salary}=state
      console.log('jello',id)
      setTeacherId(id)
      setEarning(salary)
     }
    },[])
  return (
    <div className='TeacherDetails'>
      <div className='teacherDetailsContainer'>
        <div className='teacherEarningWrapper'>
            <ul>
                <li>Live earning <span>{earning}</span></li>
            </ul>
        </div>
        <p style={{color:'red'}}>{error}</p>
        <div className='teacherBtnWrapper'>
            <button onClick={CreditClicks}>credit</button>
            <input onChange={handleCredit} name='credit'  type='text' placeholder='Amount...'/>
        </div>
        <div className='teacherBtnWrapper'>
            <button onClick={DebitClicks}>debit</button>
            <input onChange={handleDebit} name='debit' type='text' placeholder='Amount...'/>
        </div>
      </div>
      <div className='teacherDetailsContainer'>
        <table>
            <thead>
                <tr>
                    <th>class name</th>
                    <th>grade</th>
                    <th>video</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                     <td>introduction to html</td>
                     <td>4</td>
                     <td>introduction</td>
                     <td><button onClick={handleToVideo}>play</button></td>
                </tr>
                <tr>
                     <td>introduction to html</td>
                     <td>4</td>
                     <td>introduction</td>
                     <td><button>play</button></td>
                </tr>
                <tr>
                     <td>introduction to html</td>
                     <td>4</td>
                     <td>introduction</td>
                     <td><button>play</button></td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  )
}
