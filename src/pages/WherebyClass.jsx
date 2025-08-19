import React,{useEffect,useState} from 'react'
import WherebyRoom from '../Components/WherebyRoom';
// import { useLocalMedia, VideoView } from "@whereby.com/browser-sdk/react";
import { useRoomConnection } from "@whereby.com/browser-sdk/react";
// import { WherebyRoom } from '@whereby.com/browser-sdk/react';
// import WherebyRoom from '@whereby.com/browser-sdk/react';
import axios from "axios";
import Whereby from '../Components/WhereBy';
// export default function WherebyClass({code}) {
//   const [roomUrl, setRoomUrl] = useState(null);
//   // const [connection, setConnection] = useState(null);
//   const [isCameraActive, setIsCameraActive] = React.useState(true);
//   const [isMicrophoneActive, setIsMicrophoneActive] = React.useState(true);
  
//   useEffect(() => {
//    if(code){
//      console.log('code',code)
//     axios.post("https://api.codingscholar.com/create_whereby_room/", {
//       class_name: code
//     }).then(res => {
//       console.log("data",res.data)
//       setRoomUrl(res.data.roomUrl);
//     }).catch(err => console.error("Room creation failed:", err));
//    }
//   },[code]);
//   // const mediaOptions = {
//   //   localMediaOptions: {
//   //       audio: true,
//   //       video: true,
//   //   }
//   // }
//   // if (!roomUrl) return <p>Loading room...</p>;
//   const { state, localParticipant } = useRoomConnection({ roomUrl });
//   // const connection = useRoomConnection(roomUrl, mediaOptions);
//   // const { actions: { joinRoom, leaveRoom } } = connection;
//   // const {state, components,actions} = connection;
//   // const {localParticipant, remoteParticipants} = state;
//   // const {VideoView} = components;
//   // // Extract toggleCamera and toggleMicrophone from the actions property.
//   // const {toggleCamera, toggleMicrophone} = actions;
//   // useEffect(() => {
//   //   joinRoom();
//   //   return () => {
//   //     leaveRoom();
//   //   }
//   // }, [roomUrl]);
//   return (
//     <div>
//        {state === 'connected' ? (
//         <iframe
//           src={roomUrl}
//           allow="camera; microphone; fullscreen; speaker; display-capture"
//           style={{
//             width: '100%',
//             height: '600px',
//             border: '0px',
//             borderRadius: '8px'
//           }}
//           allowFullScreen
//           title="Whereby Video Room"
//         ></iframe>
//       ) : (
//         <p>Connecting to room...</p>
//       )}
//       {/* {localParticipant?.stream ? (
//     <div id="you" style={{width: '400px', height: 'auto'}}>
//       <VideoView stream={localParticipant?.stream} muted />
//         <p className="controls">

//           <button
//             type="button"
//             onClick={() => {
//               setIsCameraActive((previous) => !previous);
//               toggleCamera();
//             }
//           }>Toggle Camera</button>

//           <button
//             type="button"
//             onClick={() => {
//               setIsMicrophoneActive((previous) => !previous);
//               toggleMicrophone();
//             }}
//           >Toggle Microphone</button>
//         </p>
//       </div>
// 		) : null
//   }
//    <div id="participants">
//       {remoteParticipants?.length ?
//         remoteParticipants.map((friend, index) => {
//             return (
//               <div className="participant" key={friend?.id}>
//               {friend?.stream &&
//                 <VideoView stream={friend?.stream} className="friend" />
//               }
//               </div>
//             )
//         }) : null
//       }
//      </div> */}
//   </div>
//   )
// }
export default function WherebyClass({ code,role }) {
  // const [roomUrl, setRoomUrl] = useState(null);
  const [roomUrl, setRoomUrl] = useState('');
  const [shouldConnect, setShouldConnect] = useState(false);
  useEffect(() => {
    console.log('code outer',code)
    if (code && role) {
      console.log('code',code)
      const now = new Date().toISOString().replace(/[-:.TZ]/g, ""); 
      axios
        .post('https://api.codingscholar.com/create_whereby_room/', {
          class_name: `${now}_${code}`,
          role: role, 
        })
        
        .then((res) => {
          console.log('url',res.data)
          setRoomUrl(res.data.roomUrl);
          setShouldConnect(true); // mark it's safe to connect
        })
        .catch((err) => console.error('Room creation failed:', err));
    }
  }, [code,role]);

  // 🟨 Default values for hook output (to avoid using it until ready)
  // const connection = shouldConnect && roomUrl
  //   ? useRoomConnection({ roomUrl })
  //   : { state: null, localParticipant: null };

  // const { state, localParticipant } = connection;

  // // UI rendering
  // if (!roomUrl || !shouldConnect) {
  //   return <p>Loading room...</p>;
  // }
  if (roomUrl !=='' && roomUrl!=='undefined' && roomUrl!==null){
    return <Whereby roomUrl={roomUrl} />;
  } 
   else{
    return <p>Loading room...</p>;
   } 
   
  // return (
  //   <div>
  //     {state === 'connected' ? (
  //       <iframe
  //         src={roomUrl}
  //         allow="camera; microphone; fullscreen; speaker; display-capture"
  //         style={{
  //           width: '100%',
  //           height: '600px',
  //           border: '0px',
  //           borderRadius: '8px',
  //         }}
  //         allowFullScreen
  //         title="Whereby Video Room"
  //       ></iframe>
  //     ) : (
  //       <p>Connecting to room...</p>
  //     )}
  //   </div>
  // );
}