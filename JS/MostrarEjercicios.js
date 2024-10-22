
function Crear(){
    window.location.href='AgregarEjercicio.html';
}

let EjerciciosData = [];


fetch('https://localhost:7007/api/Ejercicio/ListEjercicios')
.then(response => {
    if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
    }
    return response.json();
})
.then(data => {
    EjerciciosData = data;
    const ejerciciosTable = document.getElementById('ejercicios').getElementsByTagName('tbody')[0];
    let html = "";
    data.forEach((ejercicio, index) => {
      

        html += `<tr>
                    <td>${ejercicio?.nombre_ejercicio}</td>
                    <td>${ejercicio?.id_grupo_muscular}</td>
                    <td>
                     <img  class="ImgEjer" src="${ejercicio?.apoyo_visual}">
                    </td>                     
                    <td>
                        <img src="Css/Imagenes/lapiz.png" onclick='guardarDatosEjer(${index})'>
                    </td>
                    <td>
                         <img src="Css/Imagenes/eliminar.png" onclick='Eliminar(${index})' alt="Eliminar Ejer">
                    </td>
                 </tr>`;
    });

    ejerciciosTable.innerHTML = html;

    $(document).ready(function() {
        $('#ejercicios').DataTable({
            "paging": true,         
            "searching": true,     
            "ordering": true,    
            "info": true,         
            "lengthMenu": [5, 10, 25, 50],  
            "drawCallback": function() {
                $('#tablaEjercicios').css('width', '50%');
            }
        });
    });
})
.catch(error => {
    console.error('Error en la petición:', error);
});


function guardarDatosEjer(index) {
    const ejercicio = EjerciciosData[index];
    localStorage.setItem('EjercicioDatos', JSON.stringify(ejercicio));     
    window.location.href = 'ActualizarEjercicio.html'; 
}


function showMessage(message, onConfirm) {
    const messageModal = document.getElementById('messageModal');
    const messageText = document.getElementById('messageText');
    const confirmBtn = document.getElementById('confirmBtn');
    
    messageText.textContent = message;

    confirmBtn.onclick = function() {
        if (typeof onConfirm === 'function') {
            onConfirm();
        }
        closeMessageModal();
    };
    
    messageModal.style.display = 'flex';
}

function closeMessageModal() {
    document.getElementById('messageModal').style.display = 'none';
}

// Mostrar modal de error
function showMessageError(message) {
    const messageModalError = document.getElementById('messageModalError');
    const errorMessageText = document.getElementById('errorMessageText');
    
    errorMessageText.textContent = message;

    messageModalError.style.display = 'flex';
}

function closeMessageModalError() {
    document.getElementById('messageModalError').style.display = 'none';
}


function Eliminar(index) {

const ejercicio = EjerciciosData[index];
const id = ejercicio.id_ejercicio; 
showMessage("¿Estás seguro de que deseas eliminar este ejercicio?", function() {
fetch(`https://localhost:7007/api/Ejercicio/EliminarEjercicio?id_ejercicio=${encodeURIComponent(id)}`, {
method: 'POST',
headers: {
    'Content-Type': 'application/json',
},
})
.then(response => {
if (!response.ok) {
    throw new Error('Error al eliminar el ejercicio');
}
return response.json();
})
.then(data => {
showMessageError(data.mensaje || "Ejercicio eliminado correctamente.");
location.reload(); 
})
.catch(error => {
console.error('Error:', error);
showMessageError("Hubo un error al eliminar el ejercicio.");
});
}
)};



//VARIABLES DE SESION ADMIN    
function CerrarSesion() {
deleteCookie('userRole');
deleteCookie('userId');
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

