document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroAlimento-form');
    

    form.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { 
            event.preventDefault(); 
            AñadirAlimento();  
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

        
        fetch('https://localhost:7007/api/Alimento/RegistrarAlimento', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alimento)
        })
        .then(response => {
           
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error('Error en la respuesta del servidor: ' + response.status);
            }
        })
        .then(data => {
            console.log('Respuesta exitosa:', data); 
            showMessage('¡Alimento creado exitosamente!', 'success');
            setTimeout(() => {
                window.location.href = 'MostrarAlimentos.html'; 
            }, 2000);
        })
        .catch(error => {
            console.log('Error en el fetch:', error); 
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


function cancelar() {
    window.location.href = 'MostrarEntrenadores.html'; 
}


function CerrarSesion() {
    deleteCookie('userRole');
    deleteCookie('userId');
    localStorage.clear();
    window.location.href = 'Login.html'; 
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}
