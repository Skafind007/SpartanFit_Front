
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

console.log('AlimentoData:', ejercicio); 

fetch('https://localhost:7007/api/Entrenador/RegistrarEjercicio', { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(ejercicio)
})
.then(response => {
    if (response.ok) {
        showMessage('¡Ejercicio creado exitosamente!', 'success');
        setTimeout(() => {
            window.location.href = 'MostrarEjercicios.html';
        }, 2000);
    } else {                           
        showMessage('El Ejercicio ya está registrado', 'error');
    }
})
.catch(error => {
    console.log('Fetch error:', error);
    showMessage(`Error: ${error.message || 'Desconocido'}`, 'error');
});
} else {
showMessage('Por favor, completa todos los campos requeridos.', 'error');
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
    
    messageModal.style.display = 'flex'; // Mostrar el modal
}

function closeMessageModal() {
    document.getElementById('messageModal').style.display = 'none';
}

function confirmarCancelar() {
    document.getElementById('cancelModal').style.display = 'flex'; // Mostrar el modal de cancelación
}

function closeModal() {
    document.getElementById('cancelModal').style.display = 'none';
}

function cancelar() {
    window.location.href = 'MostrarEntrenadores.html'; 
}
