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

window.onload = function() {
    const userRole = getCookie('userRole');

    if (userRole !== '1') {
        window.location.href = 'Error.html'; 
    }
};
function CerrarSesion() {
    deleteCookie('userRole');
    deleteCookie('userId');
    window.location.href = 'Login.html'; 
}

document.addEventListener('DOMContentLoaded', function() {
    perfil();  
});


async function perfil() {
    const userId = getCookie('userId');
    
    if (userId) { 
        try {
            const response = await fetch(`https://localhost:7007/Usuario/Traer-Datos-Usuario?id_usuario=${encodeURIComponent(userId)}`, {
                method: 'GET'
            });

            if (response.ok) {
                const result = await response.json(); 
                console.log(result);  

    

                const nombres = result.nombres;
                const apellidos = result.apellidos;
                const fechaNacimiento = result.fecha_nacimiento;
                const genero = result.genero;
                const estatura = result.estatura;
                const peso = result.peso;
                const idObjetivo = result.id_objetivo;
                const nivelEntrenamiento = result.nivel_entrenamiento;
                const rehabilitacion = result.rehabilitacion;
                const fechaNacimientoo = result.fecha_nacimiento.split(' ')[0];

                let Objetivo;
                switch (idObjetivo) {
                    case 1:
                        Objetivo = "Definicion";
                        break;
                    case 2:
                        Objetivo = "Mantenimiento";
                        break;    
                    case 3:
                        Objetivo = "Hipertrofia";
                        break;
                    case 4:
                         Objetivo = "Fuerza";
                        break;
                    case 4:
                        Objetivo = "Rehabilitacion";
                        break;                         
                    default:
                        Objetivo = "No aplica"; 
                        break;
                }
                let nivel;
                switch(nivelEntrenamiento){
                    case 1:
                        nivel="Principiante";
                        break;
                    case 2:
                        nivel="Medio";
                        break;
                    case 3:
                        nivel="Avanzado";
                        break;
                    default:
                         nivel="No aplica";
                     break;
    
                }


                document.getElementById('nombres').innerText = `${nombres}`;
                document.getElementById('apellidos').innerText = ` ${apellidos}`;
                document.getElementById('fechaNacimiento').innerText = ` ${fechaNacimientoo}`;
                document.getElementById('genero').innerText = ` ${genero}`;
                document.getElementById('estatura').innerText = ` ${estatura} cm`;
                document.getElementById('peso').innerText = ` ${peso} kg`;
                document.getElementById('objetivo').innerText = ` ${Objetivo}`;
                document.getElementById('nivelEntrenamiento').innerText = ` ${nivel}`;
                document.getElementById('rehabilitacion').innerText = ` ${rehabilitacion ? 'Sí' : 'No'}`;

            } else {
                const error = await response.text();
                showMessage(`Error: ${error}`, 'error');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            showMessage(`Error: ${error.message || 'Desconocido'}`, 'error');
        }
    } else {
        showMessage('No se encontró el ID del usuario en las cookies.', 'error');
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
function ActualizarObjetivo(){
    window.location.href = 'ActuaMedidas.html';
}
function ActualizarDatos(){
   
    window.location.href = 'ActualizarPeso.html'; 
}

async function eliminarUsuario() {
    const id_usuario = getCookie('userId');
    try {
        const response = await fetch(`https://localhost:7007/Usuario/EliminarUsuario?id_usuario=${id_usuario}`, {
            method: 'POST', 
            headers: {
                'Accept': '*/*', 
            },
            body: '' 
        });

        if (response.ok) {
            showMessage('Usuario eliminado con éxito');
            window.location.href="index.HTML";
            
            console.log('Usuario eliminado con éxito');
        } else {
            showMessage('Error al eliminar el usuario');
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        showMessage('Hubo un problema al intentar eliminar el usuario');
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
