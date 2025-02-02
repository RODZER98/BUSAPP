
        const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        let myMap = L.map('myMap').setView([10.47504, -66.89622], 13);

        L.tileLayer(tilesProvider, {
            maxZoom: 18, 
        }).addTo(myMap);

        // Lista de puntos con información adicional
        let locations = [
            { coords: [10.47504, -66.89622], name: "Los Ilustres (BusCaracas)", info: "Los Ilustres (BusCaracas) es una parada de autobús en Municipio Libertador, Distrito Federal. Los Ilustres (BusCaracas) se encuentra cerca del edificio público de Procuraduría General de la República, así como del parque temático de Parque Italo Americano." },
            { coords: [10.47826, -66.90065], name: "La Bandera (BusCaracas)", info: "La Bandera es una parada de autobús en Municipio Libertador, Distrito Federal. La Bandera se encuentra cerca de la comisaría de Policia Nacional, así como de la estación de autobús de Terminal Privado de Aerobuses de Venezuela y la estacion del metro La Bandera de la linea 3." },
            { coords: [10.48123, -66.90395], name: "Roosevelt (BusCaracas)", info: "Roosevelt (BusCaracas) es una parada de autobús en Municipio Libertador, Distrito Federal. Roosevelt (BusCaracas) se encuentra cerca de Centro Comercial Profesional 4-G, así como de la estación de autobús de Terminal Privado de Aerobuses de Venezuela." },
            { coords: [10.48306, -66.90604], name: "INCE (BusCaracas)", info: "INCE (BusCaracas) es una parada de autobús en Municipio Libertador, Distrito Federal. INCE (BusCaracas) se encuentra cerca de la oficina gubernamental de Ministerio de las Comunas y los Movimientos Sociales, así como de Iglesia La Milagrosa." },
            { coords: [10.48618, -66.90957], name: "Presidente Medina (BusCaracas)", info: "Presidente Medina (BusCaracas) es una parada de autobús en Municipio Libertador, Distrito Federal. Presidente Medina (BusCaracas) se encuentra cerca de Centro Comercial Victoria Plaza, así como de Cinex." },
            { coords: [10.4907, -66.9113], name: "Roca Tarpeya (BusCaracas)", info: "Roca Tarpeya (BusCaracas) es una parada de autobús en Municipio Libertador, Distrito Federal. Roca Tarpeya (BusCaracas) se encuentra cerca de la prisión de El Helicoide, así como de la comisaría de CICPC San Agustín." },
            { coords: [10.49751, -66.91067], name: "El Cristo (BusCaracas)", info: "El Cristo (BusCaracas) es una parada de autobús en Municipio Libertador, Distrito Federal. El Cristo (BusCaracas) se encuentra cerca de Iglesia San Agustín, así como de la estación de autobús de Terminal Privado de Rutas de América." },
            { coords: [10.50232, -66.90984], name: "La Hoyada (BusCaracas)", info: "La Hoyada (BusCaracas) es una parada de autobús en Municipio Libertador, Distrito Federal. La Hoyada (BusCaracas) se encuentra cerca de Mercado Popular de La Hoyada, así como del parque de Plaza Francisco Narváez." },
            { coords: [10.50857, -66.90855], name: "Socorro (BusCaracas)", info: "Socorro (BusCaracas) es una parada de autobús en Municipio Libertador, Distrito Federal. Socorro (BusCaracas) se encuentra cerca de la oficina de correos de Tealca, así como del club de salud de Gimnasio Sport Center." },
            { coords: [10.51208, -66.90793], name: "Panteón (BusCaracas)", info: "Panteón (BusCaracas) es una parada de autobús en Parroquia San José, Municipio Libertador, Distrito Federal. Panteón (BusCaracas) se encuentra cerca del edificio público de Registro Civil de San José, así como de Iglesia San Jose." },
            { coords: [10.5145, -66.90744], name: "Los Flores (BusCaracas)", info: "Los Flores (BusCaracas) es una parada de autobús en Parroquia San José, Municipio Libertador, Distrito Federal. Los Flores (BusCaracas) se encuentra cerca de Mercado Las Flores, así como de la oficina de correos de Grupo ZOOM." },
        ];

        let markers = [];
        let rutas = [];
        let distanciaTotal = 0;

        function calcularDistancia(coord1, coord2) {
            let R = 6371; 
            let dLat = (coord2[0] - coord1[0]) * (Math.PI / 180);
            let dLon = (coord2[1] - coord1[1]) * (Math.PI / 180);
            let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(coord1[0] * (Math.PI / 180)) * Math.cos(coord2[0] * (Math.PI / 180)) * 
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; 
        }

        function calcularTiempo(distancia, velocidad) {
            let tiempoEnHoras = distancia / velocidad;
            return Math.round(tiempoEnHoras * 60); 
        }

        function actualizarTiempos() {
            let velocidad = parseFloat(document.getElementById("speedSelector").value);
            distanciaTotal = 0;

            for (let i = 0; i < markers.length; i++) {
                let infoPopup = `<b>${locations[i].name}</b><br>${locations[i].info}`;

                if (i > 0) {
                    let distancia = calcularDistancia(locations[i - 1].coords, locations[i].coords);
                    let tiempo = calcularTiempo(distancia, velocidad);
                    distanciaTotal += distancia;
                    infoPopup += `<br><b>Desde ${locations[i - 1].name}:</b> ${distancia.toFixed(2)} km - ${tiempo} min`;
                }

                markers[i].bindPopup(infoPopup);
            }

            document.getElementById("distanciaTotal").innerHTML = `Distancia total: ${distanciaTotal.toFixed(2)} km`;
        }

        for (let i = 0; i < locations.length; i++) {
            let marker = L.marker(locations[i].coords).addTo(myMap);
            markers.push(marker);

            if (i > 0) {
                let line = L.polyline([locations[i - 1].coords, locations[i].coords], { color: 'blue', weight: 3 }).addTo(myMap);
                rutas.push(line);
            }

            marker.on('click', function() {
                myMap.setView(marker.getLatLng(), 15);
            });
        }

        actualizarTiempos();

        document.getElementById("speedSelector").addEventListener("change", actualizarTiempos);
   

