import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'
export default function NotesViewer() {
    const [notes,setNotes]=useState('')
    const location =useLocation()
    useEffect(()=>{
     const {state}=location
     console.log(state)
     if(state){
        setNotes(state)
     }
    },[])
  return (
    <div className='NotesViewerWrapper'>
         <iframe 
        src={notes} 
        width="100%" 
        height="600px"
        style={{ border: "none" }}
      />
    </div>
  )
}
