'use client'
import { useState, useEffect, useCallback } from 'react'
const KEY = 'escapist_visited'
export function useVisitedPlaces() {
  const [visited, setVisited] = useState<string[]>([])
  const [loaded, setLoaded]   = useState(false)
  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) setVisited(JSON.parse(s)) } catch {}
    setLoaded(true)
  }, [])
  const save = (next: string[]) => { try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {} }
  const addPlace    = useCallback((p: string) => setVisited(prev => { const n = prev.includes(p.trim()) ? prev : [...prev, p.trim()]; save(n); return n }), [])
  const removePlace = useCallback((p: string) => setVisited(prev => { const n = prev.filter(x => x !== p); save(n); return n }), [])
  const clearAll    = useCallback(() => { setVisited([]); try { localStorage.removeItem(KEY) } catch {} }, [])
  return { visited, addPlace, removePlace, clearAll, loaded }
}
