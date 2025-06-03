// server/api/contact.post.ts
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, string>>(event)

  /* -- 1. Compte Ethereal (créé à chaque appel) -- */
  const testAcc = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host   : testAcc.smtp.host,
    port   : testAcc.smtp.port,
    secure : testAcc.smtp.secure,
    auth   : {
      user : testAcc.user,
      pass : testAcc.pass
    }
  })

  /* -- 2. Contenu du mail -- */
  const text = Object.entries(body)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')

  const info = await transporter.sendMail({
    from   : '"Dev site" <no-reply@example.dev>',
    to     : 'contact@example.dev',
    subject: 'Test form (Ethereal)',
    text
  })

  /* -- 3. URL de prévisualisation ---------- */
  const previewUrl = nodemailer.getTestMessageUrl(info) // ex : https://ethereal.email/message/WaQKMgKddxQDoou...

  console.log('📧 Preview →', previewUrl)

  return { ok: true, previewUrl }  // tu peux même renvoyer le lien au front
})
