document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        if (!window.location.pathname.endsWith('/') && !window.location.pathname.endsWith('index.html')) {
            window.location.href = 'index.html';
            return;
        }
    }

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    }
    
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    if (document.getElementById('map-clients-container')) {
        window.initClientMapGlobal = initClientMap;
        loadGoogleMapsScript('initClientMapGlobal');
    }

    if (document.getElementById('clients-table-body')) {
        populateClientsTable();
    }

    if (document.getElementById('heatmap-container')) {
        window.initHeatMapGlobal = initHeatMap;
        loadGoogleMapsScript('initHeatMapGlobal', 'visualization');
    }
});

function initClientMap() {
    console.log("initClientMap llamada");
    const mapElement = document.getElementById('map-clients-container');
    if (!mapElement) {
        console.error("Elemento del mapa 'map-clients-container' no encontrado.");
        return;
    }
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        console.error("Google Maps API no está cargado. No se puede inicializar el mapa de clientes.");
        mapElement.innerHTML = "<p style='color:red;'>Error: Google Maps API no pudo cargarse.</p>";
        return;
    }

    const mapOptions = {
        center: { lat: 11.5, lng: -85.0 },
        zoom: 6,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true
    };
    const map = new google.maps.Map(mapElement, mapOptions);

    const infoWindow = new google.maps.InfoWindow();

    CLIENT_LOCATIONS.forEach(client => {
        const marker = new google.maps.Marker({
            position: { lat: client.lat, lng: client.lng },
            map: map,
            title: client.nombre,
            animation: google.maps.Animation.DROP
        });

        marker.addListener('click', () => {
            infoWindow.setContent(`<strong>${client.nombre}</strong><br>Lat: ${client.lat}<br>Lng: ${client.lng}`);
            infoWindow.open(map, marker);
        });
    });
}

function populateClientsTable() {
    const tableBody = document.getElementById('clients-table-body');
    if (!tableBody) {
        console.error("Elemento 'clients-table-body' no encontrado.");
        return;
    }
    tableBody.innerHTML = '';

    CLIENT_LOCATIONS.forEach(client => {
        const row = tableBody.insertRow();
        row.className = 'hover:bg-gray-100';

        const cellNombre = row.insertCell();
        cellNombre.textContent = client.nombre;
        cellNombre.className = 'px-4 py-2 text-sm text-gray-800';

        const cellLat = row.insertCell();
        cellLat.textContent = client.lat.toFixed(6);
        cellLat.className = 'px-4 py-2 text-sm text-gray-600';

        const cellLng = row.insertCell();
        cellLng.textContent = client.lng.toFixed(6);
        cellLng.className = 'px-4 py-2 text-sm text-gray-600';
    });
}

function initHeatMap() {
    console.log("initHeatMap llamada");
    const mapElement = document.getElementById('heatmap-container');
     if (!mapElement) {
        console.error("Elemento del mapa 'heatmap-container' no encontrado.");
        return;
    }
    if (typeof google === 'undefined' || typeof google.maps === 'undefined' || typeof google.maps.visualization === 'undefined') {
        console.error("Google Maps API o la librería de visualización no está cargada. No se puede inicializar el mapa de calor.");
        mapElement.innerHTML = "<p style='color:red;'>Error: Google Maps API (visualization) no pudo cargarse.</p>";
        return;
    }

    const map = new google.maps.Map(mapElement, {
        zoom: 6,
        center: { lat: 11.5, lng: -85.0 },
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true
    });

    const heatMapData = CLIENT_LOCATIONS.map(client => {
        return new google.maps.LatLng(client.lat, client.lng);
    });

    const heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData,
        map: map
    });

    heatmap.set('radius', 25);
    heatmap.set('opacity', 0.7);
    // heatmap.set('gradient', [ ... ]); // Para colores personalizados
}

        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });