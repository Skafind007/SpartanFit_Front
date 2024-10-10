document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ActualizarEjercicio-form');
    
    form.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { 
            event.preventDefault(); 
            ActualizarEjercicio(); 
        }
    });
    });

    async function ActualizarEjercicio(event) {
        event.preventDefault();  
        
        const form = document.getElementById('ActualizarEjercicio-form');
        
        if (form.checkValidity()) {
            const formData = {
                id_ejercicio: document.getElementById('id_ejercicio').value,
                nombre_ejercicio: document.getElementById('nombre_ejercicio').value,
                id_grupo_muscular: document.getElementById('id_grupo_muscular').value,
                apoyo_visual: document.getElementById('apoyo_visual').value
            };
    
            try {
                const response = await fetch('https://localhost:7007/api/Ejercicio/ActualizarEjercicio',
                     {
                    method: 'POST',  
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(formData)  
                });
    
                if (response.ok) {
                    const result = await response.json();
                    console.log(result.mensaje);  
                    localStorage.removeItem('EjercicioDatos');
                    window.location.href = 'MostrarEjercicios.html';  
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
        const messageText = document.getElementById('messageText');
        const successBtn = document.getElementById('successBtn');
        const errorBtn = document.getElementById('errorBtn');
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
    localStorage.removeItem('EjercicioDatos');
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

