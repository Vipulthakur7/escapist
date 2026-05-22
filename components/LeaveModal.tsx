'use client'
import { useState } from 'react'
import { X, Copy, CheckCheck, Download, Mail } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import type { LongWeekend, Destination } from '@/types'
import { buildLeaveEmail } from '@/lib/utils'

export default function LeaveModal({ weekend, destination, onClose }: { weekend:LongWeekend; destination:Destination; onClose:()=>void }) {
  const [name, setName]       = useState('')
  const [manager, setManager] = useState('')
  const [copied, setCopied]   = useState(false)
  const [step, setStep]       = useState<'form'|'preview'>('form')

  const email = buildLeaveEmail({ employeeName:name, managerName:manager, weekend, destination })

  const copy = () => { navigator.clipboard.writeText(email).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),2200) }) }
  const download = () => { const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([email],{type:'text/plain'})); a.download=`leave-${weekend.startDate}.txt`; a.click() }
  const mailto = () => { const lines=email.split('\n'); window.open(`mailto:?subject=${encodeURIComponent(lines[0].replace('Subject: ',''))}&body=${encodeURIComponent(lines.slice(2).join('\n'))}`) }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px',
      background:'rgba(0,0,0,.7)', backdropFilter:'blur(10px)' }} onClick={onClose}>
      <div style={{ background:'white', borderRadius:'22px', width:'100%', maxWidth:'480px', overflow:'hidden', maxHeight:'90vh', display:'flex', flexDirection:'column', boxShadow:'0 24px 60px rgba(0,0,0,.3)' }} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{ background:'var(--clr-earth)', padding:'18px 22px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <h3 className="display-heading" style={{ color:'white', fontSize:'1.2rem' }}>Leave Application Draft</h3>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--clr-gold)', marginTop:'2px' }}>
              {format(parseISO(weekend.startDate),'MMM d')} – {format(parseISO(weekend.endDate),'MMM d, yyyy')} · {destination.name}
            </p>
          </div>
          <button onClick={onClose} style={{ background:'rgba(255,255,255,.12)', border:'none', borderRadius:'50%', width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'white' }}><X size={14}/></button>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', borderBottom:'1px solid rgba(0,0,0,.06)' }}>
          {(['form','preview'] as const).map(s => (
            <button key={s} onClick={()=>setStep(s)} style={{ flex:1, padding:'11px', fontSize:'12px', fontWeight:500, background:'none', border:'none', cursor:'pointer', borderBottom: step===s ? '2px solid var(--clr-earth)' : '2px solid transparent', color: step===s ? 'var(--clr-earth)' : '#9ca3af', transition:'all .2s' }}>
              {s==='form' ? '1. Your Details' : '2. Preview & Send'}
            </button>
          ))}
        </div>

        <div style={{ flex:1, overflowY:'auto' }}>
          {step==='form' ? (
            <div style={{ padding:'22px', display:'flex', flexDirection:'column', gap:'14px' }}>
              <p style={{ fontSize:'12px', color:'#6b7280' }}>Fill in your name and manager details to generate a professional leave email.</p>
              {[{label:'Your Name',placeholder:'Arjun Sharma',val:name,set:setName},{label:"Manager's Name",placeholder:'Priya Menon',val:manager,set:setManager}].map(f=>(
                <div key={f.label}>
                  <label style={{ display:'block', fontSize:'9px', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'.12em', color:'#9ca3af', marginBottom:'6px' }}>{f.label}</label>
                  <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.placeholder}
                    style={{ width:'100%', padding:'11px 14px', borderRadius:'12px', border:'1px solid rgba(0,0,0,.1)', fontSize:'13px', fontFamily:'var(--font-body)', outline:'none' }}
                    onFocus={e=>(e.currentTarget.style.boxShadow='0 0 0 3px rgba(13,60,28,.1)')}
                    onBlur={e=>(e.currentTarget.style.boxShadow='none')} />
                </div>
              ))}
              {weekend.bridgeDay && (
                <div style={{ padding:'14px', borderRadius:'12px', background:'rgba(107,45,148,.07)', border:'1px solid rgba(107,45,148,.15)' }}>
                  <p style={{ fontSize:'9px', fontFamily:'var(--font-mono)', color:'var(--clr-dusk)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:'4px' }}>⚡ Bridge Day Detected</p>
                  <p style={{ fontSize:'12px', color:'#374151' }}>
                    Taking <strong style={{color:'var(--clr-earth)'}}>{format(parseISO(weekend.bridgeDay),'EEEE, MMM d')}</strong> off creates a <strong style={{color:'var(--clr-earth)'}}>{weekend.totalDays}-day</strong> long weekend — included in your draft.
                  </p>
                </div>
              )}
              <button onClick={()=>setStep('preview')} className="btn-primary" style={{ width:'100%', justifyContent:'center', marginTop:'4px' }}>Generate Draft →</button>
            </div>
          ) : (
            <div style={{ padding:'18px' }}>
              <div style={{ background:'var(--clr-fog)', borderRadius:'12px', padding:'16px', border:'1px solid rgba(0,0,0,.06)' }}>
                <pre className="prose-leave">{email}</pre>
              </div>
            </div>
          )}
        </div>

        {step==='preview' && (
          <div style={{ padding:'14px 18px', borderTop:'1px solid rgba(0,0,0,.06)', display:'flex', gap:'8px' }}>
            <button onClick={copy} className="btn-primary" style={{ flex:1, justifyContent:'center' }}>
              {copied ? <><CheckCheck size={13}/> Copied!</> : <><Copy size={13}/> Copy</>}
            </button>
            <button onClick={download} className="btn-ghost" style={{ padding:'10px 14px' }}><Download size={14}/></button>
            <button onClick={mailto}   className="btn-ghost" style={{ padding:'10px 14px' }}><Mail size={14}/></button>
          </div>
        )}
      </div>
    </div>
  )
}
