export class ApiError extends Error{constructor(message,status,code,details){super(message);this.status=status;this.code=code;this.details=details}}

export async function api(path,{body,...options}={}){
 const response=await fetch(path,{credentials:'include',headers:{...(body!==undefined?{'Content-Type':'application/json'}:{}),...options.headers},...options,body:body===undefined?undefined:JSON.stringify(body)})
 if(response.status===204)return null
 const payload=await response.json().catch(()=>({}))
 if(!response.ok)throw new ApiError(payload.message||'No pudimos completar la solicitud.',response.status,payload.error,payload.details)
 return payload
}

