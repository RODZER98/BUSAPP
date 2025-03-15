//paso 1: conectar a mongo db y crear la dependencia.
const mongoose = require('mongoose');
const adminsRouter = require('../controllers/admins');
//paso 2: definir el schema
const adminSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    verified:{
        type:Boolean,
        default:false
    }
})
//paso 3: configurar la respuesta del usuario en el schema
adminSchema.set('toJSON',{
    //document es el schema
    //returnObject es lo que estoy solicitando
    transform: (document,returnObject)=>{
        //estamos creando una nueva propiedad que se llama id 
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
    }
        
})

//paso 4: dar un nombre, registar el modelo de datros
const Admin = mongoose.model('Admin',adminSchema);

//se exporta
module.exports = Admin;