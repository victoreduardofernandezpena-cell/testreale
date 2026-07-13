import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'
import { createApp } from '../server/app.js'
import { hashPassword, verifyPassword } from '../server/security.js'

const user={id:'clh123456789012345678901',email:'cliente@example.com',name:'Cliente RealEngo',phone:null,whatsapp:null,preferredContact:'WhatsApp',role:'CUSTOMER',passwordHash:'unused'}

function fakeDb(overrides={}){
 return {
  user:{findUnique:vi.fn().mockResolvedValue(null),create:vi.fn().mockImplementation(({data})=>Promise.resolve({...user,...data,id:user.id})),update:vi.fn()},
  session:{create:vi.fn().mockResolvedValue({}),findUnique:vi.fn(),delete:vi.fn(),deleteMany:vi.fn()},
  passwordResetToken:{create:vi.fn(),findUnique:vi.fn(),update:vi.fn()},
  pet:{findMany:vi.fn().mockResolvedValue([])},
  appointment:{},availabilityBlock:{},appointmentSlot:{},product:{},productVariant:{},favoriteProduct:{},favoriteService:{},cart:{},cartItem:{},order:{},service:{},
  $transaction:vi.fn(),$queryRaw:vi.fn(),
  ...overrides,
 }
}

describe('seguridad de autenticación',()=>{
 it('genera hashes y nunca conserva la contraseña en texto plano',async()=>{const hash=await hashPassword('UnaClaveSegura123');expect(hash).not.toContain('UnaClaveSegura123');expect(await verifyPassword('UnaClaveSegura123',hash)).toBe(true);expect(await verifyPassword('incorrecta',hash)).toBe(false)})
 it('registra y entrega una cookie HttpOnly',async()=>{const db=fakeDb(),app=createApp({db});const response=await request(app).post('/api/auth/register').send({name:'Cliente RealEngo',email:'cliente@example.com',password:'UnaClaveSegura123'});expect(response.status).toBe(201);expect(response.headers['set-cookie'][0]).toContain('HttpOnly');expect(response.body.user).not.toHaveProperty('passwordHash');expect(db.session.create).toHaveBeenCalledOnce()})
 it('usa un mensaje genérico cuando las credenciales fallan',async()=>{const db=fakeDb({user:{findUnique:vi.fn().mockResolvedValue(null)}}),app=createApp({db});const response=await request(app).post('/api/auth/login').send({email:'nadie@example.com',password:'UnaClaveSegura123'});expect(response.status).toBe(401);expect(response.body.error).toBe('INVALID_CREDENTIALS')})
})

describe('aislamiento y autorización',()=>{
 it('filtra las mascotas por el usuario autenticado',async()=>{const db=fakeDb();db.session.findUnique.mockResolvedValue({id:'session-1',expiresAt:new Date(Date.now()+60000),user});const app=createApp({db});const response=await request(app).get('/api/pets').set('Cookie','realengo_session=test-session');expect(response.status).toBe(200);expect(db.pet.findMany).toHaveBeenCalledWith(expect.objectContaining({where:{userId:user.id}}))})
 it('impide que un cliente acceda a administración',async()=>{const db=fakeDb();db.session.findUnique.mockResolvedValue({id:'session-1',expiresAt:new Date(Date.now()+60000),user});const app=createApp({db});const response=await request(app).get('/api/admin/overview').set('Cookie','realengo_session=test-session');expect(response.status).toBe(403);expect(response.body.error).toBe('FORBIDDEN')})
 it('devuelve conflicto si dos confirmaciones intentan ocupar el mismo horario',async()=>{const admin={...user,role:'ADMIN'};const conflict=Object.assign(new Error('duplicate'),{code:'P2002'});const db=fakeDb();db.session.findUnique.mockResolvedValue({id:'session-1',expiresAt:new Date(Date.now()+60000),user:admin});db.$transaction.mockRejectedValue(conflict);const app=createApp({db});const response=await request(app).post('/api/admin/appointments/clh123456789012345678901/confirm').set('Cookie','realengo_session=test-session').send({resourceKey:'groomer-1'});expect(response.status).toBe(409);expect(response.body.error).toBe('SLOT_ALREADY_BOOKED')})
})
