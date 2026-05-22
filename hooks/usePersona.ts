'use client'
import { useState, useCallback } from 'react'
import type { TravelerPersona } from '@/types'
import { PERSONA_QUESTIONS } from '@/constants/holidays'
const KEY = 'escapist_persona'
export function usePersona() {
  const [persona, setPersona] = useState<TravelerPersona|null>(() => {
    if (typeof window === 'undefined') return null
    try { return (localStorage.getItem(KEY) as TravelerPersona) || null } catch { return null }
  })
  const [answers, setAnswers]     = useState<Record<string,string>>({})
  const [quizStep, setQuizStep]   = useState(0)
  const [isComplete, setComplete] = useState(false)

  const answerQuestion = useCallback((qId: string, val: string) => {
    const next = { ...answers, [qId]: val }
    setAnswers(next)
    if (quizStep < PERSONA_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1)
    } else {
      const tally: Record<string,number> = {}
      Object.values(next).forEach(v => { tally[v] = (tally[v]||0)+1 })
      const winner = Object.entries(tally).sort((a,b)=>b[1]-a[1])[0][0] as TravelerPersona
      setPersona(winner); setComplete(true)
      try { localStorage.setItem(KEY, winner) } catch {}
    }
  }, [answers, quizStep])

  const resetQuiz = useCallback(() => {
    setAnswers({}); setQuizStep(0); setComplete(false); setPersona(null)
    try { localStorage.removeItem(KEY) } catch {}
  }, [])

  return { persona, quizStep, isComplete, answerQuestion, resetQuiz }
}
