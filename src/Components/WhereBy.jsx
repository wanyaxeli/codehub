import { useEffect } from "react";

export default function WherebyIframe({ roomUrl,code,studentUserId }) {
   // Append `showLogo=false` if it's not already in the URL
   const baseUrl =
    typeof roomUrl === 'string'
      ? roomUrl
      : roomUrl?.roomUrl || roomUrl?.url || roomUrl?.host_room_url || '';

  // ...all hooks (useEffect, useState, etc.) stay above this line

  if (!baseUrl) return null; // or a loader
   const formattedUrl = baseUrl.includes('?')
   ? `${roomUrl}&showLogo=false`
   : `${roomUrl}?showLogo=false`;

   const token=localStorage.getItem('token')
   const API_URL = 'http://127.0.0.1:8000'
   const updateclassOnJoin=async()=>{
    try{
      console.log('updating on classjoin,,')
      const to_updatedata={
        lessonId:code,
        studentUserId
      }
      const res=await fetch(`${API_URL}/update_liveclass/`,{
        method:'PATCH',
        headers:{
          'Authorization':`Bearer ${token}`,
          'Content-Type':'application/json'
        },
        body:JSON.stringify(to_updatedata)
      })
    }catch(e){
      console.log('error in updating on joining...',e)
    }

   }

     useEffect(() => {
    const roomOrigin = new URL(roomUrl).origin; // e.g. https://yourname.whereby.com

    const handler = async(event) => {
      if (event.origin !== roomOrigin) return; // only trust Whereby
      const { type, payload } = event.data || {};

      console.log('Whereby event:', type, payload); // log everything first

      if (type === 'join') {
        const now = new Date()
        // fired once the user has actually entered the room (after Continue / Join)
        // onJoin?.(payload);
        await updateclassOnJoin()
        alert (` teacher joining at..${now}`)
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [roomUrl]);

  return (
    <div className="wherebyWrapper">
      <iframe
        src={formattedUrl}
        allow="camera; microphone; fullscreen; speaker; display-capture"
        style={{ width: '97%', height: '87vh',marginTop:'8px', border: '0', borderRadius: '12px' }}
        title="Codingschalor Meeting"
      />
    </div>
  );
}
