import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { config as loadEnv } from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DEFAULT_API_PORT } from '@brochure/shared'
import type { BackendVariables } from './types/env.js'
import { healthRoute } from './routes/health.js'
import { contactRoute } from './routes/contact.js'

// Load .env.local from the repo root (two levels up from apps/backend/src)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
loadEnv({ path: path.resolve(__dirname, '../../../.env.local') })
loadEnv({ path: path.resolve(__dirname, '../../../.env') })

const app = new Hono<{ Variables: BackendVariables }>()

app.use('*', logger())
app.use('*', cors())

app.use('*', async (c, next) => {
  c.set('env', {
    CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'info@albergoalgobbo.it',
    FROM_EMAIL: process.env.FROM_EMAIL || 'noreply@albergoalgobbo.it',
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  })
  await next()
})

app.route('/api/health', healthRoute)
app.route('/api/contact', contactRoute)

const port = Number(process.env.API_PORT ?? DEFAULT_API_PORT)

serve({ fetch: app.fetch, port }, (info) => {
  console.log('')
  console.log('=================================')
  console.log('  Brochure Backend (Hono)')
  console.log('=================================')
  console.log('')
  console.log(`Listening on http://localhost:${info.port}`)
  console.log('')
  console.log('Endpoints:')
  console.log(`  GET  http://localhost:${info.port}/api/health`)
  console.log(`  POST http://localhost:${info.port}/api/contact`)
  console.log('')
})
