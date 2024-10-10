function ActualizarAlimento() {
    const id_alimento = document.getElementById('id_alimento').value;
    const nombre = document.getElementById('nombre_alimento').value;
    const calorias_x_gramo = document.getElementById('calorias_x_gramo').value;
    const grasa = document.getElementById('grasa').value;
    const carbohidrato = document.getElementById('carbohidrato').value;
    const proteina = document.getElementById('proteina').value;
    const fibra = document.getElementById('fibra').value;

    const alimentoActualizado = {
        id_alimento,
        nombre,
        calorias_x_gramo,
        grasa,
        carbohidrato,
        proteina,
        fibra
    };

    fetch(`https://localhost:7007/api/Alimento/ActualizarAlimento`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(alimentoActualizado)
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
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Hubo un error al actualizar el alimento.', 'error');
    });
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
