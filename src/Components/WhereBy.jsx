export default function WherebyIframe({ roomUrl }) {
  return (
    <div>
      <iframe
        src={roomUrl}
        allow="camera; microphone; fullscreen; speaker; display-capture"
        style={{ width: '100%', height: '80vh', border: '0', borderRadius: '12px' }}
        title="Codingschalor Meeting"
      />
    </div>
  );
}



// // WhereBy.jsx
// import React, { useEffect } from 'react';
// import { useRoomConnection } from '@whereby.com/browser-sdk/react';

// export default function WhereBy({ roomUrl }) {
//   const { components, events, state } = useRoomConnection(roomUrl);

//   useEffect(() => {
//     if (!events) return;

//     const handleLeftMeeting = () => {
//       console.log('User left the meeting');
//     };

//     events.on('left-meeting', handleLeftMeeting);

//     return () => {
//       events.off('left-meeting', handleLeftMeeting);
//     };
//   }, [events]);

//   const handleSubmit = () => {
//     console.log('Submit clicked!');
//   };

//   // Ensure components and VideoRoom are available
//   if (!components || !components.VideoRoom) {
//     return <p>Initializing Whereby room...</p>;
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Welcome to your room</h2>
//       <button onClick={handleSubmit}>Submit</button>

//       <div style={{ width: '100%', height: '80vh', marginTop: '20px' }}>
//         <components.VideoRoom />
//       </div>
//     </div>
//   );
// }
