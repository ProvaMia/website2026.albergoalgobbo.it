import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import type { BackendEnv, BackendVariables } from './types/env.js'
import { healthRoute } from './routes/health.js'
import { contactRoute } from './routes/contact.js'

const app = new Hono<{ Bindings: BackendEnv; Variables: BackendVariables }>()

app.use('*', logger())
app.use('*', cors())

app.use('*', async (c, next) => {
  c.set('env', {
    CONTACT_EMAIL: c.env.CONTACT_EMAIL || 'info@albergoalgobbo.it',
    FROM_EMAIL: c.env.FROM_EMAIL || 'noreply@albergoalgobbo.it',
    RESEND_API_KEY: c.env.RESEND_API_KEY,
  })
  await next()
})

app.route('/api/health', healthRoute)
app.route('/api/contact', contactRoute)

export default app
