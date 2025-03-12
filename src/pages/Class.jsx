import React,{useState,useEffect,useRef} from 'react'
import { useLocation,useParams } from 'react-router-dom'
import pic from '../assets/logoCodeHub.png'
import SubmitProjectModal from '../Components/SubmitProjectModal'
import Peer from "simple-peer";
import { jwtDecode } from 'jwt-decode';
export default function Class() {
    const [mainCss,setMainCss]=useState('fullPageMain')
    const [asideCss,setAsideCss]=useState('closeAside')
    const [toggleChat,setToggleChat]=useState(false)
    const [toggleDisplay,setToggleDisplay]=useState('classDisplayer')
    const [card,setCard]=useState('classCardDisplayer')
    const [Videocard,setVideoCard]=useState('hideVideo')
    const [toggleClassOnJoinedUser,settoggleClassOnJoinedUser]=useState('LessConnctedUsersWrapper')
    const [mic,setToggleMic]=useState(true)
    const [cam,setToggleCam]=useState(false)
    const [chat,setChat]=useState('')
    const [Wschat,setWsChat]=useState([])
    const [toggleSideUser,settoggleSideUser]=useState('SecondUserDivWrapper')
    const [toggleInnerSideUser,setInnertoggleSideUser]=useState('sideUserDetails')
    const [connectedUsers,setconnectedUsers]=useState(2)
    const [openSharing,setOpenSharing]=useState('')
    const [openMic,setOpenMic]=useState('')
    const [openVidoe,setOpenVideo]=useState('on')
    const [code,setCode]=useState('')
    const [openSubmitModal,setopenSubmitModal]=useState(false)
    const location = useLocation()
    const [isConnected, setIsConnected] = useState(false);
    const [ws, setWs] = useState(null);
    const { name, token } = useParams();
    const [UserToken, setToken] = useState('');
    const [role, setRole] = useState('');
    const [socket, setSocket] = useState(null);
    const [peer, setPeer] = useState(null);
    const peerRef = useRef(null);
    const [user_id, setUser_id] = useState('');
    const [waiting, setWaiting] = useState(false);
    const [connected, setConnected] = useState([]);
    const [RemoteStream, setRemoteStream] = useState('');
    const userVideo = useRef();
    const partnerVideo = useRef();
    const [videoElement, setVideoElement] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const [ice, setIce] = useState([]);
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
    console.log("Usertoken:", UserToken);
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
    function tunOnMic(){
        if (localStream !=null) {
            localStream.getAudioTracks().forEach((track) => {
              track.enabled = true;
            });}
            else{
                console.log('no steam')
            }
   }
    function tunOFMic(){
        if (localStream !=null) {
            localStream.getAudioTracks().forEach((track) => {
              track.enabled = false;
            });
        }
    }
    function turnOnVideo() {
        // if (!localStream) return;
        // localStream.getVideoTracks().forEach((track) => (track.enabled = true));
    }
    
    function turnOffVideo() {
        // if (!localStream) return;
        // localStream.getVideoTracks().forEach((track) => (track.enabled = false));
    }
     function hasUserMedia() { 
   //check if the browser supports the WebRTC 
   return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || 
      navigator.mozGetUserMedia); 
} 
    useEffect(() => {
        if (!code) return;
    
        const ws = new WebSocket(`ws://localhost:8000/ws/classRoom/${code}/`);
        console.log('innerws',ws)


        navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
        setLocalStream(stream);
        if (userVideo.current) userVideo.current.srcObject = stream;
        })
        .catch((error) => console.error("Error accessing media devices:", error));
        ws.onopen = () =>{
            console.log("WebSocket connected");
            ws.send(JSON.stringify({type:"id",user_id}));
            setWs(ws)
        }

        ws.onmessage=(data)=>{
            const Recieveddata = JSON.parse(data.data)
            if(Recieveddata.type ==='user-joined'){
                const {users,users_count}= Recieveddata
                console.log('user number count',users_count)
                if(users_count && users_count===2){
                    setWaiting(false)
                    const InitiatorUser = users.find(user =>user.initiator === true);
                    const initiatorId=InitiatorUser.userId
                    const targetUser = users.find(user =>user.initiator ===false);
                    console.log('non initiator',targetUser)
                    console.log('user in',users)
                    if (InitiatorUser && String(initiatorId) === String(user_id)){
                        initiateCall(ws,targetUser,initiatorId)
                        console.log('true initiator',InitiatorUser)
                    }
                    }else{
                        setWaiting(true)
                    }
            }
             else if(Recieveddata.type==='chat'){
                 const {message}= Recieveddata
                console.log('chats',message)
                setWsChat(pre=>([...pre,message]))
            } 
            else if(Recieveddata.type === "offer"){
                // handleOffer(ws,Recieveddata.signal);
                if (String(Recieveddata.target) === String(user_id)) {  // Prevent duplicate handling
                    handleOffer(ws,Recieveddata.offer,Recieveddata.sender,Recieveddata.target);
                }
            }
            else if(Recieveddata.type === "answer"){
                console.log('recanswer',Recieveddata)
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
                console.log("Received ICE candidates:", Recieveddata);
                console.log('peer obj',peerRef)
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
            // const users =Recieveddata.users
            console.log('mes',Recieveddata)
        }
     return () => {
            ws.close();
        };
    },[code,user_id,ice]);
    console.log("WebSocket instance:", ws);
 
    function initiateCall(socket, targetUser, id) {
        if (localStream && targetUser && id && socket && socket.readyState === WebSocket.OPEN && ice) {
            const peerConfig = {iceServers:ice};
            const initiator = new Peer({ initiator: true, trickle: true, stream: localStream, config: peerConfig });
    
            initiator.on("error", err => console.log("peererror", err));
    
            initiator.on("signal", (signal) => {
                if (signal.candidate) {
                    socket.send(JSON.stringify({ type: "candidate", candidate: signal, sender: id, target: targetUser.userId }));
                } else {
                    socket.send(JSON.stringify({ type: "offer", signal, sender: id, target: targetUser.userId }));
                }
            });
    
            initiator.on("connect", () => {
                console.log("Initiator: Peer connected successfully!");
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
    const handleOffer = (socket, signal, targetID,senderId) => {
        if (!localStream || !ice) return;
    
        console.log("I am the receiver", signal);
        const peerConfig = { iceServers: ice };
        const responder = new Peer({ initiator: false, trickle: true, stream: localStream, config: peerConfig });
    
        responder.on("connect", () => {
            console.log("Responder: Peer connected successfully!");
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
    useEffect(() => {
        if (peerRef) {
            console.log("Peer object updated:", peerRef);
        }
    }, [peerRef]);
    // useEffect(() => {
    //     if (!RemoteStream || !partnerVideo.current) return;
    
    //     const videoElement = partnerVideo.current;
    //     const videoTracks = RemoteStream.getVideoTracks();
    
    //     if (videoTracks.length === 0) {
    //         console.error("No video tracks found in RemoteStream.");
    //         return;
    //     }
    
    //     console.log("Attaching video track:", videoTracks[0]);
    
    //     // Create a new MediaStream with only the video track
    //     const newStream = new MediaStream();
    //     newStream.addTrack(videoTracks[0]);
    
    //     videoElement.srcObject = newStream;
    
    //     setTimeout(() => {
    //         const playPromise = videoElement.play();
    //         if (playPromise !== undefined) {
    //             playPromise.catch(error => console.error("Playback error:", error));
    //         }
    //     }, 100);
    // }, [RemoteStream]);
    useEffect(() => {
        if (!RemoteStream || !partnerVideo.current) return;
    
        const videoElement = partnerVideo.current;
    
        console.log("Video element is ready:", videoElement);
        console.log("Remote Stream:", RemoteStream);
        console.log("Tracks:", RemoteStream.getTracks());
        console.log("Video Tracks:", RemoteStream.getVideoTracks());
        console.log("Audio Tracks:", RemoteStream.getAudioTracks());
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
    // useEffect(()=>{
        console.log("partner vid",partnerVideo)
    // },[partnerVideo])
    useEffect(()=>{
        const {state}=location
        if (state) {
            setCode(state); // Use the state if it exists
          } 
        // startLocalStream()
    },[location])
    useEffect(() => {
        setMainCss('fullPageMain'); // This overrides the initial state
        setAsideCss('closeAside')
        setToggleMic(true)
      }, []); // This runs on mount
      const handleToggleVideo =()=>{
        if (openVidoe===''){
            setOpenVideo('on')
            turnOnVideo()
         }else{
            setOpenVideo('')
            turnOffVideo()
         }
      }
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
      const handleToggleMic =()=>{
         if (openMic===''){
            setOpenMic('on')
            tunOnMic()
            setToggleMic(true)
         }else{
            setOpenMic('')
            setToggleMic(false)
            tunOFMic()
         }
      }
     
    const handleShareScreen=()=>{
    if(connectedUsers>2){
        if(toggleDisplay==='classDisplayer'){
            setToggleDisplay('classImageDisplayer')
            setOpenSharing('on')
            setVideoCard('shareVideoWrapper')
         }else{
            setToggleDisplay('classDisplayer')
            setVideoCard('hideVideo')
            setOpenSharing('')
         }
         if(card==='classCardDisplayer'){
            setCard('classCard')
         }else{
            setCard('classCardDisplayer')
         }
    }else{
        if(toggleClassOnJoinedUser==='LessConnctedUsersWrapper'){
            settoggleClassOnJoinedUser('classImageDisplayer')
            setOpenSharing('on')
            setInnertoggleSideUser('InnersideUserDetails')
            setVideoCard('shareVideoWrapper')
            settoggleSideUser('fistUserDivWrapper')
        }else {
            settoggleClassOnJoinedUser('LessConnctedUsersWrapper')
            setOpenSharing('of')
            setVideoCard('hideVideo')
            settoggleSideUser('SecondUserDivWrapper') 
            setInnertoggleSideUser('sideUserDetails')
        }
    }
    }
   console.log('uservide',userVideo)
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
                    <div className={Videocard}></div>
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
                            {userVideo ? (
                                <video ref={userVideo} autoPlay playsInline muted />
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
                        <div onClick={handleShareScreen} className={`classInconHolder ${openSharing}`}>
                        <i className="fa fa-desktop" aria-hidden="true"></i>
                        </div>
                        <p>share</p>
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
       {openSubmitModal &&  <SubmitProjectModal openSubmitModal={openSubmitModal} setopenSubmitModal={setopenSubmitModal}/> }
    </div>
  )
}
