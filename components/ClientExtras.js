'use client'
import { useEffect, useState } from 'react'

export default function ClientExtras() {
  const [showTop, setShowTop] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })
    reveals.forEach(el => observer.observe(el))

    // Scroll progress bar + show/hide scroll-to-top
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
      setShowTop(scrollTop > 400)
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      {/* Scroll progress bar at top */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: `${progress}%`,
        height: '3px',
        background: 'linear-gradient(90deg,#FF4500,#FF8C00)',
        zIndex: 9999,
        transition: 'width 0.1s linear',
        pointerEvents: 'none',
      }} />

      {/* Scroll to top button */}
      {showTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '96px',
            right: '24px',
            zIndex: 200,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#FF4500,#FF8C00)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(255,69,0,0.35)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            color: '#fff',
            fontSize: '1.1rem',
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(255,69,0,0.5)' }}
          onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,69,0,0.35)' }}
          title="Back to top"
        >
          ↑
        </button>
      )}

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/919976999325?text=Hi%2C%20I%20found%20you%20on%20your%20website%20and%20want%20to%20discuss%20a%20project."
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        style={{
          position: 'fixed', bottom: '28px', right: '24px', zIndex: 200,
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          textDecoration: 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        title="Chat on WhatsApp"
        onMouseOver={e => { e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.5)' }}
        onMouseOut={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      </a>
    </>
  )
}
