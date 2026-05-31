'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [hoveredLink, setHoveredLink] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['hero', 'services', 'projects', 'about', 'faq', 'contact']
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { threshold: 0.35 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const links = [
    { href: '#services', label: 'Services', id: 'services' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#about',    label: 'About',    id: 'about'    },
    { href: '#faq',      label: 'FAQ',      id: 'faq'      },
    { href: '#contact',  label: 'Contact',  id: 'contact'  },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem clamp(1.5rem, 5vw, 5rem)',
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #e4e0d8',
        transition: 'box-shadow 0.22s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: scrolled ? '0 2px 32px rgba(0,0,0,0.07)' : 'none',
      }}>
        {/* Logo */}
        <a href="#" style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '1.2rem', color: '#0D0D0F',
          fontWeight: 800,
          letterSpacing: '-0.02em', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          <span style={{
            background: 'linear-gradient(135deg,#FF4500,#FF8C00)',
            borderRadius: '8px',
            width: '28px', height: '28px',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', flexShrink: 0,
          }}>🔥</span>
          Pyro<span style={{ color: '#FF4500' }}>Pixel</span>
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', alignItems: 'center' }} className="nav-desktop-links">
          {links.map(l => {
            const isActive = activeSection === l.id
            const isHovered = hoveredLink === l.id
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onMouseEnter={() => setHoveredLink(l.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{
                    color: isActive || isHovered ? '#FF4500' : '#555',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    padding: '0.4rem 0.75rem',
                    borderRadius: '8px',
                    display: 'inline-block',
                    position: 'relative',
                    transition: 'color 0.2s ease, background 0.2s ease, transform 0.2s ease',
                    background: isHovered
                      ? 'rgba(255,69,0,0.08)'
                      : isActive
                      ? 'rgba(255,69,0,0.06)'
                      : 'transparent',
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                >
                  {l.label}
                  {/* Active dot */}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#FF4500',
                      display: 'block',
                    }} />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#contact" className="btn-press nav-desktop-cta" style={{
            background: 'linear-gradient(135deg,#FF4500,#FF8C00)',
            color: '#fff', border: 'none', cursor: 'pointer',
            padding: '0.55rem 1.3rem', borderRadius: '8px',
            fontFamily: "'Syne', sans-serif", fontSize: '0.875rem', fontWeight: 700,
            textDecoration: 'none', display: 'inline-block',
            boxShadow: '0 4px 14px rgba(255,69,0,0.3)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,69,0,0.4)' }}
          onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 14px rgba(255,69,0,0.3)' }}
          >Get a Quote</a>

          {/* Hamburger */}
          <button
            style={{
              display: 'none', flexDirection: 'column', gap: '5px',
              cursor: 'pointer', padding: '4px', background: 'none', border: 'none',
            }}
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '2px',
                background: '#0D0D0F', borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: i === 0 && menuOpen ? 'translateY(7px) rotate(45deg)'
                         : i === 2 && menuOpen ? 'translateY(-7px) rotate(-45deg)'
                         : 'none',
                opacity: i === 1 && menuOpen ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div style={{
        display: menuOpen ? 'flex' : 'none',
        position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 99,
        background: '#fff', borderBottom: '1px solid #e4e0d8',
        padding: '1.5rem 2rem', flexDirection: 'column', gap: '0.5rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      }}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
            style={{
              color: activeSection === l.id ? '#FF4500' : '#333',
              textDecoration: 'none', fontSize: '1.1rem',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600, padding: '0.75rem 0',
              borderBottom: '1px solid #f0ede8',
            }}
          >{l.label}</a>
        ))}
        <a href="#contact" onClick={() => setMenuOpen(false)}
          style={{
            marginTop: '0.5rem',
            background: 'linear-gradient(135deg,#FF4500,#FF8C00)',
            color: '#fff', textDecoration: 'none',
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: '0.9rem', padding: '0.75rem 1.5rem',
            borderRadius: '8px', textAlign: 'center',
          }}
        >Get a Quote 🔥</a>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .nav-desktop-links { display: none !important; }
          .nav-desktop-cta { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 861px) {
          .hamburger-btn { display: none !important; }
        }
      `}</style>
    </>
  )
}
