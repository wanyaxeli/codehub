import React,{useState,useEffect,useRef} from 'react'
import pic from "../assets/logoCodeHub.png"
import { useLocation,useParams ,useNavigate} from 'react-router-dom'
import axios from 'axios';
import Peer from "simple-peer";
import RegisterStudentModal from '../Components/RegisterStudentModal';
import SubmitProjectModal from '../Components/SubmitProjectModal';
import CountdownTimer from '../Components/CountdownTimer';
export default function TrialClass() {
    const { name, token } = useParams();
    console.log('link',name,'token',token)
    const [code,setCode]=useState('')
    const [chat,setChat]=useState('')
    const [asideCss,setAsideCss]=useState('closeAside')
    const [mainCss,setMainCss]=useState('fullPageMain')
    const [toggleChat,setToggleChat]=useState(false)
    const [toggleClassOnJoinedUser,settoggleClassOnJoinedUser]=useState('LessConnctedUsersWrapper')
    const [mic,setToggleMic]=useState(true)
    const [openMic,setOpenMic]=useState('')
    const [openVidoe,setOpenVideo]=useState('on')
    const [openSubmitModal,setopenSubmitModal]=useState(false)
    const [cam,setToggleCam]=useState(true)
    const location =useLocation()
    const [toggleDisplay,setToggleDisplay]=useState('classDisplayer')
    const [card,setCard]=useState('classCardDisplayer')
    const [Videocard,setVideoCard]=useState('hideVideo')
    const [Wschat,setWsChat]=useState([])
    const [toggleSideUser,settoggleSideUser]=useState('SecondUserDivWrapper')
    const [toggleInnerSideUser,setInnertoggleSideUser]=useState('sideUserDetails')
    const [connectedUsers,setconnectedUsers]=useState(2)
    const [openSharing,setOpenSharing]=useState('')
    const [timeLeft, setTimeLeft] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [ws, setWs] = useState(null);
    const [startingTime, setStartingTime] = useState('');
    const [role, setRole] = useState('');
    const [socket, setSocket] = useState(null);
    const [peer, setPeer] = useState(null);
    const peerRef = useRef(null);
    const screenPeerRef = useRef(null);
    const [user_id, setUser_id] = useState('');
    const [waiting, setWaiting] = useState(false);
    const [connected, setConnected] = useState([]);
    const [peerConnected, setpeerConnected] = useState(false);
    const [RemoteStream, setRemoteStream] = useState('');
    const userVideo = useRef();
    const [counter, setCounter] = useState(0);
    const [openStudentRegistrationform,setopenStudentRegistrationform]=useState('CloseRegisterStudentModal')
    const [sharing,setSharing]=useState(false)
    const [Usersharing,setUserSharing]=useState('')
    const partnerVideo = useRef();
    const [videoElement, setVideoElement] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const [ice, setIce] = useState([]);
    const [toggleMic,setToggleMuteMic]=useState(true)
    const navigate=useNavigate()
    const [participants,setparticipants]=useState([])
    const screenVideo = useRef(null); // Remote screen video element
    const LocalscreenVideo = useRef(null)
    const handleSubmitProject = ()=>{
        setopenSubmitModal(true)
    }
    const handleOpenChat =()=>{
        if(toggleChat===false){
            setToggleChat(true)
        }else{
            setToggleChat(false) 
        }
    }
    const fetchIceServers = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/get-ice-servers/");
          const data = await response.json();
          console.log("ICE Servers data:", data.ice_servers);
          return data.ice_servers || []
        } catch (error) {
          console.error("Failed to fetch ICE servers:", error);
          return [];
        }
      };
      function  getMedia(){
        navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
        setLocalStream(stream);
        if (userVideo.current) userVideo.current.srcObject = stream;
        })
        .catch((error) => console.error("Error accessing media devices:", error));
     }
     useEffect(() => {
        if (!code) return;
    
        const ws = new WebSocket(`ws://localhost:8000/ws/classRoom/${code}/`);
        console.log('innerws',ws)


        getMedia()
        ws.onopen = () =>{
            console.log("WebSocket connected");
            ws.send(JSON.stringify({type:"id",user_id}));
            setWs(ws)
        }

        ws.onmessage=(data)=>{
            const Recieveddata = JSON.parse(data.data)
            if(Recieveddata.type ==='user-joined'){
                const {users,users_count}= Recieveddata
                setparticipants(users)
                console.log('in class',users)
                // if(users_count && users_count===2){
                    
                //     console.log('users in class',users)
                //     setWaiting(false)
                //     const InitiatorUser = users.find(user =>user.initiator === true);
                //     const initiatorId=InitiatorUser.userId
                //     const targetUser = users.find(user =>user.initiator ===false);
                   
                //     if (InitiatorUser && String(initiatorId) === String(user_id)){
                //         setTimeout(() => {
                //             initiateCall(ws, targetUser, initiatorId);
                //             console.log('true initiator', InitiatorUser);
                //         }, 2000);
                //     }
                //     }else{
                //         setWaiting(true)
                //     }
            }
             else if(Recieveddata.type==='chat'){
                 const {message}= Recieveddata
               
                setWsChat(pre=>([...pre,message]))
            } 
            else if(Recieveddata.type === "offer"){
                // handleOffer(ws,Recieveddata.signal);
                // if (String(Recieveddata.target) === String(user_id)) {  // Prevent duplicate handling
                //     handleOffer(ws,Recieveddata.offer,Recieveddata.sender,Recieveddata.target);
                // }
                if (String(Recieveddata.target) === String(user_id)) {  
                    const isRenegotiation = Recieveddata.renegotiation;
                    handleOffer(ws, Recieveddata.offer, Recieveddata.sender, Recieveddata.target, isRenegotiation);
                }
            }
            else if(Recieveddata.type === "answer"){
              
                if (peerRef.current && String(Recieveddata.target===String(user_id))) {  // Ensure peer exists and is not closed
                    try {
                        peerRef.current.signal(Recieveddata.answer); // Set remote answer
                    } catch (error) {
                        console.error("Error setting remote answer:", error);
                    }
                } else {
                    console.log("Peer connection not found or already closed.");
                }
            }
            else if (Recieveddata.type === "candidate") {
             
                // if (peer && Recieveddata.candidate) {
                //     try {
                //         peer.signal(Recieveddata.candidate);  // Apply ICE candidate
                //     } catch (error) {
                //         console.error("Error adding ICE candidate:", error);
                //     }
                // }
                if (peerRef.current && Recieveddata.candidate) {
                    peerRef.current.signal(Recieveddata.candidate);
                 }
            }
            else if (Recieveddata.type === "screen_candidate") {
             
                // if (peer && Recieveddata.candidate) {
                //     try {
                //         peer.signal(Recieveddata.candidate);  // Apply ICE candidate
                //     } catch (error) {
                //         console.error("Error adding ICE candidate:", error);
                //     }
                // }
                if (screenPeerRef.current && Recieveddata.candidate) {
                    screenPeerRef.current.signal(Recieveddata.candidate);
                 }
            }
            else if (Recieveddata.type === "sharing_screen") {
                setSharing(Recieveddata.sharing)
                setUserSharing(Recieveddata.sender)
            }
            else if (Recieveddata.type === "stop_sharing_screen") {
                setSharing(Recieveddata.sharing)
                setUserSharing('')
            }
            else if (Recieveddata.type === "screen_offer") {
                if (String(Recieveddata.target) === String(user_id)) {  
                    handleScreenOffer(ws, Recieveddata.offer, Recieveddata.sender, Recieveddata.target,);
                }
            }
            else if(Recieveddata.type === "screen_answer"){
              
                if (screenPeerRef.current && String(Recieveddata.target===String(user_id))) {  // Ensure peer exists and is not closed
                    try {
                        screenPeerRef.current.signal(Recieveddata.answer); // Set remote answer
                    } catch (error) {
                        console.error("Error setting remote answer:", error);
                    }
                } else {
                    console.log("Peer connection not found or already closed.");
                }
            }
            // const users =Recieveddata.users
            
        }
     return () => {
            ws.close();
        };
    },[code,user_id,ice]);
    console.log('pati',participants)
    function startCall(){
        if(participants && participants.length===2 && timeLeft ==='Event has started!' && user_id && socket){
            const InitiatorUser = participants.find(user =>user.initiator === true);
            const initiatorId=InitiatorUser.userId
            const targetUser = participants.find(user =>user.initiator ===false);
            if (InitiatorUser && String(initiatorId) === String(user_id)){
                    initiateCall(socket, targetUser, initiatorId);
                    console.log('true initiator', InitiatorUser);
            }
        }
    }
    function initiateCall(socket, targetUser, id) {
        if (localStream && targetUser && id && socket && socket.readyState === WebSocket.OPEN && ice) {
            const peerConfig = {iceServers:ice};
            const initiator = new Peer({ initiator: true, trickle: true, stream: localStream, config: peerConfig });
    
            initiator.on("error", err => console.log("peererror", err));
    
            initiator.on("signal", (signal) => {
                if (signal.candidate) {
                    socket.send(JSON.stringify({ type: "candidate", candidate: signal, sender: id, target: targetUser.userId }));
                } else {
                    socket.send(JSON.stringify({ type: "offer", signal, renegotiation: false  ,sender: id, target: targetUser.userId }));
                }
            });
    
            initiator.on("connect", () => {
                console.log("Initiator: Peer connected successfully!");
                setpeerConnected(true)
            });
    
            initiator.on("stream", (remoteStream) => {
                if (partnerVideo.current) {
                    partnerVideo.current.pause();
                    partnerVideo.current.srcObject = remoteStream;
                    partnerVideo.current.onloadedmetadata = () => {
                        partnerVideo.current.play().catch((error) => console.log("Play error:", error));
                    };
                }
            });
    
            setPeer(initiator);
            peerRef.current = initiator;
        } else {
            console.log("WebSocket not connected");
        }
    }
    const handleScreenOffer =(socket, signal, targetID, senderId)=>{
        const peerConfig = { iceServers: ice };
        const screenPeer = new Peer({
            initiator: false,
            trickle: true,
            config: peerConfig
        });

        screenPeer.signal(signal);

        screenPeer.on("signal", (answer) => {
            if (answer.candidate) {
                socket.send(JSON.stringify({ type: "screen_candidate", candidate: answer,sender:senderId}));
            } else {
                socket.send(JSON.stringify({ type: "screen_answer", signal: answer, target: targetID }));
            }
            // socket.send(
            //     JSON.stringify({
            //         type: "screen-answer",
            //         signal: answer,
            //         sender: targetID,
            //         target:senderId,
            //     })
            // );
        });

        screenPeer.on("stream", (stream) => {
            if (screenVideo.current) {
                console.log('screen stream',stream)
                screenVideo.current.srcObject = stream; // Display screen share
            }
        screenPeerRef.current=screenPeer
        });
    }
    const handleOffer = (socket, signal, targetID,senderId) => {
        if (!localStream || !ice) return;
    
        console.log("I am the receiver's", signal);
        const peerConfig = { iceServers: ice };
        const responder = new Peer({ initiator: false, trickle: true, stream: localStream, config: peerConfig });
    
        responder.on("connect", () => {
            console.log("Responder: Peer connected successfully!");
            setpeerConnected(true)
        });
    
        responder.signal(signal);
    
        responder.on("signal", (answerSignal) => {
            if (answerSignal.candidate) {
                socket.send(JSON.stringify({ type: "candidate", candidate: answerSignal,sender:senderId}));
            } else {
                socket.send(JSON.stringify({ type: "answer", signal: answerSignal, target: targetID }));
            }
        });
    
        responder.on("stream", (remoteStream) => {
            if (remoteStream) {
                console.log("Partner video streams:", remoteStream);
                setRemoteStream(remoteStream);
            }
        });
    
        responder.on("close", () => {
            console.log("Connection with peer closed :(");
        });
    
        responder.on("error", (err) => console.log("res error", err));
    
        setPeer(responder);
        peerRef.current = responder
    };
    async function startScreenShare() {
        if (participants.length > 1) {
            const InitiatorUser = participants.find(user => String(user.userId) === String(user_id));
            const NonInitiatorUser = participants.find(user => String(user.userId) !== String(user_id));
            const peerConfig = { iceServers: ice };
            try {
                // Get the screen stream
                const screenStream = await navigator.mediaDevices.getDisplayMedia({
                    video: { cursor: "always" },
                    audio: false,
                });
        
                if (LocalscreenVideo.current) {
                    LocalscreenVideo.current.srcObject = screenStream; // Show preview
                }
        
                // Create a separate peer connection for screen sharing
                const screenPeer = new Peer({
                    initiator: true,
                    trickle: true, // Disable trickle ICE for easier signaling
                    stream: screenStream,
                    config: peerConfig
                });
        
                // Send offer to remote peer
                screenPeer.on("signal", (data) => {
                    console.log('screen offer',data)
                    if (data.candidate) {
                        ws.send(JSON.stringify({ type: "screen_candidate", candidate: data, sender: InitiatorUser.userId, target: targetUser.userId }));
                    } else {
                        ws.send(JSON.stringify({ type: "screen-offer", data ,sender: InitiatorUser.userId, target: NonInitiatorUser.userId }));
                    }
                });
                screenPeerRef.current = screenPeer;
                // Stop sharing when the user closes the screen share
                screenStream.getVideoTracks()[0].onended = () => {
                    console.log("Screen sharing stopped via browser UI");
                    StopSharing()
                   
                };
            } catch (error) {
                console.error("Error starting screen sharing:", error);
            }
        }
    }  
    function stopScreenSharing() {
        if (screenPeerRef) {
            screenPeerRef.current.destroy();
            screenPeerRef.current = null;
          
        }
        console.log("Screen sharing stopped.");
    }
    useEffect(()=>{
    startCall()
    },[user_id,timeLeft,participants,socket]) 
      useEffect(() => {
        // Send the token to the backend to verify it
        const verifyToken = async () => {
          if(token){
            try {
                const response = await fetch("http://127.0.0.1:8000/verify-class-token/", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ token }),
                });
        
                if (response.ok) {
                  const data = await response.json();
                  console.log("Verified email:", data.email);
                  setCode(name)
                  // Redirect to a form or auto-fill the email field
                    navigate(`/Trial Class/${name}`)
                } else {
                  console.error("Invalid or expired token.");
                  navigate("/error");
                }
              } catch (error) {
                console.error("Error verifying token:", error);
                navigate("/Error");
              }
          }
        };
    
        verifyToken();
      }, [token]);
      function tunOnMic() {
        if (localStream) {
            localStream.getAudioTracks().forEach((track) => {
                track.enabled = true; // Enable the audio track
            });
        } else {
            console.log('No stream available');
        }
    }
    function formatToLocalTime(utcStr) {
        // Combine date and time into a single UTC string
        const utcDateTime =utcStr;
        // Convert to a Date object (UTC)
        const date = new Date(utcDateTime);
    
        // Format only the time in the user's local timezone
        return new Intl.DateTimeFormat(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            // second: '2-digit',
            hour12: false // Set to false for 24-hour format
        }).format(date);
    }
    function tunOFMic() {
        if (localStream) {
            localStream.getAudioTracks().forEach((track) => {
                track.enabled = false; // Disable the audio track
            });
        }
    }
    function StartSharing(){
        if (ws && ws.readyState === WebSocket.OPEN && user_id && sharing===false){
            ws.send(JSON.stringify({ 
                type: "sharing",
                sharing: true,
                userId: user_id 
            }));
            // startScreenSharing()
            // shareScreen()
            startScreenShare()
        } 
       }
       function StopSharing(){
        if (ws && ws.readyState === WebSocket.OPEN && user_id && sharing ===true){
            ws.send(JSON.stringify({ 
                type: "stop_sharing",
                sharing: false,
            }));
            stopScreenSharing();
            console.log('screen shariring called to stop')
        }else{
            console.log('websocket closed ')
        } 
       }
       const handleStudent =()=>{
        setopenStudentRegistrationform('RegisterStudentModal')
       }
    useEffect(()=>{
        if (sharing ===true){
           settoggleClassOnJoinedUser('classImageDisplayer')
           setOpenSharing('on')
           setInnertoggleSideUser('InnersideUserDetails')
           setVideoCard('shareVideoWrapper')
           settoggleSideUser('fistUserDivWrapper')
        }else{
           settoggleClassOnJoinedUser('LessConnctedUsersWrapper')
           setOpenSharing('of')
           setVideoCard('hideVideo')
           settoggleSideUser('SecondUserDivWrapper') 
           setInnertoggleSideUser('sideUserDetails')
        }
       },[sharing])
    useEffect(()=>{
    fetchIceServers()
    },[])
    useEffect(()=>{
        if(mainCss==='fullPageMain'){
            setMainCss('classMainWrapper')
        }else{
            setMainCss('fullPageMain')
        }
        if(asideCss==='closeAside'){
            setAsideCss('ClassasideWrapper')
        }else{
            setAsideCss('closeAside')
        }
    },[toggleChat])
   useEffect(()=>{
   if(name && token){
     // Decode the class name
     const decodedName = decodeURIComponent(name);
     console.log('decoded token',decodedName)
    setCode(decodedName)
   }else{
    setCode(name)
   }
   },[name])
   useEffect(() => {
    setMainCss('fullPageMain'); // This overrides the initial state
    setAsideCss('closeAside')
    setToggleMic(true)
  }, [])
   useEffect(()=>{
    const {state}= location
    if(state){
        console.log('state',state)
        setUser_id(state)
    }else{
        const id = Math.floor(Math.random() * 9000) + 1000;
        setUser_id(id)
    }
    },[location])
    useEffect(() => {
        let interval;
        if (timeLeft === "Event has started!") {
            interval = setInterval(() => {
                setCounter(prev => prev + 1);
            }, 60000); // Update every 1 minute
        }

        return () => clearInterval(interval); // Cleanup interval
    }, [timeLeft])
    const handleSendChat =()=>{
        if (user_id){
            const data= {text:chat,user:user_id}
            console.log('user',data)
            if(ws && ws.readyState === WebSocket.OPEN){
                setChat('')
                ws.send(JSON.stringify({ type: "chats", data}))
            }
        }
      }
    const handleChat =(e)=>{
        setChat(e.target.value)
      }
    const handleToggleMic = () => {
        if (openMic === '') {
            setOpenMic('on');
            tunOnMic();
            setToggleMuteMic(false); // Unmute the video
        } else {
            setOpenMic('');
            tunOFMic();
            setToggleMuteMic(true); // Mute the video
        }
    };
    const handleShareScreen=()=>{
        if(sharing===true){
            if(Usersharing===user_id){
                // StopSharing()
                // stopScreenSharing()
            }else{
                alert(`${Usersharing} is sharing screen already`)
            }
        }else{
            // StartSharing()
        }
    }
    const handleToggleVideo = () => {
        if (!localStream) return; 
    
        const videoTracks = localStream.getVideoTracks();
        
        if (cam) {
            videoTracks.forEach(track => track.enabled = false);
            setOpenVideo('');
            setToggleCam(false);
        } else {
            // videoTracks.forEach(track => track.enabled = true);
            getMedia()
            setOpenVideo('on');
            setToggleCam(true);
        }
    };
   function getTrailClass(){
    if(code){
        const url=`http://127.0.0.1:8000/trialClass/${code}`
    axios.get(url)
    .then(res=>{
        console.log(res.data)
        const data=res.data
        const timeUtcZone=formatToLocalTime(data.datetime_utc)
        console.log('starting time',timeUtcZone)
        setStartingTime(data.datetime_utc)
    })
    .catch(error=>console.log(error))
    }
   }
   useEffect(()=>{
   getTrailClass()
   },[code])
