import { z } from 'zod'

const schema=z.object({
 NODE_ENV:z.enum(['development','test','production']).default('development'),
 PORT:z.coerce.number().int().positive().default(3001),
 APP_ORIGIN:z.string().url().default('http://127.0.0.1:5173'),
 DATABASE_URL:z.string().min(1).optional(),
 SESSION_DAYS:z.coerce.number().int().min(1).max(90).default(30),
 EMAIL_FROM:z.string().email().optional(),
 EMAIL_API_KEY:z.string().min(1).optional(),
 PHOTO_STORAGE_PROVIDER:z.string().min(1).optional(),
})

export const env=schema.parse(process.env)
export const isProduction=env.NODE_ENV==='production'

