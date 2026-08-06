import { Hono } from 'hono'
import { ContactRequestSchema, type ContactResponse } from '@brochure/shared'

export const contactRoute = new Hono()

contactRoute.post('/', async (c) => {
  let body: unknown
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400)
  }

  const parsed = ContactRequestSchema.safeParse(body)
  if (!parsed.success) {
    return c.json(
      { error: 'Invalid request', details: parsed.error.message },
      400,
    )
  }

  const { name, email, phone, message, website } = parsed.data

  // Honeypot: if this hidden field is filled, treat as spam.
  if (website) {
    return c.json({ error: 'Invalid request' }, 400)
  }

  const timestamp = new Date().toISOString()
  const contactEmail = process.env.CONTACT_EMAIL || 'info@albergoalgobbo.it'
  const fromEmail = process.env.FROM_EMAIL || 'noreply@albergoalgobbo.it'

  const subject = `Richiesta di contatto da ${name}`
  const html = `
    <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Telefono:</strong> ${escapeHtml(phone)}</p>` : ''}
    <p><strong>Messaggio:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
  `

  const senderName = name.replace(/[<>]/g, '').trim()
  const from = senderName ? `${senderName} <${fromEmail}>` : fromEmail

  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from,
          to: contactEmail,
          reply_to: email,
          subject,
          html,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error('Resend error:', err)
      }
    } catch (err) {
      console.error('Resend request failed:', err)
    }
  }

  // Always log the lead so nothing is lost while email is not configured.
  console.log('Contact form submission:', {
    name,
    email,
    phone,
    message,
    timestamp,
  })

  const payload: ContactResponse = {
    success: true,
    timestamp,
  }
  return c.json(payload)
})

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