//   return (
//     <div className='TrialClass'>
//          <div className='ClassHeader'>
//             <div className='ClassHeaderWrapper'>
//                 <div className='classHeaderLogowrapper'>
//                     <div className='logoContainer'>
//                         <img src={pic}/>
//                     </div>
//                     <div className=''>

//                     </div>
//                 </div>
//                 <div className='classHeaderBtnwrapper'>
//                     <ul>
//                         <li onClick={handleSubmitProject}>submit project</li>
//                         <li onClick={handleStudent}>student</li>
//                         <li onClick={handleOpenChat}>chat</li>
//                     </ul>
//                 </div>
//                 <div className='classheaderBtnActionwrapper'>
//                     <div className='endclassBtnwrapper'>
//                         <button>end class</button>
//                     </div>
//                 </div>
//             </div>
//             </div>
//             <div className='classContainer'>
//                 <main main className={mainCss}>
//                 <div className='classVideoImageWrapper'>
                    
//                 </div>
//                 <div className='mainClassBtnActionHolder'>
//                 <ul>
//                     <li>
//                          <div>
//                             <div className={`classInconHolder ${openVidoe}`} onClick={handleToggleVideo}>
//                                 <i className="fa fa-video-camera" aria-hidden="true"></i>
//                                 {/* <i className="fi fi-rr-video-slash"></i> */}
//                                 </div>
//                                 <p>cam</p>
//                             </div>
//                         </li>
//                         <li>
//                         <div>
//                             <div className={`classInconHolder ${openMic}`} onClick={handleToggleMic}>
//                             {mic===true?<i className="fa fa-microphone" aria-hidden="true"></i>:<i className="fa fa-microphone-slash" aria-hidden="true"></i>}
//                             </div>
//                             <p>mic</p>
//                         </div>
//                         </li>
//                         <li>
//                         <div>
//                             {/* <div onClick={handleShareScreen} className={`classInconHolder ${Usersharing &&Usersharing === user_id ?openSharing:""}`}> */}
//                             <div onClick={handleShareScreen} className={`classInconHolder`}>
//                             <i className="fa fa-desktop" aria-hidden="true"></i>
//                             </div>
//                         {/* {sharing && Usersharing &&Usersharing ===user_id? <p>stop  share</p>: <p>share</p>} */}
//                         <p>share</p>
//                         </div>
//                         </li>
//                         {/* <li>
//                         <div>
//                             <div className='classInconHolder'>

