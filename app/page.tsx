'use client'
import { useState, useMemo } from 'react'
import { INDIAN_HOLIDAYS_2026, computeLongWeekends } from '@/constants/holidays'
import { useVisitedPlaces } from '@/hooks/useVisitedPlaces'
import { usePersona } from '@/hooks/usePersona'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import Ticker from '@/components/Ticker'
import StatsBar from '@/components/StatsBar'
import BentoGrid from '@/components/BentoGrid'
import PersonaQuiz from '@/components/PersonaQuiz'
import CountdownStrip from '@/components/CountdownStrip'
import Footer from '@/components/Footer'

export default function Home() {
  const { visited, addPlace, removePlace, clearAll } = useVisitedPlaces()
  const { persona, quizStep, isComplete, answerQuestion, resetQuiz } = usePersona()
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)

  const allWeekends = useMemo(() => computeLongWeekends(INDIAN_HOLIDAYS_2026, visited), [visited])
  const filtered = useMemo(() => selectedMonth ? allWeekends.filter(w => w.month === selectedMonth) : allWeekends, [allWeekends, selectedMonth])
  const upcoming = allWeekends.filter(w => new Date(w.startDate) > new Date())

  return (
    <div style={{ minHeight: '100vh', background: 'var(--clr-fog)' }}>
      <Navbar persona={persona} visitedCount={visited.length} onPersonaClick={() => setShowQuiz(true)} />

      {/* HERO */}
      <HeroSection visited={visited} addPlace={addPlace} removePlace={removePlace}
        selectedMonth={selectedMonth} onMonthSelect={setSelectedMonth} totalWeekends={upcoming.length} />

      {/* TICKER — full width, sits directly below hero, NO overlap */}
      <Ticker weekends={allWeekends} />

      {/* COUNTDOWN — sits below ticker */}
      {upcoming.length > 0 && <CountdownStrip nextWeekend={upcoming[0]} />}

      {/* STATS — normal flow, no negative margin */}
      <div style={{ background: 'var(--clr-fog)', paddingTop: '28px', paddingBottom: '8px' }}>
        <StatsBar weekends={allWeekends} visitedCount={visited.length} onClearVisited={clearAll} />
      </div>

      {/* MAIN GRID */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '8px 16px 60px' }}>
        <MonthFilter selected={selectedMonth} onSelect={setSelectedMonth} weekends={allWeekends} />
        <BentoGrid weekends={filtered} persona={persona} />
      </main>

      {showQuiz && (
        <PersonaQuiz quizStep={quizStep} isComplete={isComplete} persona={persona}
          onAnswer={answerQuestion} onReset={resetQuiz} onClose={() => setShowQuiz(false)} />
      )}
      <Footer />
    </div>
  )
}

function MonthFilter({ selected, onSelect, weekends }: {
  selected: number | null
  onSelect: (m: number | null) => void
  weekends: ReturnType<typeof computeLongWeekends>
}) {
  const months = useMemo(() => {
    const seen = new Set<number>()
    const out: { month: number; label: string; count: number }[] = []
    for (const w of weekends) {
      if (!seen.has(w.month)) {
        seen.add(w.month)
        out.push({
          month: w.month,
          label: new Date(2026, w.month - 1, 1).toLocaleString('en-IN', { month: 'short' }),
          count: weekends.filter(x => x.month === w.month).length,
        })
      }
    }
    return out
  }, [weekends])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
      <span className="section-label" style={{ flexShrink: 0 }}>Month</span>
      {[null, ...months].map((item, i) => {
        const active = item === null ? selected === null : selected === item.month
        return (
          <button key={i} onClick={() => onSelect(item ? item.month : null)}
            style={{
              flexShrink: 0, padding: '6px 16px', borderRadius: '9999px',
              fontSize: '13px', fontWeight: 500, cursor: 'pointer',
              border: '1px solid rgba(0,0,0,.09)', transition: 'all .2s',
              background: active ? 'var(--clr-earth)' : 'white',
              color: active ? 'white' : 'var(--clr-slate)',
              fontFamily: 'var(--font-body)',
            }}>
            {item === null ? 'All' : item.label}
            {item !== null && <span style={{ opacity: .55, fontSize: '11px', marginLeft: '4px' }}>{item.count}</span>}
          </button>
        )
      })}
    </div>
  )
}
