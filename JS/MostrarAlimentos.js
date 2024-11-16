
function Crear(){
    window.location.href='AgregarAlimentos.html';
}

let AlimentosData = [];


fetch('http://localhost:7007/api/Alimento/ListAlimentos')
.then(response => {
    if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
    }
    return response.json();
})
.then(data => {
    AlimentosData = data;
    const alimentosTable = document.getElementById('alimentos').getElementsByTagName('tbody')[0];
    let html = "";
    data.forEach((alimento, index) => {

        html += `<tr>
        <td>${alimento?.nombre}</td>
        <td>${alimento?.calorias_x_gramo}</td>
        <td>${alimento?.grasa}</td>
        <td>${alimento?.carbohidrato}</td>
        <td>${alimento?.proteina}</td>
        <td>${alimento?.fibra}</td>
        <td>
            <img src="Css/Imagenes/lapiz.png" onclick='guardarDatosAlimento(${index})'>
        </td>
        <td>
            <img src="Css/Imagenes/eliminar.png" onclick='EliminarAlimento(${index})' alt="Eliminar Alimento">
        </td>
     </tr>`;
    });

    alimentosTable.innerHTML = html;

    $(document).ready(function() {
        $('#alimentos').DataTable({
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "lengthMenu": [5, 10, 25, 50],
            "drawCallback": function() {
                $('#tablaAlimentos').css('width', '50%');
            }
        });
    });
})
.catch(error => {
    console.error('Error en la petición:', error);
});

function guardarDatosAlimento(index) {
    const alimento = AlimentosData[index];
    localStorage.setItem('AlimentoDatos', JSON.stringify(alimento));     
    window.location.href = 'ActualizarAlimento.html'; 
}

function EliminarAlimento(index) {
    const alimento = AlimentosData[index];
    const id = alimento.id_alimento; 
    showMessage("¿Estás seguro de que deseas eliminar este alimento?", function() {
        fetch(`http://localhost:7007/api/Alimento/EliminarAlimento?id_alimento=${encodeURIComponent(id)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el alimento');
            }
            return response.json();
        })
        .then(data => {
            showMessageError(data.mensaje || "Alimento eliminado correctamente.");
            location.reload(); 
        })
        .catch(error => {
            console.error('Error:', error);
            showMessageError("Hubo un error al eliminar el alimento.");
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

