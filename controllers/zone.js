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
      throw 'Zona ya registrada???'
    } else {
      await newZone.save()
      return res.status(200).json(newZone)
    }
  } catch (e) {
    return res.status(500).json({message:e})
  }
}

export async function allZones(req, res){
  try {
    const findAll = await Zone.find().exec()
    console.log(findAll.length);
    if(!findAll.length > 0){
      throw 'No hay zonas'
    }else {
      return res.status(200).json(findAll)
    }
  } catch (e) {
    return res.status(500).json({message:e})
  }
}
