import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

// Required env vars — add to .env.local and to Vercel → Settings → Environment Variables:
//   SMTP_USER=raghuram.rengaraj@gmail.com
//   SMTP_PASS=your_gmail_app_password   ← generate at myaccount.google.com → Security → App passwords
//   CONTACT_TO=raghuram.rengaraj@gmail.com

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

function buildHtml(fields) {
  const rows = Object.entries(fields)
    .map(([k, v]) => `
      <tr>
        <td style="padding:8px 12px;font-weight:600;background:#f5f5f5;text-transform:capitalize;white-space:nowrap;">${k.replace(/_/g, ' ')}</td>
        <td style="padding:8px 12px;">${v || '—'}</td>
      </tr>`)
    .join('')
  return `
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;border:1px solid #e4e0d8;">
      ${rows}
    </table>`
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { _subject, ...fields } = body

    // Basic server-side validation
    const required = Object.keys(fields).filter(k => k !== 'company')
    const missing = required.filter(k => !String(fields[k] || '').trim())
    if (missing.length) {
      return NextResponse.json({ success: false, error: 'Missing fields: ' + missing.join(', ') }, { status: 400 })
    }

    await transporter.sendMail({
      from: `"Pyro Pixel Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: fields.email,
      subject: _subject || 'New Contact Form Submission',
      html: `
        <h2 style="font-family:sans-serif;color:#FF4500;">${_subject || 'New Submission'}</h2>
        ${buildHtml(fields)}
        <p style="font-size:12px;color:#999;margin-top:16px;">Sent from pyropixel-production.vercel.app contact form</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact/route]', err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
