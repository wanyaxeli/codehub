import React, { useContext, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import pic from '../assets/teacher.jpg'
import { context } from '../App'
import AlertPOPUp from '../Components/AlertPOPUp'

// Set VITE_API_URL=http://127.0.0.1:8000 in .env.local when testing against your local server.
const API_BASE = import.meta.env.VITE_API_URL ?? 'https://api.codingscholar.com'
const AVAILABILITY_KEY = ['teacher-availability']
const REFRESH_MS = 2 * 60 * 1000
const DAYS_AHEAD = 7
const NO_SLOTS = []

/* ---------- pure helpers (created once, not on every render) ---------- */

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})




const MESSAGES = [
  'Checking teacher availability',
  'Matching your timezone',
  'Almost there',
]

function SlotsLoader({ label = 'Getting available slots' }) {
  return (
    <div
      role='status'
      aria-live='polite'
      className='flex items-center gap-2 !py-3 text-sm text-white/70'
    >
      <div
        aria-hidden='true'
        className='h-4 w-4 shrink-0 rounded-full border-2 border-white/20 border-t-emerald-400 bg-transparent p-0 motion-safe:animate-spin'
      />
      <p className='m-0 bg-transparent p-0'>{label}…</p>
    </div>
  )
}
 
const toLocalTime = (utcStr) => timeFormatter.format(new Date(utcStr))

const formatDate = (date) =>
  date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

const pad = (n) => String(n).padStart(2, '0')
const toDateString = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const formatSlotDate = (dateStr) => formatDate(new Date(`${dateStr}T00:00:00`))

const selectOpenSlots = (all) => all.filter((item) => item.booked === false)



const getErrorMessage = (error) => {
  const status = error?.response?.status
  const data = error?.response?.data
  if (status === 409) return 'Someone just booked that slot. Please pick another time.'
  // Only trust server text for 4xx; a 500 returns an HTML debug page.
  if (status && status < 500) {
    if (typeof data === 'string') return data
    if (data?.message) return data.message
  }
  return 'We could not complete your booking. Check your connection and try again.'
}

