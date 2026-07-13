import app from './app.js'
import { env } from './config.js'

app.listen(env.PORT,()=>console.log(`RealEngo API listening on http://127.0.0.1:${env.PORT}`))

