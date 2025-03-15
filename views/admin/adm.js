/*document.addEventListener('DOMContentLoaded', function() {
    mostrarUsuarios(); // Llamar a mostrarUsuarios para mostrar la lista de usuarios al cargar la página
  });
  
  async function mostrarUsuarios() {
    const tablaUsuarios = document.getElementById('cuerpoTabla');
    const response = await axios.get('/api/users/lista-users');
    const usuarios = response.data;
    console.log(usuarios);
  
    usuarios.forEach(usuario => {
      const { name, email, password, rol, _id } = usuario;
      const fila = document.createElement('tr');
      fila.innerHTML += `
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <p class="font-bold text-sm leading-5 font-medium text-gray-700 text-lg ">${name}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <p class="font-bold text-sm leading-5 font-medium text-gray-700 text-lg ">${email}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <p class="font-bold text-sm leading-5 font-medium text-gray-700 text-lg ">${rol}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <p class="font-bold text-sm leading-5 font-medium text-gray-700 text-lg ">${_id}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <p class="font-bold text-sm leading-5 font-medium text-gray-700 text-lg ">${password}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
          <button class="text-teal-600 hover:text-teal-900 mr-5 editar-usuario" data-id="${_id}">Editar</button>
        </td>
      `;
      tablaUsuarios.appendChild(fila);
    });
  
    // Agregar listeners a los botones de editar
    document.querySelectorAll('.editar-usuario').forEach(boton => {
      boton.addEventListener('click', function() {
        const userId = this.getAttribute('data-id');
        editarUsuario(userId);
      });
    });
  }
  
  // Manejo de la edición de usuario
  async function editarUsuario(userId) {
    const response = await axios.get(`/api/users/${userId}`);
    const usuario = response.data;
  
    document.getElementById('nombre').value = usuario.name;
    document.getElementById('email').value = usuario.email;
    document.getElementById('password').value = usuario.password;
    document.getElementById('rol').value = usuario.rol;
    document.getElementById('id').value = usuario._id;
  
    document.getElementById('formularioEdicion').classList.remove('hidden');
  }
  
  // Actualizar los datos del usuario en MongoDB
  async function actualizarUsuario(event) {
    event.preventDefault();
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rol = document.getElementById('rol').value;
  
    try {
      const response = await axios.put(`/api/users/${id}`, {
        name: nombre,
        email: email,
        password: password,
        rol: rol
      });
      console.log(response.data);
      mostrarMensajeExito('Usuario actualizado con éxito');
      document.getElementById('formularioEdicion').classList.add('hidden');
      // Refrescar la tabla de usuarios
      document.getElementById('cuerpoTabla').innerHTML = '';
      mostrarUsuarios();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      mostrarMensajeError('Error al actualizar usuario');
    }
  }
  
  // Mostrar mensajes de éxito
  function mostrarMensajeExito(mensaje) {
    const elementoExito = document.createElement('div');
    elementoExito.className = 'bg-green-500 text-white p-2 rounded';
    elementoExito.textContent = mensaje;
    document.body.appendChild(elementoExito);
    setTimeout(() => elementoExito.remove(), 3000);
  }
  
  // Mostrar mensajes de error
  function mostrarMensajeError(mensaje) {
    const elementoError = document.createElement('div');
    elementoError.className = 'bg-red-500 text-white p-2 rounded';
    elementoError.textContent = mensaje;
    document.body.appendChild(elementoError);
    setTimeout(() => elementoError.remove(), 3000);
  }
  
  // Cancelar edición
  document.getElementById('btnCancelar').addEventListener('click', function() {
    document.getElementById('formularioEdicion').classList.add('hidden');
  });
  
  // Escuchar el envío del formulario de edición
  document.getElementById('formEditar').addEventListener('submit', actualizarUsuario);
  
  // Redirigir a la página de login
  document.getElementById('btnSalir').addEventListener('click', function() {
    window.location.href = '/login';
  });*/

  async function mostrarUsuarios() {
    const tablaUsuarios = document.getElementById('cuerpoTabla');
    tablaUsuarios.innerHTML = '';

    try {
        const response = await axios.get('/api/users/lista-users');
        const usuarios = response.data;

        if (usuarios.textOK) {
            usuarios.data.forEach(user => {
              //console.log(user)
                const row = `
                <tr>
                    <td class="px-6 py-4 border-b border-gray-200">
                        <p class="font-bold text-gray-700 text-lg">${user.name}</p>
                    </td>
                    <td class="px-6 py-4 border-b border-gray-200">
                        <p class="font-bold text-gray-700 text-lg">${user.email}</p>
                    </td>
                    <td class="px-6 py-4 border-b border-gray-200">
                        <p class="font-bold text-gray-700 text-lg">${user.rol}</p>
                    </td>
                    <td class="px-6 py-4 border-b border-gray-200">
                        <p class="font-bold text-gray-700 text-lg">${user.password}</p> 
                    </td>
                    <td class="px-6 py-4 border-b border-gray-200 text-sm">
                        <button class="text-teal-600 hover:text-teal-900 mr-5 editar-usuario" data-id="${user.id}">Editar</button>
                        <button class="text-red-600 hover:text-red-900 eliminar-usuario" data-id="${user.id}">Eliminar</button>
                    </td>
                </tr>`;
                tablaUsuarios.innerHTML += row;
            });
        } else {
            alert('Error al cargar los usuarios');
        }
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        alert('Error al cargar los usuarios');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    mostrarUsuarios();

    document.getElementById('formEditar').addEventListener('submit', actualizarUsuario);

    document.getElementById('btnCancelar').addEventListener('click', function() {
        document.getElementById('formularioEdicion').classList.add('hidden'); 
    });

    document.getElementById('btnSalir').addEventListener('click', function() {
        window.location.href = '/login';
    });

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('editar-usuario')) {
            const userId = event.target.getAttribute('data-id');
            console.log(userId)
            actualizarUsuario(userId);
        } else if (event.target.classList.contains('eliminar-usuario')) {
            const userId = event.target.getAttribute('data-id');
            console.log(userId)
            eliminarUsuario(userId);
        }
    });

});

