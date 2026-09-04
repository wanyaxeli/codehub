import React,{useState,useEffect,useContext} from 'react'
import { context } from '../../App'
import Header from '../../Components/global-layoutss/Header'
import { Outlet,useNavigate ,useLocation} from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { Link2, Copy, Check, Gift, Sparkles, LayoutDashboard, BookOpen, FolderKanban, ListChecks } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function StudentDashboard() {
  const navigate=useNavigate()
  const [token,setToken]=useState('')
  const [user_id,setUser_id]=useState('')
  const [StudentToken,setStudentToken]=useState('')
  const location =useLocation()
  const {pathname}=location
  const {setStudent, student}=useContext(context) // NOTE: assumes `student` is exposed by context provider

  const dashboardLinks=['/student/dashboard/Questions','/student/dashboard/Details','/student/dashboard/Questions/attempted-questions','/student/dashboard/Today%20Questions','/student/dashboard/display-questions','/student/dashboard/Questions/questionPage','/student/dashboard/Today%20Questions','/student/dashboard']
  const quizLinks=['/student/dashboard/My%20quizzes/Attemptedquizzes','/student/dashboard/My%20quizzes/quizzes','/student/dashboard/My%20quizzes','/student/dashboard/My%20%20quizzes','/student/dashboard/Quiz']
  const lessonLikns=['/student/dashboard/My%20lessons','/student/dashboard/StudentNotes/','/student/dashboard/My%20%20lessons']

  const handleToLessons=()=>{ navigate('My lessons') }
  const handleToMyQuizzes=()=>{ navigate('My quizzes') }
  const handleToMyProjects=()=>{ navigate('My projects') }
  const handleToDashboard=()=>{ navigate('Details') }
  const handleToReferrals=()=>{ navigate('Referrals') } 

  // ---- Referral state ----
  const [copiedField, setCopiedField] = useState(null)
  const refCode = student?.share_token || ''
  const referralLink = refCode ? `${window.location.origin}/referral/${refCode}` : ''
   console.log('aaa code',refCode)
  const handleCopy = (field) => {
    const value = field === 'link' ? referralLink : refCode
    if (!value) return
    navigator.clipboard.writeText(value)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  // ---- Nav items (drives sidebar UI below) ----
  const navItems = [
    { label: 'dashboard', icon: LayoutDashboard, active: dashboardLinks.includes(pathname), onClick: handleToDashboard },
    { label: 'my lessons', icon: BookOpen, active: lessonLikns.includes(pathname), onClick: handleToLessons },
    { label: 'my classwork projects', icon: FolderKanban, active: pathname==='/student/dashboard/My%20projects', onClick: handleToMyProjects },
    { label: 'my quizzes', icon: ListChecks, active: quizLinks.includes(pathname), onClick: handleToMyQuizzes },
    { label: 'refer and earn ', icon: Gift, active: pathname==='/student/dashboard/Referrals', onClick: handleToReferrals },
 
  ]

   useEffect(() => {
          if (token) {
            try {
              const decode = jwtDecode(token);
              const {role,user_id}=decode
              setUser_id(user_id)
              console.log("Decoded Tokens:", user_id);
            } catch (error) {
              console.error("JWT Decode Error:", error);
            }
          }
  }, [token]);
  async function getToken(){
          try{
              const token= localStorage.getItem('token')
              if (token){
                  setToken(token);
              }
          } catch(error) {
              console.log(error);
          }
  }
  function Student(){
   if(token && user_id){
    const url=`https://api.codingscholar.com/getstudent/${user_id}`
    axios.get(url,{headers:{
      'Authorization':`Bearer ${token}`
    }})
    .then(res=>{
      console.log('student',res.data)
      const data= res.data
      setStudentToken(data.share_token)
      setStudent(data)
    })
    .catch(error=>console.log(error))
   }
  }
 
  useEffect(()=>{
    Student()
    },[token,user_id])
  useEffect(()=>{
  getToken()
  },[])

  return (
    <div className='StudentDashboardWrapper'>
        <Header/>
        {/* <div className='dashBoardContainer  '>
        <aside className='flex flex-col bg-green-300 !text-black'>
          <ul>
            <li className={dashboardLinks.includes(pathname)?'active':""} onClick={handleToDashboard} >dashboard</li>
            <li className={lessonLikns.includes(pathname)?'active':""} onClick={handleToLessons} >my lessons</li>
            <li className={pathname==='/student/dashboard/My%20projects'?'active':""} onClick={handleToMyProjects}>my classwork projects</li>
            <li className={quizLinks.includes( pathname)?'active':""} onClick={handleToMyQuizzes}>my quizzes</li>
          </ul>      */}
        <div className='dashBoardContainer '>
        <aside className='sidebar'>
          <ul className='sidebarNav'>
            {navItems.map(({label, icon:Icon, active, onClick}) => (
              <li key={label} className={active ? 'active' : ''} onClick={onClick}>
                <Icon size={18} strokeWidth={2} className='sidebarIcon' />
                <span>{label}</span>
              </li>
            ))}
          </ul>

      
        </aside>
        <main>
           <div className='mainInnerWrapper '>
           <Outlet/>
           </div>
        </main>
      </div>
       </div>
    
  )
}

