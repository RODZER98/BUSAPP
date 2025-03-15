//paso 1: hacer el router
//router: registrar POST, GET, DELETE
const userRouter = require('express').Router();
const User = require('../models/user'); 
const transporter = require('../email/enviarcorreo')

//registrar la informacion que el usuario envia atraves del formulario
userRouter.post('/', (request, response) => {
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
    let usuario = new User();

    usuario.name = name;
    usuario.email = email;
    usuario.password = password;
    usuario.rol = 'user';

    async function guardarUsuario() {
        await usuario.save();
        const usuarios = await User.find();
        console.log(usuarios)
    }

    guardarUsuario().catch(console.error);

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      console.log("hola mundo")
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: 'Rodzer Testing rodzertesting@gmail.com', // sender address
        to: "rodzertesting@gmail.com", // list of receivers
        subject: "Test Email", // Subject line
        text: "Este es un correo de prueba.", // plain text body
        html: "<b>Este es un correo de prueba.</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);


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

      console.log(listado)
        
      return res.status(200).json({textOK:true,data:listado})
    
      }catch(error){
        
      return res.status(400).json({error:'Ha ocurrido un error'})
    
      }
})

//editar usuario
userRouter.post('/edit-user',async(req,res)=>{
    
  try {
        
      const {name, email, password, rol, id} = req.body;
        
        if(!name && !email && !password && !rol && !id){
          
            return res.status(400).json({error:"Todos los campos son obligatorios"})

        }else{

            const updateUser = await User.findOneAndUpdate({id:id},{name:name, email:email, password:password, rol:rol})

            await updateUser.save();

            return res.status(200).json({msg:"Se ha editado el usuario de forma correcta"})

        }

        }catch(error){
            
          return res.status(400).json({error:"error"})

        }
})

//eliminar usuario
userRouter.post('/eliminar-user',async(req,res)=>{
  console.log('hola')
  const {id} = req.body;
  //console.log(id);

    try{
        
      const usuario = await User.deleteOne({id:id})
        
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

      //verificar la contraseña
      const  isMatch = await bcrypt.compare(password, usuario.password);

      if (!isMatch) {
        return res.status(400).json({ error: 'Contraseña incorrecta' });
      }

      const newUser = new User({
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        rol: usuario.rol,
      });

      //crear token
      const token = jwt.sign(
      { userId: usuario._id, rol: usuario.rol },
      "secret",{expiresIn: '1h'}
    );

    return res.status(200).json({token:token,rol:usuario.rol})
     

    } catch (error) {
      res.status(400).json({error:'Error'})
    }
})




module.exports = userRouter;
