import express from 'express'
import cors from 'cors';
import { userRouter } from './routes/user.js'
//import { version } from './package.json'

const app = express()
const port = process.env.PORT_API

export function startServer(){
  app.listen(port, () => {
    console.log('Starting APP...')
    //eliminar
    //app.use(cors())
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())

    app.get('/health', (req, res) => {
      res.json({backendStatus:'ok'})
    })

    app.use('/api/user', userRouter)
    console.log('ROUTES: /health - /api/user')
  })

}
