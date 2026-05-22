import { Compass, Heart, Github, ExternalLink } from 'lucide-react'
export default function Footer() {
  return (
    <footer style={{ marginTop:'80px', borderTop:'1px solid rgba(0,0,0,.06)', background:'white' }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'32px 20px' }}>
        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:'16px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--clr-earth)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Compass size={15} color="white" />
            </div>
            <div>
              <p style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', fontWeight:600, color:'var(--clr-earth)' }}>Escapist</p>
              <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', color:'#9ca3af' }}>2026 India Edition</p>
            </div>
          </div>
          <p style={{ fontSize:'12px', color:'#9ca3af', textAlign:'center' }}>
            Built for the <span style={{ color:'var(--clr-moss)', fontWeight:500 }}>corporate explorer</span> who just needs a reason to take that leave.
          </p>
          <p style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'11px', color:'#d1d5db', fontFamily:'var(--font-mono)' }}>
            Made with <Heart size={10} style={{ color:'var(--clr-ember)' }} fill="var(--clr-ember)" /> for wanderers
          </p>
        </div>
        <div style={{ marginTop:'20px', paddingTop:'16px', borderTop:'1px solid rgba(0,0,0,.05)', display:'flex', flexWrap:'wrap', gap:'12px', justifyContent:'center' }}>
          {['2026 Indian Public Holidays','15 Unexplored Destinations','Bridge Day Calculator','AI Packing Lists','Budget Estimator','Leave Draft Generator'].map(f=>(
            <span key={f} style={{ padding:'3px 10px', borderRadius:'9999px', background:'rgba(13,60,28,.06)', color:'var(--clr-moss)', fontSize:'10px', fontFamily:'var(--font-mono)' }}>{f}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}
