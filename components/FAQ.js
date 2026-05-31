'use client'
import { useState } from 'react'

const faqs = [
  { q: 'What kind of projects do you handle?', a: "We handle 3D printing coordination, student and startup technical projects, robotics builds, graphic design, and web development. If you're unsure, just reach out — we'll tell you honestly if we can help." },
  { q: 'How does your 3D print coordination work?', a: "You share your design file or idea — we connect with the right vendor, manage print quality, and deliver the final part to you. You don't need to own a printer or know any printing service. We handle it all." },
  { q: 'How long does a typical project take?', a: "It depends on the scope. A 3D print can take 2–5 days. A full student project typically runs 2–4 weeks. Web projects range from 1–3 weeks. We always give you a realistic timeline upfront." },
  { q: 'Do you work with students? What about budget?', a: "Yes — students are actually a big part of what we do. We understand tight budgets and will work with you to find a solution that fits. Just be upfront about your constraints and we'll find a way." },
  { q: 'How do I get started?', a: "Fill out the inquiry or quote form below, or message us directly on WhatsApp. We'll get back to you within 24 hours with next steps." },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="px-6 md:px-10 lg:px-20 py-20 border-b" style={{ borderColor: '#e4e0d8' }}>
      <div className="reveal">
        <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#FF4500', fontFamily: "'Syne', sans-serif" }}>Common Questions</div>
        <h2 className="text-3xl lg:text-4xl tracking-tight mb-2" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>FAQ</h2>
      </div>
      <div className="mt-10 max-w-2xl reveal">
        {faqs.map((f, i) => (
          <div key={i} className="border-b" style={{ borderColor: '#e4e0d8' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left flex justify-between items-center py-5 bg-transparent border-none cursor-pointer font-semibold text-sm transition-colors"
              style={{ color: open === i ? '#FF4500' : '#0D0D0F', fontFamily: "'Syne', sans-serif" }}
              onMouseOver={e => { if (open !== i) e.currentTarget.style.color = '#FF4500' }}
              onMouseOut={e => { if (open !== i) e.currentTarget.style.color = '#0D0D0F' }}
            >
              {f.q}
              <span className="ml-4 flex-shrink-0 text-xl transition-transform duration-300"
                style={{ color: open === i ? '#FF4500' : '#999', transform: open === i ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
            </button>
            <div style={{ maxHeight: open === i ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
              <div className="pb-5 text-sm leading-relaxed" style={{ color: '#777' }}>{f.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
