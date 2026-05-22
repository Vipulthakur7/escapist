'use client'
import { useState, useMemo } from 'react'
import { X, Package, CheckCircle2, Circle, Download } from 'lucide-react'
import type { Destination, PackingItem } from '@/types'
import { generatePackingList } from '@/lib/utils'

export default function PackingModal({ destination, onClose }: { destination:Destination; onClose:()=>void }) {
  const items = useMemo(() => generatePackingList(destination), [destination])
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggle = (name: string) => setChecked(prev => { const n=new Set(prev); n.has(name)?n.delete(name):n.add(name); return n })

  const grouped = items.reduce<Record<string,PackingItem[]>>((acc,item) => {
    if (!acc[item.category]) acc[item.category]=[]
    acc[item.category].push(item); return acc
  },{})

  const progress = Math.round((checked.size / items.length) * 100)

  const exportList = () => {
    const txt = Object.entries(grouped).map(([cat,items])=>
      `${cat.toUpperCase()}\n${items.map(i=>`${checked.has(i.name)?'[x]':'[ ]'} ${i.emoji} ${i.name}${i.essential?' *':''}`).join('\n')}`
    ).join('\n\n') + '\n\n* = Essential item'
    const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([txt],{type:'text/plain'}));
    a.download=`packing-${destination.name.toLowerCase().replace(/\s+/g,'-')}.txt`; a.click()
  }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px',
      background:'rgba(0,0,0,.7)', backdropFilter:'blur(10px)' }} onClick={onClose}>
      <div style={{ background:'white', borderRadius:'22px', width:'100%', maxWidth:'520px', overflow:'hidden', maxHeight:'88vh', display:'flex', flexDirection:'column', boxShadow:'0 24px 60px rgba(0,0,0,.3)' }} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding:'18px 22px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid rgba(0,0,0,.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ width:36, height:36, borderRadius:'10px', background:'rgba(13,60,28,.08)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Package size={17} style={{ color:'var(--clr-earth)' }} />
            </div>
            <div>
              <h3 className="display-heading" style={{ fontSize:'1.1rem', color:'var(--clr-earth)' }}>Packing List</h3>
              <p style={{ fontSize:'10px', fontFamily:'var(--font-mono)', color:'#9ca3af' }}>{destination.name} · {items.length} items</p>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <button onClick={exportList} style={{ display:'flex', alignItems:'center', gap:'5px', padding:'6px 12px', borderRadius:'9999px', border:'1px solid rgba(0,0,0,.1)', background:'none', cursor:'pointer', fontSize:'11px', color:'#6b7280' }}>
              <Download size={11}/> Export
            </button>
            <button onClick={onClose} style={{ background:'rgba(0,0,0,.06)', border:'none', borderRadius:'50%', width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><X size={14}/></button>
          </div>
        </div>

        {/* Progress */}
        <div style={{ padding:'12px 22px', background:'rgba(13,60,28,.03)', borderBottom:'1px solid rgba(0,0,0,.04)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'6px' }}>
            <span style={{ fontSize:'11px', fontFamily:'var(--font-mono)', color:'var(--clr-moss)' }}>Packing progress</span>
            <span style={{ fontSize:'11px', fontFamily:'var(--font-mono)', fontWeight:500, color:'var(--clr-earth)' }}>{checked.size}/{items.length} · {progress}%</span>
          </div>
          <div style={{ height:'5px', background:'rgba(0,0,0,.08)', borderRadius:'9999px', overflow:'hidden' }}>
            <div style={{ height:'100%', background:'var(--clr-moss)', borderRadius:'9999px', width:`${progress}%`, transition:'width .4s' }} />
          </div>
        </div>

        {/* Tag highlights */}
        <div style={{ padding:'10px 22px', display:'flex', gap:'6px', flexWrap:'wrap', borderBottom:'1px solid rgba(0,0,0,.05)' }}>
          {destination.packing_tags.map(t => (
            <span key={t} style={{ padding:'3px 10px', borderRadius:'9999px', fontSize:'10px', fontFamily:'var(--font-mono)',
              background:'rgba(13,60,28,.08)', color:'var(--clr-moss)' }}>
              #{t.replace(/_/g,' ')}
            </span>
          ))}
        </div>

        {/* Items list */}
        <div style={{ flex:1, overflowY:'auto', padding:'12px 22px' }}>
          {Object.entries(grouped).map(([cat, catItems]) => (
            <div key={cat} style={{ marginBottom:'16px' }}>
              <p style={{ fontSize:'9px', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'.12em', color:'#9ca3af', marginBottom:'8px' }}>{cat}</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
                {catItems.map(item => (
                  <div key={item.name} onClick={()=>toggle(item.name)}
                    style={{ display:'flex', alignItems:'center', gap:'10px', padding:'9px 12px', borderRadius:'10px', cursor:'pointer',
                      background: checked.has(item.name) ? 'rgba(13,60,28,.05)' : 'transparent',
                      border:'1px solid', borderColor: checked.has(item.name) ? 'rgba(13,60,28,.12)' : 'transparent',
                      transition:'all .15s' }}>
                    <span style={{ fontSize:'14px' }}>{item.emoji}</span>
                    <span style={{ flex:1, fontSize:'13px', fontFamily:'var(--font-body)', textDecoration:checked.has(item.name)?'line-through':'none', color:checked.has(item.name)?'#9ca3af':'var(--clr-slate)' }}>
                      {item.name}
                    </span>
                    {item.essential && <span style={{ fontSize:'9px', fontFamily:'var(--font-mono)', color:'var(--clr-ember)', background:'rgba(232,64,0,.08)', padding:'2px 6px', borderRadius:'9999px' }}>essential</span>}
                    {checked.has(item.name) ? <CheckCircle2 size={15} style={{color:'var(--clr-moss)',flexShrink:0}}/> : <Circle size={15} style={{color:'#d1d5db',flexShrink:0}}/>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
