'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, CalendarDays, ChevronRight, LogOut, RefreshCw, Search, X } from 'lucide-react'
import { formatLongMonth, getTimeIn24HR } from '@/utils/date_formats'
import { toTitleCase } from '@/utils/normalizeWords'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'



type Status = 'ongoing' | 'teacher-missing' | 'student-missing' | 'expired'|'upcoming'|'started'|'completed'
type Filter = 'all' | Status

type LiveClass = {
  id: number
  title: string
  started: string
  teacher: string | null
  student: string | null
  status: Status
  scheduled: string
  link: string
  teacherJoined: string | null
  studentJoined: string | null
}

// const classes: LiveClass[] = [
//   { id: 1, title: 'Mathematics – Grade 7', started: '15:00', scheduled: '15:00', teacher: 'Jane Wanjiku', student: 'Brian Kamau', status: 'ongoing', link: 'https://class.codingscholar.com/math-grade-7', teacherJoined: '14:58', studentJoined: '15:02' },
//   { id: 2, title: 'Physics – Form 2', started: '15:00', scheduled: '15:00', teacher: 'Mark Otieno', student: 'Amina Yusuf', status: 'ongoing', link: 'https://class.codingscholar.com/physics-form-2', teacherJoined: '14:57', studentJoined: '14:59' },
//   { id: 3, title: 'JavaScript Objects', started: '14:30', scheduled: '14:30', teacher: 'David Kimani', student: 'Lucy Njeri', status: 'ongoing', link: 'https://class.codingscholar.com/javascript-objects', teacherJoined: '14:28', studentJoined: '14:31' },
//   { id: 4, title: 'English Composition', started: '14:00', scheduled: '14:00', teacher: 'Grace Achieng', student: 'Peter Mwangi', status: 'ongoing', link: 'https://class.codingscholar.com/english-composition', teacherJoined: '13:58', studentJoined: '14:02' },
//   { id: 5, title: 'Python Basics', started: '15:00', scheduled: '15:00', teacher: null, student: 'Sarah Mwangi', status: 'teacher-missing', link: 'https://class.codingscholar.com/python-basics', teacherJoined: null, studentJoined: '15:01' },
//   { id: 6, title: 'Geometry – Grade 8', started: '13:30', scheduled: '13:30', teacher: null, student: 'Kevin Ochieng', status: 'teacher-missing', link: 'https://class.codingscholar.com/geometry-grade-8', teacherJoined: null, studentJoined: '13:34' },
//   { id: 7, title: 'Algebra', started: '14:00', scheduled: '14:00', teacher: 'Mark Otieno', student: null, status: 'student-missing', link: 'https://class.codingscholar.com/algebra', teacherJoined: '13:58', studentJoined: null },
//   { id: 8, title: 'Science', started: '13:00', scheduled: '13:00', teacher: null, student: null, status: 'expired', link: 'https://class.codingscholar.com/science', teacherJoined: null, studentJoined: null },
//   { id: 9, title: 'Creative Coding', started: '12:00', scheduled: '12:00', teacher: null, student: null, status: 'expired', link: 'https://class.codingscholar.com/creative-coding', teacherJoined: null, studentJoined: null },
// ]

const statusMeta: Record<Status, { label: string; dot: string; empty: string; emptyDescription: string }> = {
  ongoing: { label: 'Ongoing', dot: 'bg-emerald-500', empty: 'No ongoing classes', emptyDescription: 'There are no classes currently in progress.' },
  'teacher-missing': { label: 'Teacher Missing', dot: 'bg-[#D24113]', empty: 'No teacher-missing classes', emptyDescription: 'All scheduled teachers have joined their classes.' },
  'student-missing': { label: 'Student Missing', dot: 'bg-amber-500', empty: 'No student-missing classes', emptyDescription: 'All students have joined their scheduled classes.' },
  'expired': { label: 'No Show', dot: 'bg-slate-500', empty: 'No expired classes', emptyDescription: 'Everyone has joined their scheduled classes.' },
  'upcoming': { label: 'Upcoming', dot: 'bg-sky-500', empty: 'No upcoming classes', emptyDescription: 'There are no classes scheduled to start later today.' },
  'started': { label: 'Started', dot: 'bg-amber-500', empty: 'No started classes', emptyDescription: 'No classes have passed their start time with a participant still missing.' },
  'completed': { label: 'Completed', dot: 'bg-emerald-500', empty: 'No completed classes', emptyDescription: 'No classes have been completed today.' },
}



function Logo() {
  return <div className="brand"><div className="brand-mark"><span>‹/›</span></div><div><strong>Coding<span>Scholar</span></strong><i /></div></div>
}

