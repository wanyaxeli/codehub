import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'; 
import img from '../assets/barge11.png'
import confetti from 'canvas-confetti';
export default function ShowBadge({badge,setShowBadge,newStudent,NewStudentName}) {
  const handleCloseShowbadge =()=>{
    setShowBadge(false)
  }
  
    function confettiShow() {
        if (badge) {
          const duration = 10 * 1000; // runs for 2 seconds
          const end = Date.now() + duration;
      
          (function frame() {
            confetti({
              particleCount: 10,
              startVelocity: 30,
              spread: 360,
              origin: {
                x: Math.random(),
                y: Math.random() - 0.2, // a bit higher than the bottom
              },
            });
      
            if (Date.now() < end) {
              requestAnimationFrame(frame);
            }
          })();
        }
      }
      useEffect(()=>{
        confettiShow()
        },[badge])
  return  ReactDOM.createPortal (
    <div className='ShowBadge'>
       <div onClick={handleCloseShowbadge} className='closeShoBadgeWrapper'>
         <span>&times;</span>
       </div>
        <div className='ShowBadgeHolder'>
          <div className='badgeTextWrapper'>
             <h2>congratulations! {NewStudentName?NewStudentName:''}</h2>
          </div>
          <div className="badgeImageWrapper stage">
            {[...Array(10)].map((_, i) => (
                <div key={i} className="layer">
                <img src={badge.img} alt="badge" />
                </div>
            ))}
            </div>
          <div className='badgeTypeWrapper'>
             <p>You have been awarded</p>
             <span>{badge.name}</span>
              <p>badge!</p>
          </div>
        </div>
    </div>,
    document.getElementById('showbarge')
  )
}
