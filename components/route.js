import { NextResponse } from 'next/server'

// ─── ENV VARS (add to .env.local and Vercel → Settings → Environment Variables) ───
// APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
// ADMIN_SECRET=choose-a-strong-random-password   ← for the dashboard login

// ─── In-memory rate limiter (resets on cold start; good enough for Vercel) ───
const rateLimitMap = new Map()
const RATE_LIMIT = 3        // max submissions
const RATE_WINDOW = 60_000  // per 60 seconds per IP

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip) || { count: 0, start: now }
  if (now - entry.start > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, start: now })
    return false
  }
  if (entry.count >= RATE_LIMIT) return true
  rateLimitMap.set(ip, { ...entry, count: entry.count + 1 })
  return false
}

// ─── Spam keyword blacklist ───
const SPAM_KEYWORDS = [
  'casino', 'viagra', 'cialis', 'porn', 'sex', 'escort', 'loan shark',
  'crypto investment', 'binary options', 'make money fast', 'click here',
  'free money', 'winner', 'congratulations you', 'seo service',
  'buy followers', 'buy backlinks', 'cheap meds',
]

function containsSpam(text) {
  if (!text) return false
  const lower = text.toLowerCase()
  return SPAM_KEYWORDS.some(kw => lower.includes(kw))
}

// ─── Call Google Apps Script ───
async function callAppsScript(payload) {
  const url = process.env.APPS_SCRIPT_URL
  if (!url) throw new Error('APPS_SCRIPT_URL not configured')

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  })

  if (!res.ok) throw new Error(`Apps Script responded with ${res.status}`)
  return res.json()
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { _subject, _hp, ...fields } = body  // _hp = honeypot field

    // ── 1. Honeypot check (bots fill hidden fields; humans leave them empty) ──
    if (_hp && String(_hp).trim() !== '') {
      // Silently accept (don't tell the bot it was blocked)
      return NextResponse.json({ success: true })
    }

    // ── 2. Rate limiting by IP ──
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      )
    }

    // ── 3. Required fields check ──
    const required = Object.keys(fields).filter(k => k !== 'company')
    const missing = required.filter(k => !String(fields[k] || '').trim())
    if (missing.length) {
      return NextResponse.json(
        { success: false, error: 'Missing fields: ' + missing.join(', ') },
        { status: 400 }
      )
    }

    // ── 4. Spam keyword filter ──
    const textToCheck = [fields.message, fields.description, fields.name]
      .filter(Boolean)
      .join(' ')

    if (containsSpam(textToCheck)) {
      // Silently accept spam (same UX as success, but not stored)
      return NextResponse.json({ success: true })
    }

    // ── 5. Forward to Google Apps Script (stores to Sheet, checks duplicates) ──
    const result = await callAppsScript({
      action: 'submit',
      subject: _subject || 'New Contact Form Submission',
      fields,
      ip,
      submittedAt: new Date().toISOString(),
    })

    if (result.duplicate) {
      // Already in sheet — acknowledge quietly (don't expose to user)
      return NextResponse.json({ success: true })
    }

    if (!result.success) {
      throw new Error(result.error || 'Apps Script returned failure')
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact/route]', err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}

// ─── GET /api/contact?action=dashboard ───
// Used by the Apps Script dashboard to verify session — not sensitive on its own.
// The actual auth happens inside the Apps Script web app.
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('action') === 'ping') {
    return NextResponse.json({ ok: true })
  }
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
