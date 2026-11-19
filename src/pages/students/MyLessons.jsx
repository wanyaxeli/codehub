import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { API } from '@/lib/api'

export default function MyLessons() {
  const [fullData, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeType, setActiveType] = useState(null) // 'coding' | 'math' | null
  const [searchvalue, setSearchValue] = useState('')
  const navigate = useNavigate()

  // Fetch both endpoints once, merge results
  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [individual, group] = await Promise.allSettled([
          axios.get(`${API}/studentLessons/`),
          axios.get(`${API}/student_class_groups/`),
        ])
        if (cancelled) return

        const toList = (result, source) =>
          result.status === 'fulfilled' && Array.isArray(result.value.data)
            ? result.value.data.map((item) => ({ ...item, source }))
            : []

        setData([...toList(individual, 'individual'), ...toList(group, 'group')])
      } catch (error) {
        console.log(error)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  const hasCoding = useMemo(() => fullData.some((l) => l.lessonType === 'coding'), [fullData])
  const hasMath = useMemo(() => fullData.some((l) => l.lessonType === 'math'), [fullData])

  // Selected tab, or a sensible default
  const currentType = activeType ?? (hasCoding ? 'coding' : hasMath ? 'math' : null)

  const lessons = useMemo(() => {
    return fullData
      .filter((l) => l.lessonType === currentType)
      .map((l) => {
        const d = new Date(l.date_time)
        return { ...l, time: d.toLocaleTimeString(), date: d.toLocaleDateString() }
      })
      .sort((a, b) => (a.lesson?.lesson_number ?? 0) - (b.lesson?.lesson_number ?? 0))
  }, [fullData, currentType])

  const filteredlessons = useMemo(() => {
    const q = searchvalue.toLowerCase()
    return lessons.filter((l) => {
      const byNumber = String(l.lesson?.lesson_number ?? '').includes(q)
      const byTitle = (l.lesson?.title ?? '').toLowerCase().includes(q)
      return byTitle || byNumber
    })
  }, [lessons, searchvalue])

  const handleToNotes = (notesurl, videourl) => {
    navigate(`/student/dashboard/StudentNotes/`, { state: { notesurl, videourl } })
  }

  return (
    <div className='MyLessonWrapper'>
      <div className='classtypenavWrapper'>
        {hasCoding && hasMath && (
          <ul>
            <li onClick={() => setActiveType('coding')} className={currentType === 'coding' ? 'activelesson' : ''}>coding</li>
            <li onClick={() => setActiveType('math')} className={currentType === 'math' ? 'activelesson' : ''}>mathematics</li>
          </ul>
        )}
      </div>

      <div className="flex-1 max-w-md hidden sm:flex !p-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search lessons..."
            value={searchvalue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="!pl-10 bg-white border-border rounded-lg text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {loading ? (
        <div className='noLessons'><p>Loading lessons...</p></div>
      ) : filteredlessons.length > 0 ? (
        filteredlessons.map((lesson) => (
          <div key={`${lesson.source}-${lesson.id}`} className='MyLessonContainer'>
            <div className='lessonModuleWrapper'>
              <h2>Lesson {lesson.lesson?.lesson_number}</h2>
            </div>
            <div className='lessonsDetailsWrapper'>
              <h3>{lesson.lesson?.title}</h3>
              <p>date:<span>{lesson.date}</span></p>
              <p>time:<span>{lesson.time?.replace(/:\d{2}(?= )/, '')}</span></p>
              <p>status:<span className='lessonStatus'>{lesson.is_completed ? 'complete' : 'Incomplete'}</span></p>
              <div>
                {lesson.is_completed && (
                  <button onClick={() => handleToNotes(lesson.lesson?.pdf_notes, lesson.video_url)}>
                    View class
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='noLessons'><p>No lesson for today</p></div>
      )}
    </div>
  )
}