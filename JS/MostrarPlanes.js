function Crear(){
    window.location.href = 'CrearPlan.html';
}

let PlanesData = [];


fetch('https://localhost:7007/api/PlanAlimenticio/MostrarPlanesAlimenticios')
.then(response => {
    if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
    }
    return response.json();
})
.then(data => {
    PlanesData = data;
    const PlanesTable = document.getElementById('planes').getElementsByTagName('tbody')[0];

    let html = "";


    data.forEach((plan, index) => {
        html += `<tr>
            <td>${plan?.nombre}</td>
            <td>${plan?.dia}</td>
        
            <td>
                <img src="Css/Imagenes/eliminar.png" onclick='Eliminar(${index})' alt="Eliminar">
            </td>
        </tr>`;
    });


    PlanesTable.innerHTML = html;

    $(document).ready(function() {
        $('#planes').DataTable({ 
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


function Eliminar(index) {
    const plan = PlanesData[index];
    const id = plan.id_plan_alimenticio; 
    showMessage("¿Estás seguro de que deseas eliminar esta plan alimenticio?", function() {
        fetch(`https://localhost:7007/api/PlanAlimenticio/EliminarPlan?id_plan_alimenticio=${encodeURIComponent(id)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el plan alimenticio');
            }
            return response.json();
        })
        .then(data => {
            showMessageError(data.mensaje || "Plan eliminado correctamente.");
            location.reload(); 
        })
        .catch(error => {
            console.error('Error:', error);
            showMessageError("Hubo un error al eliminar el plan.");
        });
    });
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

