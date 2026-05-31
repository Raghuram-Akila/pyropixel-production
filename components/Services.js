'use client'
import { useRef } from 'react'

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    name: '3D Print Coordination',
    desc: "Need a 3D printed part or prototype? We connect you with the right vendors, manage quality, and deliver — no printer needed on your end.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
    name: 'Project Center',
    desc: "Student or startup projects, prototypes, technical builds — we coordinate the full execution from concept to completion.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
      </svg>
    ),
    name: 'Graphic Design',
    desc: "Logos, branding, marketing materials and more. Clean, purposeful design that represents your brand with intention.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
        <path d="m10 8 2 2 4-4"/>
      </svg>
    ),
    name: 'Web Development',
    desc: "Business websites, landing pages and web apps — fast, mobile-first and built to convert visitors into clients.",
  },
]

function ServiceCard({ service }) {
  const cardRef = useRef(null)
  const rippleRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    const ripple = rippleRef.current
    if (!card || !ripple) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Spotlight follow
    card.style.background = `radial-gradient(circle 120px at ${x}px ${y}px, #FFF4EE 0%, #ffffff 70%)`

    // Ripple position
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.opacity = '1'
    ripple.style.transform = 'translate(-50%, -50%) scale(1)'
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    const ripple = rippleRef.current
    if (!card || !ripple) return
    card.style.background = '#ffffff'
    ripple.style.opacity = '0'
    ripple.style.transform = 'translate(-50%, -50%) scale(0)'
  }

  const handleMouseEnter = () => {
    const ripple = rippleRef.current
    if (!ripple) return
    ripple.style.transform = 'translate(-50%, -50%) scale(0)'
    ripple.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      className="svc-card p-8 transition-colors cursor-default relative overflow-hidden"
      style={{ background: '#ffffff' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Floating ripple blob */}
      <div
        ref={rippleRef}
        style={{
          position: 'absolute',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,69,0,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%) scale(0)',
          opacity: 0,
          transition: 'transform 0.35s ease, opacity 0.35s ease',
          zIndex: 0,
        }}
      />
      {/* Card content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="mb-5 transition-all duration-300" style={{ color: '#FF4500' }}>{service.icon}</div>
        <div className="font-semibold text-base mb-2 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>{service.name}</div>
        <div className="text-sm leading-relaxed" style={{ color: '#777' }}>{service.desc}</div>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="px-6 md:px-10 lg:px-20 py-20 border-b" style={{ borderColor: '#e4e0d8' }}>
      <div className="reveal">
        <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#FF4500', fontFamily: "'Syne', sans-serif" }}>What We Do</div>
        <h2 className="text-3xl lg:text-4xl tracking-tight mb-3" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>Our Services</h2>
        <p className="text-sm leading-relaxed max-w-md" style={{ color: '#777' }}>From 3D printing coordination to full project execution — we handle it so you don't have to.</p>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden reveal" style={{ gap: '1px', background: '#e4e0d8', border: '1px solid #e4e0d8' }}>
        {services.map(s => (
          <ServiceCard key={s.name} service={s} />
        ))}
      </div>
    </section>
  )
}
