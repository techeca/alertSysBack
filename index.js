import { startServer } from './server.js'
import mongoose from 'mongoose'

//const uri = `mongodb+srv://${userMongo}:${passMongo}@${hostDBMongo}/${nameDB}?retryWrites=true&w=mayority`
//const uri2 = ({str}) => {return `mongodb+srv://${userMongo}:${passMongo}@${str}/${nameDB}?retryWrites=true&w=mayority`}
function uri3(){
  const userMongo = process.env.USER_DB
  const passMongo = process.env.PASSWORD_DB
  const hostDBMongo = process.env.HOST_DB
  const nameDB = process.env.NAME_DB
  const hostDBMongoLocal = process.env.HOST_DB_LOCAL
  //const host = userMongo && passMongo ? hostDBMongo : hostDBMongoLocal
  console.log(userMongo ? true : false)
  const uri = userMongo && passMongo ? `mongodb+srv://${userMongo}:${passMongo}@${hostDBMongo}/${nameDB}?retryWrites=true&w=majority`
  : `mongodb://${String(hostDBMongoLocal)}/${nameDB}?retryWrites=true&w=majority`
  console.log(uri)
  return uri
}
//console.log(userMongo && passMongo ? hostDBMongo : hostDBMongoLocal);

await mongoose.connect(uri3()).then(() => {
  console.log('Conexión con Base de datos')
  /*if(userMongo){
    console.log(`Conectado a Base de datos remota ${hostDBMongo}`);
  }else {
    console.log(`Conectado a Base de datos local ${hostDBMongoLocal}`);
  }*/
  startServer()
}).catch((err) => {
  console.log(`Error con la conexión a la base de datos ${err}`);
})
