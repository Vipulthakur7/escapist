'use client'
import { useState } from 'react'
import { X, Calculator, Users, Wallet } from 'lucide-react'
import type { Destination } from '@/types'
import { estimateBudget } from '@/lib/utils'

const TIERS = [
  { key:'budget' as const, label:'Budget', emoji:'🎒', desc:'Hostels, street food, public transport' },
  { key:'mid'    as const, label:'Mid-Range', emoji:'🏨', desc:'3-star hotels, sit-down meals, some cabs' },
  { key:'luxury' as const, label:'Luxury', emoji:'🥂', desc:'5-star stays, fine dining, private transfers' },
]

export default function BudgetModal({ destination, days, onClose }: { destination:Destination; days:number; onClose:()=>void }) {
  const [travellers, setTravellers] = useState(2)
  const [tier, setTier] = useState<'budget'|'mid'|'luxury'>('mid')

  const budget = estimateBudget(destination, days, travellers, tier)
  const fmt = (n:number) => `₹${n.toLocaleString('en-IN')}`
  const per  = Math.round(budget.total / travellers)

  const slices = [
    { label:'Flights/Transport', val:budget.flights,     color:'var(--clr-earth)', pct:Math.round(budget.flights/budget.total*100) },
    { label:'Hotel/Stay',        val:budget.hotel,       color:'var(--clr-moss)',  pct:Math.round(budget.hotel/budget.total*100) },
    { label:'Food & Drinks',     val:budget.food,        color:'var(--clr-gold)',  pct:Math.round(budget.food/budget.total*100) },
    { label:'Activities',        val:budget.activities,  color:'var(--clr-dusk)',  pct:Math.round(budget.activities/budget.total*100) },
    { label:'Local Transport',   val:budget.transport,   color:'var(--clr-ember)', pct:Math.round(budget.transport/budget.total*100) },
    { label:'Miscellaneous',     val:budget.misc,        color:'#9ca3af',          pct:Math.round(budget.misc/budget.total*100) },
  ]

  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px',
      background:'rgba(0,0,0,.7)', backdropFilter:'blur(10px)' }} onClick={onClose}>
      <div style={{ background:'white', borderRadius:'22px', width:'100%', maxWidth:'480px', overflow:'hidden', maxHeight:'90vh', display:'flex', flexDirection:'column', boxShadow:'0 24px 60px rgba(0,0,0,.3)' }} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding:'18px 22px', borderBottom:'1px solid rgba(0,0,0,.06)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ width:36, height:36, borderRadius:'10px', background:'rgba(107,45,148,.08)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Calculator size={17} style={{ color:'var(--clr-dusk)' }} />
            </div>
            <div>
              <h3 className="display-heading" style={{ fontSize:'1.1rem', color:'var(--clr-earth)' }}>Budget Estimator</h3>
              <p style={{ fontSize:'10px', fontFamily:'var(--font-mono)', color:'#9ca3af' }}>{destination.name} · {days} days</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'rgba(0,0,0,.06)', border:'none', borderRadius:'50%', width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><X size={14}/></button>
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'18px 22px' }}>
          {/* Travellers */}
          <div style={{ marginBottom:'18px' }}>
            <p style={{ fontSize:'9px', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'.12em', color:'#9ca3af', marginBottom:'8px', display:'flex', alignItems:'center', gap:'5px' }}>
              <Users size={10}/> Travellers
            </p>
            <div style={{ display:'flex', gap:'8px' }}>
              {[1,2,3,4,5,6].map(n => (
                <button key={n} onClick={()=>setTravellers(n)}
                  style={{ width:38, height:38, borderRadius:'10px', border:'1px solid', fontWeight:500, fontSize:'13px', cursor:'pointer', transition:'all .15s',
                    borderColor: travellers===n ? 'var(--clr-earth)' : 'rgba(0,0,0,.1)',
                    background: travellers===n ? 'var(--clr-earth)' : 'transparent',
                    color: travellers===n ? 'white' : 'var(--clr-slate)' }}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Tier */}
          <div style={{ marginBottom:'20px' }}>
            <p style={{ fontSize:'9px', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'.12em', color:'#9ca3af', marginBottom:'8px', display:'flex', alignItems:'center', gap:'5px' }}>
              <Wallet size={10}/> Travel Style
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
              {TIERS.map(t => (
                <button key={t.key} onClick={()=>setTier(t.key)}
                  style={{ display:'flex', alignItems:'center', gap:'12px', padding:'11px 14px', borderRadius:'12px', border:'1px solid', cursor:'pointer', textAlign:'left', transition:'all .15s',
                    borderColor: tier===t.key ? 'var(--clr-earth)' : 'rgba(0,0,0,.08)',
                    background: tier===t.key ? 'rgba(13,60,28,.06)' : 'white' }}>
                  <span style={{ fontSize:'18px' }}>{t.emoji}</span>
                  <div>
                    <p style={{ fontSize:'12px', fontWeight:600, color: tier===t.key ? 'var(--clr-earth)' : 'var(--clr-slate)' }}>{t.label}</p>
                    <p style={{ fontSize:'11px', color:'#9ca3af' }}>{t.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Total */}
          <div style={{ background:'linear-gradient(135deg, var(--clr-earth) 0%, var(--clr-moss) 100%)', borderRadius:'16px', padding:'18px 20px', marginBottom:'16px', color:'white', textAlign:'center' }}>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', textTransform:'uppercase', letterSpacing:'.12em', opacity:.6, marginBottom:'4px' }}>
              Estimated Total · {travellers} {travellers===1?'person':'people'}
            </p>
            <p className="display-heading" style={{ fontSize:'2.2rem', color:'white' }}>{fmt(budget.total)}</p>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', opacity:.65, marginTop:'4px' }}>≈ {fmt(per)} per person</p>
          </div>

          {/* Breakdown bars */}
          <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
            {slices.map(s => (
              <div key={s.label}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'3px' }}>
                  <span style={{ fontSize:'11px', color:'#6b7280', display:'flex', alignItems:'center', gap:'6px' }}>
                    <span style={{ width:8, height:8, borderRadius:'50%', background:s.color, display:'inline-block' }} />
                    {s.label}
                  </span>
                  <span style={{ fontSize:'11px', fontWeight:500, fontFamily:'var(--font-mono)', color:'var(--clr-slate)' }}>
                    {fmt(s.val)} <span style={{ color:'#9ca3af', fontSize:'9px' }}>({s.pct}%)</span>
                  </span>
                </div>
                <div style={{ height:'4px', background:'rgba(0,0,0,.07)', borderRadius:'9999px', overflow:'hidden' }}>
                  <div style={{ height:'100%', background:s.color, borderRadius:'9999px', width:`${s.pct}%`, transition:'width .5s' }} />
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize:'10px', color:'#9ca3af', fontFamily:'var(--font-mono)', marginTop:'14px', textAlign:'center' }}>
            * Estimates based on average costs. Actual costs may vary.
          </p>
        </div>
      </div>
    </div>
  )
}
