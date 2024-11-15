
function Crear(){
    window.location.href='CrearRutina.html';
}
let RutinaData = [];

fetch('https://localhost:7007/MostrarRutinas')
.then(response => {
    if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
    }
    return response.json();
})
.then(data => {
    RutinaData = data;
    const RutinaTable = document.getElementById('rutinas').getElementsByTagName('tbody')[0];

    let html = "";
    data.forEach((rutina, index) => {
        // Asigna el valor del objetivo según el id_objetivo de cada rutina
        let Objetivo;
        switch (rutina.id_objetivo) {
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
            case 5:
                Objetivo = "Rehabilitacion";
                break;                         
            default:
                Objetivo = "No aplica"; 
                break;
        }

        // Asigna el valor del nivel según el id_nivel_rutina de cada rutina
        let nivel;
        switch (rutina.id_nivel_rutina) {
            case 1:
                nivel = "Principiante";
                break;
            case 2:
                nivel = "Medio";
                break;
            case 3:
                nivel = "Avanzado";
                break;
            default:
                nivel = "No aplica";
                break;
        }

        // Construcción del HTML de la tabla
        html += `<tr>
            <td>${nivel}</td>
            <td>${Objetivo}</td>
            <td>${rutina?.nombre_rutina}</td>
            <td>${rutina?.dia}</td>
            <td>${rutina?.descripcion}</td>
            <td>
                <img src="Css/Imagenes/eliminar.png" onclick='EliminarRutina(${index})' alt="Eliminar Rutina">
            </td>
                <td>
                <img src="Css/Imagenes/lupa.png" onclick='VerRutina(${index})' alt="Ver Rutina">
            </td>
        </tr>`;
    });

    // Inserta el contenido generado en la tabla
    RutinaTable.innerHTML = html; 

    // Inicializa DataTables sobre la tabla rutinas
    $(document).ready(function() {
        $('#rutinas').DataTable({ 
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



function EliminarRutina(index) {
    const rutina = RutinaData[index];
    const id = rutina.id_rutina; 
    showMessage("¿Estás seguro de que deseas eliminar esta rutina?", function() {
        fetch(`https://localhost:7007/EliminarRutina?id_rutina=${encodeURIComponent(id)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar la rutina');
            }
            return response.json();
        })
        .then(data => {
            showMessageError(data.mensaje || "Rutina eliminada correctamente.");
            location.reload(); 
        })
        .catch(error => {
            console.error('Error:', error);
            showMessageError("Hubo un error al eliminar la rutina.");
        });
    });
}

function VerRutina(index) {
    const rutina = RutinaData[index];
    const id = rutina.id_rutina; 
   localStorage.setItem("id_rutina",id)
   window.location.href="DetallesR.html"
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

function showMessageError(message) {
    const messageModalError = document.getElementById('messageModalError');
    const errorMessageText = document.getElementById('errorMessageText');
    
    errorMessageText.textContent = message;

    messageModalError.style.display = 'flex';
}

function closeMessageModalError() {
    document.getElementById('messageModalError').style.display = 'none';
}




//VARIABLES DE SESION ENTRE  
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

