import { useMemo, useState } from 'react'
import { Search, ArrowUpDown, GraduationCap } from 'lucide-react'

/* ---------------------------------------------------------------
   Types
--------------------------------------------------------------- */

export type ReferralStatus = 'signed_up' | 'in_progress' | 'reward_earned'

export interface Referral {
  id: string
  name: string
  dateReferred: string // ISO date string
  modulesCompleted: 0 | 1 | 2
}

interface YoursTabProps {
  referrals: Referral[]
  freeClassesRemaining: number
  totalClassesGained: number
}

/* ---------------------------------------------------------------
   Derived-status helpers — single source of truth.
   Status is NEVER stored separately; it's always computed from
   modulesCompleted so the two can't drift out of sync.
--------------------------------------------------------------- */

function getStatus(modulesCompleted: 0 | 1 | 2): { label: string; status: ReferralStatus } {
  if (modulesCompleted === 2) return { label: 'Reward earned', status: 'reward_earned' }
  if (modulesCompleted === 1) return { label: 'In progress', status: 'in_progress' }
  return { label: 'Signed up', status: 'signed_up' }
}

function getProgressLabel(modulesCompleted: 0 | 1 | 2): string {
  if (modulesCompleted === 0) return 'No activity yet'
  return `${modulesCompleted}/2 modules`
}

const STATUS_BADGE: Record<ReferralStatus, string> = {
  reward_earned: 'bg-green-50 text-green-700',
  in_progress: 'bg-[var(--primarysec)]/10 text-[var(--primarysec)]',
  signed_up: 'bg-gray-100 text-gray-500',
}

const STATUS_DOT: Record<ReferralStatus, string> = {
  reward_earned: 'bg-green-600',
  in_progress: 'bg-[var(--primarysec)]',
  signed_up: 'bg-gray-400',
}

// Same palette drives the donut segments — keeps hero + table visually locked together.
const DONUT_COLORS: Record<ReferralStatus, string> = {
  reward_earned: '#16a34a', // green-600
  in_progress: 'var(--primarysec)',
  signed_up: '#9ca3af', // gray-400
}

/* ---------------------------------------------------------------
   Dependency-free donut chart (plain SVG, no chart library)
--------------------------------------------------------------- */

function DonutChart({ segments }: { segments: { value: number; color: string }[] }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1
  const radius = 40
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <svg viewBox='0 0 100 100' className='w-full h-full -rotate-90'>
      <circle cx='50' cy='50' r={radius} fill='none' stroke='#F3F4F6' strokeWidth='14' />
      {segments.map((seg, i) => {
        const dash = (seg.value / total) * circumference
        const circle = (
          <circle
            key={i}
            cx='50'
            cy='50'
            r={radius}
            fill='none'
            stroke={seg.color}
            strokeWidth='14'
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-offset}
          />
        )
        offset += dash
        return circle
      })}
    </svg>
  )
}

/* ---------------------------------------------------------------
   Stats hero
--------------------------------------------------------------- */

