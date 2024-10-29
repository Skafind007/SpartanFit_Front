document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ActualizarEjercicio-form');
    
    form.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { 
            event.preventDefault(); 
            ActualizarEjercicio(); 
        }
    });
});

function ActualizarEjercicio() {
    // Obtener los valores del formulario
    const id_ejercicio = document.getElementById('id_ejercicio').value;
    const nombre_ejercicio = document.getElementById('nombre_ejercicio').value;
    const id_grupo_muscular = document.getElementById('id_grupo_muscular').value;
    const apoyo_visual = document.getElementById('apoyo_visual').value;

    // Validar que todos los campos estén completos
    if (id_ejercicio && nombre_ejercicio && id_grupo_muscular && apoyo_visual) {
        
        // Crear el objeto FormData
        const formData = new FormData();
        formData.append('id_ejercicio', id_ejercicio);
        formData.append('nombre_ejercicio', nombre_ejercicio);
        formData.append('id_grupo_muscular', id_grupo_muscular);
        formData.append('apoyo_visual', apoyo_visual);

      
        fetch('https://localhost:7007/api/Ejercicio/ActualizarEjercicio', {
            method: 'POST', 
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error('Error en la respuesta del servidor: ' + response.status);
            }
        })
        .then(data => {
            console.log('Actualización exitosa:', data.mensaje); 
            localStorage.removeItem('EjercicioDatos'); 
            window.location.href = 'MostrarEjercicios.html'; 
        })
        .catch(error => {
            console.error('Error en el fetch:', error); 
            showMessage('Error: ' + error.message, 'error'); 
        });
        
    } else {
        showMessage('Por favor, completa todos los campos.', 'error'); 
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

