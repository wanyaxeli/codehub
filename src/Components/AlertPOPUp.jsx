import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'

export default function AlertPOPUp({ booking, onClose }) {
  const navigate = useNavigate()
  const doneRef = useRef(null)
  const [shown, setShown] = useState(false)

  // Focus the button and trigger the entrance transition on mount.
  useEffect(() => {
    doneRef.current?.focus()
    const id = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Escape closes the popup (stays on the page).
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  // "Done" keeps the original behaviour: go back home.
  const handleDone = () => {
    onClose()
    navigate('/')
  }

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[1000] grid place-items-center bg-slate-900/55 !p-4 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none ${
        shown ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='bk-title'
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-[420px] rounded-2xl bg-white !px-7 !pb-6 !pt-8 text-center text-slate-800 shadow-2xl transition-all duration-300 motion-reduce:transition-none ${
          shown ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-95 opacity-0'
        }`}
      >
        <svg
          viewBox='0 0 52 52'
          aria-hidden='true'
          className='!mx-auto !mb-4 !h-16 !w-16 text-emerald-700'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle
            cx='26'
            cy='26'
            r='24'
            transform='rotate(-90 26 26)'
            strokeWidth='3'
            className='transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none'
            style={{ strokeDasharray: 151, strokeDashoffset: shown ? 0 : 151 }}
          />
          <path
            d='M15 27l8 8 14-16'
            strokeWidth='3.5'
            className='transition-[stroke-dashoffset] delay-500 duration-300 ease-out motion-reduce:transition-none'
            style={{ strokeDasharray: 36, strokeDashoffset: shown ? 0 : 36 }}
          />
        </svg>

        <h2 id='bk-title' className='text-[1.375rem] font-bold leading-tight'>
          Your free class is booked
        </h2>
        <p className='!mt-1.5 text-[0.9375rem] leading-relaxed text-slate-600'>
          The class  details have been sent to{' '}
          <span className='break-all font-medium text-slate-800'>
            {booking.email || 'your email'}
          </span>
          .
        </p>

        {/* <dl className='my-5 divide-y divide-slate-200 rounded-xl bg-slate-50 !px-4 text-left'>
          <div className='flex justify-between gap-4 !py-3'>
            <dt className='text-sm text-slate-500'>Date</dt>
            <dd className='text-right font-semibold'>{booking.date}</dd>
          </div>
          <div className='flex justify-between gap-4 !py-3'>
            <dt className='text-sm text-slate-500'>Time (your local time)</dt>
            <dd className='text-right font-semibold'>{booking.time}</dd>
          </div>
          <div className='flex justify-between gap-4 !py-3'>
            <dt className='text-sm text-slate-500'>Teacher</dt>
            <dd className='text-right font-semibold'>{booking.teacher}</dd>
          </div>
        </dl> */}

        <button
          ref={doneRef}
          type='button'
          onClick={handleDone}
          className='w-full rounded-xl !mt-3 bg-emerald-700 !px-4 !py-3 text-base font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-emerald-700/40'
        >
          Done
        </button>
      </div>
    </div>,
    document.getElementById('alert')
  )
}