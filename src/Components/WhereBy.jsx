import { useEffect } from "react";
// import { useAloneGuard } from "./whereby_alone_guard";

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

  //  mark that a person has joined a room and the time they did join
   const API_URL = 'https://api.codingscholar.com'
   const updateclassOnJoin=async()=>{
    try{
      // console.log('updating on classjoin,,')
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


    const { prompt, secondsLeft, stillHere } = useAloneGuard(count, closeRoom);

     useEffect(() => {
      if (!baseUrl) return;
    const roomOrigin = new URL(roomUrl).origin; // e.g. https://yourname.whereby.com

    const handler = async(event) => {
      if (event.origin !== roomOrigin) return; // only trust Whereby
      const { type, payload } = event.data || {};

      console.log('Whereby event:', type, payload); // log everything first

      if (type === 'participantupdate') {
        alert('participantupdate..',payload?.count )
        setCount(payload?.count ?? 0);
      }

      if (type === 'join') {
        const now = new Date()
        // fired once the user has actually entered the room (after Continue / Join)
        // onJoin?.(payload);
        await updateclassOnJoin()
       
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [roomUrl]);
    if (!baseUrl) return null;
    if (closed) return <p>Class ended due to inactivity.</p>;

  return (
    <div className="wherebyWrapper">
      <iframe
        src={formattedUrl}
        allow="camera; microphone; fullscreen; speaker; display-capture"
        style={{ width: '97%', height: '87vh',marginTop:'8px', border: '0', borderRadius: '12px' }}
        title="Codingschalor Meeting"
      />

      {/* {prompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-xl bg-white p-6 shadow-xl">
            <p className="font-medium">Are you still there?</p>
            <p className="text-sm text-slate-500">Room closes in {secondsLeft}s</p>
            <button onClick={stillHere} className="mt-4 rounded bg-sky-600 px-4 py-2 text-white">
              I'm still here
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}
