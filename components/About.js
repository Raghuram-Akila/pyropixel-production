'use client'
import Image from 'next/image'

const tags = ['Pvt Ltd Registered', 'CIN: U27900TZ2025PTC036023', 'Coimbatore, Tamil Nadu', 'Est. 2025']

export default function About() {
  return (
    <section id="about" className="px-6 md:px-10 lg:px-20 py-20 border-b grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" style={{ borderColor: '#e4e0d8' }}>
      <div className="reveal from-left rounded-2xl overflow-hidden shadow-xl aspect-[4/3] relative border" style={{ borderColor: '#e4e0d8' }}>
        <Image src="/digital-firecrackers.jpg" alt="About Pyro Pixel Production" fill className="object-cover" />
      </div>
      <div className="reveal from-right">
        <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#FF4500', fontFamily: "'Syne', sans-serif" }}>Who We Are</div>
        <h2 className="text-3xl lg:text-4xl tracking-tight mb-4" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>About Pyro Pixel Production</h2>
        <p className="text-sm leading-relaxed mb-3" style={{ color: '#777' }}>
          Pyro Pixel Production Pvt Ltd is a Coimbatore-based project center and creative production company. We act as your single point of contact — whether you need a 3D printed prototype, a complete project built, or a creative production handled end-to-end.
        </p>
        <p className="text-sm leading-relaxed mb-6" style={{ color: '#777' }}>You bring the idea. We bring the execution.</p>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: '#FFE8D6', color: '#FF4500', fontFamily: "'Syne', sans-serif" }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
