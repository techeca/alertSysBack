import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'

export async function register(req, res){
  try {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    })
    const findUser = await User.findOne({ email:req.body.email }).exec()
    if(isNaN(findUser)){
      throw 'El Email ingresado ya está registrado'
    } else {
      await newUser.save()
      return res.status(200).json(newUser)
    }
  } catch (e) {
    return res.status(500).json({message:e})
  }
}

export async function newUser(req, res){
  try {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        cargo: req.body.cargo,
        estado: req.body.estado,
        rut: req.body.rut
    })
    if(req.body.email === '' || req.body.rut === ''){
      throw 'Campos en blanco'
    }
    const find = await User.find({ rut: req.body.rut }).exec()
    //console.log(isNaN(find));
    //console.log(find);
    if(isNaN(find)){
      throw 'Usuario ya existe'
    } else {
      await newUser.save()
      return res.status(200).json(newUser)
    }
  } catch (e) {
    if(e === 'Usuario ya existe')
    {
      console.log(e);
      return res.status(400).json({message:e})
    } else {
      return res.status(500).json({message:e})
    }
  }
}

export async function login(req, res){
  try {
    const email = String(req.body.email)
    const password = String(req.body.password)
    console.log('try to login')
    console.log(req.body.email);
    console.log(req.body.password);

    const userData = await User.findOne({ email:email, password:password }).exec()
    //const userData = await User.findOne({ 'email': req.body.email }, 'email').exec()

    console.log(userData);
    if(isNaN(userData)){
      console.log('user encontrado');
      console.log(userData._id);
      const token = jwt.sign({sub: userData._id}, process.env.API_KEY, { expiresIn:'7d' })
      return res.status(200).json({name: userData.name, email:userData.email, cargo:userData.cargo, estado:userData.estado, token})
    }else {
      console.log('user no encontrado');
      return res.status(403).json({code:'403', message:'Not Found'})
      //throw `Usuario no encontrado`
    }
  } catch (e) {
    console.log(`error login en API: ${e}`);
  }
}
