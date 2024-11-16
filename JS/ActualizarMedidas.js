async function ActuaMedidas() {
    event.preventDefault(); 
    
    const id_usuario = getCookie('userId');
    const peso = document.getElementById('peso').value;
    const estatura = document.getElementById('estatura').value;

    // Validar que los campos tengan valores
    if (!peso || !estatura) {
        alert('Por favor complete todos los campos.');
        return;
    }

    // Crear el objeto FormData
    const formData = new FormData();
    formData.append('id_usuario', id_usuario);
    formData.append('peso', peso);
    formData.append('estatura', estatura);

    try {
        // Hacer la solicitud POST con fetch
        const response = await fetch('http://localhost:7007/Usuario/ActualizarObjetivo', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            }
        });

        if (response.ok) {
            const result = await response.json();
            alert('Medidas actualizadas con éxito');
            console.log(result);
        } else {
            alert('Error al actualizar las medidas');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}
function CerrarSesion() {
    deleteCookie('userRole');
    deleteCookie('userId');
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

    if (userRole !== '1') {
        window.location.href = 'Error.html'; 
    }
};

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

