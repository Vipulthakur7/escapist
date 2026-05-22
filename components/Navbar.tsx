'use client'
import { useState, useEffect } from 'react'
import { Compass, User, MapPin, Menu, X } from 'lucide-react'
import type { TravelerPersona } from '@/types'
import { PERSONA_LABELS } from '@/constants/holidays'

export default function Navbar({ persona, visitedCount, onPersonaClick }: { persona:TravelerPersona|null; visitedCount:number; onPersonaClick:()=>void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive:true }); return () => window.removeEventListener('scroll', h)
  }, [])
  const pd = persona ? PERSONA_LABELS[persona] : null

  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, transition:'all .4s',
      background: scrolled ? 'rgba(255,255,255,.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,.06)' : 'none',
      boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,.06)' : 'none',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:'62px' }}>
          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
              background: scrolled ? 'var(--clr-earth)' : 'rgba(255,255,255,.18)' }}>
              <Compass size={15} color="white" />
            </div>
            <span style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', fontWeight:600, letterSpacing:'-.02em',
              color: scrolled ? 'var(--clr-earth)' : 'white' }}>Escapist</span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', padding:'2px 8px', borderRadius:'20px',
              background: scrolled ? 'rgba(13,60,28,.1)' : 'rgba(255,255,255,.12)',
              color: scrolled ? 'var(--clr-earth)' : 'rgba(255,255,255,.65)' }}>2026</span>
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex" style={{ alignItems:'center', gap:'14px' }}>
            {visitedCount > 0 && (
              <span style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'12px',
                color: scrolled ? 'var(--clr-moss)' : 'rgba(255,255,255,.6)', fontFamily:'var(--font-mono)' }}>
                <MapPin size={12} /> {visitedCount} visited
              </span>
            )}
            <button onClick={onPersonaClick} style={{ display:'flex', alignItems:'center', gap:'7px', padding:'7px 16px',
              borderRadius:'9999px', border: scrolled ? '1px solid rgba(13,60,28,.2)' : '1px solid rgba(255,255,255,.22)',
              background:'transparent', cursor:'pointer', fontSize:'12px', fontFamily:'var(--font-body)', fontWeight:500,
              color: scrolled ? 'var(--clr-earth)' : 'white', transition:'all .2s' }}>
              {pd ? <><span>{pd.emoji}</span><span>{pd.label}</span></> : <><User size={13}/><span>Find Your Persona</span></>}
            </button>
          </div>

          {/* Mobile menu */}
          <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: scrolled?'var(--clr-earth)':'white', background:'none', border:'none', cursor:'pointer', padding:'6px' }}>
            {open ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </div>
      {open && (
        <div style={{ background:'white', borderTop:'1px solid rgba(0,0,0,.06)', padding:'12px 20px' }}>
          <button onClick={() => { onPersonaClick(); setOpen(false) }} className="btn-primary w-full justify-center">
            {pd ? `${pd.emoji} ${pd.label}` : '✨ Find Your Travel Persona'}
          </button>
        </div>
      )}
    </nav>
  )
}
