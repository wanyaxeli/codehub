import React,{useState,useEffect,useRef} from 'react'
import { useLocation,useParams } from 'react-router-dom'
import pic from '../assets/logoCodeHub.png'
import SubmitProjectModal from '../Components/SubmitProjectModal'
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
    const [toggleSideUser,settoggleSideUser]=useState('SecondUserDivWrapper')
    const [toggleInnerSideUser,setInnertoggleSideUser]=useState('sideUserDetails')
    const [connectedUsers,setconnectedUsers]=useState(2)
    const [openSharing,setOpenSharing]=useState('')
    const [openMic,setOpenMic]=useState('on')
    const [openVidoe,setOpenVideo]=useState('on')
    const [code,setCode]=useState('')
    const [openSubmitModal,setopenSubmitModal]=useState(false)
    const location = useLocation()
    const [isConnected, setIsConnected] = useState(false);
    const [ws, setWs] = useState(null);
    const [trial, setTrial] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const { name, token } = useParams();
    const handleOpenChat=()=>{
        if(toggleChat===false){
            setToggleChat(true)
        }else{
            setToggleChat(false) 
        }
    }
    // const iceServers = {
    //     iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    //   };
    const handleSubmitProject =()=>{
        setopenSubmitModal(true)
    }
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
    function toggleMic(){
        localStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    }
    function turnOnVideo() {
        if (!localStream) return;
        localStream.getVideoTracks().forEach((track) => (track.enabled = true));
    }
    
    function turnOffVideo() {
        if (!localStream) return;
        localStream.getVideoTracks().forEach((track) => (track.enabled = false));
    }
    const startWebRTCConnection = async (remoteSocket) => {
        if (!localStream) {
            console.error("localStream is not available. Make sure it's initialized before calling startWebRTCConnection.");
            return;
        }
        const config = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
        const pc = new RTCPeerConnection(config);
        console.log('peers',pc)
        setPeerConnection(pc);
    
        localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
    
        pc.ontrack = (event) => {
            if (remoteVideoRef.current) {
                console.log("Received remote stream:", event.streams[0]);
                remoteVideoRef.current.srcObject = event.streams[0];
                console.log("Remote stream added:", event.streams[0]);
            } else {
                console.warn("remoteVideoRef is not ready yet.");
            }
        };
    
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            ws.send(JSON.stringify({ type: "ice-candidate", candidate: event.candidate }));
          }
        };
    
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        ws.send(JSON.stringify({ type: "offer", offer }));
      };
      const handleWebSocketMessage = async (data) => {
        console.log('dataws',data)
        if (data.type === "existing_users") {
            console.log('existing_user',data.users)
          data.users.forEach(user => startWebRTCConnection(user))
        }
        if (!peerConnection) return;
    
        if (data.type === "offer") {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          ws.send(JSON.stringify({ type: "answer", answer }));
        }
    
        if (data.type === "answer") {
            console.log('answer',data.answer)
            if (peerConnection.signalingState !== "stable") {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
            }
        //   await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
        }
    
        if (data.type === "ice-candidate") {
          await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      };
      const startLocalStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(stream);
    
            // Retry setting the video if the ref is not ready
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                    // clearInterval(interval); // Stop checking once set
                } else {
                    console.warn("Waiting for localVideoRef...");
                }
        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
    };
    useEffect(() => {
        if (code) {
            const ws = new WebSocket(`ws://localhost:8000/ws/classRoom/${code}/`);
    
            ws.onopen = () => {
                startLocalStream();
                console.log("WebSocket connected");
            };
    
            ws.onclose = () => {
                console.log("WebSocket disconnected");
            };
    
            setWs(ws);
    
            // Cleanup function to close WebSocket when component unmounts or `code` changes
            return () => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.close(); // Properly close WebSocket
                }
                console.log("WebSocket connection closed in cleanup");
            };
        }
    }, [code]);
    useEffect(()=>{
        const {state}=location
        if (state) {
            setCode(state); // Use the state if it exists
          } 
        // startLocalStream()
    console.log('class',state)
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
            startLocalStream()
         }else{
            setOpenVideo('')
            turnOffVideo()
         }
      }
      const handleToggleMic =()=>{
         if (openMic===''){
            setOpenMic('on')
            toggleMic()
            setToggleMic(true)
         }else{
            setOpenMic('')
            setToggleMic(false)
            toggleMic()
         }
      }
      useEffect(() => {
        if (localStream && localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);
    useEffect(() => {
        if (ws && localStream) {
          ws.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            console.log("Received WebSocket message:", data);
            handleWebSocketMessage(data);
          };
        }
    }, [ws, peerConnection,localStream]);
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
    console.log('con',remoteVideoRef.current)
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
                            <video ref={remoteVideoRef} autoPlay /> <div className='MainUserDetails'>
                                <p>w</p>
                            </div>
                        </div>
                        <div className={toggleSideUser}>
                            <div className='InnerSecondUserDivWrapper'>
                            {localStream && localStream.getVideoTracks().some(track => track.enabled) ? (
                                <video ref={localVideoRef} autoPlay muted />
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
                <div className='chatContainer'></div>
                <div className='chatInputWrapper'>
                    <input placeholder='Chat...'/>
                    <button><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                </div>
             </div>
          </aside>
        </div>
       {openSubmitModal &&  <SubmitProjectModal openSubmitModal={openSubmitModal} setopenSubmitModal={setopenSubmitModal}/> }
    </div>
  )
}
