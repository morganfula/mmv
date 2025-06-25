// server/api/contact.post.ts
import nodemailer from 'nodemailer'
import {
  readBody,
  defineEventHandler,
  createError,
  sendError,
} from 'h3'

export default defineEventHandler(async (event) => {
  // 1) Parse the incoming form payload
  const body = await readBody<Record<string, string>>(event)
  console.log('▶️ Form payload:', body)

  // 2) Build a plain-text representation
  const text = Object.entries(body)
    .map(([key, val]) => `${key}: ${val}`)
    .join('\n')

  // 3) Create a Gmail-based transporter (uses App Password)
  const transporter = nodemailer.createTransport({
    service: 'gmail',               // built-in Gmail service
    auth: {
      user: 'mmv_25@morgasmatron.com', // your Google Workspace address
      pass: 'pivwxtuseywrkhgc',            // your 16-char App Password
    },
  })

  // 4) Verify SMTP connection
  try {
    await transporter.verify()
    console.log('✅ Gmail SMTP verified')
  } catch (verifyErr: any) {
    console.error('❌ Gmail SMTP verification failed:', verifyErr)
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: `SMTP verify failed: ${verifyErr.message}`,
      })
    )
  }

  // 5) Send the message
  try {
    const info = await transporter.sendMail({
      from:    `"Contact Form" <mmv_25@morgasmatron.com>`,
      to:      'mmv_25@morgasmatron.com',
      subject: `New message from ${body.name || body.email}`,
      text,
    })
    console.log('✉️ Email sent:', info.messageId)
    return { ok: true, messageId: info.messageId }
  } catch (sendErr: any) {
    console.error('❌ Email send error:', sendErr)
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: `SendMail failed: ${sendErr.message}`,
      })
    )
  }
})
