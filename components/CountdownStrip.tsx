'use client'
import { useState, useEffect } from 'react'
import { parseISO, differenceInSeconds, format } from 'date-fns'
import { Clock, ArrowRight } from 'lucide-react'
import type { LongWeekend } from '@/types'
import { formatDateRange } from '@/lib/utils'

export default function CountdownStrip({ nextWeekend }: { nextWeekend: LongWeekend }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const target = parseISO(nextWeekend.startDate)

  useEffect(() => {
    const tick = () => {
      const diff = differenceInSeconds(target, new Date())
      if (diff <= 0) { setT({ d: 0, h: 0, m: 0, s: 0 }); return }
      setT({ d: Math.floor(diff / 86400), h: Math.floor((diff % 86400) / 3600), m: Math.floor((diff % 3600) / 60), s: diff % 60 })
    }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
  }, [target])

  const dest = nextWeekend.destinations[0]

  return (
    <div style={{
      background: 'linear-gradient(135deg,#0a2214 0%,#0d3c1c 50%,#102a1c 100%)',
      padding: '13px 0',
      position: 'relative', zIndex: 20,
      borderBottom: '1px solid rgba(255,255,255,.07)',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <Clock size={13} style={{ color: 'var(--clr-gold)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.45)' }}>
            Next long weekend
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'white' }}>
            {nextWeekend.holiday.name}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--clr-gold)' }}>
            {formatDateRange(nextWeekend.startDate, nextWeekend.endDate)}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {[{ v: t.d, l: 'days' }, { v: t.h, l: 'hrs' }, { v: t.m, l: 'min' }, { v: t.s, l: 'sec' }].map(({ v, l }, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 500, color: 'white',
                background: 'rgba(255,255,255,.1)', borderRadius: '8px', padding: '4px 9px',
                minWidth: '40px', display: 'inline-block', border: '1px solid rgba(255,255,255,.1)',
              }}>
                {String(v).padStart(2, '0')}
              </div>
              <div style={{ fontSize: '8px', color: 'rgba(255,255,255,.35)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>{l}</div>
            </div>
          ))}
        </div>

        {dest && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.1em' }}>suggested</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 13px', borderRadius: '9999px', background: 'rgba(201,164,78,.18)', border: '1px solid rgba(201,164,78,.3)' }}>
              <span style={{ color: 'var(--clr-gold)', fontSize: '12px', fontWeight: 500, fontFamily: 'var(--font-body)' }}>{dest.name}</span>
              <ArrowRight size={11} style={{ color: 'var(--clr-gold)' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
