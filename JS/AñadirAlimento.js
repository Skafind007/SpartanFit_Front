
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroAlimento-form');
    
    form.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { 
            event.preventDefault(); 
            AñadirAlimento()
        }
    });
});

function AñadirAlimento() {
const form = document.getElementById('registroAlimento-form');

if (form.checkValidity()) {

const alimento = {
    
    nombre: document.getElementById('nombre').value,
    id_categoria_alimento: document.getElementById('id_categoria_alimento').value,
    calorias_x_gramo: document.getElementById('calorias_x_gramo').value,
    grasa: document.getElementById('grasa').value,
    carbohidrato: document.getElementById('carbohidrato').value,
    proteina: document.getElementById('proteina').value,
    fibra: document.getElementById('fibra').value,
    apoyo_visual: document.getElementById('apoyo_visual').value
};

console.log('AlimentoData:', alimento); 

fetch('https://localhost:7007/api/Entrenador/RegistrarAlimento', { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(alimento)
})
.then(response => {
    if (response.ok) {
        showMessage('¡Alimento creado exitosamente!', 'success');
        setTimeout(() => {
            window.location.href = 'MostrarAlimentos.html';
        }, 2000);
    } else {                           
        showMessage('El Alimento ya está registrado', 'error');
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
