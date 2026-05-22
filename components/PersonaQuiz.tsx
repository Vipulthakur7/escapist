'use client'
import { X, RotateCcw } from 'lucide-react'
import type { TravelerPersona } from '@/types'
import { PERSONA_LABELS, PERSONA_QUESTIONS, DESTINATIONS } from '@/constants/holidays'

interface Props { quizStep:number; isComplete:boolean; persona:TravelerPersona|null; onAnswer:(q:string,v:string)=>void; onReset:()=>void; onClose:()=>void }

export default function PersonaQuiz({ quizStep, isComplete, persona, onAnswer, onReset, onClose }: Props) {
  const q  = PERSONA_QUESTIONS[quizStep]
  const pd = persona ? PERSONA_LABELS[persona] : null
  const topDests = persona ? DESTINATIONS.filter(d => d.best_for.includes(persona)).slice(0,3) : []

  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px',
      background:'rgba(13,60,28,.88)', backdropFilter:'blur(14px)' }} onClick={onClose}>
      <div style={{ background:'white', borderRadius:'22px', width:'100%', maxWidth:'460px', overflow:'hidden', boxShadow:'0 24px 60px rgba(0,0,0,.4)' }} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding:'18px 22px', borderBottom:'1px solid rgba(0,0,0,.06)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ width:34, height:34, borderRadius:'10px', background:'rgba(13,60,28,.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>🧭</div>
            <div>
              <h3 className="display-heading" style={{ fontSize:'1.1rem', color:'var(--clr-earth)' }}>Find Your Travel Persona</h3>
              <p style={{ fontSize:'10px', fontFamily:'var(--font-mono)', color:'#9ca3af' }}>
                {isComplete ? 'Your results' : `Question ${quizStep+1} of ${PERSONA_QUESTIONS.length}`}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'rgba(0,0,0,.06)', border:'none', borderRadius:'50%', width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><X size={14}/></button>
        </div>

        {/* Progress */}
        {!isComplete && (
          <div style={{ height:3, background:'rgba(0,0,0,.06)' }}>
            <div style={{ height:'100%', background:'var(--clr-earth)', transition:'width .5s', width:`${(quizStep/PERSONA_QUESTIONS.length)*100}%` }} />
          </div>
        )}

        <div style={{ padding:'22px' }}>
          {!isComplete ? (
            <>
              <p className="display-heading" style={{ fontSize:'1.2rem', color:'var(--clr-slate)', marginBottom:'18px', lineHeight:1.3 }}>{q.question}</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                {q.options.map(opt => (
                  <button key={opt.value} onClick={() => onAnswer(q.id, opt.value)}
                    style={{ textAlign:'left', padding:'13px 16px', borderRadius:'12px', border:'1px solid rgba(0,0,0,.08)',
                      background:'white', cursor:'pointer', fontSize:'13px', fontFamily:'var(--font-body)', color:'var(--clr-slate)', transition:'all .18s' }}
                    onMouseEnter={e=>{ const t=e.currentTarget; t.style.borderColor='rgba(13,60,28,.3)'; t.style.background='rgba(13,60,28,.03)'; t.style.color='var(--clr-earth)' }}
                    onMouseLeave={e=>{ const t=e.currentTarget; t.style.borderColor='rgba(0,0,0,.08)'; t.style.background='white'; t.style.color='var(--clr-slate)' }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          ) : pd ? (
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'52px', marginBottom:'12px' }}>{pd.emoji}</div>
              <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', textTransform:'uppercase', letterSpacing:'.14em', color:'var(--clr-moss)', marginBottom:'6px' }}>You are</p>
              <h2 className="display-heading" style={{ fontSize:'2rem', color:'var(--clr-earth)', marginBottom:'8px' }}>{pd.label}</h2>
              <p style={{ fontSize:'13px', color:'#6b7280', marginBottom:'20px', lineHeight:1.6 }}>{pd.description}</p>

              {topDests.length > 0 && (
                <div style={{ textAlign:'left', marginBottom:'18px' }}>
                  <p className="section-label" style={{ marginBottom:'8px' }}>Your top picks for 2026</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                    {topDests.map(d => (
                      <div key={d.id} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 12px', borderRadius:'12px', background:'rgba(13,60,28,.04)', border:'1px solid rgba(13,60,28,.08)' }}>
                        <span style={{ fontSize:'18px' }}>{d.type==='international'?'🌍':'🏔️'}</span>
                        <div style={{ flex:1 }}>
                          <p style={{ fontSize:'12px', fontWeight:600, color:'var(--clr-earth)' }}>{d.name}</p>
                          <p style={{ fontSize:'10px', color:'#9ca3af' }}>{d.tagline}</p>
                        </div>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--clr-moss)' }}>⭐ {d.hidden_gem_score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display:'flex', gap:'8px' }}>
                <button onClick={onClose} className="btn-primary" style={{ flex:1, justifyContent:'center' }}>Explore weekends →</button>
                <button onClick={onReset} className="btn-ghost" style={{ padding:'10px 14px' }}><RotateCcw size={14}/></button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
