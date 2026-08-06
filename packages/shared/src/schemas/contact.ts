import { z } from 'zod'

/**
 * POST /api/contact request body schema.
 */
export const ContactRequestSchema = z.object({
  name: z.string().min(2, 'name is required'),
  email: z.string().email('invalid email'),
  phone: z.string().max(20).optional(),
  message: z.string().min(10, 'message is too short'),
  privacy: z.literal(true, {
    errorMap: () => ({ message: 'privacy consent is required' }),
  }),
  website: z.string().max(0).optional(),
})

export type ContactRequest = z.infer<typeof ContactRequestSchema>

/**
 * POST /api/contact response body schema.
 */
export const ContactResponseSchema = z.object({
  success: z.boolean(),
  timestamp: z.string(),
})

export type ContactResponse = z.infer<typeof ContactResponseSchema>

/**
 * Error payload returned on /api/contact failures.
 */
export const ContactErrorSchema = z.object({
  error: z.string(),
  details: z.string().optional(),
})

export type ContactError = z.infer<typeof ContactErrorSchema>
