import { formatDateRange, getSeasonEmoji } from '@/lib/utils'
import type { LongWeekend } from '@/types'

export default function Ticker({ weekends }: { weekends: LongWeekend[] }) {
  const items = weekends.filter(w => new Date(w.startDate) > new Date()).slice(0, 8)
  const doubled = [...items, ...items]

  if (!items.length) return null

  return (
    <div style={{
      background: 'var(--clr-earth)',
      padding: '11px 0',
      overflow: 'hidden',
      /* Explicit z-index so nothing covers this bar */
      position: 'relative',
      zIndex: 20,
      borderTop: '1px solid rgba(255,255,255,.06)',
      borderBottom: '1px solid rgba(0,0,0,.2)',
    }}>
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-flex', animation: 'ticker 38s linear infinite' }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}>
          {doubled.map((w, i) => (
            <span key={`${w.id}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '0 28px' }}>
              <span style={{ color: 'rgba(255,255,255,.25)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>◆</span>
              <span style={{ color: 'rgba(255,255,255,.7)', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.09em' }}>
                {getSeasonEmoji(w.season)} {w.holiday.name}
              </span>
              <span style={{ color: 'var(--clr-gold)', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 500 }}>
                {formatDateRange(w.startDate, w.endDate)}
              </span>
              <span style={{ color: 'rgba(255,255,255,.32)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                {w.totalDays}D{w.bridgeDay ? ' · BRIDGE' : ''}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
