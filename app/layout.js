import './globals.css'

export const metadata = {
  title: 'Pyro Pixel Production Pvt Ltd - Coimbatore',
  description: 'Pyro Pixel Production is a Coimbatore-based project center and creative production company. 3D Printing, Robotics, Graphic Design & Web Development.',
  metadataBase: new URL('https://pyropixel-production.vercel.app'),
  openGraph: {
    title: 'Pyro Pixel Production Pvt Ltd',
    description: 'Your all-in-one project partner from Coimbatore — 3D Printing, Project Center, Design & Web.',
    type: 'website',
    url: 'https://pyropixel-production.vercel.app',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pyro Pixel Production - Coimbatore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pyro Pixel Production Pvt Ltd',
    description: 'Your all-in-one project partner from Coimbatore — 3D Printing, Project Center, Design & Web.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Pyro Pixel Production Pvt Ltd',
  description: 'Coimbatore-based project center and creative production company. 3D Printing, Robotics, Graphic Design & Web Development.',
  url: 'https://pyropixel-production.vercel.app',
  telephone: '+919976999325',
  email: 'raghuram.rengaraj@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C/o. NIET, Nehru Garden, Thirumalayampalayam, Madukkarai',
    addressLocality: 'Coimbatore',
    addressRegion: 'Tamil Nadu',
    postalCode: '641105',
    addressCountry: 'IN',
  },
  openingHours: 'Mo-Sa 09:30-19:00',
  sameAs: [
    'https://www.instagram.com/raghu_akila/',
    'https://www.linkedin.com/in/raghuramakila',
    'https://wa.me/919976999325',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#ffffff', color: '#0D0D0F', overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}
