import { z } from 'zod'

export const credentialsSchema=z.object({email:z.string().email().max(254).transform(v=>v.toLowerCase()),password:z.string().min(10).max(128)})
export const registerSchema=credentialsSchema.extend({name:z.string().trim().min(2).max(100),phone:z.string().trim().max(30).optional()})
export const profileSchema=z.object({name:z.string().trim().min(2).max(100),phone:z.string().trim().max(30).nullable().optional(),whatsapp:z.string().trim().max(30).nullable().optional(),preferredContact:z.enum(['WhatsApp','Llamada','Correo electrónico'])})
export const petSchema=z.object({name:z.string().trim().min(1).max(80),species:z.string().trim().min(1).max(40),breed:z.string().trim().max(80).nullable().optional(),birthDate:z.coerce.date().nullable().optional(),ageLabel:z.string().trim().max(40).nullable().optional(),sex:z.string().trim().max(30).nullable().optional(),weightKg:z.coerce.number().positive().max(500).nullable().optional(),notes:z.string().trim().max(2000).nullable().optional(),allergies:z.string().trim().max(2000).nullable().optional(),conditions:z.string().trim().max(2000).nullable().optional(),photoUrl:z.string().url().nullable().optional()})
export const appointmentSchema=z.object({requestedAt:z.coerce.date().refine(v=>v>Date.now(),{message:'La fecha debe ser futura.'}),notes:z.string().trim().max(2000).nullable().optional(),pets:z.array(z.object({petId:z.string().cuid(),serviceIds:z.array(z.string().cuid()).min(1).max(8)})).min(1).max(6)})

export function parse(schema,value){const result=schema.safeParse(value);if(!result.success){const error=new Error('VALIDATION_ERROR');error.status=400;error.details=result.error.flatten();throw error}return result.data}

