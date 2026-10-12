/**
 * Calendar.jsx - teacher's monthly schedule page (CodingScholar dashboard)
 *
 * WHAT IT DOES
 *   Shows a custom month grid on the left and a scrollable "daily agenda" on
 *   the right for the selected day. Clicking a class card opens the class
 *   details page.
 *
 * DATA FLOW
 *   1. Reads the auth token from localStorage ("token").
 *   2. Fetches one-on-one lessons  -> GET /teacherSchedule/
 *      and group lessons           -> GET /teacherGroupClass/
 *   3. Stores the raw lessons in `data` (used to find the full lesson object
 *      when a card is clicked) and the calendar-friendly events in
 *      `calendarEvent`.
 *   4. Lesson times arrive in UTC and are converted to the user's local time
 *      zone with luxon, so `event.start` is a local ISO string such as
 *      "2026-10-12T12:30:00.000+03:00". Its first 10 characters are therefore
 *      the LOCAL date, which is what the grid and agenda group by.
 *
 * EVENT SHAPE (calendarEvent[])
 *   { id, title, subject, start, extendedProps: { studentId, groupClassId,
 *     type, classType: 'group' | 'oneOnone' } }
 *
 * STATE
 *   today        - the real current date (recomputed on each render)
 *   viewDate     - first day of the month being displayed
 *   selected     - the day shown in the agenda (defaults to today)
 *
 * NAVIGATION
 *   Clicking an agenda card navigates to
 *   '/teacher/dashboard/Teacher Class Details' with the matching lesson
 *   passed through router `state` as a one-item array.
 *
 * STYLING
 *   Plain CSS classes (calendar-page, calendar-area, calendar-grid, agenda,
 *   event-card ...) from the calendar stylesheet, plus a few Tailwind
 *   utilities on the agenda cards.
 *
 * KEPT BUT CURRENTLY UNUSED
 *   - getTeacherGroupClassSchudule (older group-class loader)
 *   - the FullCalendar version and the "Add class" button (commented out;
 *     uncomment their imports below if you re-enable them)
 */

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DateTime } from 'luxon'
import { ArrowLeft, ArrowRight, CalendarDays, ChevronRight } from 'lucide-react'

// Re-add these only if you re-enable the commented-out sections:
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import { Plus } from 'lucide-react'

const API_BASE = 'https://api.codingscholar.com'
const USER_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone

const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Local "YYYY-MM-DD" key for a Date. */
function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

