const adminRouter = require('express').Router();
const Admin = require('../models/admin');

// Registrar la información que el usuario envía a través del formulario
adminRouter.get('/admin', async (request, response) => {
  const { name, email, password, password2 } = request.body;

  if (!name || !email || !password || !password2) {
    return response.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    let administrador = new Admin({ name, email, password });
    await administrador.save();
    return response.status(200).json({ msg: 'Se ha creado el nuevo usuario correctamente' });
  } catch (error) {
    return response.status(500).json({ error: 'Error al guardar el administrador' });
  }
});

// Consultar usuario específico
adminRouter.get('/consultar-admin/:id', async (req, res) => {
  try {
    const administrador = await Admin.findById(req.params.id);
    if (!administrador) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.status(200).json(administrador);
  } catch (error) {
    return res.status(500).json({ error: 'Error al consultar el administrador' });
  }
});

// Obtener lista de usuarios
adminRouter.get('/lista-admins', async (req, res) => {
  try {
    const listado = await Admin.find();
    return res.status(200).json({ textOK: true, data: listado });
  } catch (error) {
    return res.status(400).json({ error: 'Ha ocurrido un error' });
  }
});

// Editar usuario
adminRouter.post('/edit-admin', async (req, res) => {
  const { name, email, password, password2, id } = req.body;

  if (!name || !email || !password || !password2 || !id) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const updateAdmin = await Admin.findByIdAndUpdate(id, { name, email, password }, { new: true });
    if (!updateAdmin) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.status(200).json({ msg: 'Se ha editado el usuario de forma correcta' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al editar el administrador' });
  }
});

// Eliminar usuario
adminRouter.post('/eliminar-admin', async (req, res) => {
  const { id } = req.body;

  try {
    const administrador = await Admin.findByIdAndDelete(id);
    if (!administrador) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.status(200).json({ msg: 'Se ha eliminado el usuario de forma correcta' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar el administrador' });
  }
});

// Verificar el registro
adminRouter.get('/validar-confirmacion/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const administrador = await Admin.findOne({ email });
    if (!administrador) {
      return res.status(404).send('Error: El usuario no está registrado');
    } else if (administrador.verified) {
      return res.status(400).send('Error: El usuario ya está verificado');
    } else {
      administrador.verified = true;
      await administrador.save();
      return res.status(200).send('Usuario verificado correctamente');
    }
  } catch (error) {
    return res.status(500).send('Error al verificar el usuario');
  }
});

module.exports = adminRouter;
