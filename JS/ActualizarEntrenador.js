async function ActualizarEntrenador() {
    const form = document.getElementById('ActualizarEntrenador-form');

    if (form.checkValidity()) {
        const formData = new FormData(form);

        try {
            const response = await fetch('https://localhost:7007/api/Administrador/ActualizarEntrenador', { 
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.text(); 
                localStorage.removeItem('entrenadorDatos');
            window.location.href='MostrarEntrenadores.html';
             
            } else {
                const error = await response.text();
                showMessage(`Error: ${error}`, 'error');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            showMessage(`Error: ${error.message || 'Desconocido'}`, 'error');
        }
    } else {
        showMessage('Por favor, escribe todos los campos.');
    }
}
function showMessage(message, type) {
    const messageModal = document.getElementById('messageModal');
   
    
    messageText.textContent = message;
    if (type === 'success') {
        successBtn.style.display = 'block';
        errorBtn.style.display = 'none';
    } else {
        successBtn.style.display = 'none';
        errorBtn.style.display = 'block';
    }
    
    messageModal.style.display = 'flex';
}

function closeMessageModal() {
    document.getElementById('messageModal').style.display = 'none';
}

 //VARIABLES DE SESION ADMIN    
 function CerrarSesion() {
    deleteCookie('userRole');
    localStorage.removeItem('entrenadorDatos');
    window.location.href = 'Login.html'; 
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

window.onload = function() {
    const userRole = getCookie('userRole');

    if (userRole !== '3') {
        window.location.href = 'Error.html'; 
    }
};

