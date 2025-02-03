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