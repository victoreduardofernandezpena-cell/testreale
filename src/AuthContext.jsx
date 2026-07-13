import { useEffect, useState } from 'react'
import { api } from './api'
import { AuthContext } from './auth-context'

export function AuthProvider({children}){
 const [user,setUser]=useState(null),[loading,setLoading]=useState(true)
 useEffect(()=>{let active=true;api('/api/auth/session').then(data=>active&&setUser(data.user)).catch(()=>{if(active)setUser(null)}).finally(()=>active&&setLoading(false));return()=>{active=false}},[])
 const login=async credentials=>{const data=await api('/api/auth/login',{method:'POST',body:credentials});setUser(data.user);return data.user}
 const register=async values=>{const data=await api('/api/auth/register',{method:'POST',body:values});setUser(data.user);return data.user}
 const logout=async()=>{await api('/api/auth/logout',{method:'POST'});setUser(null)}
 const updateProfile=async values=>{const data=await api('/api/me',{method:'PATCH',body:values});setUser(data.user);return data.user}
 return <AuthContext.Provider value={{user,loading,login,register,logout,updateProfile}}>{children}</AuthContext.Provider>
}
