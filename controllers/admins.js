//paso 1: hacer el router
//router: registrar POST, GET, DELETE
const adminRouter = require('express').Router();
const Admin = require('../models/admin'); 

//registrar la informacion que el usuario envia atraves del formulario
adminRouter.post('/', (request, response) => {
  console.log(request.body);
  const { name, email, password, password2 } = request.body;
  console.log(name, email, password, password2);

  if (!name || !email || !password || !password2) {
    //console.log('si')
    return response
      .status(400)
      .json({ error: 'Todos los campos son requeridos' });
  } else {

    //guardar en la bd
    let administrador = new Admin();

    administrador.name = name;
    administrador.email = email;
    administrador.password = password;

    async function guardarAdministrador() {
        await administrador.save();
        const administradores = await Admin.find();
        console.log(administradores)
    }

    guardarAdministrador().catch(console.error);


    return response
      .status(200)
      .json({ msg: 'Se ha creado el nuevo usuario correctamente' });
  }
});

//consultar usuario
adminRouter.get('/consultar-admin',async(req,res)=>{



})

//obtener lista de usuarios
adminRouter.get('/lista-admins',async(req,res)=>{
    
  try{
        
      const listado = await Admin.find()
        
      return res.status(200).json({textOK:true,data:listado})
    
      }catch(error){
        
      return res.status(400).json({error:'Ha ocurrido un error'})
    
      }
})

//editar usuario
adminRouter.post('/edit-admin',async(req,res)=>{
    
  try {
        
      const {name, email, password, password2, id} = req.body;
        
        if(!name && !email && !password && !password2 && !id){
          
            return res.status(400).json({error:"Todos los campos son obligatorios"})

        }else{

            const updateAdmin = await Admin.findOneAndUpdate({_id:id},{name:name, email:email, password:password})

            await updateAdmin.save();

            return res.status(200).json({msg:"Se ha editado el usuario de forma correcta"})

        }

        }catch(error){
            
          return res.status(400).json({error:"error"})

        }
})

//eliminar usuario
adminRouter.post('/eliminar-admin',async(req,res)=>{
    
  const {id} = req.body;

    try{
        
      const administrador = await Admin.deleteOne({_id:id})
        
      return res.status(200).json({msg:"Se ha eliminado el usuario de forma correcta"})
    
    }catch(error){
        
      return res.status(400).json({error:'Error'})
    
    }
})

//verificar el registro
adminRouter.get('/validar-confirmacion/:email',async (req,res)=>{

    try {
      
      //obtener los parametros de request
      const {email} = res.param;

      console.log(email)

      //verificar si el usuario existe
      const administrador = await Admin.findOne({email:email})

      if(!administrador){

        res.send('Error: El usuario no esta registrado')

      }else if(administrador.verified){

        res.send('Error: El usuario ya esta verificado')

      }else{

        //actualizar verificacion
        const actualizarAdministrador = await Admin.findByIdAndUpdate({email:email},{verified:true})

        await actualizarAdministrador.save();

        //redireccionar
        //return res.redirect()
        //FALTA CREAR FRONT DE CONFIRMAR

      }

    } catch (error) {
      console.log(error);
    }
})

module.exports = adminRouter;
