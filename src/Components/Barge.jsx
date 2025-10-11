import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'; 
import badge1 from '../assets/barge1.png'
import badge16 from '../assets/barge16.png'
import badge2 from '../assets/barge2.png'
import badge3 from '../assets/barge3.png'
import badge4 from '../assets/barge4.png'
import badge5 from '../assets/barge5.png'
import badge6 from '../assets/barge6.png'
import badge7 from '../assets/barge7.png'
import badge8 from '../assets/barge8.png'
import badge9 from '../assets/barge9.png'
import badge10 from '../assets/barge10.png'
import badge11 from '../assets/barge11.png'
import badge12 from '../assets/barge12.png'
import badge13 from '../assets/barge13.png'
import badge14 from '../assets/barge14.png'
import badge15 from '../assets/barge15.png'
import ShowBadge from './ShowBadge';
import axios from 'axios';
export default function Barge({setOpenBadge,newStudent}) {
  console.log('new sss',newStudent)
     const [badge,setBadge]=useState(false)
     const [NewStudentId,setNewStudentId]=useState()
     const [NewStudentName,setNewStudenName]=useState()
     const [showBadge,setShowBadge]=useState('')
    const data=[{id:1,img:badge1,name:'hello world hero'},{id:2,img:badge2,name:'tech titan'},{id:3,img:badge3,name:'keyboard worrier'},{id:4,img:badge4,name:'code rockstar'},{id:5,img:badge5,name:'coding wizard '},{id:6,img:badge6,name:'brainy builder'},{id:7,img:badge7,name:'code rockstar'},{id:8,img:badge8,name:'next gen ninja'},{id:9,img:badge9,name:'level up coder'},{id:10,img:badge10,name:'future developer'},
        {id:11,img:badge11,name:'coding explorer'},{id:12,img:badge12,name:'logic legend'},{id:13,img:badge13,name:'algorithm ace'},{id:14,img:badge14,name:'syntax superstar'},{id:15,img:badge15,name:'bug buster hero'},{id:16,img:badge16,name:'code champion'}]
        const handleToBarge=(image)=>{
           setShowBadge(true)
          console.log('a',image)
            setBadge(image)
            SaveStudentBarge(image.name)
        }
        const handleCloseBadge =()=>{
          setOpenBadge(false)
        }
        useEffect(()=>{
         if(newStudent){
           setNewStudentId(newStudent.id)
           setNewStudenName(newStudent.user.first_name)
         }
        },[newStudent])
        function SaveStudentBarge(badge_name){
          const data={badge_name:badge_name}
          const id=NewStudentId 
          const url = `https://api.codingscholar.com/createbadge/${id}`
          axios.post(url,data)
          .then(res=>{
            console.log(res.data)
          })
          .catch(error=>console.log(error))
        }
  return  ReactDOM.createPortal (
    <div className='BargeWrapper'>
        <div className='badgecloseBtnWrapper'>
             <div onClick={handleCloseBadge} className='badgecloseBtn'>
                <span>&times;</span>
             </div>
        </div>
        <div className='codingBadge'>
               <h2>coding:</h2>
               <div className='codingBadgeholder'>
               {data.map(badge=>{
                return(
                     <div key={badge.id} onClick={()=>handleToBarge(badge)} className='badge'>
                        <img src={badge.img}/>
                     </div>
                )
               })}
               </div>
         </div>
        {showBadge && badge &&  <ShowBadge NewStudentName={NewStudentName} newStudent={newStudent} setShowBadge={setShowBadge} badge={badge}/>}
    </div>,
    document.getElementById('barge')
  )
}
