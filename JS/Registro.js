
function toggleFields() {
    const rehabilitacion = document.getElementById('rehabilitacion').value;
    const objetivoContainer = document.getElementById('objetivo-container');
    const nivelContainer = document.getElementById('nivel-container');
    
    if (rehabilitacion === '1') {
        objetivoContainer.style.display = 'none';

        nivelContainer.style.display = 'none';
    } else {
        objetivoContainer.style.display = 'block';
        nivelContainer.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
const form = document.getElementById('registro-form');

form.addEventListener('keypress', function(event) {
if (event.key === 'Enter') { 
    event.preventDefault(); 
    crearCuenta(); 
}
});
});

function convertirCadenaABinario(texto) {
    let resultadoBinario = '';

    for (let i = 0; i < texto.length; i++) {
        
        let binario = texto.charCodeAt(i).toString(2);
     
        binario = binario.padStart(8, '0');
        resultadoBinario += binario;
    }

    return resultadoBinario;
}

function crearCuenta() {
const form = document.getElementById('registro-form');

if (form.checkValidity()) {
    let password = document.getElementById('contrasena').value;
    let passwordBinario = convertirCadenaABinario(password);

const usuarioData = {
    persona: {
        id_rol: 1, 
        nombres: document.getElementById('nombres').value,
        apellidos: document.getElementById('apellidos').value,
        correo: document.getElementById('correo').value,
        contrasena: passwordBinario,
        fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
        genero: document.getElementById('genero').value,
    },
    estatura: document.getElementById('estatura').value,
    peso: document.getElementById('peso').value,
    rehabilitacion: document.getElementById('rehabilitacion').value,
};


if (usuarioData.rehabilitacion == 1) {
    usuarioData.id_objetivo = 5;
    usuarioData.id_nivel_entrenamiento = 1;
} else {
    usuarioData.id_nivel_entrenamiento = document.getElementById('nivel_entrenamiento').value;
    usuarioData.id_objetivo = document.getElementById('objetivo').value;
}


console.log('usuarioData:', usuarioData); 
fetch('https://localhost:7007/Usuario/Registrar', { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuarioData)
})
.then(response => {
    if (response.ok) {
        showMessage('¡Cuenta creada exitosamente!', 'success');
        setTimeout(() => {
            window.location.href = 'Login.html';
        }, 2000);
    } else {                           
        showMessage('El correo ya esta registrado', 'error');
    }
})
.catch(error => {
    console.log('Fetch error:', error); // Depuración
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
    
    messageModal.style.display = 'block';
}

function closeMessageModal() {
    document.getElementById('messageModal').style.display = 'none';
}


function confirmarCancelar() {
    document.getElementById('cancelModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('cancelModal').style.display = 'none';
}

function cancelar() {
    window.location.href = 'index.html'; 
}

