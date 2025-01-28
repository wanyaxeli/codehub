import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import pic from '../assets/logoCodeHub.png'
import SubmitProjectModal from '../Components/SubmitProjectModal'
export default function Class() {
    const [mainCss,setMainCss]=useState('fullPageMain')
    const [asideCss,setAsideCss]=useState('closeAside')
    const [toggleChat,setToggleChat]=useState(false)
    const [mic,setToggleMic]=useState(true)
    const [cam,setToggleCam]=useState(true)
    const [className,setClassName]=useState('')
    const [openSubmitModal,setopenSubmitModal]=useState(false)
    const location = useLocation()
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
    console.log('aks',mainCss)
    useEffect(()=>{
        const {state}=location
        setClassName(state)
    console.log('locate',state)
    },[])
    useEffect(() => {
        setMainCss('fullPageMain'); // This overrides the initial state
        setAsideCss('closeAside')
        setToggleMic(true)
      }, []); // This runs on mount
      const handleToggleMic =()=>{
        if(mic===false){
            setToggleMic(true)
            }else{
            setToggleMic(false)
         }
      }
    //   useEffect(()=>{
    //   
    //   },[mic])
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
            <div className='classImageDisplayer'></div>
           <div className='mainClassBtnActionHolder'>
                <ul>
                    <li>
                        <div>
                            <div className='classInconHolder' >
                            <i className="fa fa-video-camera" aria-hidden="true"></i>
                            {/* <i className="fi fi-rr-video-slash"></i> */}
                            </div>
                            <p>cam</p>
                        </div>
                    </li>
                    <li>
                    <div>
                        <div className='classInconHolder' onClick={handleToggleMic}>
                        {mic===true?<i className="fa fa-microphone" aria-hidden="true"></i>:<i className="fa fa-microphone-slash" aria-hidden="true"></i>}
                        </div>
                        <p>mic</p>
                    </div>
                    </li>
                    <li>
                    <div>
                        <div className='classInconHolder'>
                        <i className="fa fa-desktop" aria-hidden="true"></i>
                        </div>
                        <p>share</p>
                    </div>
                    </li>
                    <li>
                    <div>
                        <div className='classInconHolder'>

                        </div>
                        <p>record</p>
                    </div>
                    </li>
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
