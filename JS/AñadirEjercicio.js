
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('AñadirEjercicio-form');
    
    form.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { 
            event.preventDefault(); 
            AñadirEjercicio()
        }
    });
});

function AñadirEjercicio() {
const form = document.getElementById('AñadirEjercicio-form');

if (form.checkValidity()) {

const ejercicio = {
    
    nombre_ejercicio: document.getElementById('nombre_ejercicio').value,
    id_grupo_muscular: document.getElementById('id_grupo_muscular').value,
    apoyo_visual: document.getElementById('apoyo_visual').value
};

console.log('EjercicioData:', ejercicio); 

fetch('http://localhost:7007/api/Ejercicio/RegistrarEjercicio', { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(ejercicio)
})
.then(response => {
    return response.json().then(data => ({
        status: response.status,  
        body: data                
    }));
})
.then(responseObject => {
    const { status, body } = responseObject;

    if (status === 200) { 
        console.log(body.mensaje);  
        showMessage(body.mensaje, 'success');
        setTimeout(() => {
            window.location.href = 'MostrarEjercicios.html';
        }, 2000);
    } else if (status === 400) { 
        console.log(body); 
        showMessage(body, 'error');
    } else if (status === 404) {  
        console.log(body);  
        showMessage(body, 'error');
    } else {
        console.log('Respuesta inesperada:', body);
        showMessage('Error desconocido, intenta nuevamente.', 'error');
    }
})
.catch(error => {
    console.log('Fetch error:', error);
    showMessage(`Error: ${error.message || 'Desconocido'}`, 'error');
});
}
}

function showMessage(message, type) {
    const messageModal = document.getElementById('messageModal');
    const messageText = document.getElementById('messageText');
    const successBtn = document.getElementById('successBtn');
    const errorBtn = document.getElementById('errorBtn');
    
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

function confirmarCancelar() {
    document.getElementById('cancelModal').style.display = 'flex'; 
}

function closeModal() {
    document.getElementById('cancelModal').style.display = 'none';
}

function CerrarSesion() {
    deleteCookie('userRole');
    deleteCookie('userId');
    localStorage.clear();
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
    
        if (userRole !== '2') {
            window.location.href = 'Error.html'; 
        }
    };
    