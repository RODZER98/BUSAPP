document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulación de autenticación
    if (username === 'admin' && password === '1234') {
        document.getElementById('loginContainer').classList.add('hidden');
        document.getElementById('appContainer').classList.remove('hidden');
        showSection('home'); // Mostrar la sección de inicio al iniciar sesión
    } else {
        document.getElementById('errorMessage').textContent = 'Usuario o contraseña incorrectos';
    }
});

function showSection(section) {
    const sections = document.querySelectorAll('.app-section');
    sections.forEach(sec => sec.classList.add('hidden'));
    
    document.getElementById(section).classList.remove('hidden');
}

function logout() {
    document.getElementById('appContainer').classList.add('hidden');
    document.getElementById('loginContainer').classList.remove('hidden');
}