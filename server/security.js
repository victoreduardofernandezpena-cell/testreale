import { createHash, randomBytes } from 'node:crypto'
import bcrypt from 'bcryptjs'
import { env, isProduction } from './config.js'

export const SESSION_COOKIE='realengo_session'
export const hashToken=value=>createHash('sha256').update(value).digest('hex')
export const newToken=()=>randomBytes(32).toString('base64url')
export const hashPassword=value=>bcrypt.hash(value,12)
export const verifyPassword=(value,hash)=>bcrypt.compare(value,hash)
export const publicUser=user=>({id:user.id,email:user.email,name:user.name,phone:user.phone,whatsapp:user.whatsapp,preferredContact:user.preferredContact,role:user.role})

export async function createSession(db,userId,res){
 const token=newToken(),expiresAt=new Date(Date.now()+env.SESSION_DAYS*86400000)
 await db.session.create({data:{userId,tokenHash:hashToken(token),expiresAt}})
 res.cookie(SESSION_COOKIE,token,{httpOnly:true,secure:isProduction,sameSite:'lax',path:'/',maxAge:env.SESSION_DAYS*86400000})
}

export function clearSessionCookie(res){res.clearCookie(SESSION_COOKIE,{httpOnly:true,secure:isProduction,sameSite:'lax',path:'/'})}

export const requireAuth=db=>async(req,res,next)=>{
 const raw=req.cookies?.[SESSION_COOKIE]
 if(!raw)return res.status(401).json({error:'AUTH_REQUIRED',message:'Inicia sesión para continuar.'})
 const session=await db.session.findUnique({where:{tokenHash:hashToken(raw)},include:{user:true}})
 if(!session||session.expiresAt<=new Date()){
  if(session)await db.session.delete({where:{id:session.id}}).catch(()=>{})
  clearSessionCookie(res)
  return res.status(401).json({error:'SESSION_EXPIRED',message:'Tu sesión expiró. Inicia sesión nuevamente.'})
 }
 req.auth={sessionId:session.id,user:session.user}
 next()
}

export const requireRole=role=>(req,res,next)=>req.auth?.user?.role===role?next():res.status(403).json({error:'FORBIDDEN',message:'No tienes permiso para acceder a esta sección.'})

export function verifyOrigin(req,res,next){
 if(['GET','HEAD','OPTIONS'].includes(req.method))return next()
 const origin=req.get('origin')
 if(origin&&origin!==env.APP_ORIGIN)return res.status(403).json({error:'INVALID_ORIGIN',message:'Solicitud rechazada.'})
 next()
}

