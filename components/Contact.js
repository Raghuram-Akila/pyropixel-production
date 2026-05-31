'use client'
import { useState, useRef, useCallback } from 'react'

const CONTACT_API = '/api/contact'

// ── Email format check ──
const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

// ── TRAI-allocated Indian mobile prefixes (4-digit, updated 2024) ──
// Source: TRAI numbering plan — covers Airtel, Jio, Vi, BSNL, etc.
const VALID_PREFIXES = new Set([
  // Jio
  '6000','6001','6002','6003','6004','6005','6006','6007','6008','6009',
  '7000','7001','7002','7003','7004','7005','7006','7007','7008','7009',
  '7010','7011','7012','7013','7014','7015','7016','7017','7018','7019',
  '7020','7021','7022','7023','7024','7025','7026','7027','7028','7029',
  '7030','7031','7032','7033','7034','7035','7036','7037','7038','7039',
  '7040','7041','7042','7043','7044','7045','7046','7047','7048','7049',
  '7050','7051','7052','7053','7054','7055','7056','7057','7058','7059',
  '7060','7061','7062','7063','7064','7065','7066','7067','7068','7069',
  '7070','7071','7072','7073','7074','7075','7076','7077','7078','7079',
  '7080','7081','7082','7083','7084','7085','7086','7087','7088','7089',
  '7090','7091','7092','7093','7094','7095','7096','7097','7098','7099',
  // Airtel
  '6200','6201','6202','6203','6204','6205','6206','6207','6208','6209',
  '6260','6261','6262','6263','6264','6265','6266','6267','6268','6269',
  '7400','7401','7402','7403','7404','7405','7406','7407','7408','7409',
  '7410','7411','7412','7413','7414','7415','7416','7417','7418','7419',
  '7420','7421','7422','7423','7424','7425','7426','7427','7428','7429',
  '8700','8701','8702','8703','8704','8705','8706','8707','8708','8709',
  '8800','8801','8802','8803','8804','8805','8806','8807','8808','8809',
  '8810','8811','8812','8813','8814','8815','8816','8817','8818','8819',
  '8820','8821','8822','8823','8824','8825','8826','8827','8828','8829',
  '9810','9811','9812','9813','9814','9815','9816','9817','9818','9819',
  '9820','9821','9822','9823','9824','9825','9826','9827','9828','9829',
  '9830','9831','9832','9833','9834','9835','9836','9837','9838','9839',
  '9840','9841','9842','9843','9844','9845','9846','9847','9848','9849',
  '9850','9851','9852','9853','9854','9855','9856','9857','9858','9859',
  '9860','9861','9862','9863','9864','9865','9866','9867','9868','9869',
  '9870','9871','9872','9873','9874','9875','9876','9877','9878','9879',
  '9880','9881','9882','9883','9884','9885','9886','9887','9888','9889',
  '9890','9891','9892','9893','9894','9895','9896','9897','9898','9899',
  '9900','9901','9902','9903','9904','9905','9906','9907','9908','9909',
  '9910','9911','9912','9913','9914','9915','9916','9917','9918','9919',
  '9920','9921','9922','9923','9924','9925','9926','9927','9928','9929',
  '9930','9931','9932','9933','9934','9935','9936','9937','9938','9939',
  '9940','9941','9942','9943','9944','9945','9946','9947','9948','9949',
  '9950','9951','9952','9953','9954','9955','9956','9957','9958','9959',
  '9960','9961','9962','9963','9964','9965','9966','9967','9968','9969',
  '9970','9971','9972','9973','9974','9975','9976','9977','9978','9979',
  '9980','9981','9982','9983','9984','9985','9986','9987','9988','9989',
  '9990','9991','9992','9993','9994','9995','9996','9997','9998','9999',
  // Vi (Vodafone-Idea)
  '6300','6301','6302','6303','6304','6305','6306','6307','6308','6309',
  '7600','7601','7602','7603','7604','7605','7606','7607','7608','7609',
  '7610','7611','7612','7613','7614','7615','7616','7617','7618','7619',
  '8000','8001','8002','8003','8004','8005','8006','8007','8008','8009',
  '8100','8101','8102','8103','8104','8105','8106','8107','8108','8109',
  '8200','8201','8202','8203','8204','8205','8206','8207','8208','8209',
  '8600','8601','8602','8603','8604','8605','8606','8607','8608','8609',
  '9600','9601','9602','9603','9604','9605','9606','9607','9608','9609',
  '9700','9701','9702','9703','9704','9705','9706','9707','9708','9709',
  '9800','9801','9802','9803','9804','9805','9806','9807','9808','9809',
  // BSNL
  '6400','6401','6402','6403','6404','6405','6406','6407','6408','6409',
  '9400','9401','9402','9403','9404','9405','9406','9407','9408','9409',
  '9410','9411','9412','9413','9414','9415','9416','9417','9418','9419',
  '9420','9421','9422','9423','9424','9425','9426','9427','9428','9429',
  '9430','9431','9432','9433','9434','9435','9436','9437','9438','9439',
  '9440','9441','9442','9443','9444','9445','9446','9447','9448','9449',
  '9450','9451','9452','9453','9454','9455','9456','9457','9458','9459',
  '9460','9461','9462','9463','9464','9465','9466','9467','9468','9469',
  '9470','9471','9472','9473','9474','9475','9476','9477','9478','9479',
  '9480','9481','9482','9483','9484','9485','9486','9487','9488','9489',
  '9490','9491','9492','9493','9494','9495','9496','9497','9498','9499',
  '9500','9501','9502','9503','9504','9505','9506','9507','9508','9509',
])

