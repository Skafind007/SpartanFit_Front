
function AñadirRutina() {
    const nombreRutina = document.getElementById('nombre_rutina').value;
    const nivelRutina = document.getElementById('id_nivel rutina').value;
    const objetivo = document.getElementById('objetivo').value;
    const dia = document.getElementById('dia').value;
    const descripcion = document.getElementById('descripcion').value;
    const userId = getCookie('userId');

    if (nombreRutina && nivelRutina && objetivo && dia && descripcion) {
   
        const rutina = {
            nombreRutina,
            nivelRutina,
            objetivo,
            dia,
            descripcion,
            userId
        };


        localStorage.setItem('rutina', JSON.stringify(rutina));
        window.location.href="SeleccionarEjercicio.html";
      
}
}

function closeMessageModal() {
    document.getElementById('messageModal').style.display = "none";
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

//VARIABLES DE SESION ENTRE  
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
    
        if (userRole !== '2') {
            window.location.href = 'Error.html'; 
        }
    };
    
    