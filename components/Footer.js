'use client'
// SVG social icons
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/>
  </svg>
)
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

export default function Footer() {
  return (
    <>
      <footer className="px-6 md:px-10 lg:px-20 py-12 border-b grid grid-cols-2 md:grid-cols-4 gap-8 bg-white" style={{ borderColor: '#e4e0d8' }}>
        <div className="col-span-2 md:col-span-1">
          <div className="text-lg mb-2 flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
            <span style={{ background: 'linear-gradient(135deg,#FF4500,#FF8C00)', borderRadius: '6px', width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>🔥</span>
            Pyro<span style={{ color: '#FF4500' }}>Pixel</span>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#999' }}>A Coimbatore-based project center and creative production company.</p>
          <div className="flex gap-3">
            {[
              { href: 'https://www.instagram.com/raghu_akila/', Icon: InstagramIcon, label: 'Instagram' },
              { href: 'https://www.linkedin.com/in/raghuramakila', Icon: LinkedInIcon, label: 'LinkedIn' },
              { href: 'https://wa.me/919976999325', Icon: WhatsAppIcon, label: 'WhatsApp' },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="no-underline transition-colors p-2 rounded-lg"
                style={{ color: '#999', border: '1px solid #e4e0d8' }}
                onMouseOver={e => { e.currentTarget.style.color = '#FF4500'; e.currentTarget.style.borderColor = 'rgba(255,69,0,0.3)'; e.currentTarget.style.background = '#FFF9F6' }}
                onMouseOut={e => { e.currentTarget.style.color = '#999'; e.currentTarget.style.borderColor = '#e4e0d8'; e.currentTarget.style.background = 'transparent' }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#999', fontFamily: "'Syne', sans-serif" }}>Services</h4>
          {['3D Print Coordination', 'Project Center', 'Graphic Design', 'Web Development'].map(s => (
            <a key={s} href="#services" className="block text-sm no-underline mb-2 transition-colors" style={{ color: '#777' }}
              onMouseOver={e => e.currentTarget.style.color = '#FF4500'}
              onMouseOut={e => e.currentTarget.style.color = '#777'}
            >{s}</a>
          ))}
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#999', fontFamily: "'Syne', sans-serif" }}>Company</h4>
          {[['About Us', '#about'], ['Projects', '#projects'], ['FAQ', '#faq']].map(([l, h]) => (
            <a key={l} href={h} className="block text-sm no-underline mb-2 transition-colors" style={{ color: '#777' }}
              onMouseOver={e => e.currentTarget.style.color = '#FF4500'}
              onMouseOut={e => e.currentTarget.style.color = '#777'}
            >{l}</a>
          ))}
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#999', fontFamily: "'Syne', sans-serif" }}>Contact</h4>
          <a href="#contact" className="block text-sm no-underline mb-2 transition-colors" style={{ color: '#777' }}
            onMouseOver={e => e.currentTarget.style.color = '#FF4500'}
            onMouseOut={e => e.currentTarget.style.color = '#777'}
          >Get a Quote</a>
          <a href="https://mail.google.com/mail/?view=cm&to=raghuram.rengaraj@gmail.com" target="_blank" rel="noopener noreferrer" className="block text-sm no-underline mb-2 transition-colors" style={{ color: '#777' }}
            onMouseOver={e => e.currentTarget.style.color = '#FF4500'}
            onMouseOut={e => e.currentTarget.style.color = '#777'}
          >Email Us</a>
          <a href="https://wa.me/919976999325" target="_blank" rel="noopener noreferrer" className="block text-sm no-underline mb-2 transition-colors" style={{ color: '#777' }}
            onMouseOver={e => e.currentTarget.style.color = '#FF4500'}
            onMouseOut={e => e.currentTarget.style.color = '#777'}
          >WhatsApp</a>
        </div>
      </footer>
      <div className="px-6 md:px-20 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 bg-white border-t" style={{ borderColor: '#f0ede8' }}>
        <p className="text-xs" style={{ color: '#999' }}>© 2025 Pyro Pixel Production Pvt Ltd. All rights reserved. Made with ❤️ in Coimbatore 🔥</p>
        <span className="text-xs px-3 py-1 rounded-full font-mono" style={{ background: '#F7F5F2', color: '#777' }}>CIN: U27900TZ2025PTC036023</span>
      </div>
    </>
  )
}
