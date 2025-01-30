//paso 1: hacer el router
//router: registrar POST, GET, DELETE
const userRouter = require('express').Router();
const User = require('../models/user'); 

//registrar la informacion que el usuario envia atraves del formulario
userRouter.post('/', (request, response) => {
  const { name, email, password, password2 } = request.body;
  console.log(name, email, password, password2);

  if (!name || !email || !password || !password2) {
    //console.log('si')
    return response
      .status(400)
      .json({ error: 'Todos los campos son requeridos' });
  } else {

    //guardar en la bd
    let usuario = new User();

    usuario.nombre = name;
    usuario.correo = email;
    usuario.password = password;

    async function guardarUsuario() {
        await usuario.save();
        const usuarios = await User.find();
        console.log(usuarios)
    }

    guardarUsuario().catch(console.error);


    return response
      .status(200)
      .json({ msg: 'Se ha creado el nuevo usuario correctamente' });
  }
});

//consultar usuario
userRouter.get('/consultar-user',async(req,res)=>{



})

//obtener lista de usuarios
userRouter.get('/lista-users',async(req,res)=>{
    
  try{
        
      const listado = await User.find()
        
      return res.status(200).json({textOK:true,data:listado})
    
      }catch(error){
        
      return res.status(400).json({error:'Ha ocurrido un error'})
    
      }
})

//editar usuario
userRouter.post('/edit-user',async(req,res)=>{
    
  try {
        
      const {name, email, password, password2, id} = req.body;
        
        if(!name && !email && !password && !password2 && !id){
          
            return res.status(400).json({error:"Todos los campos son obligatorios"})

        }else{

            const updateUser = await User.findOneAndUpdate({_id:id},{name:name, email:email, password:password})

            await updateUser.save();

            return res.status(200).json({msg:"Se ha editado el usuario de forma correcta"})

        }

        }catch(error){
            
          return res.status(400).json({error:"error"})

        }
})

//eliminar usuario
userRouter.post('/eliminar-user',async(req,res)=>{
    
  const {id} = req.body;

    try{
        
      const usuario = await User.deleteOne({_id:id})
        
      return res.status(200).json({msg:"Se ha eliminado el usuario de forma correcta"})
    
    }catch(error){
        
      return res.status(400).json({error:'Error'})
    
    }
})

//verificar el registro
userRouter.get('/validar-confirmacion/:email',async (req,res)=>{

    try {
      
      //obtener los parametros de request
      const {email} = res.param;

      console.log(email)

      //verificar si el usuario existe
      const usuario = await User.findOne({email:email})

      if(!usuario){

        res.send('Error: El usuario no esta registrado')

      }else if(usuario.verified){

        res.send('Error: El usuario ya esta verificado')

      }else{

        //actualizar verificacion
        const actualizarUsuario = await User.findByIdAndUpdate({email:email},{verified:true})

        await actualizarUsuario.save();

        //redireccionar
        //return res.redirect()
        //FALTA CREAR FRONT DE CONFIRMAR

      }

    } catch (error) {
      console.log(error);
    }
})

module.exports = userRouter;
