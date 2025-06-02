const API_KEY = "AIzaSyBjyM0CyjiksJbMk4SVzZTz-Uzn5QusoRE"; // Tu API Key de Google

const CLIENT_LOCATIONS = [
    { nombre: "Punto 1", lat: 13.705243, lng: -89.24231, id: "p1" },
    { nombre: "Punto 2", lat: 13.696674, lng: -89.197927, id: "p2" },
    { nombre: "Punto 3", lat: 14.692511, lng: -87.86136, id: "p3" },
    { nombre: "Punto 4", lat: 12.022747, lng: -86.252007, id: "p4" },
    { nombre: "Punto 5", lat: 8.103289,  lng: -80.596013, id: "p5" }
];


function loadGoogleMapsScript(callbackFunctionName, libraries) {
    if (document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)) {
        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
            if (window[callbackFunctionName] && typeof window[callbackFunctionName] === 'function') {
                console.log("Google Maps API ya cargado. Ejecutando callback:", callbackFunctionName);
                window[callbackFunctionName]();
            }
        } else {
            console.log("Google Maps API está cargándose. Esperando...");
        }
        return;
    }

    console.log("Cargando Google Maps API para callback:", callbackFunctionName);
    const script = document.createElement('script');
    let scriptSrc = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${callbackFunctionName}`;
    if (libraries) {
        scriptSrc += `&libraries=${libraries}`;
    }
    script.src = scriptSrc;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
        console.error("Google Maps script failed to load.");
        const mapElement = document.getElementById('map-clients-container') || document.getElementById('heatmap-container') || document.getElementById('map'); // ID genérico por si acaso
        if(mapElement) {
            mapElement.innerHTML = `<p style="color:red; text-align:center; padding-top: 20px;">Error al cargar Google Maps. Verifica la clave API y tu conexión a internet. La API Key proporcionada podría estar restringida o ser inválida.</p>`;
        }
    };
    document.head.appendChild(script);
}