function StatsHero({ referrals, freeClassesRemaining, totalClassesGained }: YoursTabProps) {
  const successfulReferrals = referrals.filter((r) => r.modulesCompleted === 2).length
  const inProgress = referrals.filter((r) => r.modulesCompleted === 1).length
  const signedUpOnly = referrals.filter((r) => r.modulesCompleted === 0).length
  const totalReferrals = referrals.length

  const segments = [
    { value: successfulReferrals, color: DONUT_COLORS.reward_earned },
    { value: inProgress, color: DONUT_COLORS.in_progress },
    { value: signedUpOnly, color: DONUT_COLORS.signed_up },
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 !mb-8'>
      <div className='bg-white rounded-2xl border border-gray-100 !p-6 flex flex-col justify-center gap-1'>
        <span className='text-xs font-semibold text-gray-500'>Free classes remaining</span>
        <span className='text-5xl font-bold text-gray-900 leading-none !mt-1'>{freeClassesRemaining}</span>
        <span className='text-xs text-gray-400 !mt-1'>of {totalClassesGained} earned</span>
      </div>

      <div className='bg-white rounded-2xl border border-gray-100 !p-6 flex flex-col justify-center gap-1'>
        <span className='text-xs font-semibold text-gray-500'>Total classes gained</span>
        <span className='text-5xl font-bold text-gray-900 leading-none !mt-1'>{totalClassesGained}</span>
        <span className='text-xs text-gray-400 !mt-1'>lifetime, all-time</span>
      </div>

      <div className='bg-white rounded-2xl border border-gray-100 !p-6'>
        <span className='text-xs font-semibold text-gray-500 block !mb-3'>Referral breakdown</span>
        <div className='flex items-center gap-4'>
          <div className='relative w-24 h-24 shrink-0'>
            <DonutChart segments={segments} />
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <span className='text-xl font-bold text-gray-900'>{totalReferrals}</span>
              <span className='text-[10px] text-gray-400'>total</span>
            </div>
          </div>
          <div className='flex flex-col gap-1.5 text-xs'>
            <span className='flex items-center gap-2 text-gray-500'>
              <span className='w-2.5 h-2.5 rounded-sm shrink-0' style={{ background: DONUT_COLORS.reward_earned }} />
              Reward earned — {successfulReferrals}
            </span>
            <span className='flex items-center gap-2 text-gray-500'>
              <span className='w-2.5 h-2.5 rounded-sm shrink-0' style={{ background: DONUT_COLORS.in_progress }} />
              In progress — {inProgress}
            </span>
            <span className='flex items-center gap-2 text-gray-500'>
              <span className='w-2.5 h-2.5 rounded-sm shrink-0' style={{ background: DONUT_COLORS.signed_up }} />
              Signed up — {signedUpOnly}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------
   Table + sticky filter/header
--------------------------------------------------------------- */

type SortOrder = 'newest' | 'oldest'

// Shared grid so header + rows always line up. Adjust column count/widths here only.
const GRID_COLS = 'grid-cols-[2fr_1.2fr_1.2fr_1.4fr]'

function ReferralsTable({ referrals }: { referrals: Referral[] }) {
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')

  const filtered = useMemo(() => {
    const list = referrals.filter((r) => r.name.toLowerCase().includes(search.trim().toLowerCase()))
    return list.sort((a, b) => {
      const diff = new Date(a.dateReferred).getTime() - new Date(b.dateReferred).getTime()
      return sortOrder === 'newest' ? -diff : diff
    })
  }, [referrals, search, sortOrder])

  return (
    <section className='bg-white rounded-2xl border border-gray-100 overflow-hidden !mb-8'>
      {/*
        Sticky block: filter bar + column header travel together and
        pin to the top of the scroll container once reached.
        `top-0` assumes no fixed app header above this page — if you
        have a sticky navbar, change to `top-[navbar-height]` on both
        sticky elements below.
      */}
      <div className='sticky top-0 z-20 bg-white'>
        {/* ---- Filters ---- */}
        <div className='flex flex-wrap items-center gap-3 !p-4 border-b border-gray-100'>
          <div className='relative flex-1 min-w-[180px]'>
            <Search size={15} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search by name'
              className='w-full text-sm bg-gray-50 border border-gray-100 rounded-xl !pl-9 !pr-3 !py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[var(--primarysec)]/40'
            />
          </div>

          <button
            onClick={() => setSortOrder((s) => (s === 'newest' ? 'oldest' : 'newest'))}
            className='inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-100 rounded-xl !px-3 !py-2.5 hover:bg-gray-100 transition-colors shrink-0'
          >
            <ArrowUpDown size={13} />
            {sortOrder === 'newest' ? 'Newest first' : 'Oldest first'}
          </button>
        </div>

        {/* ---- Column header ---- */}
        <div
          className={`grid ${GRID_COLS} gap-2 !px-4 !py-3 border-b border-gray-100 text-[11px] font-semibold uppercase tracking-wide text-gray-400`}
        >
          <span>Name</span>
          <span>Date referred</span>
          <span>Status</span>
          <span>Progress</span>
        </div>
      </div>

      {/* ---- Rows — normal document flow, scroll under the sticky block above ---- */}
      <div>
        {filtered.length === 0 ? (
          <div className='flex flex-col items-center justify-center text-center !py-16 !px-6'>
            <GraduationCap size={28} className='text-gray-300 !mb-3' />
            <p className='text-sm font-semibold text-gray-700'>No referrals yet</p>
            <p className='text-xs text-gray-400 !mt-1 max-w-xs'>
              Share your invite link and your referrals will show up here.
            </p>
          </div>
        ) : (
          filtered.map((r) => {
            const { label, status } = getStatus(r.modulesCompleted)
            return (
              <div
                key={r.id}
                className={`grid ${GRID_COLS} gap-2 !px-4 !py-4 border-b border-gray-50 last:border-b-0 items-center text-sm`}
              >
                <span className='font-medium text-gray-900 truncate'>{r.name}</span>
                <span className='text-gray-500'>
                  {new Date(r.dateReferred).toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 w-fit text-xs font-semibold rounded-full !px-2.5 !py-1 ${STATUS_BADGE[status]}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status]}`} />
                  {label}
                </span>
                <span className='text-gray-500'>{getProgressLabel(r.modulesCompleted)}</span>
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------
   Exported tab
--------------------------------------------------------------- */

export default function YourReferralsTab({ referrals, freeClassesRemaining, totalClassesGained }: YoursTabProps) {
  return (
    <div className='!px-7'>
      <StatsHero
        referrals={referrals}
        freeClassesRemaining={freeClassesRemaining}
        totalClassesGained={totalClassesGained}
      />
      <ReferralsTable referrals={referrals} />
    </div>
  )
}