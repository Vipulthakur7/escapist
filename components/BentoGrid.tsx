'use client'
import { useMemo } from 'react'
import type { LongWeekend, TravelerPersona } from '@/types'
import WeekendCard from './WeekendCard'
import { getDaysUntil } from '@/lib/utils'

export default function BentoGrid({ weekends, persona }: { weekends: LongWeekend[]; persona: TravelerPersona | null }) {
  const upcoming = useMemo(() => weekends.filter(w => getDaysUntil(w.startDate) >= -1), [weekends])

  if (!upcoming.length) return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <p style={{ fontSize: '3rem', marginBottom: '12px' }}>🌏</p>
      <p style={{ color: '#9ca3af', fontFamily: 'var(--font-body)' }}>No upcoming long weekends for this filter.</p>
    </div>
  )

  // Group into chunks of 3: [large, small, small]
  const rows: LongWeekend[][] = []
  for (let i = 0; i < upcoming.length; i += 3) {
    rows.push(upcoming.slice(i, i + 3))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {rows.map((row, ri) => {
        const [main, s1, s2] = row
        const isFlipped = ri % 2 === 1  // alternate large card side each row
        return (
          <div key={main.id} style={{
            display: 'grid',
            gridTemplateColumns: row.length === 1 ? '1fr' : (isFlipped ? '5fr 7fr' : '7fr 5fr'),
            gap: '14px',
          }}>
            {isFlipped ? (
              <>
                {/* Right side: stacked smalls */}
                {(s1 || s2) && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {s1 && <WeekendCard weekend={s1} persona={persona} size="sm" />}
                    {s2 && <WeekendCard weekend={s2} persona={persona} size="sm" />}
                    {!s2 && <div style={{ flex: 1 }} />}
                  </div>
                )}
                {/* Left side: large */}
                <WeekendCard weekend={main} persona={persona} size="lg" />
              </>
            ) : (
              <>
                {/* Left side: large */}
                <WeekendCard weekend={main} persona={persona} size="lg" />
                {/* Right side: stacked smalls */}
                {(s1 || s2) && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {s1 && <WeekendCard weekend={s1} persona={persona} size="sm" />}
                    {s2 && <WeekendCard weekend={s2} persona={persona} size="sm" />}
                    {!s2 && <div style={{ flex: 1 }} />}
                  </div>
                )}
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
