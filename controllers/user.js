import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'

export async function register(req, res){
  try {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    })
    const findUser = await UserfindOne({ email:req.body.email }).exec()
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

export async function login(req, res){
  try {
    const email = String(req.body.email)
    const password = String(req.body.password)
    console.log('try to login')
    console.log(req.body.email);
    console.log(req.body.password);

    const userData = await User.findOne({ email:email, password:password }, 'email').exec()
    //const userData = await User.findOne({ 'email': req.body.email }, 'email').exec()

    console.log(userData);
    if(isNaN(userData)){
      console.log('user encontrado');
      console.log(userData._id);
      const token = jwt.sign({sub: userData._id}, process.env.API_KEY, { expiresIn:'7d' })
      return res.status(200).json({email:userData.email, token})
    }else {
      console.log('user no encontrado');
      return res.status(404).json({code:'404', message:'Not Found'})
      //throw `Usuario no encontrado`
    }
  } catch (e) {
    console.log(`error login en API: ${e}`);
  }
}