//                             </div>
//                             <p>record</p>
//                         </div>
//                         </li> */}
//                     </ul>
//                 </div>
//                 </main>
//             <aside className={asideCss}>
//                 <div className='chatWrapper'>
//                     <div className='chatContainer'>
//                         {/* {Wschat.map((chat,i)=>{
//                             return(
//                                 <ul key={i}>
//                                     {chat.user===user_id?<li className='sender'><p>{chat.text}</p></li>:
//                                     <li className='reciever'><p>{chat.text}</p></li>}
//                             </ul>
//                             )
//                         })} */}
//                     </div>
//                     <div className='chatInputWrapper'>
//                         <input onChange={handleChat} value={chat} placeholder='Chat...'/>
//                         <button onClick={handleSendChat}><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
//                     </div>
//                 </div>
//             </aside>
//             </div>
//     </div>
//   )
// }
if (participants.length <= 2 && timeLeft !== 'Event has started!') {
    return (
      <div className='classNotStartedWrapper'>
        <main>
          <div className='VideoHolder'>
            <video ref={userVideo} autoPlay playsInline muted={true} />
          </div>
        </main>
        <aside>
          {participants.length <= 2 && timeLeft !== 'Event has started!'? (
            <div>
              <p>
                Your class starts in
                <span>
                  <CountdownTimer
                    timeLeft={timeLeft}
                    setTimeLeft={setTimeLeft}
                    startingTime={startingTime}
                  />
                </span>
              </p>
              {counter === 15 ? (
                <div className='noOtherMemberJoinedWrapper'>
                  <span>Oops! The other member did not join the class</span><br />
                  <button>end class</button>
                </div>
              ) : null}
            </div>
          ) : null}
  
          {participants.length === 2 && timeLeft == 'Event has started!' && !peerConnected ? (
            <div>
              <p>Waiting for peer connection...</p>
              <div className='classSpinnerWrapper'>
              <span><i className="fa fa-spinner spinner" aria-hidden="true"></i></span>
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    );
}
else if(participants.length===2 && timeLeft ==='Event has started!' && peerConnected===true){
    return (
        <div className='ClassWRapper'>
            <div className='ClassHeader'>
            <div className='ClassHeaderWrapper'>
                <div className='classHeaderLogowrapper'>
                    <div className='logoContainer'>
                        <img src={pic}/>
                    </div>
                    <div className=''>

                    </div>
                </div>
                <div className='classHeaderBtnwrapper'>
                    <ul>
                        <li onClick={handleSubmitProject}>submit project</li>
                        <li onClick={handleStudent}>student</li>
                        <li onClick={handleOpenChat}>chat</li>
                    </ul>
                </div>
                <div className='classheaderBtnActionwrapper'>
                    <div className='endclassBtnwrapper'>
                        <button>end class</button>
                    </div>
                </div>
            </div>
            </div> 
            <div className='classContainer'>
            <main className={mainCss}>
                <div className='classVideoImageWrapper'>
                        <div className={Videocard}>
                            {Usersharing === user_id?
                            <video ref={LocalscreenVideo} autoPlay playsInline muted />
                            :<video ref={screenVideo} autoPlay playsInline muted />}
                        </div>
                        {connectedUsers>2?<div className={toggleDisplay}>
                            <div className={card}>
                                <div className='cardShortnameWrapper'>
                                    <p>e</p>
                                </div>
                            </div>
                            <div className={card}>
                            <div className='cardShortnameWrapper'>
                                    <p>w</p>
                                </div>
                            </div>
                            <div className={card}>
                            <div className='cardShortnameWrapper'>
                                    <p>s</p>
                                </div>
                            </div>
                        </div>:<div className={toggleClassOnJoinedUser}>
                            <div className='fistUserDivWrapper'>
                            {/* {partnerVideo.current? (
                                <video ref={partnerVideo} autoPlay playsInline />
                            ) : (
                                <div className='MainUserDetails'>
                                    <p>w</p>
                                </div>
                            )} */}
                            <video ref={partnerVideo} autoPlay playsInline muted/>
                            </div>
                            <div className={toggleSideUser}>
                                <div className='InnerSecondUserDivWrapper'>
                                {cam ===true ? (
                                    <video ref={userVideo} autoPlay playsInline muted={toggleMic} />
                                ) : (
                                    <div className={toggleInnerSideUser}>
                                        <p>e</p>
                                    </div>
                                )}
                                </div>
                            </div>
                        </div>}
                </div>
            <div className='mainClassBtnActionHolder'>
                    <ul>
                        <li>
                            <div>
                                <div className={`classInconHolder ${openVidoe}`} onClick={handleToggleVideo}>
                                <i className="fa fa-video-camera" aria-hidden="true"></i>
                                {/* <i className="fi fi-rr-video-slash"></i> */}
                                </div>
                                <p>cam</p>
                            </div>
                        </li>
                        <li>
                        <div>
                            <div className={`classInconHolder ${openMic}`} onClick={handleToggleMic}>
                            {mic===true?<i className="fa fa-microphone" aria-hidden="true"></i>:<i className="fa fa-microphone-slash" aria-hidden="true"></i>}
                            </div>
                            <p>mic</p>
                        </div>
                        </li>
                        <li>
                        <div>
                            <div onClick={handleShareScreen} className={`classInconHolder ${Usersharing &&Usersharing === user_id ?openSharing:""}`}>
                            <i className="fa fa-desktop" aria-hidden="true"></i>
                            </div>
                        {sharing && Usersharing &&Usersharing ===user_id? <p>stop  share</p>: <p>share</p>}
                        </div>
                        </li>
                    </ul>
            </div>
            </main>
            <aside className={asideCss}>
                <div className='chatWrapper'>
                    <div className='chatContainer'>
                        {Wschat.map((chat,i)=>{
                            return(
                                <ul key={i}>
                                    {chat.user===user_id?<li className='sender'><p>{chat.text}</p></li>:
                                    <li className='reciever'><p>{chat.text}</p></li>}
                            </ul>
                            )
                        })}
                    </div>
                    <div className='chatInputWrapper'>
                        <input onChange={handleChat} value={chat} placeholder='Chat...'/>
                        <button onClick={handleSendChat}><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </div>
            </aside>
            </div>
            <RegisterStudentModal openStudentRegistrationform={openStudentRegistrationform} setopenStudentRegistrationform={setopenStudentRegistrationform}/>
        {openSubmitModal &&  <SubmitProjectModal openSubmitModal={openSubmitModal} setopenSubmitModal={setopenSubmitModal}/> }
        </div>
    )
    }else{
        return(
            <div className='errorWrapper'>
            <p>Loading ...</p>
            </div>
        )
    }
}
