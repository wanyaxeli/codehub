import React,{useState} from 'react'
import ReactDOM from 'react-dom'; // Correct import
import axios from 'axios';
export default function DeletePopUp({setOpenDeletePop,lesson,getNotes}) {
    const[res,setRes]=useState('')
    const handleDelete=()=>{
     const lessonId=lesson.lessonId
    console.log(lessonId)
    const url = `https://api.codingscholar.com/DeleteclassNotes/${encodeURIComponent(lessonId)}`;
    axios.delete(url)
    .then(res=>{
      console.log(res.data)
      setRes(res.data)
      getNotes()
      setOpenDeletePop(false)
    })
    .catch(error=>console.log(error))
    }
    const handleToHome =()=>{
        setOpenDeletePop(false)
    }
  return ReactDOM.createPortal (
    <div className='AlertPOPUpWrapper'>
    <div className='AlertPOPUpContainer'>
        <div className='AlertPOPUp DeleteAlertPOPUp'>
            {res? <p>Delete {res}</p>: <p>Delete {lesson.title}</p>}
            <div>
            <button style={{color:'#fff'}} onClick={handleDelete}>Delete</button>
            <button style={{color:'#fff'}} onClick={handleToHome}>cancel</button>
            </div>
        </div>
     </div>
   </div>,
document.getElementById('alert')
  )
}


