'use client'
import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Zap, Globe, Mountain, Star, DollarSign, Plane, MapIcon, Package, Calculator } from 'lucide-react'
import type { LongWeekend, Destination, TravelerPersona } from '@/types'
import { formatDateRange, formatBudget, getDaysUntil, getUrgencyLabel, getSeasonEmoji } from '@/lib/utils'
import LeaveModal from './LeaveModal'
import PackingModal from './PackingModal'
import BudgetModal from './BudgetModal'
import MapModal from './MapModal'

interface Props { weekend: LongWeekend; persona: TravelerPersona | null; size: 'lg' | 'sm' }

export default function WeekendCard({ weekend, persona, size }: Props) {
  const [active, setActive] = useState<Destination>(weekend.destinations[0])
  const [modal, setModal] = useState<'leave' | 'pack' | 'budget' | 'map' | null>(null)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgErr, setImgErr] = useState(false)

  const daysUntil = getDaysUntil(weekend.startDate)
  const urgency = getUrgencyLabel(daysUntil)
  const isPast = daysUntil < -1
  const height = size === 'lg' ? '480px' : '230px'
  const national = weekend.destinations.filter(d => d.type === 'national').slice(0, 3)
  const intl = weekend.destinations.filter(d => d.type === 'international').slice(0, 2)
  const pillDests = [...national, ...intl].slice(0, size === 'lg' ? 5 : 3)

  const switchDest = (d: Destination) => {
    if (d.id === active.id) return
    setActive(d); setImgLoaded(false); setImgErr(false)
  }

  return (
    <>
      <div style={{
        position: 'relative', borderRadius: '18px', overflow: 'hidden', height,
        opacity: isPast ? .55 : 1, cursor: 'pointer',
        boxShadow: '0 4px 28px rgba(0,0,0,.18)', transition: 'transform .3s, box-shadow .3s',
        background: active.gradient,         /* ← always-visible gradient base */
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,.26)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 28px rgba(0,0,0,.18)' }}
      >
        {/* SVG scene art — renders immediately, gives depth before photo loads */}
        <SceneSVG category={active.category} />

        {/* Real photo — fades in once the browser has loaded it */}
        {!imgErr && (
          <img
            key={active.id}
            src={active.image_url}
            alt={active.name}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgErr(true); setImgLoaded(false) }}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', transition: 'opacity .9s ease',
              opacity: imgLoaded ? 1 : 0,
            }}
          />
        )}

        {/* Dark gradient overlay always on top of image for text legibility */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,.90) 0%, rgba(0,0,0,.42) 50%, rgba(0,0,0,.08) 100%)',
        }} />

        {/* ── BADGES ── */}
        {!isPast && (
          <div style={{
            position: 'absolute', top: 12, left: 12, zIndex: 10,
            padding: '4px 11px', borderRadius: '9999px',
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            backdropFilter: 'blur(8px)',
            background: daysUntil <= 14 ? 'rgba(232,64,0,.8)' : daysUntil <= 30 ? 'rgba(201,164,78,.88)' : 'rgba(0,0,0,.45)',
            color: (daysUntil <= 30 && daysUntil > 14) ? '#3d1f00' : 'white',
            border: '1px solid rgba(255,255,255,.18)',
          }}>
            {urgency}{daysUntil >= 0 && daysUntil <= 60 ? ` · ${daysUntil}d` : ''}
          </div>
        )}
        {weekend.bridgeDay ? (
          <div style={{
            position: 'absolute', top: 12, right: 12, zIndex: 10,
            display: 'flex', alignItems: 'center', gap: '4px',
            padding: '4px 11px', borderRadius: '9999px',
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            background: 'rgba(107,45,148,.82)', color: 'white',
            backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.15)',
          }}>
            <Zap size={9} /> Bridge Day
          </div>
        ) : (
          <div style={{ position: 'absolute', top: 14, right: 15, zIndex: 10, fontSize: '1.2rem' }}>
            {getSeasonEmoji(weekend.season)}
          </div>
        )}
        {active.hidden_gem_score >= 9 && size === 'lg' && (
          <div style={{
            position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 10,
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '3px 11px', borderRadius: '9999px',
            background: 'rgba(201,164,78,.22)', border: '1px solid rgba(201,164,78,.5)',
            color: 'var(--clr-gold)', fontSize: '9px', fontFamily: 'var(--font-mono)',
            backdropFilter: 'blur(6px)', letterSpacing: '.1em',
          }}>
            ✦ Hidden Gem · {active.hidden_gem_score}/10
          </div>
        )}

        {/* ── BOTTOM CONTENT ── */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: size === 'lg' ? '22px' : '14px', zIndex: 10 }}>
          <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,.45)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: '3px' }}>
            {weekend.holiday.name}
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)', color: 'white', fontWeight: 600,
            fontSize: size === 'lg' ? '2.5rem' : '1.6rem', lineHeight: 1.04, marginBottom: '3px',
            textShadow: '0 2px 16px rgba(0,0,0,.6)',
          }}>
            {formatDateRange(weekend.startDate, weekend.endDate)}
          </h2>
          <p style={{ color: 'rgba(255,255,255,.58)', fontSize: '11px', marginBottom: size === 'lg' ? '11px' : '7px' }}>
            {weekend.totalDays} days
            {weekend.bridgeDay && (
              <span style={{ color: 'var(--clr-gold)', marginLeft: '7px' }}>
                · Take {format(parseISO(weekend.bridgeDay), 'EEEE')} off →{' '}
                <span style={{ color: 'white' }}>{weekend.totalDays}-day weekend</span>
              </span>
            )}
          </p>

          {/* Destination pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: size === 'lg' ? '13px' : '8px' }}>
            {pillDests.map(d => (
              <button key={d.id} onClick={e => { e.stopPropagation(); switchDest(d) }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '4px 11px', borderRadius: '9999px', fontSize: '10px',
                  fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)',
                  transition: 'all .2s', border: '1px solid',
                  borderColor: active.id === d.id ? 'var(--clr-gold)' : 'rgba(255,255,255,.22)',
                  background: active.id === d.id ? 'var(--clr-gold)' : 'rgba(255,255,255,.14)',
                  color: active.id === d.id ? 'var(--clr-earth)' : 'white',
                  backdropFilter: 'blur(4px)',
                }}>
                {d.type === 'international' ? <Globe size={9} /> : <Mountain size={9} />}
                {d.name}
              </button>
            ))}
          </div>

          {/* Meta + actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,255,255,.5)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Star size={9} style={{ color: 'var(--clr-gold)' }} />{active.hidden_gem_score}/10</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><DollarSign size={9} />{formatBudget(active.budget_per_day_inr)}</span>
              {active.type === 'international' && <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Plane size={9} />{active.flight_hours}h</span>}
              {active.type === 'international' && !active.visa_required && <span style={{ color: '#4ade80' }}>✓ Visa-free</span>}
            </div>

            {!isPast && size === 'lg' && (
              <div style={{ display: 'flex', gap: '5px' }} onClick={e => e.stopPropagation()}>
                {[
                  { icon: <MapIcon size={10} />, label: 'Map', key: 'map' as const },
                  { icon: <Package size={10} />, label: 'Pack', key: 'pack' as const },
                  { icon: <Calculator size={10} />, label: 'Budget', key: 'budget' as const },
                ].map(btn => (
                  <button key={btn.key} onClick={() => setModal(btn.key)}
                    style={{
                      padding: '5px 11px', borderRadius: '9999px', cursor: 'pointer',
                      background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.22)',
                      color: 'white', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px',
                      fontFamily: 'var(--font-body)', backdropFilter: 'blur(4px)', transition: 'background .18s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.26)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.14)')}>
                    {btn.icon}{btn.label}
                  </button>
                ))}
                <button onClick={() => setModal('leave')} style={{
                  padding: '6px 14px', borderRadius: '9999px', background: 'var(--clr-gold)',
                  color: 'var(--clr-earth)', fontSize: '10px', fontWeight: 700, border: 'none',
                  cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'filter .18s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
                  onMouseLeave={e => (e.currentTarget.style.filter = 'none')}>
                  Leave Draft ✉️
                </button>
              </div>
            )}
            {!isPast && size === 'sm' && (
              <div style={{ display: 'flex', gap: '5px' }} onClick={e => e.stopPropagation()}>
                <button onClick={() => setModal('pack')} style={{ padding: '4px 9px', borderRadius: '9999px', background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.2)', color: 'white', fontSize: '9px', cursor: 'pointer' }}>🎒</button>
                <button onClick={() => setModal('leave')} style={{ padding: '4px 12px', borderRadius: '9999px', background: 'var(--clr-gold)', color: 'var(--clr-earth)', fontSize: '9px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Leave ✉️</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {modal === 'leave'  && <LeaveModal  weekend={weekend} destination={active} onClose={() => setModal(null)} />}
      {modal === 'pack'   && <PackingModal destination={active} onClose={() => setModal(null)} />}
      {modal === 'budget' && <BudgetModal  destination={active} days={weekend.totalDays} onClose={() => setModal(null)} />}
      {modal === 'map'    && <MapModal destinations={weekend.destinations} onClose={() => setModal(null)} />}
    </>
  )
}

/* ── Inline SVG Illustrations — hand-crafted per category, render instantly ── */
function SceneSVG({ category }: { category: string }) {
  const base = { position: 'absolute' as const, inset: 0, width: '100%', height: '100%' }
  const va = 'xMidYMid slice'

  if (category === 'beach') return (
    <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" style={base} preserveAspectRatio={va}>
      <defs>
        <linearGradient id="b-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0c4a6e"/><stop offset="55%" stopColor="#f97316" stopOpacity=".65"/><stop offset="100%" stopColor="#fbbf24" stopOpacity=".45"/></linearGradient>
        <linearGradient id="b-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0e7490"/><stop offset="100%" stopColor="#083344"/></linearGradient>
        <linearGradient id="b-sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d97706"/><stop offset="100%" stopColor="#92400e"/></linearGradient>
        <radialGradient id="b-sun" cx="50%" cy="50%"><stop offset="0%" stopColor="#fde68a"/><stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="480" fill="url(#b-sky)"/>
      <circle cx="640" cy="115" r="52" fill="#fbbf24" opacity=".9"/>
      <circle cx="640" cy="115" r="80" fill="url(#b-sun)" opacity=".6"/>
      {[0,40,80,120,160,200,240,280,320].map((a,i)=><line key={i} x1="640" y1="115" x2={640+Math.cos(a*Math.PI/180)*180} y2={115+Math.sin(a*Math.PI/180)*180} stroke="#fbbf24" strokeWidth="1.5" opacity=".1"/>)}
      <ellipse cx="640" cy="265" rx="280" ry="28" fill="#f97316" opacity=".15"/>
      <rect x="0" y="255" width="800" height="160" fill="url(#b-sea)"/>
      {[260,280,298,316].map((y,i)=><path key={i} d={`M0,${y} Q200,${y-12} 400,${y} Q600,${y+12} 800,${y}`} fill="none" stroke="rgba(255,255,255,.2)" strokeWidth={2.2-i*.4}/>)}
      <ellipse cx="400" cy="480" rx="520" ry="95" fill="url(#b-sand)"/>
      {[90,700].map((x,k)=>(
        <g key={k} transform={`translate(${x},440)`}>
          <path d={`M0,0 Q${k===0?-12:12},-85 ${k===0?-4:4},-165`} stroke="#451a03" strokeWidth="9" fill="none" strokeLinecap="round"/>
          <ellipse cx={k===0?-4:4} cy="-165" rx="58" ry="22" fill="#15803d" transform={`rotate(${k===0?-18:18},${k===0?-4:4},-165)`}/>
          <ellipse cx={k===0?-32:32} cy="-158" rx="46" ry="17" fill="#166534" transform={`rotate(${k===0?-38:38},${k===0?-4:4},-158)`}/>
          <ellipse cx={k===0?22:-22} cy="-170" rx="40" ry="14" fill="#14532d" transform={`rotate(${k===0?5:-5},${k===0?-4:4},-165)`}/>
        </g>
      ))}
      <path d="M470,272 L535,272 L524,288 L481,288 Z" fill="#1e293b" opacity=".65"/>
      <line x1="502" y1="270" x2="502" y2="244" stroke="#334155" strokeWidth="1.8"/>
      <polygon points="502,246 530,260 502,262" fill="#f1f5f9" opacity=".55"/>
    </svg>
  )

  if (category === 'heritage') return (
    <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" style={base} preserveAspectRatio={va}>
      <defs>
        <linearGradient id="h-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#120a04"/><stop offset="100%" stopColor="#5c3d1e"/></linearGradient>
      </defs>
      <rect width="800" height="480" fill="url(#h-sky)"/>
      {[60,130,210,310,400,490,580,670,740].map((x,i)=><circle key={i} cx={x} cy={25+i*9} r="1.4" fill="#fbbf24" opacity={.45+i*.05}/>)}
      <circle cx="680" cy="75" r="38" fill="#fef9c3" opacity=".82"/>
      <circle cx="694" cy="67" r="30" fill="#3d1a06"/>
      {/* Gopuram (temple tower) */}
      {[0,1,2,3,4,5].map(i=><rect key={i} x={250+i*18} y={140-i*28} width={300-i*36} height={32} fill={`hsl(28,${55-i*4}%,${14+i*3}%)`} rx="3"/>)}
      <polygon points="400,18 378,100 422,100" fill="#b45309"/>
      <circle cx="400" cy="16" r="9" fill="#d97706"/>
      <circle cx="400" cy="16" r="16" fill="#d97706" opacity=".25"/>
      {/* Main hall */}
      <rect x="260" y="270" width="280" height="160" fill="hsl(28,40%,10%)"/>
      <rect x="250" y="265" width="300" height="16" fill="hsl(28,35%,18%)" rx="2"/>
      {/* Columns */}
      {[295,340,385,430,475,505].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="282" width="16" height="148" fill="hsl(30,35%,15%)"/>
          <ellipse cx={x+8} cy="282" rx="10" ry="6" fill="hsl(30,30%,22%)"/>
          <rect x={x+2} y="290" width="12" height="4" fill="hsl(30,30%,25%)"/>
        </g>
      ))}
      {/* Water reflection */}
      <ellipse cx="400" cy="458" rx="200" ry="18" fill="#1e3a5f" opacity=".42"/>
      <path d="M200,458 Q400,442 600,458" fill="none" stroke="rgba(96,165,250,.3)" strokeWidth=".8"/>
      {/* Lamps */}
      {[235,565].map((x,i)=>(
        <g key={i}>
          <rect x={x-2} y="360" width="4" height="72" fill="#78350f"/>
          <circle cx={x} cy="358" r="9" fill="#fbbf24" opacity=".92"/>
          <circle cx={x} cy="358" r="22" fill="#fbbf24" opacity=".18"/>
        </g>
      ))}
    </svg>
  )

  if (category === 'forest' || category === 'island') return (
    <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" style={base} preserveAspectRatio={va}>
      <defs>
        <linearGradient id="f-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#052e16"/><stop offset="100%" stopColor="#14532d"/></linearGradient>
      </defs>
      <rect width="800" height="480" fill="url(#f-sky)"/>
      {[100,180,280,420,560,680,760].map((x,i)=><polygon key={i} points={`${x-14},0 ${x+14},0 ${x+42},480 ${x-42},480`} fill="rgba(200,255,200,.025)"/>)}
      {[0,70,140,210,280,350,420,490,560,630,700,770].map((x,i)=>(
        <g key={i} transform={`translate(${x},${210+i%3*18})`}>
          <rect x="-5" y="0" width="10" height="240" fill="#021008"/>
          <ellipse cx="0" cy="-18" rx="46" ry="62" fill="#053d1d" opacity=".85"/>
          <ellipse cx="0" cy="-48" rx="36" ry="52" fill="#065f2e" opacity=".75"/>
        </g>
      ))}
      <ellipse cx="400" cy="320" rx="480" ry="45" fill="rgba(200,255,215,.04)"/>
      {[-20,110,280,460,640,810].map((x,i)=>(
        <g key={i} transform={`translate(${x},290)`}>
          <rect x="-9" y="0" width="18" height="220" fill="#020c06"/>
          <ellipse cx="0" cy="-28" rx="64" ry="82" fill="#033d1c"/>
          <ellipse cx="-22" cy="-58" rx="48" ry="66" fill="#044a22" opacity=".92"/>
        </g>
      ))}
      <path d="M180,385 Q400,345 620,385" stroke="#5d4037" strokeWidth="13" fill="none" strokeLinecap="round"/>
      <path d="M200,382 Q400,348 600,382" stroke="#6d4c41" strokeWidth="6" fill="none" opacity=".45"/>
      {[140,240,330,410,490,580,660].map((x,i)=><circle key={i} cx={x} cy={295+i*14} r="2.2" fill="#a7f3d0" opacity=".65"/>)}
    </svg>
  )

  if (category === 'city') return (
    <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" style={base} preserveAspectRatio={va}>
      <defs>
        <linearGradient id="c-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0f0c29"/><stop offset="100%" stopColor="#302b63"/></linearGradient>
      </defs>
      <rect width="800" height="480" fill="url(#c-sky)"/>
      {Array.from({length:35},(_,i)=><circle key={i} cx={(i*137.5)%800} cy={(i*73.1)%160+20} r={.8+i*.02} fill="white" opacity={.3+i*.012}/>)}
      <circle cx="680" cy="68" r="34" fill="#fef9c3" opacity=".82"/>
      <circle cx="694" cy="60" r="27" fill="#302b63"/>
      {[[0,155,115],[90,185,78],[155,135,98],[235,205,68],[295,155,88],[362,175,78],[432,195,58],[492,145,108],[592,165,88],[672,185,78],[735,132,78]].map(([x,h,w],i)=>(
        <g key={i}>
          <rect x={x} y={480-h} width={w} height={h} fill={`hsl(240,${18+i%3*5}%,${10+i%4*3}%)`}/>
          {Array.from({length:6},(_,j)=><rect key={j} x={x+6+j%3*20} y={480-h+12+Math.floor(j/3)*22} width="8" height="10" fill="#fbbf24" opacity={.15+Math.sin(i+j)*.15} rx="1"/>)}
        </g>
      ))}
      {[[45,290,105],[195,308,80],[340,268,118],[545,298,88],[672,278,98]].map(([x,h,w],i)=>(
        <rect key={i} x={x} y={480-h} width={w} height={h} fill={`hsl(245,22%,${7+i*2}%)`}/>
      ))}
      {[75,195,315,475,615,735].map((x,i)=>(
        <g key={i}>
          <line x1={x} y1="450" x2={x} y2="378" stroke="#94a3b8" strokeWidth="2"/>
          <circle cx={x} cy="376" r="6" fill="#fbbf24" opacity=".82"/>
          <ellipse cx={x} cy="376" rx="18" ry="18" fill="#fbbf24" opacity=".08"/>
        </g>
      ))}
      <rect x="0" y="452" width="800" height="28" fill="#07051a" opacity=".65"/>
      {[75,195,315,475,615,735].map((x,i)=><ellipse key={i} cx={x} cy="462" rx="16" ry="5" fill="#fbbf24" opacity=".12"/>)}
    </svg>
  )

  // Default: mountains (also covers desert, wildlife, etc.)
  return (
    <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" style={base} preserveAspectRatio={va}>
      <defs>
        <linearGradient id="m-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0a1628"/><stop offset="100%" stopColor="#1e3a5f"/></linearGradient>
        <linearGradient id="m-snow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8f4f8"/><stop offset="100%" stopColor="#93c5fd"/></linearGradient>
      </defs>
      <rect width="800" height="480" fill="url(#m-sky)"/>
      {[55,115,195,275,375,445,515,645,715].map((x,i)=><circle key={i} cx={x} cy={18+i*8} r="1.3" fill="white" opacity={.65+i*.02}/>)}
      <circle cx="678" cy="58" r="30" fill="#fef3c7" opacity=".88"/>
      <circle cx="690" cy="51" r="24" fill="#1e3a5f"/>
      <polygon points="0,320 115,155 235,320" fill="#1e3f6b" opacity=".82"/>
      <polygon points="95,325 255,115 415,325" fill="#1a3660" opacity=".92"/>
      <polygon points="315,320 475,95 638,320" fill="#152d52"/>
      <polygon points="495,322 655,135 800,322" fill="#1a3660"/>
      <polygon points="235,164 255,115 278,164 265,178 248,178" fill="url(#m-snow)" opacity=".95"/>
      <polygon points="436,108 475,95 518,108 500,128 456,128" fill="url(#m-snow)" opacity=".95"/>
      <polygon points="98,168 115,155 135,168" fill="url(#m-snow)" opacity=".85"/>
      <polygon points="0,480 195,238 392,480" fill="#0d2137"/>
      <polygon points="295,480 515,195 738,480" fill="#0a1a2e"/>
      <polygon points="598,480 800,255 800,480" fill="#0d2137"/>
      {[25,65,105,145,148,570,615,660,705,750].map((x,i)=>(
        <g key={i} transform={`translate(${x},${345+i%3*12})`}>
          <polygon points="0,-38 11,0 -11,0" fill="#061018"/>
          <polygon points="0,-58 15,0 -15,0" fill="#050e14"/>
          <rect x="-3" y="0" width="6" height="13" fill="#040c10"/>
        </g>
      ))}
      <ellipse cx="400" cy="148" rx="340" ry="55" fill="#00c9a7" opacity=".055"/>
      <ellipse cx="300" cy="175" rx="240" ry="38" fill="#6ee7b7" opacity=".035"/>
    </svg>
  )
}
