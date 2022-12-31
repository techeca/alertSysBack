import { Zone } from '../models/zone.js'
import jwt from 'jsonwebtoken'

export async function newZone(req, res){
  try {
    const newZone = new Zone({
        name: req.body.name,
        description: req.body.description
    })
    if(req.body.name === '' || req.body.description === ''){
      throw 'Campos en blanco'
    }
    const findZone = await Zone.findOne({ name:req.body.name }).exec()
    console.log(isNaN(findZone));
    if(isNaN(findZone)){
      throw 'Zona ya registrada'
    } else {
      await newZone.save()
      return res.status(200).json(newZone)
    }
  } catch (e) {
    return res.status(500).json({message:e})
  }
}

export async function login(req, res){
  try {
    const email = String(req.body.email)
    const password = String(req.body.password)
    const userData = await User.findOne({ email:email, password:password }).exec()
    //const userData = await User.findOne({ 'email': req.body.email }, 'email').exec()

    console.log(userData);
    if(isNaN(userData)){
      const token = jwt.sign({sub: userData._id}, process.env.API_KEY, { expiresIn:'7d' })
      return res.status(200).json({name: userData.name, email:userData.email, cargo:userData.cargo, estado:userData.estado, token})
    }else {
      return res.status(404).json({code:'404', message:'Not Found'})
      //throw `Usuario no encontrado`
    }
  } catch (e) {
    console.log(`error login en API: ${e}`);
  }
}
