/*document.addEventListener('DOMContentLoaded', function() {
    const formEditarPerfil = document.getElementById('form-editar-perfil');
    const datosUsuarioDiv = document.getElementById('datosUsuario');

    formEditarPerfil.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;

        // Actualiza el contenido del div con los nuevos valores
        datosUsuarioDiv.innerHTML = `
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
        `;

        // Oculta el modal después de guardar los cambios
        document.getElementById('modal-editar-perfil').classList.add('hidden');
    });
});*/

document.addEventListener('DOMContentLoaded', function() {
    const nombreUsuarioSpan = document.getElementById('nombre-usuario');
    const emailUsuarioSpan = document.getElementById('email-usuario');

    // Función para actualizar los datos del usuario
    function actualizarDatosUsuario(name, email) {
        nombreUsuarioSpan.textContent = name;
        emailUsuarioSpan.textContent = email;
    }

    // Obtén el ID del usuario logueado (esto puede variar según tu implementación)
    const userId = '_id';

    // Solicita los datos del usuario al servidor
    axios.get(`http://localhost:5000/api/usuario/${userId}`)
        .then(response => {
            const usuario = response.data;
            actualizarDatosUsuario(usuario.name, usuario.email);
        })
        .catch(error => {
            console.error('Error al obtener los datos del usuario:', error);
        });
});
        


function activarQR() {
            // Lógica para activar el QR y descontar un viaje del plan
            const viajesDisponibles = document.getElementById('viajes-disponibles');
            let viajes = parseInt(viajesDisponibles.textContent);
            if (viajes > 0) {
                viajes--;
                viajesDisponibles.textContent = viajes;
                alert('QR activado. Viaje descontado.');
            } else {
                alert('No tienes viajes disponibles.');
            }
        }