import { NextResponse } from 'next/server'

const rateLimitMap = new Map()
const RATE_LIMIT = 3
const RATE_WINDOW = 60_000

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
    const { _subject, _hp, ...fields } = body

    if (_hp && String(_hp).trim() !== '') {
      return NextResponse.json({ success: true })
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests.' },
        { status: 429 }
      )
    }

    const required = Object.keys(fields).filter(k => k !== 'company')
    const missing = required.filter(k => !String(fields[k] || '').trim())
    if (missing.length) {
      return NextResponse.json(
        { success: false, error: 'Missing fields: ' + missing.join(', ') },
        { status: 400 }
      )
    }

    const result = await callAppsScript({
      action: 'submit',
      subject: _subject || 'New Contact Form Submission',
      fields,
      ip,
      submittedAt: new Date().toISOString(),
    })

    if (!result.success && !result.duplicate) {
      throw new Error(result.error || 'Apps Script returned failure')
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact/route]', err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}