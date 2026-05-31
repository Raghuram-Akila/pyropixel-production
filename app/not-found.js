"use client"
export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0D0D0F',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      fontFamily: "'Syne', sans-serif",
      textAlign: 'center',
      padding: '2rem',
    }}>
      {/* Logo */}
      <div style={{ fontSize: '3rem' }}>🔥</div>

      {/* 404 */}
      <div style={{
        fontSize: '6rem',
        fontWeight: 800,
        background: 'linear-gradient(135deg,#FF4500,#FF8C00)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1,
      }}>404</div>

      <h1 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>
        Page Not Found
      </h1>

      <p style={{ color: '#777', fontSize: '0.95rem', maxWidth: '360px', lineHeight: 1.6, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Looks like this page burned up. Let's get you back to the homepage.
      </p>

      <a href="/"
        style={{
          background: 'linear-gradient(135deg,#FF4500,#FF8C00)',
          color: '#fff',
          textDecoration: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '8px',
          fontWeight: 700,
          fontSize: '0.9rem',
          boxShadow: '0 4px 20px rgba(255,69,0,0.35)',
          transition: 'transform 0.2s ease',
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseOut={e => e.currentTarget.style.transform = ''}
      >
        Back to Home →
      </a>
    </div>
  )
}
