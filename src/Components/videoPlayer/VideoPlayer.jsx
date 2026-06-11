import React from 'react'
import Portal from '../Portal'
export default function VideoPlayer({videoUrl,videoTitle,setOpenPlayer}) {
    const handleclosePlayer=()=>{
        setOpenPlayer(false)
    }
  return (
   <Portal>
     <div className='VideoPlayerwrapper'>
       
       <div className='VideoPlayerCloseBtnWRapper'>
           <div className='videoheader'>
             <h2>{videoTitle}</h2>
           </div>
           <div className='VideoPlayerCloseBtn' onClick={handleclosePlayer}>
               &times;
           </div>
       </div>
       <div className='videoContainer'>
          <video
           src={videoUrl}
           autoPlay
           loop
           controls
           playsInline/>
       </div>
   </div>
   </Portal>
  )
}
