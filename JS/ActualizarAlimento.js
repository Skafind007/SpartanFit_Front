function ActualizarAlimento() {
    // Obtener los valores del formulario
    const id_alimento = document.getElementById('id_alimento').value;
    const nombre = document.getElementById('nombre_alimento').value;
    const calorias_x_gramo = document.getElementById('calorias_x_gramo').value;
    const grasa = document.getElementById('grasa').value;
    const carbohidrato = document.getElementById('carbohidrato').value;
    const proteina = document.getElementById('proteina').value;
    const fibra = document.getElementById('fibra').value;
    const id_categoria_alimento = document.getElementById('id_categoria_alimento').value;

    if (nombre && calorias_x_gramo && grasa && carbohidrato && proteina && fibra) {
        // Crear el objeto FormData
        const formData = new FormData();
        formData.append('id_alimento', id_alimento);
        formData.append('nombre', nombre);
        formData.append('calorias_x_gramo', calorias_x_gramo);
        formData.append('grasa', grasa);
        formData.append('carbohidrato', carbohidrato);
        formData.append('proteina', proteina);
        formData.append('fibra', fibra);
        formData.append('id_categoria_alimento', id_categoria_alimento);

        // Realizar la solicitud fetch para actualizar el alimento
        fetch('http://localhost:7007/api/Alimento/ActualizarAlimento', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar el alimento');
            }
            return response.json();
        })
        .then(data => {
            showMessage('Alimento actualizado correctamente.', 'success');
            localStorage.removeItem('AlimentoDatos');
            window.location.href = 'MostrarAlimentos.html'; 
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('Hubo un error al actualizar el alimento.', 'error');
        });
    } else {
        showMessage('Por favor, completa todos los campos.', 'error');
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


//VARIABLES DE SESION ENTRE  
function CerrarSesion() {
    deleteCookie('userRole');
    localStorage.removeItem('AlimentoDatos');
    window.location.href = 'Login.html'; 
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    localStorage.clear();
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


 //VARIABLES DE SESION ADMIN    
 function CerrarSesion() {
    deleteCookie('userRole');
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
