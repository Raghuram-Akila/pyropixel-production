'use client'
import { useState, useEffect } from 'react'

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1600)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0D0D0F',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '20px',
      transition: 'opacity 0.4s ease',
    }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.4rem', color: '#fff', letterSpacing: '-0.02em' }}>
        Pyro<span style={{ color: '#FF4500' }}>Pixel</span> 🔥
      </div>
      <div style={{ width: '180px', height: '2px', background: '#2a2a2a', borderRadius: '2px', overflow: 'hidden' }}>
        <div className="loader-fill" style={{ height: '100%', background: 'linear-gradient(90deg,#FF4500,#FF8C00)', borderRadius: '2px' }} />
      </div>
    </div>
  )
}