// Check if 10-digit phone has a known allocated prefix
function isAllocatedPrefix(digits10) {
  return VALID_PREFIXES.has(digits10.slice(0, 4))
}

// ── MX lookup via dns.google (free, no API key) ──
const mxCache = {}
async function checkMX(domain) {
  if (mxCache[domain] !== undefined) return mxCache[domain]
  try {
    const res = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`,
      { signal: AbortSignal.timeout(4000) }
    )
    const data = await res.json()
    // Status 0 = NOERROR, Answer array with MX records means domain has mail servers
    const valid = data.Status === 0 && Array.isArray(data.Answer) && data.Answer.length > 0
    mxCache[domain] = valid
    return valid
  } catch {
    // On network error, fall back to allowing it (don't punish user for DNS timeout)
    mxCache[domain] = true
    return true
  }
}

// ── Debounce hook ──
function useDebounce(fn, delay) {
  const timer = useRef(null)
  return useCallback((...args) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => fn(...args), delay)
  }, [fn, delay])
}

// ── Field validation states: idle | checking | valid | invalid ──
function useFieldState(initial = 'idle') {
  const [state, setState] = useState(initial)
  return [state, setState]
}

// ── Main form hook ──
function useForm(fields) {
  const [values, setValues] = useState(fields)
  const [errors, setErrors] = useState({})
  const [fieldStates, setFieldStates] = useState({}) // per-field: checking/valid/invalid
  const [status, setStatus] = useState('idle')

  const set = (k, v) => setValues(prev => ({ ...prev, [k]: v }))
  const setFS = (k, s) => setFieldStates(prev => ({ ...prev, [k]: s }))

  // Live email validation: format → MX check
  const validateEmailLive = useCallback(async (email) => {
    const trimmed = email.trim()
    if (!trimmed) { setFS('email', 'idle'); return }
    if (!EMAIL_RE.test(trimmed)) { setFS('email', 'invalid'); return }
    const domain = trimmed.split('@')[1]
    setFS('email', 'checking')
    const ok = await checkMX(domain)
    setFS('email', ok ? 'valid' : 'invalid')
  }, [])

  const debouncedEmailCheck = useDebounce(validateEmailLive, 600)

  // Live phone validation: format + prefix check (instant)
  const validatePhoneLive = useCallback((digits) => {
    if (!digits) { setFS('phone', 'idle'); return }
    if (digits.length < 10) { setFS('phone', 'idle'); return }
    if (!/^[6-9]\d{9}$/.test(digits)) { setFS('phone', 'invalid'); return }
    if (!isAllocatedPrefix(digits)) { setFS('phone', 'invalid'); return }
    setFS('phone', 'valid')
  }, [])

  const handleEmailChange = (v) => {
    set('email', v)
    setFS('email', 'idle')
    debouncedEmailCheck(v)
  }

  const handlePhoneChange = (v) => {
    set('phone', v)
    validatePhoneLive(v)
  }

  const validate = () => {
    const optional = ['company']
    const errs = {}
    Object.keys(fields).forEach(k => {
      if (optional.includes(k)) return
      if (!values[k] || !String(values[k]).trim()) errs[k] = 'required'
    })
    if (values.email && fieldStates.email === 'invalid') errs.email = 'invalid'
    if (values.email && fieldStates.email === 'checking') errs.email = 'checking'
    if (values.phone && fieldStates.phone === 'invalid') errs.phone = 'invalid'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const submit = async (subject) => {
    if (!validate()) return
    if (fieldStates.email === 'checking') return // wait for MX check
    setStatus('sending')
    try {
      const res = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          phone: '+91' + values.phone,
          _subject: subject,
          _hp: honeypotRef.current,
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
        setValues(fields)
        setErrors({})
        setFieldStates({})
        setTimeout(() => setStatus('idle'), 6000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const honeypotRef = useRef('')

  return { values, set, errors, fieldStates, status, submit, handleEmailChange, handlePhoneChange, honeypotRef }
}

// ── Status indicator — only shown when invalid or checking ──
function FieldStatus({ state, fieldKey }) {
  if (state === 'checking') return (
    <span style={{ color: '#FF8C00', fontSize: '11px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
      <span style={{ display: 'inline-block', width: '10px', height: '10px', border: '2px solid #FF8C00', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      Verifying email domain...
    </span>
  )
  if (state === 'invalid') return (
    <span style={{ color: '#FF4500', fontSize: '11px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
      ✕ {fieldKey === 'email' ? 'Email domain not found — check spelling' : 'Unrecognised number — enter a real Indian mobile number'}
    </span>
  )
  return null
}

function inputBorder(fieldState, hasError) {
  if (hasError || fieldState === 'invalid') return '#FF4500'
  if (fieldState === 'checking') return '#FF8C00'
  return '#e4e0d8'
}

const selectStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' viewBox='0 0 12 8'%3E%3Cpath stroke='%23aaa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.9rem center',
  appearance: 'none',
}

const inputBase = `w-full rounded-md px-3.5 py-2.5 text-sm outline-none transition-colors bg-white`

function inputStyle(borderColor) {
  return {
    border: `1px solid ${borderColor}`,
    color: '#0D0D0F',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: 'border-color 0.2s',
  }
}

function Input({ label, required, children, statusEl }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
        style={{ color: '#999', fontFamily: "'Syne', sans-serif" }}>
        {label} {required && <span style={{ color: '#FF4500' }}>*</span>}
      </label>
      {children}
      {statusEl}
    </div>
  )
}

// +91 locked phone input
function PhoneInput({ value, onChange, fieldState }) {
  const border = inputBorder(fieldState, false)
  return (
    <div style={{
      display: 'flex',
      border: `1px solid ${border}`,
      borderRadius: '6px',
      overflow: 'hidden',
      background: '#fff',
      transition: 'border-color 0.2s',
    }}>
      <span style={{
        padding: '0 12px',
        display: 'flex', alignItems: 'center',
        fontSize: '0.875rem', fontWeight: 600,
        color: '#555', background: '#F7F5F2',
        borderRight: `1px solid ${border}`,
        flexShrink: 0, userSelect: 'none',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        letterSpacing: '0.02em',
        transition: 'border-color 0.2s',
      }}>+91</span>
      <input
        type="tel"
        inputMode="numeric"
        maxLength={10}
        className={inputBase}
        style={{ border: 'none', borderRadius: 0, color: '#0D0D0F', fontFamily: "'Plus Jakarta Sans', sans-serif", flex: 1 }}
        value={value}
        onChange={e => onChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
        placeholder="XXXXX XXXXX"
      />
    </div>
  )
}

function SubmitBtn({ status, label, sendingLabel, successLabel, errorLabel, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={status === 'sending' || status === 'success'}
      className="w-full py-3 rounded-lg text-sm font-semibold text-white border-none cursor-pointer mt-1 disabled:cursor-not-allowed"
      style={{
        fontFamily: "'Syne', sans-serif",
        background:
          status === 'success' ? '#22c55e'
          : status === 'error' ? '#FF4500'
          : 'linear-gradient(135deg,#FF4500,#FF8C00)',
        boxShadow: status === 'idle' ? '0 4px 14px rgba(255,69,0,0.25)' : 'none',
        transition: 'background 0.3s, transform 0.15s',
      }}
      onMouseOver={e => { if (status === 'idle') e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseOut={e => e.currentTarget.style.transform = ''}
    >
      {status === 'sending' ? sendingLabel
        : status === 'success' ? successLabel
        : status === 'error' ? errorLabel
        : label}
    </button>
  )
}

// ── Spin animation injected once ──
const spinStyle = `@keyframes spin { to { transform: rotate(360deg); } }`

function InquiryForm() {
  const { values, set, errors, fieldStates, status, submit, handleEmailChange, handlePhoneChange, honeypotRef } = useForm({
    name: '', phone: '', email: '', service: '', message: ''
  })

  return (
    <div className="space-y-4">
      <style>{spinStyle}</style>
      {/* Honeypot — hidden from users, visible to bots */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" value={honeypotRef.current} onChange={e => { honeypotRef.current = e.target.value }} placeholder="Leave this empty" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Name" required
          statusEl={errors.name && <span style={{ color: '#FF4500', fontSize: '11px', marginTop: '4px', display: 'block' }}>This field is required.</span>}>
          <input className={inputBase} style={inputStyle(errors.name ? '#FF4500' : '#e4e0d8')}
            value={values.name} onChange={e => set('name', e.target.value)} placeholder="Your name" />
        </Input>
        <Input label="Phone" required
          statusEl={<FieldStatus state={fieldStates.phone || 'idle'} fieldKey="phone" />}>
          <PhoneInput value={values.phone} onChange={handlePhoneChange} fieldState={fieldStates.phone || 'idle'} />
        </Input>
      </div>

      <Input label="Email" required
        statusEl={<FieldStatus state={fieldStates.email || 'idle'} fieldKey="email" />}>
        <input type="email" className={inputBase}
          style={inputStyle(inputBorder(fieldStates.email, !!errors.email))}
          value={values.email} onChange={e => handleEmailChange(e.target.value)}
          placeholder="you@email.com" />
      </Input>

      <Input label="Service" required
        statusEl={errors.service && <span style={{ color: '#FF4500', fontSize: '11px', marginTop: '4px', display: 'block' }}>Please select a service.</span>}>
        <select className={inputBase} style={{ ...inputStyle(errors.service ? '#FF4500' : '#e4e0d8'), ...selectStyle }}
          value={values.service} onChange={e => set('service', e.target.value)}>
          <option value="">Select a service</option>
          <option>3D Print Coordination</option>
          <option>Project Center</option>
          <option>Graphic Design</option>
          <option>Web Development</option>
          <option>Other</option>
        </select>
      </Input>

      <Input label="Message" required
        statusEl={errors.message && <span style={{ color: '#FF4500', fontSize: '11px', marginTop: '4px', display: 'block' }}>This field is required.</span>}>
        <textarea className={inputBase} style={inputStyle(errors.message ? '#FF4500' : '#e4e0d8')}
          rows={4} value={values.message} onChange={e => set('message', e.target.value)}
          placeholder="Tell us about your project..." />
      </Input>

      <div className="flex items-center gap-2 text-xs" style={{ color: '#999' }}>
        <span style={{ color: '#22c55e' }}>✓</span> We reply within 24 hours · No spam ever
      </div>
      <SubmitBtn status={status}
        label="Send Inquiry →" sendingLabel="Sending..."
        successLabel="✓ Sent! We'll reply within 24 hours."
        errorLabel="Something went wrong — try again."
        onClick={() => submit('New Inquiry – Pyro Pixel Production')} />
    </div>
  )
}

function QuoteForm() {
  const { values, set, errors, fieldStates, status, submit, handleEmailChange, handlePhoneChange, honeypotRef } = useForm({
    name: '', company: '', email: '', phone: '', project_type: '', description: '', budget: '', timeline: ''
  })

  return (
    <div className="space-y-4">
      <style>{spinStyle}</style>
      {/* Honeypot — hidden from users, visible to bots */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" value={honeypotRef.current} onChange={e => { honeypotRef.current = e.target.value }} placeholder="Leave this empty" />
      </div>
      <Input label="Name" required
        statusEl={errors.name && <span style={{ color: '#FF4500', fontSize: '11px', marginTop: '4px', display: 'block' }}>This field is required.</span>}>
        <input className={inputBase} style={inputStyle(errors.name ? '#FF4500' : '#e4e0d8')}
          value={values.name} onChange={e => set('name', e.target.value)} placeholder="Your name" />
      </Input>

      <Input label="Company / Institution">
        <input className={inputBase} style={inputStyle('#e4e0d8')}
          value={values.company} onChange={e => set('company', e.target.value)} placeholder="Optional" />
      </Input>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Email" required
          statusEl={<FieldStatus state={fieldStates.email || 'idle'} fieldKey="email" />}>
          <input type="email" className={inputBase}
            style={inputStyle(inputBorder(fieldStates.email, !!errors.email))}
            value={values.email} onChange={e => handleEmailChange(e.target.value)}
            placeholder="you@email.com" />
        </Input>
        <Input label="Phone" required
          statusEl={<FieldStatus state={fieldStates.phone || 'idle'} fieldKey="phone" />}>
          <PhoneInput value={values.phone} onChange={handlePhoneChange} fieldState={fieldStates.phone || 'idle'} />
        </Input>
      </div>

      <Input label="Project Type" required
        statusEl={errors.project_type && <span style={{ color: '#FF4500', fontSize: '11px', marginTop: '4px', display: 'block' }}>Please select a project type.</span>}>
        <select className={inputBase} style={{ ...inputStyle(errors.project_type ? '#FF4500' : '#e4e0d8'), ...selectStyle }}
          value={values.project_type} onChange={e => set('project_type', e.target.value)}>
          <option value="">Select type</option>
          <option>3D Printing - Prototype</option>
          <option>3D Printing - Industrial Part</option>
          <option>Project Center - Student Project</option>
          <option>Project Center - Startup Build</option>
          <option>Graphic Design</option>
          <option>Web Development</option>
          <option>Other</option>
        </select>
      </Input>

      <Input label="Project Description" required
        statusEl={errors.description && <span style={{ color: '#FF4500', fontSize: '11px', marginTop: '4px', display: 'block' }}>This field is required.</span>}>
        <textarea className={inputBase} style={inputStyle(errors.description ? '#FF4500' : '#e4e0d8')}
          rows={3} value={values.description} onChange={e => set('description', e.target.value)}
          placeholder="Describe your requirements..." />
      </Input>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Budget" required
          statusEl={errors.budget && <span style={{ color: '#FF4500', fontSize: '11px', marginTop: '4px', display: 'block' }}>Please select a budget range.</span>}>
          <select className={inputBase} style={{ ...inputStyle(errors.budget ? '#FF4500' : '#e4e0d8'), ...selectStyle }}
            value={values.budget} onChange={e => set('budget', e.target.value)}>
            <option value="">Select range</option>
            <option>Under ₹10,000</option>
            <option>₹10,000 – ₹50,000</option>
            <option>₹50,000 – ₹2,00,000</option>
            <option>₹2,00,000+</option>
            <option>Let's discuss</option>
          </select>
        </Input>
        <Input label="Timeline" required
          statusEl={errors.timeline && <span style={{ color: '#FF4500', fontSize: '11px', marginTop: '4px', display: 'block' }}>Please select a timeline.</span>}>
          <select className={inputBase} style={{ ...inputStyle(errors.timeline ? '#FF4500' : '#e4e0d8'), ...selectStyle }}
            value={values.timeline} onChange={e => set('timeline', e.target.value)}>
            <option value="">Select timeline</option>
            <option>Within 1 week</option>
            <option>2–4 weeks</option>
            <option>1–3 months</option>
            <option>Flexible</option>
          </select>
        </Input>
      </div>

      <div className="flex items-center gap-2 text-xs" style={{ color: '#999' }}>
        <span style={{ color: '#22c55e' }}>✓</span> We reply within 24 hours · No spam ever
      </div>
      <SubmitBtn status={status}
        label="Submit Quote Request →" sendingLabel="Sending..."
        successLabel="✓ Sent! We'll reply within 24 hours."
        errorLabel="Something went wrong — try again."
        onClick={() => submit('Quote Request – Pyro Pixel Production')} />
    </div>
  )
}

export default function Contact() {
  const [tab, setTab] = useState('inquiry')

  const contactItems = [
    { icon: '📍', label: 'Address', val: 'C/o. NIET, Nehru Garden, Thirumalayampalayam, Madukkarai, Coimbatore South, Tamil Nadu 641105' },
    { icon: '📞', label: 'Phone', val: '+91 99769 99325' },
    { icon: '✉️', label: 'Email', val: 'raghuram.rengaraj@gmail.com', href: 'https://mail.google.com/mail/?view=cm&to=raghuram.rengaraj@gmail.com', external: true },
    { icon: '🕐', label: 'Working Hours', val: 'Mon – Sat, 9:30 AM – 7:00 PM IST' },
    { icon: '📸', label: 'Follow Us', val: '@raghu_akila on Instagram', href: 'https://www.instagram.com/raghu_akila/', external: true },
  ]

  return (
    <section id="contact" className="px-6 md:px-10 lg:px-20 py-20 border-b" style={{ borderColor: '#e4e0d8' }}>
      <div className="reveal">
        <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#FF4500', fontFamily: "'Syne', sans-serif" }}>Get In Touch</div>
        <h2 className="text-3xl lg:text-4xl tracking-tight mb-3" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>Let's Work Together</h2>
        <p className="text-sm leading-relaxed max-w-md" style={{ color: '#777' }}>Have a project in mind? Reach out and we'll get back to you within 24 hours.</p>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16">
        <div className="reveal space-y-5">
          {contactItems.map(item => (
            <div key={item.label} className="flex gap-3 items-start">
              <span className="text-lg mt-0.5">{item.icon}</span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#999', fontFamily: "'Syne', sans-serif" }}>{item.label}</div>
                {item.href
                  ? <a href={item.href} target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="text-sm no-underline transition-colors" style={{ color: '#777' }}
                      onMouseOver={e => e.currentTarget.style.color = '#FF4500'}
                      onMouseOut={e => e.currentTarget.style.color = '#777'}
                    >{item.val}</a>
                  : <p className="text-sm" style={{ color: '#777' }}>{item.val}</p>
                }
              </div>
            </div>
          ))}
          <a href="https://wa.me/919976999325" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-lg no-underline mt-2 transition-all"
            style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', boxShadow: '0 4px 14px rgba(37,211,102,0.3)', fontFamily: "'Syne', sans-serif" }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.currentTarget.style.transform = ''}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        <div className="reveal rounded-2xl p-6 border" style={{ background: '#F7F5F2', borderColor: '#e4e0d8' }}>
          <div className="flex border-b mb-6" style={{ borderColor: '#e4e0d8' }}>
            {['inquiry', 'quote'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="px-5 py-2.5 text-sm font-medium bg-transparent border-none cursor-pointer transition-all -mb-px"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: tab === t ? '#0D0D0F' : '#999',
                  borderBottom: tab === t ? '2px solid #FF4500' : '2px solid transparent',
                }}>
                {t === 'inquiry' ? 'Inquiry' : 'Request a Quote'}
              </button>
            ))}
          </div>
          {tab === 'inquiry' ? <InquiryForm /> : <QuoteForm />}
        </div>
      </div>
    </section>
  )
}
