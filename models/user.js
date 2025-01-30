//paso 1: conectar a mongo db y crear la dependencia.
const mongoose = require('mongoose');
const usersRouter = require('../controllers/users');
//paso 2: definir el schema
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    verified:{
        type:Boolean,
        default:false
    }
})
//paso 3: configurar la respuesta del usuario en el schema
userSchema.set('toJSON',{
    //document es el schema
    //returnObject es lo que estoy solicitando
    transform: (document,returnObject)=>{
        //estamos creando una nueva propiedad que se llama id 
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
        delete returnObject.password;
    }
        
})

//paso 4: dar un nombre, registar el modelo de datros
const User = mongoose.model('User',userSchema);

//se exporta
module.exports = User;