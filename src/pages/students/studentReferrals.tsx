import React, { useContext, useState } from 'react'
import { Share2, Copy, Check, MessageCircle, Gift, Users, ArrowRight, Calendar, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { context } from '../../App';
import { QRCodeSVG } from 'qrcode.react';
import YourReferralsTab from '@/Components/students/referrals/referralstab';
type Tab = 'about' | 'yours'

export interface Referral {
  id: string
  name: string
  dateReferred: string // ISO date string
  modulesCompleted: 0 | 1 | 2
}


export default function ReferralPage() {
  const [tab, setTab] = useState<Tab>('about')
  const [copied, setCopied] = useState(false)
  const {student}=useContext(context)
  const studentRefarralCode=student.share_token

  // TODO: replace with real referral link from context/API
  const referralLink = `https://codingscholar.com/referral/${studentRefarralCode}`

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsAppShare = () => {
   
    const message = `Hi! 👋 I wanted to share something you might find useful for your child.

My Kid has been learning with *CodingScholar*, which offers *live* *coding* and *math* *classes8 for kids, and I thought you might be interested in checking it out.

You can have a look here — it’s a page set up through my referral: ${referralLink}

They also have a *free trial*, so you can see what the classes are like before deciding. 😊`;

  
    const msg = encodeURIComponent(`${message}`)
    
    window.open(`https://wa.me/?text=${msg}`, '_blank','noopener,noreferrer')
    
    console.log(message)
  }

  const referrals:Referral[]= [
  { id: '1', name: 'Brian Otieno', dateReferred: '2026-08-28', modulesCompleted: 2 },
  { id: '2', name: 'Faith Wanjiru', dateReferred: '2026-08-20', modulesCompleted: 2 },
  { id: '3', name: 'Kevin Mwangi', dateReferred: '2026-08-15', modulesCompleted: 2 },
  { id: '4', name: 'Grace Achieng', dateReferred: '2026-08-10', modulesCompleted: 1 },
  { id: '5', name: 'Dennis Kiplagat', dateReferred: '2026-07-29', modulesCompleted: 1 },
  { id: '6', name: 'Sharon Njeri', dateReferred: '2026-07-22', modulesCompleted: 0 },
  { id: '7', name: 'Peter Mutua', dateReferred: '2026-07-14', modulesCompleted: 0 },
  { id: '8', name: 'Kevin Mwangi', dateReferred: '2026-08-15', modulesCompleted: 2 },
  { id: '9', name: 'Grace Achieng', dateReferred: '2026-08-10', modulesCompleted: 1 },
  { id: '10', name: 'Dennis Kiplagat', dateReferred: '2026-07-29', modulesCompleted: 1 },
  { id: '11', name: 'Sharon Njeri', dateReferred: '2026-07-22', modulesCompleted: 0 },
  { id: '12', name: 'Peter Mutua', dateReferred: '2026-07-14', modulesCompleted: 0 },
]

const freeClassesRemaining = 10
const totalClassesGained = 15

  return (
    <div className='!w-full !p-2'>
      {/* ---- Tabs ---- */}
      <div className='flex gap-8 border-b border-gray-200 !mb-8 !px-1 !pt-2'>
        <button
          onClick={() => setTab('about')}
          className={`!pb-3 text-sm font-semibold border-b-2 transition-colors ${
            tab === 'about'
              ? 'border-[var(--primary)] text-[var(--primary)]'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          About the Referral
        </button>
        {/* <button
          onClick={() => setTab('yours')}
          className={`!pb-3 text-sm font-semibold border-b-2 transition-colors ${
            tab === 'yours'
              ? 'border-[var(--primary)] text-[var(--primary)]'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Your Referrals
        </button> */}
      </div>

      <AnimatePresence mode='wait'>
        {tab === 'about' ? (
          <motion.div
            key='about'
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AboutTab
              referralLink={referralLink}
              copied={copied}
              onCopy={handleCopy}
              onWhatsApp={handleWhatsAppShare}
            />
          </motion.div>
        ) : (
          <motion.div
            key='yours'
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <YourReferralsTab
  referrals={referrals}                       // Referral[] from your API
  freeClassesRemaining={freeClassesRemaining}  // from student/context
  totalClassesGained={totalClassesGained}
/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AboutTab({
  referralLink,
  copied,
  onCopy,
  onWhatsApp,
}: {
  referralLink: string
  copied: boolean
  onCopy: () => void
  onWhatsApp: () => void
}) {

  const qrMessage=`Hi! 👋 I thought your child might enjoy *CodingScholar*. They offer *live* *online* *coding* and *math* *classes* for kids, and my kid is already learning with them and loving the experience! 
You can check it out through my referral, try a *free class*, and maybe your child can join mine too 😊: ${referralLink}
`
  const waQrUrl = `https://wa.me/?text=${encodeURIComponent(qrMessage)}`;
  

  return (
    <div className='!px-7'>
      {/* ---- Hero ---- */}
     <section className='rounded-2xl bg-gradient-to-br from-[var(--primarysec)] to-[var(--accentsec)] text-white !p-10 !mb-8 relative overflow-hidden'>
  {/* referral network motif — nodes connecting outward, echoes "your invite reaches someone new" */}
  <svg
    className='absolute right-0 top-0 h-full w-1/2 opacity-[0.15] hidden md:block'
    viewBox='0 0 300 300'
    fill='none'
    aria-hidden='true'
  >
    <circle cx='60' cy='150' r='6' fill='white' />
    <circle cx='170' cy='70' r='5' fill='white' />
    <circle cx='190' cy='220' r='5' fill='white' />
    <circle cx='270' cy='130' r='7' fill='white' />
    <line x1='60' y1='150' x2='170' y2='70' stroke='white' strokeWidth='1.5' />
    <line x1='60' y1='150' x2='190' y2='220' stroke='white' strokeWidth='1.5' />
    <line x1='170' y1='70' x2='270' y2='130' stroke='white' strokeWidth='1.5' />
    <line x1='190' y1='220' x2='270' y2='130' stroke='white' strokeWidth='1.5' />
  </svg>

  <div className='relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8'>
    {/* ---- Left: copy + actions ---- */}
  <div className='flex-1'>
    <h1 className='text-2xl md:text-3xl font-bold !mb-3 w-full'>
      Bring a friend into CodingScholar
    </h1>
    <p className='text-white/90 text-sm md:text-base max-w-lg !mb-6'>
      Someone you know could be our next curious learner. Send them your link — once they join and complete 2 modules, you both win.
    </p>

    {/* ---- Reward: how it actually works ---- */}
    <div className='flex items-center gap-4 !mb-6'>
      <div className='text-5xl font-bold leading-none'>5</div>
      <div className='text-sm   text-white/80 leading-snug max-w-md'>
        free classes, unlocked once your referral joins and finishes their first 2 modules
      </div>
    </div>

    {/* ---- Share actions ---- */}
    <div className='flex flex-wrap gap-3'>
      <button
        onClick={onWhatsApp}
        className='inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold text-sm !px-5 !py-3 rounded-xl hover:opacity-90 transition-opacity'
      >
        <MessageCircle size={16} />
        Share on WhatsApp
      </button>
      <button
        onClick={onCopy}
        className='inline-flex items-center gap-2 bg-white text-[var(--primarysec)] font-semibold text-sm !px-5 !py-3 rounded-xl hover:bg-gray-50 transition-colors'
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
    </div>

      {/* ---- Right: QR card (desktop only) ---- */}
  <div className='hidden md:flex flex-col items-center text-center bg-white rounded-2xl shadow-xl !p-5 w-[210px] shrink-0'>
    <div className='inline-flex items-center gap-1.5 text-xs font-semibold text-gray-900 !mb-1'>
      <span className='inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#25D366]'>
        <MessageCircle size={11} className='text-white' />
      </span>
      Scan to share on WhatsApp
    </div>
    <p className='text-[11px] text-gray-500 leading-snug !mb-3'>
      Point your phone camera here, then pick who to send it to.
    </p>

    <div className='rounded-xl border border-gray-100 bg-white !p-2'>
      <QRCodeSVG
        value={waQrUrl}
        size={150}
        level='L'
        fgColor='#111827'
        bgColor='#ffffff'
      />
    </div>
  </div>

  </div>
</section>

      {/* ---- Reward explanation ---- */}
      <section className='bg-white rounded-2xl border border-gray-100 !p-6 !mb-8'>
        <h2 className='text-sm font-semibold text-gray-900 !mb-4'>How rewards work</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='rounded-xl bg-[var(--primarysec)]/10 !p-5'>
            <Gift size={18} className='text-[var(--primarysec)] !mb-2' />
            <div className='text-sm font-semibold text-gray-900 !mb-1'>You get</div>
            <p className='text-xs text-gray-500 leading-relaxed'>
              Once your referral completes 2 modules, you receive up to{' '}
              <span className='font-semibold text-gray-800'>5 free bonus classes</span>{' '}
              {/* and <span className='font-semibold text-gray-800'>10% off</span> your
              next module payment. */}
            </p>
          </div>
          <div className='rounded-xl bg-[var(--accentsec)]/10 !p-5'>
            <Users size={18} className='text-[var(--accentsec)] !mb-2' />
            <div className='text-sm font-semibold text-gray-900 !mb-1'>They get</div>
            <p className='text-xs text-gray-500 leading-relaxed'>
              Your referral gets{' '}
              <span className='font-semibold text-gray-800'>1 free trial class</span>{' '}
              when they join through your invite.
            </p>
          </div>
        </div>
      </section>

      {/* ---- How it works ---- */}
<section className='!mb-8'>
  <h2 className='text-sm font-semibold text-gray-900 !mb-4'>
    How your referral works
  </h2>
  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
    {[
      { n: '01', title: 'Share', desc: 'Send CodingScholar to someone you think would enjoy it.' },
      { n: '02', title: 'They join and pay for 2 modules', desc: 'They sign up through your invite and complete payment for their first 2 modules.' },
      { n: '03', title: 'You get 5 free classes', desc: 'As soon as their second module is paid for, your 5 classes are added to your account.' },
    ].map((step, i) => (
      <div key={step.n} className='relative bg-white rounded-xl border border-gray-100 !p-5'>
        <div className='text-xs font-bold text-[var(--primarysec)] !mb-2'>{step.n}</div>
        <div className='text-sm font-semibold text-gray-900 !mb-1'>{step.title}</div>
        <p className='text-xs text-gray-500 leading-relaxed'>{step.desc}</p>
        {i < 2 && (
          <ArrowRight
            size={16}
            className='hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-700'
          />
        )}
      </div>
    ))}
  </div>
</section>

     {/* ---- Share section ---- */}
<section className='bg-white rounded-2xl border border-gray-100 !p-6 !mb-8'>
  <h2 className='text-sm font-semibold text-gray-900 !mb-4'>Share your invite</h2>

  <div className='flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl !px-4 !py-3 !mb-4'>
    <span className='flex-1 text-xs font-mono text-gray-500 truncate'>
      {referralLink}
    </span>
    <button
      onClick={onCopy}
      className='inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primarysec)] shrink-0 hover:opacity-70 transition-opacity'
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  </div>

  <button
    onClick={onWhatsApp}
    className='w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-semibold !px-4 !py-3 rounded-xl hover:opacity-90 transition-opacity'
  >
    <MessageCircle size={16} />
    Share on WhatsApp
  </button>

  {/* ---- Share a class (stub) ---- */}
  {/* <ShareClassPicker /> */}
</section>

      <Footer />
    </div>
  )
}

function ShareClassPicker() {
  // TODO: replace with real class data from API
  const shareableClasses = [
    { id: 1, topic: 'Accessing Properties of Objects', date: 'Sept 2', time: '9:00 PM' },
    { id: 2, topic: 'Intro to Loops', date: 'Sept 4', time: '5:00 PM' },
  ]
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className='border-t border-gray-100 !pt-5'>
      <div className='text-sm font-semibold text-gray-900 !mb-1'>Or share a class</div>
      <p className='text-xs text-gray-500 !mb-3'>
        Invite someone to a specific class — they can request to join.
      </p>
      <div className='flex flex-col gap-2'>
        {shareableClasses.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c.id)}
            className={`text-left rounded-xl border !px-4 !py-3 transition-colors ${
              selected === c.id
                ? 'border-[var(--primarysec)] bg-[var(--primarysec)]/5'
                : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <div className='text-sm font-medium text-gray-900'>{c.topic}</div>
            <div className='flex items-center gap-4 text-xs text-gray-400 !mt-1'>
              <span className='flex items-center gap-1'><Calendar size={12} />{c.date}</span>
              <span className='flex items-center gap-1'><Clock size={12} />{c.time}</span>
            </div>
          </button>
        ))}
      </div>
      {/* TODO: submit/share-class action once feature is finished */}
    </div>
  )
}

function Footer() {
  return (
    <footer className='text-center text-xs text-gray-400 !py-8 border-t border-gray-100'>
      © {new Date().getFullYear()} CodingScholar. Questions about the referral program?{' '}
      <a href='/support' className='!text-[var(--primarysec)] font-medium'>Contact us</a>.
    </footer>
  )
}