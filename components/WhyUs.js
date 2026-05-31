'use client'
const reasons = [
  { num: '01', title: 'Single Point of Contact', desc: "You deal with us — we handle vendors, quality checks, and delivery. No running around." },
  { num: '02', title: 'Student & Startup Friendly', desc: "Flexible budgets, honest advice, and zero jargon. We've been there." },
  { num: '03', title: 'End-to-End Execution', desc: "From idea to final delivery — design, build, test, and ship. All under one roof." },
  { num: '04', title: '24-Hour Response', desc: "Every inquiry gets a response within 24 hours. We respect your time and deadlines." },
]

export default function WhyUs() {
  return (
    <section id="why" className="px-6 md:px-10 lg:px-20 py-20 border-b relative overflow-hidden noise-bg" style={{ borderColor: '#1a1a1c', background: '#0D0D0F' }}>
      {/* Diagonal ember glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(255,69,0,0.08) 0%, transparent 65%)' }} />

      <div className="reveal relative z-10">
        <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#FF8C00', fontFamily: "'Syne', sans-serif" }}>Why Choose Us</div>
        <h2 className="text-3xl lg:text-4xl tracking-tight mb-3" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: '#fff' }}>What Makes Us Different</h2>
        <p className="text-sm leading-relaxed max-w-md" style={{ color: '#aaa' }}>We don't just take orders — we think like partners and deliver like professionals.</p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal relative z-10">
        {reasons.map(r => (
          <div key={r.num}
            className="rounded-xl p-7 transition-all cursor-default"
            style={{ border: '1px solid #2a2a2c' }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,69,0,0.3)'; e.currentTarget.style.background = 'rgba(255,69,0,0.04)' }}
            onMouseOut={e => { e.currentTarget.style.borderColor = '#2a2a2c'; e.currentTarget.style.background = 'transparent' }}
          >
            {/* Fire gradient number */}
            <div className="text-4xl tracking-tighter mb-4 fire-text" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>{r.num}</div>
            <div className="font-semibold text-sm mb-2" style={{ color: '#fff', fontFamily: "'Syne', sans-serif" }}>{r.title}</div>
            <div className="text-sm leading-relaxed" style={{ color: '#aaa' }}>{r.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
