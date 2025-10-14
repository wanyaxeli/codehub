import React,{useState,useEffect,useRef,useContext} from 'react'
import { useLocation,useParams,useNavigate } from 'react-router-dom'
import pic from '../assets/logoCodeHub.png'
import SubmitProjectModal from '../Components/SubmitProjectModal'
import Peer from "simple-peer";
import WherebyClass from './WherebyClass';
import { context } from '../App';
import { jwtDecode } from 'jwt-decode';
import RegisterStudentModal from '../Components/RegisterStudentModal';
import CountdownTimer from '../Components/CountdownTimer';
import axios from 'axios';
import { WherebyProvider } from "@whereby.com/browser-sdk/react";
import StudentProfilePopUp from '../Components/StudentProfilePopUp';
import Barge from '../Components/Barge';
export default function Class() {
    const [mainCss,setMainCss]=useState('fullPageMain')
    const [bookingId,setBookingId]=useState('')
    const [trailClass,setTrailClass]=useState([])
    const [asideCss,setAsideCss]=useState('closeAside')
    const [toggleChat,setToggleChat]=useState(false)
    const [toggleDisplay,setToggleDisplay]=useState('classDisplayer')
    const [card,setCard]=useState('classCardDisplayer')
    const [Videocard,setVideoCard]=useState('hideVideo')
    const [toggleClassOnJoinedUser,settoggleClassOnJoinedUser]=useState('LessConnctedUsersWrapper')
    const [mic,setToggleMic]=useState(true)
    const [cam,setToggleCam]=useState(true)
    const [notes,setNotes]=useState('')
    const [ClassType,setClassType]=useState('')
    const [chat,setChat]=useState('')
    const navigate=useNavigate()
    const [project,setProject]=useState('')
    const [Wschat,setWsChat]=useState([])
    const [toggleSideUser,settoggleSideUser]=useState('SecondUserDivWrapper')
    const [toggleInnerSideUser,setInnertoggleSideUser]=useState('sideUserDetails')
    const [connectedUsers,setconnectedUsers]=useState(2)
    const [openSharing,setOpenSharing]=useState('')
    const [openMic,setOpenMic]=useState('')
    const [openVidoe,setOpenVideo]=useState('on')
    const [code,setCode]=useState('')
    const [newStudent,setNewStudent]=useState('')
    const [timeLeft, setTimeLeft] = useState(null);
    const [studentPic,setStudentPic]=useState('')
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
    const [StudentUser_id, setStudentUser_id] = useState('');
    const [waiting, setWaiting] = useState(false);
    const [connected, setConnected] = useState([]);
    const [peerConnected, setpeerConnected] = useState(false);
    const [RemoteStream, setRemoteStream] = useState('');
    const [RemoteScreenStream, setRemoteScreenStream] = useState('');
    const [StudentId, setStudentId] = useState('');
    const [ClassName, setClassName] = useState('');
    const [openStudentProfile, setOpenStudentProfile] = useState('closeStudentProfilePopUp');
    const userVideo = useRef();
    const [studentName,setStudentName]=useState('')
    const [student,setStudent]=useState([])
    const beforeConnectionVideo = useRef();
    const [counter, setCounter] = useState(0);
    const [openStudentRegistrationform,setopenStudentRegistrationform]=useState('CloseRegisterStudentModal')
    const [sharing,setSharing]=useState(false)
    const [Usersharing,setUserSharing]=useState('')
    const partnerVideo = useRef();
    const [videoElement, setVideoElement] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const [ice, setIce] = useState([]);
    const [screen, setScreen] = useState(false);
    const [slug, setSlug] = useState('');
    const [openBadges,setOpenBadge]=useState(false)
    const [trails, setTrails] = useState(false);
    const [toggleMic,setToggleMuteMic]=useState(true)
    const [closeSharing,setCloseSharing]=useState(false)
    const [participants,setparticipants]=useState([])
    const screenVideo = useRef(null); // Remote screen video element
    const LocalscreenVideo = useRef(null); // Local screen video element
    const {classEndedfully}=useContext(context)
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
const handleShowBarges =()=>{
    setOpenBadge(true)
} 
useEffect(()=>{
    getToken()
    setToggleCam(true)
},[])
useEffect(() => {
   
    if (UserToken && trails ===false) {
      try {
        const decode = jwtDecode(UserToken);
        const {role,user_id}=decode
        setUser_id(user_id)
        setRole(role)
      } catch (error) {
        console.error("JWT Decode Error:", error);
      }
    }
  }, [UserToken]);
  const fetchIceServers = async () => {
    try {
      const response = await fetch("https://api.codingscholar.com/get-ice-servers/");
      const data = await response.json();
      return data.iceServers || []
    } catch (error) {
      console.error("Failed to fetch ICE servers:", error);
      return [];
    }
  };
  const getIceServers = async () => {
    // const iceServers =fetchIceServers()
    const iceServers =[
        {
          urls: ['turn:api.codingscholar.com:3478'],
          username: 'codingscholar',
          credential: 'codingscholar254',
        },
        {
          urls: ['stun:stun.l.google.com:19302'],
        }
      ]
    if(iceServers){
     
      setIce(iceServers)
    }
  };
//   useEffect(() => {
//     getIceServers();
//   }, [token]);
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
     function  getMedia(){
        navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
        setLocalStream(stream);
        if(beforeConnectionVideo.current){
            beforeConnectionVideo.current.srcObject = stream;
        }
        })
        .catch((error) => console.error("Error accessing media devices:", error));
     }
     function slugify(code) {
        return code
          .toString()
          .toLowerCase()
          .trim()
          .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word characters with dashes
          .replace(/^-+|-+$/g, '');  // Remove leading/trailing dashes
    }
    useEffect(() => {
        if (!code) return;
        const slug=slugify(code)
        setSlug(slug)
        // const ws = new WebSocket(`wss://localhost:8000/ws/classRoom/${code}/`);
        // const ws = new WebSocket(`wss://api.codingscholar.com/ws/classRoom/${code}/`);
        const ws = new WebSocket(`wss://api.codingscholar.com/ws/classRoom/${slug}/`);
        getMedia()
        ws.onopen = () =>{
            ws.send(JSON.stringify({type:"id",user_id}));
            setWs(ws)
        }

        ws.onmessage=(data)=>{
            const Recieveddata = JSON.parse(data.data)
            if(Recieveddata.type ==='user-joined'){
                const {users,users_count}= Recieveddata
                setparticipants(users)
            }
             else if(Recieveddata.type==='chat'){
                 const {message}= Recieveddata
               
                setWsChat(pre=>([...pre,message]))
            } 
            else if(Recieveddata.type === "offer"){
                if (String(Recieveddata.target) === String(user_id)) {  
                    const isRenegotiation = Recieveddata.renegotiation;
                    handleOffer(ws, Recieveddata.offer, Recieveddata.sender, Recieveddata.target, isRenegotiation);
                }
            }
            else if(Recieveddata.type === "new_initiator"){
                 setparticipants(Recieveddata.users)
                 setpeerConnected(false)
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
        if(participants && participants.length===2 && timeLeft ==='Event has started!' && user_id && ws &&  ice.length > 0){
            const InitiatorUser = participants.find(user =>user.initiator === true);
            const initiatorId=InitiatorUser.userId
            const targetUser = participants.find(user =>user.initiator ===false);
            if (InitiatorUser && String(initiatorId) === String(user_id)){
                    initiateCall(ws, targetUser, initiatorId);
                    console.log('true initiator', InitiatorUser);
            }
        }else{
            console.log("start up error",ice)
        }
    }
    // useEffect(()=>{
    //     startCall()
    // },[user_id,timeLeft,participants,ice])
    useEffect(() => {
        if (
          beforeConnectionVideo.current && 
          !beforeConnectionVideo.current.srcObject
        ) {
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
              if (beforeConnectionVideo.current) {
                beforeConnectionVideo.current.srcObject = stream;
              }
            })
            .catch((error) =>
              console.error("Error accessing media devices:", error)
            );
        }
    }, [beforeConnectionVideo,participants]);
    function initiateCall(socket, targetUser, id) {
        if (localStream && targetUser && id && socket && socket.readyState === WebSocket.OPEN && ice) {
            const peerConfig = {iceServers:ice};
            // const peerConfig = {
            //     iceServers: [
            //       {
            //         urls: ['turn:api.codingscholar.com:3478'],
            //         username: '1749900000', // future timestamp (good)
            //         credential: 'W9StrTF+5uWbTej1m0EaEDHF7S0=', // HMAC with correct secret (good)
            //       },
            //       {
            //         urls: ['stun:stun.l.google.com:19302'],
            //       }
            //     ]
            //   };
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
                setpeerConnected(true)
            });
    
            initiator.on("stream", (remoteStream) => {
                if (remoteStream) {
                    setRemoteStream(remoteStream);
                }
            });
    
            setPeer(initiator);
            peerRef.current = initiator;
        } else {
            console.log("WebSocket not connected");
        }
    }
    useEffect(()=>{
    if (localStream &&peerConnected &&  userVideo.current){
        userVideo.current.srcObject = localStream;
    }
    },[localStream,peerConnected,userVideo])

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
            if(stream){
                setRemoteScreenStream(stream)
                setScreen(true)
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
    useEffect(()=>{
        if (ws && ws.readyState === WebSocket.OPEN && user_id && sharing===false && closeSharing===true){
            ws.send(JSON.stringify({ 
                type: "stop_sharing",
                sharing: false,
            }));
        }
    },[closeSharing])
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
    function getTrailClass(){
        if(bookingId){
            const code = bookingId
            const url=`https://api.codingscholar.com/trialClass/${code}`
            axios.get(url)
            .then(res=>{
                const data=res.data
                const timeUtcZone=formatToLocalTime(data.datetime_utc)
                setTrailClass([res.data])
                setStartingTime(data.datetime_utc)
            })
            .catch(error=>console.log(error))
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
    useEffect(()=>{
        getTrailClass()
    },[bookingId])
    useEffect(()=>{
        const { state } = location || {}; // Ensure location is not undefined
        const { id, time ,student,studentPic,title,studentName,studentUserId,classType,notes,studentDetails} = state || {};
        if (state && classType==='NormalClass') {
            setCode(id);  // Set the state if it exists
            setStartingTime(time);
            if(notes){
                setNotes(notes)
            }
            if(studentUserId){
                setStudentUser_id(studentUserId)
            }
           
           if(student){
            setStudentId(student)
           }
           if(studentPic){
            setStudentPic(studentPic)
           }
           if(studentName){
               setStudentName(studentName)
           }
           if(studentDetails){
            setStudent(studentDetails)
           }
           setClassType('NormalClass')
          if(title){
            setClassName(title)

          }
        }else if(state && classType ==='trial'){
            const{id,role,booking_id,code}=state
           
            function normalizeId(id) {
                return String(id).includes("e")
                  ? Number(id).toLocaleString("fullwide", { useGrouping: false })
                  : String(id);
              }
            let roomName = normalizeId(code);
            setUser_id(id)
            setBookingId(booking_id)
            setCode(code)
            setTrails(true)
            setRole(role)
            setStudentUser_id(roomName)
            setClassType('trial')
        }
        // startLocalStream()
    },[location])
    useEffect(() => {
        setMainCss('fullPageMain'); // This overrides the initial state
        setAsideCss('closeAside')
        setToggleMic(true)
      }, []); // This runs on mount
     const handleEndClass=()=>{
        if(StudentId){
            navigate('/End Class',{state:{code:code,StudentId:StudentId,classTypes:'normal'}})
        }
     }
    useEffect(()=>{
        if(userVideo.current===null){
            getMedia()
        }
    },[userVideo])
    useEffect(()=>{
        if(partnerVideo.current===null){
           startCall()
        }
    },[partnerVideo])
    useEffect(()=>{
    if(classEndedfully && role==='student'){
        navigate('/student/dashboard/Details')
    }
    },[classEndedfully])
    useEffect(() => {
        let interval;
        if (timeLeft === "Event has started!") {
            interval = setInterval(() => {
                setCounter(prev => prev + 1);
            }, 60000); // Update every 1 minute
        }

        return () => clearInterval(interval); // Cleanup interval
    }, [timeLeft])
   function SubmitProeject(){
    if(token){
        const url ='https://api.codingscholar.com/Project/'
        axios.post(url,{projectLink:project},{headers:{
            'Authorization':`Bearer ${token}`
        }})
        .then(res=>{
            console.log(res.data)
        })
        .catch(error=>console.log(error))
    }
   }
   const handleOpenProfile=()=>{
    setOpenStudentProfile('StudentProfilePopUp')
   }
   const handletoNotes =(notes)=>{
    window.open(`https://res.cloudinary.com/dbxsncq5r/${notes}`, "_blank");
   }
   const handleStudent =()=>{
    setopenStudentRegistrationform('RegisterStudentModal')
   }
   if(timeLeft !=='Event has started!'){
    return (
        <div className='classNotStartedWrapper'>
                   <main>
                     <div className='VideoHolder'>
                     <video ref={beforeConnectionVideo} autoPlay playsInline muted={true} />
                     <div className='VideoHolderCover'>
                        <div  className='VideoHolderCoverContainer'>
                             <div className='ClassTimerWRapper'>
                                <p>Your class starts in  <span>
                                <CountdownTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} startingTime={startingTime} />
                                </span>
                                </p>
                             </div>
                        </div>
                     </div>
                     </div>
                   </main>
                   <aside>
                    <div>
                     <p>Your class starts in  <span>
                         <CountdownTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} startingTime={startingTime} />
                        </span>
                     </p>
                    </div>
                 </aside>
        </div>
    )
   }else
   return (
        <>
        <div className='ClassWRapper'>
            {/* <div className='ClassHeader'>
                <div className='ClassHeaderWrapper'>
                    
                </div>
            </div> */}
            <div className='ClassHeader'>
              <div className='ClassHeaderWrapper'>
                <div className='classHeaderLogowrapper'>
                    <div className='logoContainer'>
                        <img src={pic}/>
                    </div>
                    <div className='ClassnotesDisplayerWrapper'>
                       {notes && <span onClick={()=>handletoNotes(notes.url)}>{notes.title}</span>}
                    </div>
                </div>
                <div className='classHeaderBtnwrapper'>
                    <ul>
                        {role ==='teacher'? <li className='barges'  onClick={handleShowBarges}>badges</li>:''}
                        {ClassType==='NormalClass' && role==='teacher' && studentName?<li onClick={handleOpenProfile} className='studentNameHolder'>{studentName}</li>:''}
                        {role ==='student'? <li onClick={handleSubmitProject}>submit project</li>:''}
                        {ClassType==='trial' && role==='teacher'?<li className='studentBtn' onClick={handleStudent}>student</li>:''}
                        {ClassType==='NormalClass' && role==='teacher' ||ClassType==='trial' && role==='teacher' ?<li className='markClass' onClick={handleEndClass}>mark class</li>:''}
                        {/* <li onClick={handleOpenChat}>chat</li> */}
                        { <StudentProfilePopUp studentPic={studentPic} student={student} openStudentProfile={openStudentProfile} setOpenStudentProfile={setOpenStudentProfile}/>}
                        {openBadges && <Barge StudentId={StudentId} newStudent={newStudent} student={student} setOpenBadge={setOpenBadge}/>}
                    </ul>
                </div>
                </div>
            </div>
            
        </div>
        <WherebyProvider>
        <WherebyClass role={role} StudentUser_id={StudentUser_id} code={slug}/>
        </WherebyProvider>
        {openSubmitModal && (
  ClassName && ClassName !== 'undefined' ? (
    <SubmitProjectModal
      StudentId={StudentId}
      ClassName={ClassName}
      setProject={setProject}
      SubmitProeject={SubmitProeject}
      project={project}
      openSubmitModal={openSubmitModal}
      setopenSubmitModal={setopenSubmitModal}
    />
  ) : (
    bookingId && bookingId !== 'undefined' && (
      <SubmitProjectModal
        bookingId={bookingId}
        openSubmitModal={openSubmitModal}
        setopenSubmitModal={setopenSubmitModal}
      />
    )
  )
)}
{trailClass &&  <RegisterStudentModal setNewStudent={setNewStudent}  trailClass={trailClass}  openStudentRegistrationform={openStudentRegistrationform} setopenStudentRegistrationform={setopenStudentRegistrationform}/>}
        </>
)
//   if(participants.length <= 2 && timeLeft !=='Event has started!' || participants.length===1 && timeLeft ==='Event has started!'){
//     return(
//         <div className='classNotStartedWrapper'>
//           <main>
//             <div className='VideoHolder'>
//             <video ref={beforeConnectionVideo} autoPlay playsInline muted={true} />
//             <div className='VideoHolderCover'>
//                <div  className='VideoHolderCoverContainer'>
//                     <div className='ClassTimerWRapper'>
//                         {timeLeft==='Event has started!'?<p>Waiting for the other member to join...</p>: <p>
//                         Your class starts in  <span>
//                             <CountdownTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} startingTime={startingTime} />
//                         </span>
//                         </p>}
//                         {counter ===15 && role ==='teacher'?<div className='noOtherMemberJoinedWrapper'>
//                             <span>oops! the other member did not join the class</span><br/>
//                             <button>end class</button>
//                         </div>:''}
//                     </div>
//                </div>
//             </div>
//             </div>
//           </main>
//           <aside>
//             <div>
//             {timeLeft==='Event has started!'?<p>Waiting for the other member to join...</p>: <p>
//             Your class starts in  <span>
//                 <CountdownTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} startingTime={startingTime} />
//             </span>
//             </p>}
//              {counter ===15 && role ==='teacher'?<div className='noOtherMemberJoinedWrapper'>
//                 <span>oops! the other member did not join the class</span><br/>
//                 <button>end class</button>
//              </div>:''}
//             </div>
//           </aside>
//         </div>
//     )
//   }
// //   else if(participants.length===2 && timeLeft ==='Event has started!' || participants.length===2 && timeLeft ==='Event has started!' && peerConnected===true && !userVideo && !partnerVideo){
// //     return(
// //         <div className='classNotStartedWrapper'>
// //             <main>
// //             <div className='VideoHolder'>
// //             {/* <video ref={userVideo} autoPlay playsInline muted={true} /> */}
// //             <video ref={beforeConnectionVideo} autoPlay playsInline muted={true} />
// //             </div>
// //             </main>
// //             <aside>
// //                 <div className='waitingForConnectionWrapper'>
// //                     <p>Connecting...</p>
// //                     <span><i className="fa fa-spinner spinner" aria-hidden="true"></i></span>
// //                 </div>
// //             </aside>
// //         </div>
// //     )
// //   }
//   else if(participants.length===2 && timeLeft ==='Event has started!'){
//     return (
//         <>
//           <WherebyProvider>
//           <WherebyClass code={slug}/>
//           </WherebyProvider>
//         </>
//         // <div className='ClassWRapper'>
//         //     <div className='ClassHeader'>
//         //     <div className='ClassHeaderWrapper'>
//         //         <div className='classHeaderLogowrapper'>
//         //             <div className='logoContainer'>
//         //                 <img src={pic}/>
//         //             </div>
//         //             <div className=''>

//         //             </div>
//         //         </div>
//         //         <div className='classHeaderBtnwrapper'>
//         //             <ul>
//         //                 {role ==='student'? <li onClick={handleSubmitProject}>submit project</li>:''}
//         //                 {ClassType ==='trial' && role==='teacher'?<li onClick={handleStudent}>student</li>:''}
//         //                 <li onClick={handleOpenChat}>chat</li>
//         //             </ul>
//         //         </div>
//         //         <div className='classheaderBtnActionwrapper'>
//         //             {role==='teacher'?<div className='endclassBtnwrapper'>
//         //                 <button onClick={handleEndClass}>end class</button>
//         //             </div>:''}
//         //         </div>
//         //     </div>
//         //     </div> 
//         //     <div className='classContainer'>
//         //     <main className={mainCss}>
//         //         <div className='classVideoImageWrapper'>
//         //                 <div className={Videocard}>
//         //                     {Usersharing === user_id ? (
//         //                         <video ref={LocalscreenVideo} autoPlay playsInline muted />
//         //                     ) : 
//         //                     <video ref={screenVideo} autoPlay playsInline muted />
//         //                     }
//         //                 </div>
//         //                 {connectedUsers>2?<div className={toggleDisplay}>
//         //                     <div className={card}>
//         //                         <div className='cardShortnameWrapper'>
//         //                             <p>e</p>
//         //                         </div>
//         //                     </div>
//         //                     <div className={card}>
//         //                     <div className='cardShortnameWrapper'>
//         //                             <p>w</p>
//         //                         </div>
//         //                     </div>
//         //                     <div className={card}>
//         //                     <div className='cardShortnameWrapper'>
//         //                             <p>s</p>
//         //                         </div>
//         //                     </div>
//         //                 </div>:<div className={toggleClassOnJoinedUser}>
//         //                     <div className='fistUserDivWrapper'>
//         //                     <video ref={partnerVideo} autoPlay playsInline muted={false}/>
//         //                     </div>
//         //                     <div className={toggleSideUser}>
//         //                         {cam ===true ? (
//         //                             <div className='InnerSecondUserDivWrapper'>
//         //                             <video ref={userVideo} autoPlay playsInline muted={toggleMic} />
//         //                             </div>
//         //                         ) : (
//         //                             <div className='InnerSecondUserDivWrapper'>
//         //                             <div className={toggleInnerSideUser}>
//         //                                 <p>e</p>
//         //                             </div>
//         //                             </div>
//         //                         )}
//         //                         {/* <video ref={userVideo} autoPlay playsInline muted={toggleMic} /> */}
//         //                     </div>
//         //                 </div>}
//         //         </div>
//         //     <div className='mainClassBtnActionHolder'>
//         //             <ul>
//         //                 <li>
//         //                     <div>
//         //                         <div className={`classInconHolder ${openVidoe}`} onClick={handleToggleVideo}>
//         //                         <i className="fa fa-video-camera" aria-hidden="true"></i>
//         //                         {/* <i className="fi fi-rr-video-slash"></i> */}
//         //                         </div>
//         //                         <p>cam</p>
//         //                     </div>
//         //                 </li>
//         //                 <li>
//         //                 <div>
//         //                     <div className={`classInconHolder ${openMic}`} onClick={handleToggleMic}>
//         //                     {mic===true?<i className="fa fa-microphone" aria-hidden="true"></i>:<i className="fa fa-microphone-slash" aria-hidden="true"></i>}
//         //                     </div>
//         //                     <p>mic</p>
//         //                 </div>
//         //                 </li>
//         //                 <li className='shareScreenHolder'>
//         //                 <div>
//         //                     <div onClick={handleShareScreen} className={`classInconHolder ${Usersharing &&Usersharing === user_id ?openSharing:""}`}>
//         //                     <i className="fa fa-desktop" aria-hidden="true"></i>
//         //                     </div>
//         //                 {sharing && Usersharing &&Usersharing ===user_id? <p>stop  share</p>: <p>share</p>}
//         //                 </div>
//         //                 </li>
//         //             </ul>
//         //     </div>
//         //     </main>
//         //     <aside className={asideCss}>
//         //         <div className='chatWrapper'>
//         //             <div className='chatContainer'>
//         //                 {Wschat.map((chat,i)=>{
//         //                     return(
//         //                         <ul key={i}>
//         //                             {chat.user===user_id?<li className='sender'><p>{chat.text}</p></li>:
//         //                             <li className='reciever'><p>{chat.text}</p></li>}
//         //                     </ul>
//         //                     )
//         //                 })}
//         //             </div>
//         //             <div className='chatInputWrapper'>
//         //                 <input onChange={handleChat} value={chat} placeholder='Chat...'/>
//         //                 <button onClick={handleSendChat}><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
//         //             </div>
//         //         </div>
//         //     </aside>
//         //     </div>
//         //     {trailClass &&  <RegisterStudentModal trailClass={trailClass}  openStudentRegistrationform={openStudentRegistrationform} setopenStudentRegistrationform={setopenStudentRegistrationform}/>}
//         // {StudentId? openSubmitModal &&  <SubmitProjectModal StudentId={StudentId} ClassName={ClassName} setProject={setProject} SubmitProeject={SubmitProeject} project={project} openSubmitModal={openSubmitModal} setopenSubmitModal={setopenSubmitModal}/> :
//         //  openSubmitModal &&  <SubmitProjectModal bookingId={bookingId} openSubmitModal={openSubmitModal} setopenSubmitModal={setopenSubmitModal}/>
//         // }
//         // </div>
//     )
//     }else{
//         return(
//             <div className='errorWrapper'>
//             <p>Loading ...</p>
//             </div>
//         )
//     }
}
