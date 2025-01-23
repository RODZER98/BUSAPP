//1. hacer el rauter
//rauter: es el que me permite hacer el CRUD, POST, GET, DELETE, UPDATE --- http
const userRouter = require('express').Router()
const User = require('../models/usuarios')

//registrar la informacion que el usuario envia antravez de el formulario


//para llegar aca, me deben llamar desde el front
userRouter.post('/', (request, response)=>{
    const {nombre} = request.body

    //este console va a aparecer en la termanla de visual studio
    console.log(nombre)
    //console.log(request.body)

    if(!nombre){
        return response.status(400).json({error:'Todos los campos son obligatorios'})
    }else{
        //guardar en la bd
        let usuario = new User();
        usuario.nombre = nombre


        async function guardarUsuario(){
            await usuario.save()

            const listUsuarios = await User.find()
            console.log(listUsuarios)
        }

        guardarUsuario().catch(console.error)

        return response.status(200).json({msg:'Se ha creado el nuevo usuario'})
    }
})

//consultar
userRouter.get('/consultar-user',async(req,res)=>{

})

//obtener lista de usuarios
userRouter.get('/lista-users',async(req,res)=>{
    try{
        const listado = await User.find()
        return res.status(200).json({textOk:true,data:listado})

    }catch(error){
        return res.status(400).json({error:'Ha ocurrido un error'})
    }
})

module.exports = userRouter

//dentro de los controladores van todas las funciones de CRUD