'use client'
import { useState } from 'react'
import Image from 'next/image'
 
const projects = [
  {
    id: 'modal1',
    img: '/digital-firecrackers.jpg',
    cat: 'Project Center · Electronics',
    name: 'Pyro Crackers',
    year: '2025',
    status: 'Remote-controlled digital firecracker system',
    desc: 'A remote-controlled digital firecracker system built and coordinated by Pyro Pixel Production. The system features a custom-branded control box (Pyro Pixels), individual wireless detonation modules, a remote RF controller, and a power supply unit — all assembled and delivered as a complete package.',
    type: 'Remote-controlled system',
  },
  {
    id: 'modal2',
    img: '/robotic-dog.jpg',
    cat: 'Project Center · Robotics',
    name: 'Robotic Dog',
    year: '2026',
    status: '4-legged autonomous robot with servo control',
    desc: 'A 4-legged robotic dog built using 3D printed parts and servo motors, controlled via custom electronics. The frame was designed and printed in-house, integrated with motor drivers and a microcontroller for autonomous movement and remote control capabilities.',
    type: '3D Printed + Electronics',
  },
]
 
function PlaceholderCard() {
  return (
    <div className="border rounded-xl overflow-hidden" style={{ borderColor: '#e4e0d8' }}>
      <div className="shimmer h-56" />
      <div className="p-5 space-y-3">
        <div className="shimmer h-3 rounded w-2/3" />
        <div className="shimmer h-5 rounded w-1/2" />
        <div className="shimmer h-3 rounded w-3/4" />
        <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: '#e4e0d8' }}>
          <span className="text-xs font-semibold" style={{ color: '#999', fontFamily: "'Syne', sans-serif" }}>More projects coming soon ✦</span>
        </div>
      </div>
    </div>
  )
}
 
export default function Projects() {
  const [active, setActive] = useState(null)
 
  return (
    <section id="projects" className="px-6 md:px-10 lg:px-20 py-20 border-b" style={{ borderColor: '#e4e0d8' }}>
      <div className="reveal">
        <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#FF4500', fontFamily: "'Syne', sans-serif" }}>Our Work</div>
        <h2 className="text-3xl lg:text-4xl tracking-tight mb-3" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>Projects</h2>
        <p className="text-sm leading-relaxed max-w-md" style={{ color: '#777' }}>Real work, real results — here's what we've built and delivered.</p>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
        {projects.map(p => (
          <div key={p.id} onClick={() => setActive(p)}
            className="border rounded-xl overflow-hidden cursor-pointer group transition-all duration-200"
            style={{ borderColor: '#e4e0d8' }}
            onMouseOver={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,69,0,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,69,0,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseOut={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = '#e4e0d8'; e.currentTarget.style.transform = '' }}
          >
            <div className="relative h-56 overflow-hidden" style={{ background: '#F7F5F2' }}>
              <Image src={p.img} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#FF4500', fontFamily: "'Syne', sans-serif" }}>{p.cat}</div>
              <div className="text-lg mb-1" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>{p.name}</div>
              <div className="text-sm mb-4" style={{ color: '#999' }}>{p.status}</div>
              <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: '#f0ede8' }}>
                <span className="text-xs font-medium" style={{ color: '#22c55e' }}>✓ Successfully Fabricated</span>
                <span style={{ color: '#FF4500', fontSize: '1rem' }}>→</span>
              </div>
            </div>
          </div>
        ))}
        <PlaceholderCard />
      </div>
 
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(13,13,15,0.7)', backdropFilter: 'blur(8px)' }} onClick={() => setActive(null)}>
          <div className="modal-enter bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setActive(null)}
              className="absolute top-4 right-4 text-xl bg-transparent border-none cursor-pointer transition-colors"
              style={{ color: '#999' }}
              onMouseOver={e => e.currentTarget.style.color = '#FF4500'}
              onMouseOut={e => e.currentTarget.style.color = '#999'}
            >✕</button>
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#FF4500', fontFamily: "'Syne', sans-serif" }}>{active.cat}</div>
            <div className="relative h-52 rounded-xl overflow-hidden mb-4">
              <Image src={active.img} alt={active.name} fill className="object-cover" />
            </div>
            <h3 className="text-2xl mb-2" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>{active.name}</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#777' }}>{active.desc}</p>
            <div className="grid grid-cols-2 gap-3">
              {[['Category', active.cat], ['Year', active.year], ['Type', active.type], ['Outcome', '✓ Successfully Fabricated']].map(([label, val]) => (
                <div key={label} className="rounded-lg p-3" style={{ background: '#F7F5F2' }}>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#999', fontFamily: "'Syne', sans-serif" }}>{label}</div>
                  <div className="text-sm font-medium" style={{ color: '#0D0D0F' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}