/** "12:30 PM" style time from an ISO string or Date. */
function formatTime(value) {
  return new Date(value).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

/** True when two ISO strings point to the same instant (API times are UTC). */
function sameInstant(apiDateTime, eventStart) {
  const a = DateTime.fromISO(apiDateTime, { zone: 'utc' }).toMillis()
  const b = DateTime.fromISO(eventStart).toMillis()
  return !Number.isNaN(a) && a === b
}

function CalendarIcon() {
  return <CalendarDays aria-hidden="true" size={28} strokeWidth={1.8} />
}

/** Converts one API lesson into a calendar event (start in the user's local zone). */
function lessonToCalendarEvent(item) {
  const start = DateTime
    .fromISO(item.date_time, { zone: 'utc' })
    .setZone(USER_TIME_ZONE)
    .toISO() // null when date_time is invalid; filtered out by the caller

  const classType = item.group_class ? 'group' : 'oneOnone'

  return {
    // prefix with classType so one-on-one and group ids can never collide
    id: `${classType}-${item.id}`,
    title: item.lesson?.title || 'Class',
    // NOTE: adjust to whatever field your API uses for the subject/course name
    subject: item.lesson?.subject ?? '',
    start,
    extendedProps: {
      studentId: item.student?.id ?? null,
      groupClassId: item.group_class?.id ?? null,
      type: item.lessontype,
      classType,
    },
  }
}

/** GET a schedule endpoint; always resolves to an array (empty on failure). */
async function fetchSchedule(url, token) {
  try {
    const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
    return Array.isArray(res.data) ? res.data : []
  } catch (err) {
    console.error(`Failed to fetch ${url}`, err)
    return []
  }
}

export default function Calendar() {
  const today = new Date() // real date, recalculated each render
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [selected, setSelected] = useState(today)

  const [data, setData] = useState([]) // raw lessons from the API
  const [token, setToken] = useState()
  const [calendarEvent, setCalendarEvent] = useState([])
  const navigate = useNavigate()

  /** Opens the details page for the clicked agenda card. */
  const handleEventClick = (event) => {
    const eventTitle = event.title
    const { studentId, classType, groupClassId: groupId } = event.extendedProps

    const lessonObj = data.find((item) =>
      item.lesson?.title === eventTitle &&
      sameInstant(item.date_time, event.start) &&
      (item.student?.id === studentId || item.group_class?.id === groupId) &&
      item.classType === classType
    )
    const lesson = lessonObj ? [lessonObj] : []

    if (lesson.length > 0) {
      navigate('/teacher/dashboard/Teacher Class Details', { state: lesson })
    } else {
      alert('unexpected error occured please try again')
    }
  }

  /**
   * @deprecated Older loader for group classes. Not called anywhere; the
   * current flow is loadTeacherSchedule(). Kept for reference.
   */
  function getTeacherGroupClassSchudule() {
    if (token) {
      const url = `${API_BASE}/teacherGroupClass/`
      axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          const groupData = res.data
          if (groupData.length > 0) {
            setData((pre) => [...pre, ...groupData])
            groupData.forEach((item) => {
              const { title } = item.lesson
              const studentId = item.student?.id ?? null
              const localTime = DateTime.fromISO(item.date_time, { zone: 'utc' })
                .setZone(USER_TIME_ZONE)
                .toISO()
              const newdata = {
                id: item.id,
                title,
                start: localTime,
                extendedProps: { studentId },
              }
              setCalendarEvent((pre) => [...pre, newdata])
            })
          }
        })
        .catch((error) => console.log(error))
    }
  }

  async function getToken() {
    try {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        setToken(storedToken)
      }
    } catch (error) {
      console.log(error)
    }
  }

  /** Loads one-on-one + group lessons and replaces `data` / `calendarEvent`. */
  async function loadTeacherSchedule(isCancelled = () => false) {
    if (!token) return

    const [oneOnOneLessons, groupLessons] = await Promise.all([
      fetchSchedule(`${API_BASE}/teacherSchedule/`, token),
      fetchSchedule(`${API_BASE}/teacherGroupClass/`, token),
    ])
    if (isCancelled()) return // component unmounted or token changed

    const lessons = [...oneOnOneLessons, ...groupLessons].map((item) => ({
      ...item,
      classType: item.group_class ? 'group' : 'oneOnone',
    }))

    // replace (not append) so re-runs and StrictMode never create duplicates
    setData(lessons)
    setCalendarEvent(lessons.map(lessonToCalendarEvent).filter((e) => e.start))
  }

  useEffect(() => {
    getToken()
  }, [])

  useEffect(() => {
    let cancelled = false
    loadTeacherSchedule(() => cancelled)
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  // ---- calendar grid (derived from viewDate on every render) ----
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const first = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const weeks = Math.ceil((first.getDay() + daysInMonth) / 7)

  const calendarDays = Array.from({ length: weeks * 7 }, (_, i) =>
    new Date(year, month, 1 - first.getDay() + i)
  )

  const eventsByDate = (day) => calendarEvent.filter((event) => event.start.slice(0, 10) === dateKey(day))
  const selectedEvents = eventsByDate(selected)

  const goMonth = (delta) =>
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + delta, 1))

  const goToday = () => {
    const now = new Date()
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1))
    setSelected(now)
  }

  // Previous FullCalendar implementation, kept for reference:
  //
  // <div className='CalendarWrapper !text-black'>
  //   <FullCalendar
  //     plugins={[dayGridPlugin]}
  //     initialView="dayGridMonth"
  //     events={calendarEvent}
  //     timeZone="local"
  //     eventClick={handleEventClick}
  //     eventDidMount={(info) => { info.el.style.cursor = 'pointer' }}
  //   />
  // </div>

  return (
    <div className="calendar-page">
      <section className="calendar-area">
        <div className="calendar-header">
          <div>
            <h1>{monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}</h1>
            <p>Your teaching schedule</p>
          </div>
          <div className="calendar-controls">
            <button onClick={goToday} className="today-button">Today</button>
            <button onClick={() => goMonth(-1)} className="icon-button" aria-label="Previous month">
              <ArrowLeft size={21} />
            </button>
            <button onClick={() => goMonth(1)} className="icon-button" aria-label="Next month">
              <ArrowRight size={21} />
            </button>
          </div>
        </div>

        <div
          className="calendar-grid"
          role="group"
          aria-label="Monthly calendar"
          style={{ '--weeks': calendarDays.length / 7 }}
        >
          {weekdays.map((day) => <div className="weekday" key={day}>{day}</div>)}
          {calendarDays.map((day) => {
            const dayEvents = eventsByDate(day)
            const isToday = dateKey(day) === dateKey(today)
            const isSelected = dateKey(day) === dateKey(selected)
            const inMonth = day.getMonth() === viewDate.getMonth()
            return (
              <button
                key={dateKey(day)}
                onClick={() => setSelected(day)}
                className={`date-cell ${!inMonth ? 'outside' : ''} ${isToday ? 'is-today' : ''} ${isSelected ? 'is-selected' : ''}`}
                aria-label={`${day.toDateString()}${dayEvents.length ? `, ${dayEvents.length} scheduled classes` : ''}`}
              >
                <span className="date-number">{day.getDate()}</span>
                {dayEvents.length > 0 && (
                  <span className="event-dots" aria-hidden="true">
                    {dayEvents.slice(0, 3).map((event) => <i key={event.id} />)}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="legend">
          <span><i className="legend-dot" />Scheduled class</span>
          <span><i className="legend-today" />Today</span>
        </div>
      </section>

      <aside className="agenda" aria-label="Daily agenda">
        <div className="agenda-heading">
          <CalendarIcon />
          <div>
            <h2>{selected.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
            <p>{selectedEvents.length} {selectedEvents.length === 1 ? 'class' : 'classes'} scheduled</p>
          </div>
        </div>

        <div className="agenda-list">
          {selectedEvents.length ? (
            selectedEvents.map((event) => (
              <button className="event-card" key={event.id} onClick={() => handleEventClick(event)}>
                <span className="!mb-2 flex min-w-0 items-center gap-2 text-sm !p-1">
                  <span className="shrink-0 font-semibold text-[#50729a]">
                    {formatTime(event.start)}
                  </span>
                  {event.subject && (
                    <>
                      <span className="text-[#9db0c5]">·</span>
                      <span className="truncate text-[#66809f]">{event.subject}</span>
                    </>
                  )}
                </span>

                <span className="flex items-center justify-between gap-3">
                  <strong className="min-w-0 flex-1">{event.title}</strong>
                  <ChevronRight size={21} className="shrink-0 text-[#0a96b5]" />
                </span>
              </button>
            ))
          ) : (
            <div className="empty-state">
              <CalendarDays size={32} />
              <strong>No classes scheduled</strong>
              <p>There are no classes planned for this day.</p>
            </div>
          )}
        </div>

        {/* <button className="add-class"><Plus size={22} />Add class</button> */}
      </aside>
    </div>
  )
}