/*// Manejo de la edicion de usuario
async function editarUsuarioModal(_id) {
  try {
    const response = await axios.get(`/api/users/${_id}`);
    const usuario = response.data;

    document.getElementById('nombre').value = usuario.name;
    document.getElementById('email').value = usuario.email;
    document.getElementById('password').value = usuario.password;
    document.getElementById('rol').value = usuario.rol;
    document.getElementById('id').value = usuario._id;

    document.getElementById('formularioEdicion').classList.remove('hidden');
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    alert('Error al obtener los datos del usuario');
  }
}*/

// Eliminar usuario
async function eliminarUsuario(userId) {
  console.log(userId)
  try {
    await axios.post(`/api/users/eliminar-user/`,userId);
    mostrarMensajeExito('Usuario eliminado con éxito');
    mostrarUsuarios();
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    mostrarMensajeError('Error al eliminar usuario');
  }
}

// Actualizar los datos del usuario en MongoDB
async function actualizarUsuario() {
  
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rol = document.getElementById('rol').value;

    const userId = {id, nombre, email, password, rol}
    //console.log(userId)

    try {
        const response = await axios.post(`/api/users/edit-user/`,userId);
        console.log(response.data);
        mostrarMensajeExito('Usuario actualizado con éxito');
        document.getElementById('formularioEdicion').classList.add('hidden');
        // Refrescar la tabla de usuarios
        document.getElementById('cuerpoTabla').innerHTML = '';
        mostrarUsuarios();
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        mostrarMensajeError('Error al actualizar usuario');
    }
}

// Manejo de la edición de usuario con modal
async function editarUsuario(userId) {
  try {
    const response = await axios.get(`/api/users/edit-user/`,userId);
    const usuario = response.data;

    document.getElementById('nombre').value = usuario.name;
    document.getElementById('email').value = usuario.email;
    document.getElementById('password').value = usuario.password;
    document.getElementById('rol').value = usuario.rol;
    document.getElementById('id').value = usuario._id;

    document.getElementById('formularioEdicion').classList.remove('hidden');
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    mostrarMensajeError('Error al obtener los datos del usuario');
  }
}

// Mostrar mensajes de éxito
function mostrarMensajeExito(mensaje) {
    const elementoExito = document.createElement('div');
    elementoExito.className = 'bg-green-500 text-white p-2 rounded';
    elementoExito.textContent = mensaje;
    document.body.appendChild(elementoExito);
    setTimeout(() => elementoExito.remove(), 3000);
}

// Mostrar mensajes de error
function mostrarMensajeError(mensaje) {
    const elementoError = document.createElement('div');
    elementoError.className = 'bg-red-500 text-white p-2 rounded';
    elementoError.textContent = mensaje;
    document.body.appendChild(elementoError);
    setTimeout(() => elementoError.remove(), 3000);
}
