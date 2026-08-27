import React,{useState,useEffect,useContext} from 'react'
import { context } from '../App'
import Header from '../Components/global-layoutss/Header'
import { Outlet,useNavigate ,useLocation} from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { Link2, Copy, Check, Gift, Sparkles } from 'lucide-react'
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

  // ---- Referral state ----
  const [copiedField, setCopiedField] = useState(null)
  const refCode = student?.share_token || ''
  // NOTE: your original `baseUrl` was set to '' — using window.location.origin instead.
  // Swap this for your actual signup route.
  const referralLink = refCode ? `${window.location.origin}/register?ref=${refCode}` : ''
   console.log('aaa code',refCode)
  const handleCopy = (field) => {
    const value = field === 'link' ? referralLink : refCode
    if (!value) return
    navigator.clipboard.writeText(value)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

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
        <div className='dashBoardContainer  '>
        <aside className='flex flex-col bg-green-300 !text-black'>
          <ul>
            <li className={dashboardLinks.includes(pathname)?'active':""} onClick={handleToDashboard} >dashboard</li>
            <li className={lessonLikns.includes(pathname)?'active':""} onClick={handleToLessons} >my lessons</li>
            <li className={pathname==='/student/dashboard/My%20projects'?'active':""} onClick={handleToMyProjects}>my classwork projects</li>
            <li className={quizLinks.includes( pathname)?'active':""} onClick={handleToMyQuizzes}>my quizzes</li>
          </ul>

          {/* ---- Referral card ---- */}
        <div className="!mx-3 !mt-4 !mb-3   !rounded-2xl border" style={{ borderColor: '#EAECF0', background: 'linear-gradient(160deg, #FFFFFF 0%, #F0FBFC 100%)' }}>

  {/* playful header strip */}
  <div className="relative !rounded-t-2xl !px-3 !py-2.5 " style={{ background: 'linear-gradient(120deg, #0097B2 0%, #00B4D1 100%)' }}>
    <Sparkles className="absolute right-3 top-1.5 h-3.5 w-3.5 text-white/60" />
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20">
        <Gift className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
      </div>
      <div className="min-w-0">
        <p className="!text-[12.5px] font-bold leading-tight text-white">Refer a friend, get a free class! 🎉</p>
        <p className="!text-[10.5px] leading-tight text-white/80">You both earn one when they join</p>
      </div>
    </div>
  </div>

  <div className="!px-3 !py-3">
    {/* Link row */}
    <div className="!mb-1.5 flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.1em] text-[#98A2B3]">
      <Link2 className="h-3 w-3" strokeWidth={2.5} />
      Your link
    </div>
    <div
      className="flex w-full min-w-0 items-center gap-1.5 rounded-xl border bg-[#F9FAFB] !py-2 !pl-3 !pr-1.5"
      style={{ borderColor: '#EAECF0' }}
    >
      <a
        href={referralLink || undefined}
        onClick={(e) => e.stopPropagation()}
        className="min-w-0 flex-1 truncate font-mono !text-[12.5px] !text-[#0097B2] transition-colors hover:text-[#007A91]"
        title={referralLink}
      >
        {referralLink ? referralLink.replace('https://', '') : 'Loading your link…'}
      </a>
      <button
        onClick={() => handleCopy('link')}
        disabled={!referralLink}
        className="flex shrink-0 items-center gap-1 rounded-lg !px-2.5 !py-1.5 text-[12px] font-medium text-white transition-all active:scale-[0.97] disabled:opacity-50"
        style={{ backgroundColor: copiedField === 'link' ? '#0E7C90' : '#0097B2' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copiedField === 'link' ? (
            <motion.span key="copied" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }} className="flex items-center gap-1">
              <Check className="h-3 w-3" strokeWidth={2.5} />
              Copied
            </motion.span>
          ) : (
            <motion.span key="copy" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }} className="flex items-center gap-1">
              <Copy className="h-3 w-3" strokeWidth={2.5} />
              Copy
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>

    {/* Code row */}
    <div className="!mb-1.5 !mt-2.5 text-[10.5px] font-medium uppercase tracking-[0.1em] text-[#98A2B3]">
      Or share your code
    </div>
    <div
      className="flex w-full min-w-0 items-center gap-1.5 rounded-xl border !py-2 !pl-3 !pr-1.5"
      style={{ borderColor: '#D24113', borderStyle: 'dashed', backgroundColor: '#FFF6F2' }}
    >
      <span className="min-w-0 flex-1 truncate font-mono !text-[13px] font-bold" style={{ color: '#D24113' }}>
        {refCode || '••••••'}
      </span>
      <button
        onClick={() => handleCopy('code')}
        disabled={!refCode}
        className="flex shrink-0 items-center gap-1 rounded-lg !px-2.5 !py-1.5 text-[12px] font-medium text-white transition-all active:scale-[0.97] disabled:opacity-50"
        style={{ backgroundColor: copiedField === 'code' ? '#A6330D' : '#D24113' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copiedField === 'code' ? (
            <motion.span key="copied" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }} className="flex items-center gap-1">
              <Check className="h-3 w-3" strokeWidth={2.5} />
              Copied
            </motion.span>
          ) : (
            <motion.span key="copy" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }} className="flex items-center gap-1">
              <Copy className="h-3 w-3" strokeWidth={2.5} />
              Copy
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
        </div>
        </div>

         
        </aside>
        <main>
           <div className='mainInnerWrapper'>
           <Outlet/>
           </div>
        </main>
      </div>
       </div>
    
  )
}