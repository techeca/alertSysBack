import express from 'express'
import { register, login } from '../controllers/user.js'
import { apiHandler } from '../jwt/index.js'
import cors from 'cors'

export const userRouter = express.Router()

const optionsCORS = {
  origin: `http://localhost:8080`,
  /*Accept: 'Content-Type',*/
  methods: ['POST','GET'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  optionsSuccessStatus: 200
}

//userRouter.options('/register', cors(optionsCORS))
userRouter.options('/login', cors(optionsCORS))
userRouter.options('/health', cors(optionsCORS))

//userRouter.post('/register', cors(optionsCORS), apiHandler(register));   //ex: apiHandler(register) best ex: userRouter.post('/register', apiHandler(register))
userRouter.post('/login', cors(optionsCORS), apiHandler(login));

userRouter.get('/health', cors(optionsCORS), (req, res) => {
  res.json({backendStatus:'users ok'})
})
