// Control de los modales
document.getElementById('btnUsuarios').addEventListener('click', function() {
    document.getElementById('modalUsuarios').classList.remove('hidden');
    fetchUserData();  // Obtener datos al abrir el modal
});

document.getElementById('closeModalUsuarios').addEventListener('click', function() {
    document.getElementById('modalUsuarios').classList.add('hidden');
});

document.getElementById('btnInformes').addEventListener('click', function() {
    document.getElementById('modalInformes').classList.remove('hidden');
});

document.getElementById('closeModalInformes').addEventListener('click', function() {
    document.getElementById('modalInformes').classList.add('hidden');
});

document.getElementById('btnConfiguracion').addEventListener('click', function() {
    document.getElementById('modalConfiguracion').classList.remove('hidden');
});

document.getElementById('closeModalConfiguracion').addEventListener('click', function() {
    document.getElementById('modalConfiguracion').classList.add('hidden');
});

// Función para obtener datos de usuarios desde MongoDB
async function fetchUserData() {
    try {
        const response = await fetch('/api/users');
        if (response.ok) {
            const users = await response.json();
            displayUsers(users);
        } else {
            showError('Error al obtener los datos de los usuarios');
        }
    } catch (error) {
        showError('Error al obtener los datos de los usuarios');
        console.error('Error:', error);
    }
}

// Mostrar los usuarios en el modal
function displayUsers(users) {
    const userTable = document.getElementById('userTableBody');
    userTable.innerHTML = ''; // Limpiar datos existentes

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button class="edit-role" data-id="${user._id}">Editar Rol</button>
            </td>
        `;
        userTable.appendChild(row);
    });

    // Agregar event listeners a los botones de editar
    document.querySelectorAll('.edit-role').forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            editUserRole(userId);
        });
    });
}

// Manejo de la edición de rol
function editUserRole(userId) {
    const newRole = prompt('Ingrese el nuevo rol (admin, usuario, moderador):');

    if (newRole) {
        // Validación del rol
        const validRoles = ['admin', 'usuario', 'moderador'];
        if (validRoles.includes(newRole.toLowerCase())) {
            updateUserRole(userId, newRole);
        } else {
            alert('Rol inválido. Los roles permitidos son: admin, usuario, moderador.');
        }
    } else {
        alert('No se ha ingresado ningún rol.');
    }
}

// Actualizar el rol del usuario en MongoDB
async function updateUserRole(userId, newRole) {
    try {
        const response = await fetch(`/api/users/${userId}/role`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: newRole })
        });

        if (response.ok) {
            showSuccess('Rol actualizado con éxito');
            fetchUserData(); // Refrescar los datos de los usuarios después de la actualización
        } else {
            showError('Error al actualizar el rol del usuario');
        }
    } catch (error) {
        showError('Error al actualizar el rol del usuario');
        console.error('Error:', error);
    }
}

// Función para mostrar mensajes de error
function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'bg-red-500 text-white p-2 rounded';
    errorElement.textContent = message;
    document.body.appendChild(errorElement);
    setTimeout(() => errorElement.remove(), 3000);
}

// Función para mostrar mensajes de éxito
function showSuccess(message) {
    const successElement = document.createElement('div');
    successElement.className = 'bg-green-500 text-white p-2 rounded';
    successElement.textContent = message;
    document.body.appendChild(successElement);
    setTimeout(() => successElement.remove(), 3000);
}
