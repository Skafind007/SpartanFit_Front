
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    form.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            IniciarSesion(); 
        }
    });
});


function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

async function redireccionar() {
    const form = document.getElementById('login-form'); 
    const correo = document.getElementById('correo').value;

    if (form.checkValidity()) { 
        try {
            const response = await fetch(`https://localhost:7007/api/Persona/Traer-Datos-Personas?correo=${encodeURIComponent(correo)}`, {
                method: 'GET'
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log(result);

                setCookie('userId', result.id_usuario, 7); 
                setCookie('userRole', result.id_rol, 7); 
                if (result.id_rol === 1) {
                    window.location.href = 'PrincipalUsuario.html';
                } else if (result.id_rol === 2) {
                    window.location.href = 'MostrarRutinas.html';
                } else if (result.id_rol === 3) {
                    window.location.href = 'MostrarUsuario.html';
                }

            } else {
                const error = await response.text();
                showMessage(`Error: ${error}`, 'error');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            showMessage(`Error: ${error.message || 'Desconocido'}`, 'error');
        }
    } else {
        showMessage('Por favor, completa todos los campos requeridos.', 'error');
    }
}

function convertirCadenaABinario(texto) {
    let resultadoBinario = '';

    for (let i = 0; i < texto.length; i++) {
        
        let binario = texto.charCodeAt(i).toString(2);
     
        binario = binario.padStart(8, '0');
        resultadoBinario += binario;
    }

    return resultadoBinario;
}

async function IniciarSesion() {
    const form = document.getElementById('login-form');

    if (form.checkValidity()) {
        const formData = new FormData(form);

        const password = formData.get('contrasena');  
        const passwordBinario = convertirCadenaABinario(password);  

        formData.set('contrasena', passwordBinario);

        try {
            const response = await fetch('https://localhost:7007/api/Persona/IniciarSesion', { 
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.text();
                var rol = redireccionar();
            } else {
                const error = await response.text();
                showMessage(`Error: ${error}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            showMessage(`Error: ${error.message || 'Desconocido'}`);
        }
    } else {
        showMessage('Por favor, completa todos los campos requeridos.');
    }
}


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
