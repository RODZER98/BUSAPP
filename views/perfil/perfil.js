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
    axios.get(`http://localhost:5000/api/usuario/${userId}`)
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
        // Activar la cámara y detectar el QR
        const video = document.createElement('video');
        const canvasElement = document.createElement('canvas');
        const canvas = canvasElement.getContext('2d');
        const qrResult = document.getElementById('qr-result');
        let scanning = false;

        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function(stream) {
            scanning = true;
            video.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
            video.srcObject = stream;
            video.play();
            tick();
            scan();
        });

        function tick() {
            canvasElement.height = video.videoHeight;
            canvasElement.width = video.videoWidth;
            canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

            scanning && requestAnimationFrame(tick);
        }

        function scan() {
            try {
                const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: 'dontInvert',
                });

                if (code) {
                    scanning = false;
                    video.srcObject.getTracks().forEach(track => track.stop());
                    qrResult.textContent = code.data;
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
                } else {
                    scanning && setTimeout(scan, 300);
                }
            } catch (e) {
                scanning && setTimeout(scan, 300);
            }
        }
    } else {
        alert('No tienes viajes disponibles.');
    }
}