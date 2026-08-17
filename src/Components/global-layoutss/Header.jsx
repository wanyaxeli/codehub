import React,{useState,useEffect,useContext} from 'react'
import pic from '@/assets/codingscholarlogo00v2.png'
import { context } from '../../App'
import {useNavigate,useLocation} from 'react-router-dom'
import pic2 from '@/assets/codehubImage.jpeg'
import HeaderDetails from '../HeaderDetails';
import Sidebar from '../sideBar'
import { jwtDecode } from 'jwt-decode'
export default function Header() {
    const [selectedValue, setSelectedValue] = useState('');
    // const [token,setToken]=useState('')
    const [toggleSideBarClass,setToggleSideBarClass]=useState('sideBarWrapper')
    const [toggleSideBar,setToggleSideBar]=useState(false)
    const location = useLocation()
    const navigate=useNavigate()
    const {teacher,student,proPic}=useContext(context)
    const {pathname}=location
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        const chosencourse=event.target.value
        if (chosencourse && chosencourse!==""){
          navigate('/course-blogs',{state:chosencourse})
        }
      };
    const handleToFreeClass =()=>{
    navigate('/register')
    }
   
    const handleToLogin=()=>{
     
      const token=localStorage.getItem('token')
      if (token){
        
           try {
          const decode = jwtDecode(token);
          const {role,user_id}=decode
          console.log("Decoded Token:", decode,role);
          if(role ==='student'){
            navigate('/student/dashboard/Details')
          }else if(role==='teacher'){
              navigate('/teacher/dashboard',{state:token})
          }
            // setRole(role)
        } catch (error) {
          console.error("JWT Decode Error:", error);
        }
    }else{
      navigate('/Login')
    }
    }
    const handleHome =()=>{
      navigate('/')
    }
    const handleToStudentDashboard =()=>{
      navigate('/student/dashboard/Details')
    }
    const handleJoinClass=()=>{
      const token= localStorage.getItem('token')
      if(token){
        try {
          const decode = jwtDecode(token);
          const {role,user_id}=decode
        
          if(role ==='student'){
            navigate('/student/dashboard/Details')
          }else if(role==='teacher'){
              navigate('/teacher/dashboard',{state:token})
          }
            // setRole(role)
        } catch (error) {
          console.error("JWT Decode Error:", error);
        }
      }else{
        navigate('/Login')
      }
    }
    const handleToDashboard=()=>{
      navigate('/teacher/dashboard/Details')
    }
    async function getToken(){
      try{
          const token= JSON.parse(localStorage.getItem('token')) // No need to await
          if (token){
              // setToken(token);
          }
      } catch(error) {
          console.log(error);
      }
  }
  const handleToggleSideBar =()=>{
   if(toggleSideBar===false){
    setToggleSideBar(true)
   }else{
    setToggleSideBar(false)
   }
  }
  useEffect(()=>{
  if(toggleSideBarClass==='sideBarWrapper'){
    setToggleSideBarClass('sideBarWrapperOpenner')
  }else{
    setToggleSideBarClass('sideBarWrapper')
  }
  },[toggleSideBar])
  useEffect(()=>{
    setToggleSideBarClass('sideBarWrapper')
  },[])
  const handleLogout =()=>{
    localStorage.removeItem('token')
    navigate('/')
  }
  // useEffect(()=>{
  // getToken()
  // },[])
  return (
    // <div className='headerWrapper'>
    //     <div className='headerContainer'>
    //         <div className='leftHeader'>
    //             {/* //logo */}
    //             <div onClick={handleHome} className='logoWRapper'>
    //                 <div className='w-23 h-20 flex items-center top-0'>
    //                 <img  loading="lazy" 
    //                 src={pic}
    //                 className="object-contain h-35 w-35 scale-140"
    //                 />
    //                 </div>
    //                 {/* <h4>codingscholar</h4> */}
    //             </div>
    //             <select value={selectedValue} onChange={handleChange}>
    //             <option value="" disabled>
    //              courses
    //             </option>
    //             <option value="1">python for kids</option>
    //             <option value="2">web development</option>
    //             <option value="3">scratch programming</option>
    //             </select>
    //         </div>
    //         <HeaderDetails pic2={pic2}  handleToStudentDashboard={handleToStudentDashboard} handleToFreeClass={handleToFreeClass} handleToLogin={handleToLogin}  handleJoinClass={handleJoinClass} handleToDashboard={handleToDashboard} teacher={teacher} student={student}  proPic={proPic}/>
    //         {pathname==='/'?'':
    //         <div className='logoutWrapper' onClick={handleLogout}>
    //         <i  className="fa fa-sign-out" aria-hidden="true"></i>
    //         <span>Logout</span>
    //       </div>}
    //     </div>
    //     <div className='HeaderForSmallDevices'>
    //       <div className='logoContainer'>
    //       <img loading="lazy" src={pic}/>
    //       </div>
    //       <div className='headerBars'>
    //       {toggleSideBar===false?<i onClick={handleToggleSideBar} className="fa fa-bars" aria-hidden="true"></i>:
    //       <i onClick={handleToggleSideBar} className="fa fa-times" aria-hidden="true"></i>
    //       }
    //       </div>
    //       <Sidebar toggleSideBarClass={toggleSideBarClass}/>
    //     </div>
    // </div>

    <div className='headerWrapper'>
  {/* Desktop Header */}
  <div className='headerContainer'>
    
    {/* Left — Logo + Brand */}
    <div onClick={handleHome} className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
      <div className="w-16 h-16 flex items-center justify-center">
        <img
          loading="lazy"
          src={pic}
          className="object-contain h-22 w-22 scale-120"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-[var(--primary)] font-bold text-xl tracking-wide leading-tight">
          Coding<span className="text-[var(--primarysec)]">Scholar</span>
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          <div className="h-[2px] w-12 bg-[var(--accentsec)]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accentsec)]" />
          <div className="h-[2px] w-13 bg-[var(--accentsec)]" />
        </div>
      </div>
    </div>

    {/* Right — Notifications + Avatar + Logout */}
    <div className="flex items-center gap-4">
      
      {/* Notifications */}
      <div className="relative cursor-pointer hover:opacity-70 transition-opacity">
        <i className="fa fa-bell text-[var(--headingsec)] text-xl" aria-hidden="true" />
        {/* Unread badge — remove if not needed */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          3
        </span>
      </div>

      {/* Profile pic */}
      <div
        // onClick={handleToStudentDashboard}
        className="w-9 h-9 rounded-full overflow-hidden cursor-pointer ring-2 ring-[var(--accentsec)]/80 hover:ring-[var(--primarysec)] transition-all"
      >
        {proPic
          ? <img src={proPic} alt="profile" className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-[var(--primarysec)] flex items-center justify-center text-white font-bold text-sm">
              {/* Fallback initial */}
              U
            </div>
        }
      </div>

      {/* Logout */}
      {pathname !== '/' && (
        <div
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer text-[var(--headingsec)] hover:text-red-500 transition-colors"
        >
          <i className="fa fa-sign-out text-lg" aria-hidden="true" />
          <span className="text-sm font-medium">Logout</span>
        </div>
      )}
    </div>
  </div>

  {/* Mobile Header */}
{/* Mobile Header */}
  <div className='HeaderForSmallDevices'>
    
    {/* Logo */}
    <div onClick={handleHome} className="flex items-center cursor-pointer">
      <div className="w-12 h-12 flex items-center justify-center">
        <img loading="lazy" src={pic} className="object-contain h-16 w-16 scale-120" />
      </div>
      <div className="flex flex-col">
        <span className="text-[var(--primary)] font-bold text-base tracking-wide leading-tight">
          Coding<span className="text-[var(--primarysec)]">Scholar</span>
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          <div className="h-[1.5px] w-10 bg-[var(--accentsec)]" />
          <div className="w-1 h-1 rounded-full bg-[var(--accentsec)]" />
          <div className="h-[1.5px] w-11 bg-[var(--accentsec)]" />
        </div>
      </div>
    </div>

    {/* Right — bell + avatar + logout + hamburger */}
    <div className="flex items-center gap-3">

      {/* Notifications */}
      <div className="relative cursor-pointer">
        <i className="fa fa-bell text-[var(--headingsec)] text-lg" aria-hidden="true" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
          3
        </span>
      </div>

      {/* Avatar — no proPic, colored background */}
      <div
        // onClick={handleToStudentDashboard}
        className="w-8 h-8 rounded-full overflow-hidden cursor-pointer ring-2 ring-[var(--accentsec)]"
      >
        <div className="w-full h-full bg-[var(--primarysec)] flex items-center justify-center text-white font-bold text-xs">
          U
        </div>
      </div>

      {/* Logout — mobile */}
      {pathname !== '/' && (
        <div
          onClick={handleLogout}
          className="flex items-center gap-1.5 cursor-pointer text-[var(--headingsec)] hover:text-red-500 transition-colors"
        >
          <i className="fa fa-sign-out text-lg" aria-hidden="true" />
          <span className="text-xs font-medium">Logout</span>
        </div>
      )}

      {/* Hamburger */}
      <div className="cursor-pointer text-[var(--headingsec)]">
        {toggleSideBar
          ? <i onClick={handleToggleSideBar} className="fa fa-times text-xl" aria-hidden="true" />
          : <i onClick={handleToggleSideBar} className="fa fa-bars text-xl" aria-hidden="true" />
        }
      </div>
    </div>

    <Sidebar toggleSideBarClass={toggleSideBarClass} />
  </div>
</div>
  )
}
