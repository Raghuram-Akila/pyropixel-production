import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function POST(req) {
  console.log('ENV CHECK:', !!process.env.SMTP_USER, !!process.env.SMTP_PASS, !!process.env.CONTACT_TO)
  console.log('SMTP_USER:', process.env.SMTP_USER)
  console.log('SMTP_PASS length:', process.env.SMTP_PASS?.length)

  try {
    const body = await req.json()
    console.log('BODY received:', JSON.stringify(body))

    const { _subject, _hp, ...fields } = body

    const required = Object.keys(fields).filter(k => k !== 'company')
    const missing = required.filter(k => !String(fields[k] || '').trim())
    if (missing.length) {
      console.log('MISSING FIELDS:', missing)
      return NextResponse.json({ success: false, error: 'Missing fields: ' + missing.join(', ') }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    console.log('Attempting sendMail...')
    await transporter.sendMail({
      from: `"Pyro Pixel Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: fields.email,
      subject: _subject || 'New Contact Form Submission',
      html: `<h2 style="color:#FF4500;">${_subject || 'New Submission'}</h2><pre>${JSON.stringify(fields, null, 2)}</pre>`,
    })

    console.log('sendMail SUCCESS')
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact/route] ERROR:', err.message, err.code)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}