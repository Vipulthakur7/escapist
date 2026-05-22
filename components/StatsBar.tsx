'use client'
import { Calendar, Zap, MapPin, Compass, Trash2 } from 'lucide-react'
import type { LongWeekend } from '@/types'

export default function StatsBar({ weekends, visitedCount, onClearVisited }: {
  weekends: LongWeekend[]
  visitedCount: number
  onClearVisited: () => void
}) {
  const upcoming   = weekends.filter(w => new Date(w.startDate) > new Date())
  const bridgeDays = weekends.filter(w => w.bridgeDay).length

  const stats = [
    { icon: <Calendar size={16} />, val: upcoming.length, label: 'Upcoming weekends',    color: 'var(--clr-earth)' },
    { icon: <Zap size={16} />,      val: bridgeDays,      label: 'Bridge day chances',   color: 'var(--clr-ember)' },
    { icon: <Compass size={16} />,  val: 15,              label: 'Unexplored gems',       color: 'var(--clr-dusk)' },
    { icon: <MapPin size={16} />,   val: visitedCount,    label: "Places you've visited", color: 'var(--clr-moss)',
      action: visitedCount > 0 ? onClearVisited : undefined },
  ]

  return (
    /* No negative margin — sits naturally in document flow */
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
      <div style={{
        background: 'white', borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,.09)', border: '1px solid rgba(0,0,0,.06)',
        padding: '20px 28px', display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)', gap: '12px',
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
              fontSize: '1.8rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: s.color,
            }}>
              <span style={{ color: s.color, display: 'flex' }}>{s.icon}</span>
              {s.val}
            </div>
            <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '3px', fontFamily: 'var(--font-body)' }}>
              {s.label}
            </p>
            {s.action && (
              <button onClick={s.action} style={{
                display: 'inline-flex', alignItems: 'center', gap: '3px',
                fontSize: '10px', color: '#f87171', background: 'none', border: 'none',
                cursor: 'pointer', marginTop: '4px', fontFamily: 'var(--font-mono)',
              }}>
                <Trash2 size={9} /> clear all
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
