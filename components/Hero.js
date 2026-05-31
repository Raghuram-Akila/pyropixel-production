'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { end: 10, suffix: '+', label: 'Projects Delivered' },
  { end: 24, suffix: 'hr', label: 'Reply Guarantee' },
  { end: 2025, suffix: '', label: 'Founded' },
]

function AnimatedCount({ end, suffix }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1200
        const step = 16
        const increment = end / (duration / step)
        let current = 0
        const timer = setInterval(() => {
          current = Math.min(current + increment, end)
          setVal(Math.floor(current))
          if (current >= end) clearInterval(timer)
        }, step)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return <span ref={ref}>{val}{suffix}</span>
}

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center px-6 md:px-10 lg:px-20 pt-28 pb-16 gap-12 border-b relative overflow-hidden" style={{ borderColor: '#e4e0d8' }}>
      {/* Warm background shape */}
      <div className="hidden lg:block absolute top-[-10%] right-[-5%] w-[55%] h-[120%] rounded-[40%_0_0_40%] z-0" style={{ background: 'linear-gradient(160deg, #FFF4EE 0%, #F7F5F2 100%)' }} />
      {/* Subtle ember glow */}
      <div className="hidden lg:block absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full z-0 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,140,0,0.08) 0%, transparent 70%)' }} />

      {/* Content */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6 animate-fade-up-1"
          style={{ background: '#FFE8D6', color: '#FF4500', border: '1px solid rgba(255,69,0,0.15)' }}>
          <span className="fire-flicker">🔥</span> Project Center · 3D Printing · Creative Studio
        </div>
        <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight animate-fade-up-1" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
          We Turn Your<br />
          <em className="not-italic fire-text">Ideas</em> Into Reality
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed animate-fade-up-2" style={{ color: '#777' }}>
          Pyro Pixel Production is your all-in-one project partner — we help engineering students build and deliver their college projects, coordinate 3D printing, creative production, and full project execution from Coimbatore.
        </p>
        <div className="flex flex-wrap gap-3 mt-8 animate-fade-up-3">
          <a href="#projects" className="btn-press text-white text-sm font-semibold px-7 py-3 rounded-lg no-underline"
            style={{ background: 'linear-gradient(135deg,#FF4500,#FF8C00)', boxShadow: '0 4px 20px rgba(255,69,0,0.3)', fontFamily: "'Syne', sans-serif" }}>
            View Projects
          </a>
          <a href="#contact" className="btn-press text-sm font-semibold px-7 py-3 rounded-lg no-underline border"
            style={{ color: '#0D0D0F', borderColor: '#e4e0d8', background: 'transparent', fontFamily: "'Syne', sans-serif" }}
            onMouseOver={e => { e.currentTarget.style.borderColor = '#FF4500'; e.currentTarget.style.color = '#FF4500' }}
            onMouseOut={e => { e.currentTarget.style.borderColor = '#e4e0d8'; e.currentTarget.style.color = '#0D0D0F' }}
          >
            Request a Quote
          </a>
        </div>

        {/* Animated stats */}
        <div className="flex gap-10 mt-12 pt-8 border-t animate-fade-up-4" style={{ borderColor: '#e4e0d8' }}>
          {stats.map(({ end, suffix, label }) => (
            <div key={label}>
              <div className="text-3xl tracking-tight font-display fire-text" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
                <AnimatedCount end={end} suffix={suffix} />
              </div>
              <div className="text-xs mt-0.5" style={{ color: '#999' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual */}
      <div className="relative z-10 animate-fade-in order-first lg:order-last">
        <div className="relative">
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border" style={{ borderColor: '#e4e0d8' }}>
            <Image src="/digital-firecrackers.jpg" alt="Pyro Crackers project by Pyro Pixel Production" fill className="object-cover" priority />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-xl flex items-center gap-2.5 border" style={{ borderColor: '#e4e0d8' }}>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot flex-shrink-0" />
            <div>
              <div className="text-xs font-semibold" style={{ fontFamily: "'Syne', sans-serif" }}>Available for Projects</div>
              <div className="text-[10px]" style={{ color: '#999' }}>Mon–Sat, 9:30 AM – 7 PM</div>
            </div>
          </div>
          {/* Decorative ember dot */}
          <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full" style={{ background: 'linear-gradient(135deg,#FF4500,#FF8C00)', boxShadow: '0 0 12px rgba(255,69,0,0.5)' }} />
        </div>
      </div>
    </section>
  )
}
