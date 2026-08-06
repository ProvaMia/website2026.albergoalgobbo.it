import { Hono } from 'hono'
import { ContactRequestSchema, type ContactResponse } from '@brochure/shared'
import type { BackendVariables } from '../types/env.js'

export const contactRoute = new Hono<{ Variables: BackendVariables }>()

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

  const env = c.get('env')
  const timestamp = new Date().toISOString()
  const contactEmail = env.CONTACT_EMAIL
  const fromEmail = env.FROM_EMAIL

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

  if (env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
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
