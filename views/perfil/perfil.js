document.addEventListener('DOMContentLoaded', function() {
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
});

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
    axios.get(`http://localhost:5000/api/user/`,id)
        .then(response => {
            const usuario = response.data;
            actualizarDatosUsuario(usuario.name, usuario.email);
        })
        .catch(error => {
            console.error('Error al obtener los datos del usuario:', error);
        });
});
        


document.addEventListener('DOMContentLoaded', function() {
    const activarQRBtn = document.getElementById('activar-qr-btn');
    activarQRBtn.addEventListener('click', activarQR);
});

function activarQR() {
    // Lógica para activar el QR y descontar un viaje del plan
    const viajesDisponibles = document.getElementById('viajes-disponibles');
    let viajes = parseInt(viajesDisponibles.textContent);
    if (viajes > 0) {
        // Activar el escáner de QR
        const html5QrCode = new Html5Qrcode("reader");

        html5QrCode.start(
            { facingMode: "environment" }, // Utiliza la cámara trasera
            {
                fps: 10, // Frames por segundo para el escaneo
                qrbox: { width: 250, height: 250 } // Tamaño del cuadro de escaneo
            },
            qrCodeMessage => {
                // Código QR detectado
                html5QrCode.stop().then(() => {
                    document.getElementById('qr-result').textContent = qrCodeMessage;
                    viajes--;
                    viajesDisponibles.textContent = viajes;
                    alert('QR activado. Viaje descontado.');

                    // Lógica para actualizar la base de datos con el viaje descontado
                    axios.post('/api/actualizar-viajes', {
                        viajesRestantes: viajes
                    })
                    .then(response => {
                        console.log('Viaje descontado en la base de datos:', response.data);
                    })
                    .catch(error => {
                        console.error('Error al descontar el viaje en la base de datos:', error);
                    });
                }).catch(err => {
                    console.error('Error al detener el escáner de QR:', err);
                });
            },
            errorMessage => {
                // Error o QR no detectado
                console.warn('No se detectó ningún QR:', errorMessage);
            }
        ).catch(err => {
            console.error('Error al iniciar el escáner de QR:', err);
        });
    } else {
        alert('No tienes viajes disponibles.');
    }
}