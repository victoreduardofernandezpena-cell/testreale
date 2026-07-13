import { useEffect, useState } from 'react'
import { CalendarDays, Package, PawPrint, ShieldCheck, ShoppingBag, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { api } from './api'
import { useAuth } from './auth-context'

export default function AdminExperience(){
 const {user,loading}=useAuth(),[data,setData]=useState(null),[error,setError]=useState('')
 const load=async()=>{try{const [overview,appointments]=await Promise.all([api('/api/admin/overview'),api('/api/admin/appointments')]);setData({...overview,appointmentCount:overview.appointments,appointments:appointments.appointments})}catch(e){setError(e.message)}}
 useEffect(()=>{if(user?.role==='ADMIN')load()},[user])
 if(loading)return <section className="account-loading"><p>Verificando permisos…</p></section>
 if(!user)return <AdminGate title="Inicia sesión" text="La administración requiere una cuenta autorizada."/>
 if(user.role!=='ADMIN')return <AdminGate title="Acceso restringido" text="Tu cuenta de cliente no tiene permisos administrativos."/>
 return <><section className="account-hero compact"><div className="shell"><span className="eyebrow">Administración protegida</span><h1>Operación RealEngo.</h1><p>Los cambios de negocio se validan nuevamente en la API según el rol.</p></div></section><section className="section shell admin-area">{error&&<p className="field-error" role="alert">{error}</p>}{data&&<><div className="account-metrics"><AdminMetric icon={<Users/>} value={data.users} label="Clientes"/><AdminMetric icon={<PawPrint/>} value={data.pets} label="Mascotas"/><AdminMetric icon={<CalendarDays/>} value={data.appointmentCount} label="Citas"/><AdminMetric icon={<Package/>} value={data.products} label="Productos"/></div><div className="admin-grid"><section><h2>Solicitudes de cita</h2><div className="appointment-list">{data.appointments.map(item=><article key={item.id}><div className="appointment-date"><b>{new Date(item.requestedAt).getDate()}</b><span>{new Date(item.requestedAt).toLocaleDateString('es-DO',{month:'short'})}</span></div><div><span className="status">{item.status}</span><h3>{item.pet.name}</h3><p>{item.user.name} · {item.services.map(x=>x.service.name).join(' · ')}</p></div>{item.status==='PENDING'&&<button className="btn btn-primary" onClick={async()=>{try{await api(`/api/admin/appointments/${item.id}/confirm`,{method:'POST',body:{resourceKey:'default'}});await load()}catch(e){setError(e.message)}}}>Confirmar</button>}</article>)}</div></section><aside><ShoppingBag/><h2>Catálogo e inventario</h2><p>La API administrativa permite crear productos, actualizar precios, inventario y estado. La edición visual completa permanece para la fase de operación con el catálogo oficial.</p><p className="notice">No se habilitan pagos ni pedidos reales hasta confirmar proveedor, inventario y políticas.</p></aside></div></>}</section></>
}
function AdminGate({title,text}){return <section className="notfound shell"><ShieldCheck/><h1>{title}</h1><p>{text}</p><Link className="btn btn-primary" to="/mi-cuenta">Ir a Mi cuenta</Link></section>}
function AdminMetric({icon,value,label}){return <div className="account-metric"><span>{icon}</span><b>{value}</b><small>{label}</small></div>}
