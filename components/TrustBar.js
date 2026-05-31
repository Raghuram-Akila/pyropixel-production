'use client'
const techs = [
  { label: 'Arduino', icon: '⚡' },
  { label: 'Next.js', icon: '▲' },
  { label: 'Figma', icon: '🎨' },
  { label: '3D Printing', icon: '🖨️' },
  { label: 'Raspberry Pi', icon: '🍓' },
  { label: 'SolidWorks', icon: '🔩' },
  { label: 'React', icon: '⚛️' },
  { label: 'Servo Control', icon: '🤖' },
  { label: 'RF Modules', icon: '📡' },
  { label: 'Tailwind', icon: '💨' },
]

export default function TrustBar() {
  const doubled = [...techs, ...techs]
  return (
    <div className="border-b overflow-hidden py-4" style={{ borderColor: '#e4e0d8', background: '#F7F5F2' }}>
      <div className="flex trust-ticker w-max">
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center gap-2 mx-8 whitespace-nowrap">
            <span style={{ fontSize: '1.1rem' }}>{t.icon}</span>
            <span className="text-sm font-semibold" style={{ color: '#777', fontFamily: "'Syne', sans-serif", letterSpacing: '0.04em' }}>
              {t.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