export default function Page() {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
//   const [refreshing, setRefreshing] = useState(false)
  const [selected, setSelected] = useState<any|null>(null)
  const token=localStorage.getItem('token')
//   const [classes,setClasses]=useState<[]|null>(null)
  const [loading,setIsLoading]=useState(false)
  const navigate=useNavigate()
  const [studentPic,setStudentPic]=useState('')
  
 // const NormalizeStatus = (item: any) => { ...old version... }

const normalizeStatus = (item: any): Status | null => {
  const t = item.teacher_joined_at != null
  const s = item.student_joined_at != null

  if (!t && !s && ['no_show', 'expired'].includes(item.status) ){
    return 'expired' 
  } else if (!t && !s && item.status === "upcoming" ){
    return 'upcoming'
  } else if (!t && s && item.status === 'started') {
    return 'teacher-missing' 
  }else if (t && !s && item.status === 'started' ){
    return 'student-missing' 
  } else if (item.status !== 'completed' && item.status !== 'expired' && ((t && s) || item.status === 'live')) {
    return 'ongoing'
  }else if(item.status==='completed'){
    return 'completed'
  } else if (item.status==='started'){
    return 'started'
  }else{
    return null
  }
}
//  const API_URL = 'http://127.0.0.1:8000'
 const API_URL='https://api.codingscholar.com/api/token/'
const {
  data: classes = [],
  isLoading,
  isFetching,
  refetch: fetchLiveClasses, // manual refresh, replaces fetchLiveClasses(true)
} = useQuery({
  queryKey: ['liveClasses', token],
  enabled: !!token,
  refetchInterval: 2 * 60 * 1000,      // 2 min
  refetchIntervalInBackground: false,  // pauses when tab is hidden
  queryFn: async () => {
    const res = await fetch(`${API_URL}/getliveclasses/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error(`getliveclasses failed: ${res.status}`)
    const { live_classes } = await res.json()
    return live_classes.map((lc: any) => ({ ...lc, uiStatus: normalizeStatus(lc) }))
  },
})   
    const refreshing = isFetching && !isLoading


//   const fetchLiveClasses = (silent = false) => {
//   const API_URL = 'http://127.0.0.1:8000'
//   silent ? setRefreshing(true) : setIsLoading(true)
//   return fetch(`${API_URL}/getliveclasses/`, {
//     headers: { "Authorization": `Bearer ${token}` }
//   })
//     .then((res) => res.json())
//     .then(({ live_classes, status }) => {
//       const mappedClasses = live_classes.map((lc: any) => ({
//         ...lc,
//         uiStatus: normalizeStatus(lc)
//       }))
//       setClasses(mappedClasses)
//       console.log('\n__MAPPED_LIVE_CLASSES__',mappedClasses)
//     })
//     .catch((err) => console.error('getliveclasses failed:', err))
//     .finally(() => {
//       setIsLoading(false)
//       setRefreshing(false)
//     })
// }

// useEffect(() => {
//   fetchLiveClasses()
// }, [token])

// useEffect(()=>{ ...old inline fetch... },[token])

  const normalizeFilters=(item:any,filter:string)=>{
    if (filter==='ongoing'){
        return item.status==='live'
    } else if (filter==='teacher-missing'){
        return item.teacher_joined_at===null && item.student_joined_at!==null && item.status==="live"
    }else if(filter==='student-missing'){
        return item.teacher_joined_at!==null && item.student_joined_at===null && item.status==="live"
    }else if (filter==='expired'){
        return item.teacher_joined_at===null && item.student_joined_at===null && (item.status==="expired")
    }
  }

  
//   const visibleClasses = useMemo(() => classes?.filter((item:any) => (filter === 'all' || item?.status === filter || normalizeFilters(item,filter)) && [item.lesson.title, item.teacher.first_name,item.teacher.last_name, item.student.first_name,item.student.last_name].filter(Boolean).join(' ').toLowerCase().includes(query.toLowerCase())), [classes,filter, query])
  
 const visibleClasses = useMemo(() => {
  const q = query.toLowerCase()
  return (classes ?? []).filter((item: any) => {
    if (filter !== 'all' && item.uiStatus !== filter && item.status !== filter) return false
    const hay = [
      item.lesson?.title,
      item.teacher?.first_name, item.teacher?.last_name,
      item.student?.first_name, item.student?.last_name,
    ].filter(Boolean).join(' ').toLowerCase()
    return hay.includes(q)
  })
}, [classes, filter, query])

  const count = (s: Status) => (classes ?? []).filter((c: any) => c.uiStatus === s).length

  const ongoingCount=visibleClasses?.filter((vc:any)=>vc.status==='live').length??0
  const startedCount=visibleClasses?.filter((vc:any)=>vc.status==='started').length??0
  const completedCount=visibleClasses?.filter((vc:any)=>vc.status==='completed').length??0
  const teacherMissingCount=visibleClasses?.filter((vc:any)=>vc.teacher_joined_at===null && vc.student_joined_at!==null).length??0
  const studentMissingCount=visibleClasses?.filter((vc:any)=>vc.student_joined_at===null && vc.teacher_joined_at!==null).length??0
  const noshowCount=visibleClasses?.filter((vc:any)=>vc.student_joined_at===null && vc.teacher_joined_at===null&& vc.status==='expired').length??0
  const cards: { filter: Status; title: string; count: number; description: string; tone: string }[] = [
  { filter: 'ongoing', title: 'Ongoing', count: count('ongoing'), description: 'Classes currently in progress', tone: 'teal' },
  { filter: 'upcoming', title: 'Upcoming', count: count('upcoming'), description: 'Scheduled, not started yet', tone: 'sky' },
  { filter: 'teacher-missing', title: 'Teacher Missing', count: teacherMissingCount, description: "Student joined, teacher hasn't", tone: 'orange' },
  { filter: 'student-missing', title: 'Student Missing', count: studentMissingCount, description: "Teacher joined, student hasn't", tone: 'amber' },
  { filter: 'expired', title: 'Expired', count: count('expired'), description: 'Neither participant joined', tone: 'slate' },
  { filter: 'started', title: 'Started', count: startedCount, description: 'Start time reached, waiting for teacher or student', tone: 'amber' },
  { filter: 'completed', title: 'Completed', count: completedCount, description: 'Class ended both attended', tone: 'emerald' },
]
  const todaysDate=formatLongMonth(new Date())
  if (loading){
       return  <div className="empty-state">
                <div className="spinner" role="status" aria-label="Loading" />
                <strong> Getting today's classes...</strong>
                {/* <span>{filter !== 'all' ? statusMeta[filter].emptyDescription : 'Try adjusting your search.'}</span> */}
                </div>
  }
    
    
    const handleToJoinClass=(cl:any)=>{
        if(cl.student_lesson.is_completed===false){
            const studentUserId=cl.student.student_userId
            const title=cl.lesson.title 
            const url_notes=cl.lesson.pdf_notes  
            const id=cl.lesson.lessonId
            const navID=`${cl.student.id}${id}`
            const notes={title:title,url:url_notes}
            const lessontype=cl.student_lesson.lessonType
            const lesid=cl.student_lesson.id
            const now = new Date(cl.student_lesson.date_time)
            const time = now.toISOString();
            console.log('now...',now)
            console.log('time...',time)
            const studentName=toTitleCase(`${cl.student.first_name} ${cl.student.last_name}`)
            const studentDetails=cl.student
            const studentid=cl.student.id
            
                // console.log(studentUserId) 
            navigate(`/class/${navID}`, { state: { id,typeOfClass:'oneOnone',classType:'NormalClass',studentName, time,studentid,studentUserId,notes,studentDetails,studentPic,lessontype,lesid} }); 
                
        }else{
            alert('this class is completed')
        }
        
    }

  return (<div className="app-shell">

    <div className="app-body">

      <main className="main-content">
        <div className="page-heading">
            <div>
                <h1 className='font-bold'>Today's Classes</h1>
                <p className='text-black'>Monitor today&apos;s classes and participant attendance in real time.</p>
                <div className="today-label">Today · {todaysDate}</div>
            </div>
            
            <div className="live-indicator">
                <span /> Live updates
            </div>

            <button
    type="button"
    onClick={() => fetchLiveClasses()}
    disabled={refreshing}
    className="flex items-center gap-2 rounded-md bg-blue-600 !px-3 !py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
>
    <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
    {refreshing ? 'Refreshing...' : 'Refresh'}
</button>
        </div>

        <section className="summary-grid" aria-label="Class status filters">
            <button className={`summary-card all-card ${filter === 'all' ? 'selected' : ''}`} onClick={() => setFilter('all')}>
                <div className="card-top">
                    <span>All Classes</span>
                    <span className="mini-icon">∑</span>
                </div>
                <strong>{classes?.length??0}</strong>
                <small>All scheduled classes today</small>
            </button>{cards.map((card) => 
            <button key={card.filter} className={`summary-card ${card.tone} ${filter === card.filter ? 'selected' : ''}`} onClick={() => setFilter(card.filter)}>
                <div className="card-top">
                    <span>{card.title}</span>
                    <span className="status-dot" />
                </div>
                <strong>{card.count}</strong>
                <small>{card.description}</small>
                </button>)}
        </section>

        <div className="toolbar">
            <label className="search-box">
                <Search size={17} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search class, teacher or student..." aria-label="Search classes" />
            </label>
            <button className="date-filter">
                <CalendarDays size={16} /> Today <ChevronRight size={15} />
            </button>
        </div>

        <section className="table-card">
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Scheduled At</th>
                            <th>Teacher</th>
                            <th>Student</th>
                            <th>Status</th>
                            <th aria-label="Open details" />
                        </tr>
                    </thead>
                    <tbody>{visibleClasses?.map((item:any) => 

                        <tr key={item.id} onClick={() => setSelected(item)} tabIndex={0} onKeyDown={(event) => event.key === 'Enter' && setSelected(item)}>
                        <td className="class-name">{item.lesson.title}</td>
                        <td>{getTimeIn24HR(item.scheduled_start)}</td>
                        <td>{toTitleCase(`${item.teacher.first_name} ${item.teacher.last_name}`)?? '—'}</td>
                        <td>{toTitleCase(`${item.student.first_name} ${item.student.last_name}`)?? '—'}</td>
                        <td><span className="status-badge">
                            <span className={`status-dot ${statusMeta[normalizeStatus(item)??'expired'].dot}`} />{statusMeta[normalizeStatus(item)??'expired'].label}</span>
                        </td>
                        <td><ChevronRight className="row-chevron" size={17} /></td>
                        </tr>)}
                    </tbody>
                    </table>
                    {visibleClasses?.length === 0 && 
                    <div className="empty-state">
                        <strong>{filter !== 'all' ? statusMeta[filter].empty : 'No classes found'}</strong>
                        <span>{filter !== 'all' ? statusMeta[filter].emptyDescription : 'Try adjusting your search.'}</span>
                    </div>}
                </div>
        </section>

      </main>
    </div>

    {selected && 
    <div className="drawer-backdrop" onClick={() => setSelected(null)}>
        <aside className="details-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-header">
                <div>
                    <span className="eyebrow">CLASS DETAILS</span>
                    <h2>{selected?.lesson.title}</h2>
                </div>
                <button className="close-button" onClick={() => setSelected(null)} aria-label="Close details">
                    <X size={19} />
                </button>
            </div>
            <div className="drawer-status">
                <span className={`status-dot ${statusMeta[normalizeStatus(selected)??'expired'].dot}`} />{statusMeta[normalizeStatus(selected)??'expired'].label.toUpperCase()}
            </div>
            <div className="detail-section">
                <h3>Class Information</h3>
                <div className="info-grid">
                    <div>
                        <span>Scheduled At</span>
                        <strong>{getTimeIn24HR(selected.scheduled_start)}</strong>
                    </div>
                    <div>
                        <span>{selected.ended_at?'Ended At':'Scheduled End'}</span>
                        <strong>{getTimeIn24HR(selected.ended_at)??getTimeIn24HR(selected.scheduled_end)}</strong>
                    </div>
                </div>
            </div>
            <div className="participant">
                <span className="eyebrow">TEACHER</span>
                <strong>{toTitleCase(`${selected.teacher.first_name} ${selected.teacher.last_name}`)?? '—'}</strong>
                <span className={(selected.teacher_joined_at )? 'joined' : 'not-joined'}>{selected.teacher_joined_at ? `✓ Joined at ${getTimeIn24HR(selected.teacher_joined_at)}` : '— Not joined'}</span>
            </div>
            <div className="participant">
                <span className="eyebrow">STUDENT</span>
                <strong>{toTitleCase(`${selected.student.first_name} ${selected.student.last_name}`) ?? '—'}</strong>
                <span className={selected.student_joined_at ? 'joined' : 'not-joined'}>{selected.student_joined_at ? `✓ Joined at ${getTimeIn24HR(selected.student_joined_at)}` : '— Not joined'}</span>
            </div>

            <div className="detail-section">
    <h3>Attendees ({selected.attendees?.length ?? 0})</h3>
    {selected.attendees?.length ? (
        <ul className="attendee-list">
            {selected.attendees.map((a:any) => (
                <li key={a.id} className="attendee-row">
                    <strong>{toTitleCase(a.name ?? '—')}</strong>
                    <span className={`role-badge role-${a.role}`}>{a.role}</span>
                </li>
            ))}
        </ul>
    ) : (
        <span className="not-joined">— No attendees yet</span>
    )}
</div>
            <div>

            <button
            type="button"
            onClick={() => handleToJoinClass(selected)}
            className="flex w-full items-center justify-between gap-2 rounded-md bg-blue-600 !px-4 !py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            <span>Class Link</span>
           <ArrowUpRight size={16} />
</button>
            </div>
            {/* <a className="open-class" href={selected.link??''} target="_blank" rel="noreferrer">Open Class <ArrowUpRight size={16} /></a> */}
        </aside>
    </div>}
  </div>)
}
