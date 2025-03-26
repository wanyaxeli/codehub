import React,{useState,useEffect,useRef} from 'react'
import { useLocation,useParams } from 'react-router-dom'
import pic from '../assets/logoCodeHub.png'
import SubmitProjectModal from '../Components/SubmitProjectModal'
import Peer from "simple-peer";
import { jwtDecode } from 'jwt-decode';
import RegisterStudentModal from '../Components/RegisterStudentModal';
import CountdownTimer from '../Components/CountdownTimer';
export default function Class() {
    const [mainCss,setMainCss]=useState('fullPageMain')
    const [asideCss,setAsideCss]=useState('closeAside')
    const [toggleChat,setToggleChat]=useState(false)
    const [toggleDisplay,setToggleDisplay]=useState('classDisplayer')
    const [card,setCard]=useState('classCardDisplayer')
    const [Videocard,setVideoCard]=useState('hideVideo')
    const [toggleClassOnJoinedUser,settoggleClassOnJoinedUser]=useState('LessConnctedUsersWrapper')
    const [mic,setToggleMic]=useState(true)
    const [cam,setToggleCam]=useState(true)
    const [chat,setChat]=useState('')
    const [Wschat,setWsChat]=useState([])
    const [toggleSideUser,settoggleSideUser]=useState('SecondUserDivWrapper')
    const [toggleInnerSideUser,setInnertoggleSideUser]=useState('sideUserDetails')
    const [connectedUsers,setconnectedUsers]=useState(2)
    const [openSharing,setOpenSharing]=useState('')
    const [openMic,setOpenMic]=useState('')
    const [openVidoe,setOpenVideo]=useState('on')
    const [code,setCode]=useState('')
    const [timeLeft, setTimeLeft] = useState(null);
    const [openSubmitModal,setopenSubmitModal]=useState(false)
    const location = useLocation()
    const [isConnected, setIsConnected] = useState(false);
    const [ws, setWs] = useState(null);
    const { name, token } = useParams();
    const [UserToken, setToken] = useState('');
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
    const [participants,setparticipants]=useState([])
    const screenVideo = useRef(null); // Remote screen video element
    const LocalscreenVideo = useRef(null); // Local screen video element
    const handleOpenChat=()=>{
        if(toggleChat===false){
            setToggleChat(true)
        }else{
            setToggleChat(false) 
        }
    }
    const handleSubmitProject =()=>{
        setopenSubmitModal(true)
    }
    async function getToken(){
        try{
            const token= localStorage.getItem('token') // No need to await
            if (token){
                setToken(token);
            }
        } catch(error) {
            console.log(error);
  }
}  
// const iceServers = [
//     { urls: "stun:stun.l.google.com:19302" },  // Google's STUN server
//     {
//         urls: "turn:154.159.237.48",  // Replace with your actual public IP
//         username: "ewany",  
//         credential: "wany2002"
//     }
// ];
useEffect(()=>{
    getToken()
},[])
useEffect(() => {
   
    if (UserToken) {
      try {
        const decode = jwtDecode(UserToken);
        const {role,user_id}=decode
        setUser_id(user_id)
        console.log("Decoded Token:", role);
        setRole(role)
      } catch (error) {
        console.error("JWT Decode Error:", error);
      }
    }
  }, [UserToken]);
//   const fetchIceServers = async () => {
//     try {
//       const authToken = Buffer.from("wanyCoder:4f2b6c64-f75d-11ef-832f-0242ac150002").toString("base64");
  
//       const response = await fetch("https://global.xirsys.net/_turn/codehub", {
//         method: "GET",
//         headers: {
//           "Authorization": "Basic " + authToken,
//           "Content-Type": "application/json",
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const data = await response.json();
//       return data?.v?.iceServers || [];
//     } catch (error) {
//       console.error("Failed to fetch ICE servers:", error);
//       return [];
//     }
//   };
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
  useEffect(() => {
    const getIceServers = async () => {
      const iceServers = await fetchIceServers();
      if(iceServers){
        console.log("ICE Servers:", iceServers);
        setIce(iceServers)
      }
    };
    
    getIceServers();
  }, [token]);
console.log('connectes',connected)
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
                  // Redirect to a form or auto-fill the email field
                     setCode(name)
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
    function tunOnMic() {
        if (localStream) {
            localStream.getAudioTracks().forEach((track) => {
                track.enabled = true; // Enable the audio track
            });
        } else {
            console.log('No stream available');
        }
    }
    
    function tunOFMic() {
        if (localStream) {
            localStream.getAudioTracks().forEach((track) => {
                track.enabled = false; // Disable the audio track
            });
        }
    }
    // function turnOnVideo() {
    //     if (!localStream) return;
    //     localStream.getVideoTracks().forEach((track) => (track.enabled = true));
    //     setToggleCam(true)
    // }
    
    // function turnOffVideo() {
    //     if (!localStream) return;
    //     localStream.getVideoTracks().forEach((track) => (track.enabled = false));
    //     setToggleCam(false)
    // }
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
    function startCall(){
        if(participants && participants.length===2 && timeLeft ===0 && user_id && socket){
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
    console.log('remote screens ',screenVideo)
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
    useEffect(()=>{
    console.log('peer',peerRef)
    },[peerRef])
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
        if (!RemoteStream || !partnerVideo.current) return;
    
        const videoElement = partnerVideo.current;
    
        
        RemoteStream.getTracks().forEach(track => {
            console.log(`Track kind: ${track.kind}, enabled: ${track.enabled}, readyState: ${track.readyState}`);
        });
        // Check if we are assigning a new stream
        if (videoElement.srcObject !== RemoteStream) {
            // Stop any existing tracks before assigning a new stream
            if (videoElement.srcObject) {
                videoElement.srcObject.getTracks().forEach(track => track.stop());
            }
    
            videoElement.srcObject = RemoteStream;
        }
    
        // Wait a bit before playing to ensure stream is fully loaded
        setTimeout(() => {
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => console.log("Playback started successfully"))
                    .catch(error => console.error("Playback errors:", error));
            }
        }, 100); // Small delay to allow stream to load
    
        return () => {
            if (videoElement.srcObject) {
                videoElement.srcObject.getTracks().forEach(track => track.stop());
            }
            videoElement.srcObject = null;
        };
    
    }, [RemoteStream]);
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
        const { state } = location || {}; // Ensure location is not undefined
        const { id, time } = state || {};
        if (state) {
            setCode(id);  // Set the state if it exists
            setStartingTime(time);

        }
        // startLocalStream()
    },[location])
    useEffect(() => {
        setMainCss('fullPageMain'); // This overrides the initial state
        setAsideCss('closeAside')
        setToggleMic(true)
      }, []); // This runs on mount
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
      const handleChat =(e)=>{
        setChat(e.target.value)
      }
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
                StopSharing()
                stopScreenSharing()
            }else{
                alert(`${Usersharing} is sharing screen already`)
            }
        }else{
            StartSharing()
        }
    // display if the class has more than two people don't delete !
    // if(connectedUsers>2){
    //     if(toggleDisplay==='classDisplayer'){
    //         setToggleDisplay('classImageDisplayer')
    //         setOpenSharing('on')
    //         setVideoCard('shareVideoWrapper')
    //      }else{
    //         setToggleDisplay('classDisplayer')
    //         setVideoCard('hideVideo')
    //         setOpenSharing('')
    //      }
    //      if(card==='classCardDisplayer'){
    //         setCard('classCard')
    //      }else{
    //         setCard('classCardDisplayer')
    //      }
    // }else{
    //     if(toggleClassOnJoinedUser==='LessConnctedUsersWrapper'){
    //         settoggleClassOnJoinedUser('classImageDisplayer')
    //         setOpenSharing('on')
    //         setInnertoggleSideUser('InnersideUserDetails')
    //         setVideoCard('shareVideoWrapper')
    //         settoggleSideUser('fistUserDivWrapper')
            
    //     }else {
    //         settoggleClassOnJoinedUser('LessConnctedUsersWrapper')
    //         setOpenSharing('of')
    //         setVideoCard('hideVideo')
    //         settoggleSideUser('SecondUserDivWrapper') 
    //         setInnertoggleSideUser('sideUserDetails')
    //     }
    // }
    }
    useEffect(() => {
        let interval;
        if (timeLeft === "Event has started!") {
            interval = setInterval(() => {
                setCounter(prev => prev + 1);
            }, 60000); // Update every 1 minute
        }

        return () => clearInterval(interval); // Cleanup interval
    }, [timeLeft])
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
   console.log('pati',participants,'time left',timeLeft)
  if(participants.length < 2 && timeLeft !=='Event has started!' ){
    return(
        <div className='classNotStartedWrapper'>
          <main>
            <div className='VideoHolder'>
            <video ref={userVideo} autoPlay playsInline muted={true} />
            </div>
          </main>
          <aside>
          {participants.length < 2 ? (
            <div>
            <p>
            Your class starts in  <span>
                <CountdownTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} startingTime={startingTime} />
            </span>
            </p>
             {counter ===15?<div className='noOtherMemberJoinedWrapper'>
                <span>oops! the other member did not join the class</span><br/>
                <button>end class</button>
             </div>:''}
            </div>
            ) : participants.length === 2 && !peerConnected && (
                <div>
                    <p>Waiting for peer connection...</p>
                     <span><i className="fa fa-spinner spinner" aria-hidden="true"></i></span>
                </div>
            )}
          </aside>
        </div>
    )
  }else if(participants.length===2 && timeLeft ==='Event has started!' && peerConnected===true){
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
                        {/* <li>
                        <div>
                            <div className='classInconHolder'>

                            </div>
                            <p>record</p>
                        </div>
                        </li> */}
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
                    {/* <ul>
                        <li className='sender'><p>hello</p></li>
                        <li className='sender'><p>hello what's up am stuck here</p></li>
                        <li  className='reciever'><p>hello</p></li>
                    </ul> */}
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
