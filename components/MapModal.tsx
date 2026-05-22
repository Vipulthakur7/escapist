'use client'
import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { Destination } from '@/types'

export default function MapModal({ destinations, onClose }: { destinations:Destination[]; onClose:()=>void }) {
  const ref = useRef<HTMLDivElement>(null)
  const map  = useRef<any>(null)

  useEffect(() => {
    if (!ref.current || map.current) return
    const init = async () => {
      const L = (await import('leaflet')).default
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })
      if (!ref.current) return
      map.current = L.map(ref.current, { scrollWheelZoom:false, attributionControl:false })
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{ subdomains:'abcd', maxZoom:18 }).addTo(map.current)
      const bounds: [number,number][] = []
      destinations.forEach(d => {
        const [lat,lng] = d.coordinates; bounds.push([lat,lng])
        L.circleMarker([lat,lng],{ radius:10, fillColor:d.type==='international'?'#6b2d94':'#1d6e38', color:'white', weight:2.5, fillOpacity:.9 })
          .addTo(map.current)
          .bindPopup(`<div style="font-family:sans-serif;padding:4px"><strong style="color:#0d3c1c">${d.name}</strong><br/><small style="color:#666">${d.country}${d.state?', '+d.state:''}</small><br/><small>⭐ ${d.hidden_gem_score} · ₹${d.budget_per_day_inr.toLocaleString('en-IN')}/day</small></div>`,{closeButton:false})
      })
      if (bounds.length>1) map.current.fitBounds(bounds,{padding:[40,40]})
      else if (bounds.length===1) map.current.setView(bounds[0],6)
    }
    init()
    return () => { if (map.current) { map.current.remove(); map.current=null } }
  }, [destinations])

  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px',
      background:'rgba(0,0,0,.7)', backdropFilter:'blur(10px)' }} onClick={onClose}>
      <div style={{ background:'white', borderRadius:'22px', width:'100%', maxWidth:'640px', overflow:'hidden', boxShadow:'0 24px 60px rgba(0,0,0,.3)' }} onClick={e=>e.stopPropagation()}>
        <div style={{ padding:'16px 20px', borderBottom:'1px solid rgba(0,0,0,.06)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <h3 className="display-heading" style={{ fontSize:'1.1rem', color:'var(--clr-earth)' }}>Destination Map</h3>
            <p style={{ fontSize:'10px', fontFamily:'var(--font-mono)', color:'#9ca3af' }}>{destinations.length} options plotted</p>
          </div>
          <button onClick={onClose} style={{ background:'rgba(0,0,0,.06)', border:'none', borderRadius:'50%', width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><X size={14}/></button>
        </div>
        <div style={{ padding:'14px' }}>
          <div ref={ref} style={{ width:'100%', height:'380px', borderRadius:'12px', overflow:'hidden', border:'1px solid rgba(0,0,0,.06)' }} />
        </div>
        <div style={{ padding:'10px 20px 16px', display:'flex', gap:'20px' }}>
          {[{color:'var(--clr-moss)',label:'National'},{color:'var(--clr-dusk)',label:'International'}].map(l=>(
            <span key={l.label} style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'11px', fontFamily:'var(--font-mono)', color:'#6b7280' }}>
              <span style={{ width:10, height:10, borderRadius:'50%', background:l.color }} />{l.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
