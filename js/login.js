// js/login.js
document.addEventListener('DOMContentLoaded', function() {
    // Redirigir si ya está logueado
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'mapa_clientes.html';
        return;
    }

    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita el envío real del formulario

            const usuarioInput = document.getElementById('usuario').value;
            const contrasenaInput = document.getElementById('contrasena').value;

            // Credenciales hardcodeadas
            const USER = 'prueba';
            const PASS = '12345';

            if (usuarioInput === USER && contrasenaInput === PASS) {
                localStorage.setItem('isLoggedIn', 'true'); // Marcar como logueado
                window.location.href = 'mapa_clientes.html'; // Redirigir a la página principal
            } else {
                errorMessage.textContent = 'Usuario o contraseña incorrectos.';
            }
        });
    }
});