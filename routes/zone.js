import express from 'express'
import { newZone } from '../controllers/zone.js'
import { apiHandler } from '../jwt/index.js'
import cors from 'cors'

export const zoneRouter = express.Router()

const optionsCORS = {
  origin: `http://localhost:8080`,
  /*Accept: 'Content-Type',*/
  methods: ['POST','GET'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'],
  optionsSuccessStatus: 200
}

//zonesRouter.options('/register', cors(optionsCORS))
zoneRouter.options('/newzone', cors(optionsCORS))
//zoneRouter.options('/zones', cors(optionsCORS))

//zonesRouter.post('/register', cors(optionsCORS), apiHandler(register));   //ex: apiHandler(register) best ex: zonesRouter.post('/register', apiHandler(register))
zoneRouter.post('/newzone', cors(optionsCORS), apiHandler(newZone));

/*zonesRouter.get('/health', cors(optionsCORS), (req, res) => {
  res.json({backendStatus:'users ok'})
})*/