export default function ClassBooking() {
  const { value, email, grade, CountryCode, CountryName, name, course } = useContext(context)
  const queryClient = useQueryClient()

  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedSlotId, setSelectedSlotId] = useState(null)
  const [formError, setFormError] = useState('')
  const [confirmed, setConfirmed] = useState(null)

  const fetchAvailability = async () => {
    console.log('fetching classes...')
  const { data } = await axios.get(`${API_BASE}/TeacherAvailability/`)
    console.log('/n getting classes ...',data)
  return data
}

  /* ---------- fetch slots ----------
     isPending is true only while there is no data at all (first load),
     so the 2-minute background refetch never shows a spinner. */
  const {
    data: openSlots = NO_SLOTS,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: AVAILABILITY_KEY,
    queryFn: fetchAvailability,
    select: selectOpenSlots,
    staleTime: REFRESH_MS / 2,
    refetchInterval: REFRESH_MS,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  })

  /* ---------- book ---------- */
  const bookMutation = useMutation({
    mutationFn: ({ payload }) =>
      axios.post(`${API_BASE}/booking/`, payload).then((res) => res.data),
    onSuccess: (_data, { slot }) => {
      // Mark the slot booked in the cache right away so it disappears from the list...
      queryClient.setQueryData(AVAILABILITY_KEY, (old) =>
        old?.map((item) => (item.id === slot.id ? { ...item, booked: true } : item))
      )
      // ...and show the confirmation without waiting for any refetch.
      setConfirmed({
        email,
        date: formatSlotDate(slot.date),
        time: toLocalTime(slot.datetime_utc),
        teacher: `${slot.teacher.user.first_name} ${slot.teacher.user.last_name}`,
      })
    },
    // Success or failure, quietly re-sync with the server in the background.
    onSettled: () => queryClient.invalidateQueries({ queryKey: AVAILABILITY_KEY }),
  })

  /* ---------- derived state (no effects, no extra useState) ---------- */
  const today = new Date()
  const days = Array.from({ length: DAYS_AHEAD }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return { label: i === 0 ? 'today' : formatDate(d), dateStr: toDateString(d) }
  })

  const nowTime = today.toTimeString().split(' ')[0]
  const selectedDate = days[selectedDay].dateStr

  const slots = openSlots
    .filter(
      (item) =>
        item.date === selectedDate && (selectedDay !== 0 || item.time >= nowTime)
    )
    .sort((a, b) => new Date(a.datetime_utc) - new Date(b.datetime_utc))
    .map((item) => ({ ...item, timeZoneTime: toLocalTime(item.datetime_utc) }))

  // Looked up from the live list, so if someone else books it during a refresh it simply clears.
  const selectedSlot = openSlots.find((item) => item.id === selectedSlotId)

  const bookingError =
    formError || (bookMutation.isError ? getErrorMessage(bookMutation.error) : '')

  /* ---------- handlers ---------- */
  const handlePickSlot = (item) => {
    setSelectedSlotId(item.id)
    setFormError('')
    bookMutation.reset()
  }

  const handleBook = () => {
    if (!selectedSlot) {
      setFormError('Pick a time slot for your free trial class.')
      return
    }
    setFormError('')

    const { teacher, time, date, datetime_utc } = selectedSlot
    bookMutation.mutate({
      slot: selectedSlot,
      payload: {
        phone_number: value,
        email,
        course,
        name,
        first_name: teacher.user.first_name,
        last_name: teacher.user.last_name,
        datetime_utc,
        time,
        date,
        grade,
        BookingName: `freeTrial${uuidv4()}`,
        countryCode: CountryCode,
        country: CountryName,
      },
    })
  }

  const handleCloseConfirmation = () => {
    setConfirmed(null)
    setSelectedSlotId(null)
    bookMutation.reset()
  }

  return (
    <div className='RegisterWRapper'>
      <div className='RegisterContainer'>
        <aside>
          <div className='registerLogoWRapper'></div>
          <div className='studentComment'>
            <div className='innerstudentComment'>
              <div className='quoteHolder'>
                <p></p>
              </div>
              <div className='studentQuote'>
                <p>
                  Helping students discover how they learn best is what teaching is all
                  about. Am So glad to help many kids start their journey
                </p>
              </div>
              <div className='studentPicholder'>
                <div className='studentPic'>
                  <img src={pic} alt='' />
                </div>
                <div className='studentpicname '>
                  <p className='stdntname font-semibold flex'>Joyce Wanjiku </p>
                  <p className='stdntdescription text-sm'>Active Teacher, Kenya</p>
                </div>
              </div>
            </div>
            <div className='copywrightHolder'>
              <p>
                <span>
                  <i className='fa fa-copyright' aria-hidden='true'></i>
                </span>{' '}
                {new Date().getFullYear()} codingscholar.com
              </p>
            </div>
          </div>
        </aside>

        <main>
          <div className='registerLogoWRapper rightSideLogo'>
            <div className='rightSideLogoLeft'></div>
            <div className='rightSideLogoRight'>
              <ul>
                <li>
                  <i className='fa fa-envelope-open' aria-hidden='true'></i>
                  &nbsp;
                  <a
                    href='https://mail.google.com/mail/?view=cm&to=info@codingscholar.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    support: info@codingscholar.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='RegisterFormWrapper'>
            <div className='InnerBookingWrapper'>
              {bookingError && (
                <p role='alert' style={{ color: 'red' }}>
                  {bookingError}
                </p>
              )}
              <h3>Book a free lesson to enter the wonderful world of coding</h3>
              <p className='timezone'>This will be recorded in your country's time zone</p>

              <div className='timeSeletorWrapper'>
                <p>Select date</p>
                <div className='bookingDateWrapper'>
                  <ul>
                    {days.map((day, i) => (
                      <li
                        key={day.dateStr}
                        className={i === selectedDay ? 'activeDay' : ''}
                        onClick={() => setSelectedDay(i)}
                      >
                        {day.label}
                      </li>
                    ))}
                  </ul>
                </div>

                <p>Select time</p>
                <div className='bookingTimeWrapper'>
                  {isPending ? (
                     <SlotsLoader />
                  ) : isError ? (
                    <p>
                      We couldn't load class times.{' '}
                      <button type='button' onClick={() => refetch()}>
                        Try again
                      </button>
                    </p>
                  ) : slots.length > 0 ? (
                    slots.map((item) => (
                      <div key={item.id}>
                        <span
                          role='button'
                          tabIndex={0}
                          aria-pressed={item.id === selectedSlotId}
                          className={item.id === selectedSlotId ? 'selectedTime' : ''}
                          onClick={() => handlePickSlot(item)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              handlePickSlot(item)
                            }
                          }}
                        >
                          {item.timeZoneTime}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p>No booking slots available for now!</p>
                  )}
                </div>
              </div>

              <div className='bookBtnWrapper'>
                <button onClick={handleBook} disabled={bookMutation.isPending}>
                  {bookMutation.isPending ? (
                    <i className='fa fa-spinner spinner' aria-hidden='true'></i>
                  ) : (
                    'book now'
                  )}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {confirmed && <AlertPOPUp booking={confirmed} onClose={handleCloseConfirmation} />}
    </div>
  )
}