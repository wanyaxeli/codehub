import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'; // Correct import
import pic from '../assets/codehubImage.jpeg'
export default function StudentProfilePopUp({openStudentProfile,setOpenStudentProfile,student,studentPic}) {
    const handleOpen=()=>{
        setOpenStudentProfile('closeStudentProfilePopUp')
    }
    console.log(student)
  return  ReactDOM.createPortal  (
    <div className={` ${openStudentProfile}`}>
       {student.length>0?student.map((item,i)=>{
        return(
            <div key={i}>
            <div className='StudentProfilecloseBtn'>
               <div className='StudentProfilecloseBtnHolder'>
               <span onClick={handleOpen}>&times;</span>
               </div>
            </div>
            <div className='StudentProfilecloseImgWrapper'>
                  <div className='StudentProfilecloseImg'>
                     {/* <img src={pic}/> */}
                     {studentPic!==''?<img src={`https://res.cloudinary.com/dbxsncq5r/${studentPic}`}/>:<img src={pic}/>}
                  </div>
             </div>
             <div className='StudentProfilecName'>
                 <p>{item.first_name} {item.last_name}</p>
             </div>
             <div className='StudentProfilecName'>
                 <span><i className="fa fa-envelope" aria-hidden="true"></i> {item.email}</span>
             </div>
             <div className='StudentProfilecName'>
                 <span><i className="fa fa-phone-square" aria-hidden="true"></i> {item.phone_number}</span>
             </div>
            </div>
        )
       }):<p>laoding student ...</p>}
    </div>,
    document.getElementById('profile')
  )
}
