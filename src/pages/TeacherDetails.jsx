import React ,{useEffect,useState}from 'react'
import { useLocation ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import VideoPlayer from '@/Components/videoPlayer/VideoPlayer'
export default function TeacherDetails() {
    const location =useLocation()
    const [teacherID,setTeacherId]=useState()
    const [debit,setDebit]=useState('')
    const [earning,setEarning]=useState('')
    const [oneOneOnevideos,setOneOneOnevideos]=useState([])
    const [groupClassvideos,setGroupClassvideos]=useState([])
    const [error,setError]=useState('')
    const [credit,setCredit]=useState('')
    const [videoUrl,setUrl]=useState('')
    const [videoTitle,setTitle]=useState('')
    const [togglePlayer,setOpenPlayer]=useState(false)
    const navigate=useNavigate()
    const handleToVideo=(url,title)=>{
    // navigate('/teacher/dashboard/videos')
    // window.open(url, "_blank");
    setUrl(url)
    setTitle(title)
    setOpenPlayer(true)
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
       
      })
      .catch(error=>console.log(error))
     }else{
      setError('Invalid Input')
     }
    }
    function getTeacherGroupClassVids(){
      if(teacherID){
       const id=teacherID
       const url =`https://api.codingscholar.com/get_teacher_all_class_group_video/${id}`
       const data={TeacherId:teacherID}
       axios.get(url)
       .then(res=>{
         const data=res.data
         const newData= data.map(element => {
          
           const date=new Date(element.created_at)
           const month=date.getMonth() + 1
           const monthInStri=Months(month)
           
           return {monthInStri:monthInStri,...element}
         });
         const groupedData = newData.reduce((acc, item) => {
           const key = item.monthInStri;
       
           if (!acc[key]) {
             acc[key] = [];
           }
       
           acc[key].push(item);
       
           return acc;
         }, {});
       
        
         const groupedArray = Object.entries(groupedData).map(([month, items]) => ({
           month,
           items
         }));
        
         setGroupClassvideos(groupedArray)
       })
       .catch(error=>console.log(error))
      }
    }
    function getTeacherOneONOneVids(){
     if(teacherID){
      const id=teacherID
      const url =`https://api.codingscholar.com/get_teacher_all_class_OneOnOne_video/${id}`
      const data={TeacherId:teacherID}
      axios.get(url)
      .then(res=>{
        const data=res.data
        const newData= data.map(element => {
         
          const date=new Date(element.created_at)
          const month=date.getMonth() + 1
          const monthInStri=Months(month)
         
          return {monthInStri:monthInStri,...element}
        });
        const groupedData = newData.reduce((acc, item) => {
          const key = item.monthInStri;
      
          if (!acc[key]) {
            acc[key] = [];
          }
      
          acc[key].push(item);
      
          return acc;
        }, {});
      
       
        const groupedArray = Object.entries(groupedData).map(([month, items]) => ({
          month,
          items
        }));
       
        setOneOneOnevideos(groupedArray)
      })
      .catch(error=>console.log(error))
     }
    }
    function Months(month){
      if(month===1){
        return "January"
      }
      else if(month===2){
        return 'February'
      }
      else if(month===3){
        return 'March'
      }
      else if(month===4){
        return 'April'
      }
      else if(month===5){
        return 'May'
      }
      else if(month===6){
        return 'June'
      }
      else if(month===7){
        return 'July'
      }
      else if(month===8){
        return 'August'
      }
      else if(month===9){
        return 'September'
      }
      else if(month===10){
        return 'October'
      }
      else if(month===11){
        return 'November'
      }
      else if(month===12){
        return 'December'
      }
    }
    const DebitClicks=()=>{
        if(debit && teacherID){
          const id = teacherID
          const url =`https://api.codingscholar.com/debitTeacher/${id}`
          axios.post(url,{debit:debit})
          .then(res=>{
         
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
      getTeacherOneONOneVids()
      getTeacherGroupClassVids()
    },[teacherID])
    useEffect(()=>{
     const {state}=location
     if(state){
      const {id,salary}=state
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
     
      {oneOneOnevideos.length>0?oneOneOnevideos.map((video,i)=>{
        return(
          <div key={i}>
          <div className='videoClassheaderWrapper'>
             <h2>On on One class videos</h2>
          </div>
          <div  className='teacherDetailsContainer'>
         <div className='videoHeaderWrapper'> <h2>{video.month}</h2> </div>
          <table>
            <thead>
               <tr> 
                <th>class name</th> <th>student name</th> <th>video</th> <th></th>
             </tr> 
            </thead> 
            <tbody > 
             {video.items.map((vid,i)=>{
              return(
                <tr key={i}> 
                <td>{vid.lesson.title}</td> 
                <td>{vid.student.user.first_name} {vid.student.user.last_name}</td> 
                {/* <td>introduction</td> */}
                 <td><button onClick={()=>handleToVideo(vid.video_url,vid.lesson.title)}>play</button></td> 
                </tr>  
              )
             })}
               </tbody>
           </table> 
      </div>
          </div>
        )
      }):<p>No Videos at the moment</p>}
       {groupClassvideos.length>0?groupClassvideos.map((video,i)=>{
        return(
          <div key={i}>
          <div className='videoClassheaderWrapper'>
             <h2>Group class videos</h2>
          </div>
          <div  className='teacherDetailsContainer'>
         <div className='videoHeaderWrapper'> <h2>{video.month}</h2> </div>
          <table>
            <thead>
               <tr> 
                <th>class name</th> <th>student name</th> <th>video</th> <th></th>
             </tr> 
            </thead> 
            <tbody > 
             {video.items.map((vid,i)=>{
              return(
                <tr key={i}> 
                <td>{vid.lesson.title}</td> 
                <td>{vid.student.user.first_name} {vid.student.user.last_name}</td> 
                {/* <td>introduction</td> */}
                 <td><button onClick={()=>handleToVideo(vid.video_url,vid.lesson.title)}>play</button></td> 
                </tr>  
              )
             })}
               </tbody>
           </table> 
      </div>
          </div>
        )
      }):<p>No group class videos at the moment</p>}
      {videoUrl && videoTitle &&togglePlayer===true && <VideoPlayer videoTitle={videoTitle} setOpenPlayer={setOpenPlayer} videoUrl={videoUrl}/>}
    </div>
  )
}
