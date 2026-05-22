'use client'
import { useState, useEffect } from 'react'
import { Search, ArrowRight, ChevronDown, Sparkles } from 'lucide-react'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const POPULAR = ['Goa','Manali','Shimla','Jaipur','Udaipur','Coorg','Ooty','Rishikesh','Kerala','Leh','Spiti','Andaman','Darjeeling','Ladakh','Munnar']

interface Props {
  visited: string[]
  addPlace: (p:string)=>void
  removePlace: (p:string)=>void
  selectedMonth: number|null
  onMonthSelect: (m:number|null)=>void
  totalWeekends: number
}

export default function HeroSection({ visited, addPlace, removePlace, selectedMonth, onMonthSelect, totalWeekends }: Props) {
  const [input, setInput] = useState('')
  const [showSugg, setShowSugg] = useState(false)
  const [particles, setParticles] = useState<{x:number;y:number;s:number;d:number}[]>([])

  useEffect(() => {
    setParticles(Array.from({length:20},()=>({ x:Math.random()*100, y:Math.random()*100, s:1+Math.random()*3, d:4+Math.random()*7 })))
  }, [])

  const suggs = POPULAR.filter(p => p.toLowerCase().includes(input.toLowerCase()) && !visited.includes(p)).slice(0,5)

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key==='Enter'||e.key===',') && input.trim()) { e.preventDefault(); addPlace(input.trim()); setInput(''); setShowSugg(false) }
    if (e.key==='Backspace' && !input && visited.length) removePlace(visited[visited.length-1])
  }

  return (
    <section className="hero-bg relative overflow-hidden" style={{ minHeight:'92vh', display:'flex', flexDirection:'column', justifyContent:'center' }}>
      {/* Particles */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
        {particles.map((p,i) => (
          <div key={i} style={{ position:'absolute', left:`${p.x}%`, top:`${p.y}%`, width:`${p.s}px`, height:`${p.s}px`,
            borderRadius:'50%', background:'var(--clr-gold)', opacity:.18,
            animation:`float ${p.d}s ease-in-out infinite`, animationDelay:`${i*.35}s` }} />
        ))}
      </div>

      {/* Grid overlay */}
      <div style={{ position:'absolute', inset:0, opacity:.04, pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)',
        backgroundSize:'56px 56px' }} />

      <div style={{ position:'relative', zIndex:10, maxWidth:'900px', margin:'0 auto', padding:'100px 20px 60px', textAlign:'center' }}>
        {/* Badge */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 16px', borderRadius:'9999px',
          background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.15)', color:'rgba(255,255,255,.75)',
          fontSize:'11px', marginBottom:'22px', fontFamily:'var(--font-mono)' }}>
          <Sparkles size={12} style={{ color:'var(--clr-gold)' }} />
          <span>{totalWeekends} upcoming long weekends in 2026</span>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--clr-gold)', animation:'pulse 2s infinite', display:'inline-block' }} />
        </div>

        {/* Headline */}
        <h1 className="display-heading" style={{ color:'white', fontSize:'clamp(2.2rem,6vw,4.6rem)', marginBottom:'10px' }}>
          Where will your<br />
          <em style={{ color:'var(--clr-gold)', fontStyle:'italic' }}>next escape</em> take you?
        </h1>
        <p style={{ color:'rgba(255,255,255,.52)', fontSize:'1rem', marginBottom:'36px', fontWeight:300 }}>
          Tell us where you have been. We will find the roads you have not taken.
        </p>

        {/* Search Card */}
        <div style={{ background:'rgba(255,255,255,.08)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,.14)',
          borderRadius:'22px', padding:'8px', maxWidth:'720px', margin:'0 auto', display:'flex', flexWrap:'wrap', gap:'6px' }}>

          {/* Visited field */}
          <div style={{ flex:'1 1 280px', background:'rgba(255,255,255,.09)', borderRadius:'15px', padding:'10px 14px', minHeight:'56px' }}>
            <p style={{ color:'rgba(255,255,255,.38)', fontSize:'9px', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:'6px' }}>
              I have visited
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'5px', alignItems:'center' }}>
              {visited.map(v => (
                <span key={v} style={{ display:'inline-flex', alignItems:'center', gap:'4px', padding:'3px 10px', borderRadius:'9999px',
                  background:'rgba(201,164,78,.2)', border:'1px solid rgba(201,164,78,.38)', color:'#f0ead8', fontSize:'11px' }}>
                  {v}
                  <button onClick={()=>removePlace(v)} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(240,234,216,.55)', fontSize:'14px', lineHeight:1, padding:0 }}>×</button>
                </span>
              ))}
              <div style={{ position:'relative' }}>
                <input
                  className="sf-input"
                  value={input}
                  onChange={e => { setInput(e.target.value); setShowSugg(true) }}
                  onKeyDown={handleKey}
                  onFocus={() => setShowSugg(true)}
                  onBlur={() => setTimeout(()=>setShowSugg(false),180)}
                  placeholder={visited.length===0 ? 'Type city, press Enter…' : 'Add more…'}
                />
                {showSugg && input && suggs.length > 0 && (
                  <div style={{ position:'absolute', top:'calc(100% + 6px)', left:0, width:'200px', background:'#0f2016',
                    border:'1px solid rgba(255,255,255,.14)', borderRadius:'12px', overflow:'hidden', zIndex:100, boxShadow:'0 8px 24px rgba(0,0,0,.35)' }}>
                    {suggs.map(s => (
                      <button key={s} onClick={()=>{ addPlace(s); setInput(''); setShowSugg(false) }}
                        style={{ width:'100%', textAlign:'left', padding:'10px 14px', background:'none', border:'none', color:'rgba(255,255,255,.75)',
                          fontSize:'12px', cursor:'pointer', fontFamily:'var(--font-body)' }}
                        onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,255,255,.08)')}
                        onMouseLeave={e=>(e.currentTarget.style.background='none')}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Month */}
          <div style={{ flex:'0 0 150px', background:'rgba(255,255,255,.09)', borderRadius:'15px', padding:'10px 14px' }}>
            <p style={{ color:'rgba(255,255,255,.38)', fontSize:'9px', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:'6px' }}>
              Travel month
            </p>
            <select value={selectedMonth??''} onChange={e=>onMonthSelect(e.target.value?Number(e.target.value):null)}
              style={{ background:'transparent', color:'white', border:'none', outline:'none', width:'100%',
                fontSize:'13px', fontFamily:'var(--font-body)', cursor:'pointer' }}>
              <option value="" style={{ background:'#0d3c1c' }}>Any month</option>
              {MONTHS.map((m,i) => <option key={m} value={i+1} style={{ background:'#0d3c1c' }}>{m}</option>)}
            </select>
          </div>

          {/* CTA */}
          <button onClick={()=>document.getElementById('weekends-grid')?.scrollIntoView({behavior:'smooth'})}
            style={{ flex:'0 0 auto', display:'flex', alignItems:'center', gap:'7px', padding:'12px 22px',
              background:'var(--clr-gold)', color:'var(--clr-earth)', borderRadius:'15px', border:'none', cursor:'pointer',
              fontWeight:500, fontSize:'13px', fontFamily:'var(--font-body)', transition:'all .2s', alignSelf:'stretch' }}
            onMouseEnter={e=>(e.currentTarget.style.filter='brightness(1.07)')}
            onMouseLeave={e=>(e.currentTarget.style.filter='none')}>
            <Search size={14} /> Explore <ArrowRight size={14} />
          </button>
        </div>

        {/* Scroll cue */}
        <div style={{ marginTop:'52px', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
          <button onClick={()=>document.getElementById('weekends-grid')?.scrollIntoView({behavior:'smooth'})}
            style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,.28)', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', textTransform:'uppercase', letterSpacing:'.15em' }}>Scroll to explore</span>
            <ChevronDown size={15} style={{ animation:'float 2s ease-in-out infinite' }} />
          </button>
        </div>
      </div>
    </section>
  )
}
