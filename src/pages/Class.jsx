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
    const [user_id, setUser_id] = useState('');
    const [waiting, setWaiting] = useState(false);
    const [connected, setConnected] = useState([]);
    const [RemoteStream, setRemoteStream] = useState('');
    const userVideo = useRef();
    const partnerVideo = useRef();
    const [videoElement, setVideoElement] = useState(null);
    const [localStream, setLocalStream] = useState(null);
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
                if(users_count>1){
                    setWaiting(false)
                    const user = users.find(user => String(user.userId) === String(user_id));
                    const targetUser = users.find(user => String(user.userId) !== String(user_id));
                    console.log('initiator',user)
                    if (user && user.initiator===true ){
                        initiateCall(ws,targetUser)
                        console.log('true initiator',user)
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
                if (String(Recieveddata.target) ===String(user_id)) {
                    handleOffer(ws, Recieveddata.offer);
                }
            }
            else if(Recieveddata.type === "answer"){
                console.log('recanswer',Recieveddata)
                if (peer) {
                    peer.signal(Recieveddata.answer);
                  }
            }
            // const users =Recieveddata.users
            console.log('mes',Recieveddata)
        }
     return () => {
            ws.close();
        };
    },[code,user_id]);
    console.log("WebSocket instance:", ws);
 
    function initiateCall(socket,targetUser){
        console.log("WebSocket readyState initiate:", socket?.readyState);
        console.log("target use:",targetUser);
       if (localStream && targetUser && socket && socket.readyState === WebSocket.OPEN){
        const initiator = new Peer({ initiator: true, trickle: false, stream: localStream });
        initiator?.on("signal", (signal) => {
            // socket.send(JSON.stringify({ type: "offer", signal }));
         console.log('offers',signal)
        // socket.send(JSON.stringify({ type: "offer", signal }));
        socket.send(JSON.stringify({ type: "offer", signal, target: targetUser.userId }))
        });
        initiator?.on("stream", (remoteStream) => {
            console.log('initiator video ',remoteStream)
            partnerVideo.current.srcObject = remoteStream;
        });

        setPeer(initiator);
       } else{
        console.log("ws not connected")
       }
    }
    const handleOffer = (socket,signal) => {
        if (localStream===null) return;
        console.log("I am the receiver");
        const responder = new Peer({ initiator: false, trickle: false, stream: localStream });

        responder?.on("signal", (signal) => {
            
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ type: "answer", signal }));
                console.log("Generated ans:", signal);
            } else {
                console.log("WebSocket not connected yet.");
            }
        });

        responder?.signal(signal);
        console.log("receiver",responder);
        responder?.on("stream", (remoteStream) => {
            if (remoteStream){
                console.log("partnerdvid",remoteStream)
                setRemoteStream(remoteStream)
            }
            // if (partnerVideo.current  ) {
            //     partnerVideo.current.srcObject = remoteStream;
            //     console.log("partnerdvid",remoteStream)
            //     console.log("partnerdvid track",remoteStream.getTracks())
            //     console.log("partnerInner",partnerVideo)
            //     partnerVideo.current.play().catch(error => {
            //         console.error("Playback error:", error);
            //     });
               
            //   }
            
        });

        setPeer(responder);
    };
    useEffect(() => {
        if (peer) {
            console.log("Peer object updateds:", peer);
        }
    }, [peer]);
    useEffect(() => {
        if (!RemoteStream || !partnerVideo.current) return;
    
        const videoElement = partnerVideo.current;
    
        console.log("Video element is ready:", videoElement);
        console.log("Remote Stream:", RemoteStream);
        console.log("Tracks:", RemoteStream.getTracks());
    
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
                    .catch(error => console.error("Playback error:", error));
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
        console.log("partner",partnerVideo)
    },[partnerVideo])
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
                        <video ref={partnerVideo} autoPlay playsInline />
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
