let AlimentosData = [];
let selectedCheckboxIDs = [];

// Cargar los alimentos desde la API
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

        // Generar las filas de la tabla
        data.forEach((alimento, index) => {
            html += `<tr>
                        <td><input type="checkbox" name="select_alimento_${index}" value="${alimento?.id_alimento}" id="checkbox_${alimento?.id_alimento}" onchange="handleCheckboxChange(${alimento?.id_alimento})"></td>
                        <td>${alimento?.nombre}</td>
                        <td>${alimento?.calorias_x_gramo}</td>
                        <td>${alimento?.grasa}</td>
                        <td>${alimento?.carbohidrato}</td>
                        <td>${alimento?.proteina}</td>
                        <td>${alimento?.fibra}</td>
                     </tr>`;
        });

        alimentosTable.innerHTML = html;

        // Inicializar DataTable
        $('#alimentos').DataTable({
            "paging": true,         
            "searching": true,     
            "ordering": true,    
            "info": true,         
            "lengthMenu": [5, 10, 25, 50]
        });
    })
    .catch(error => {
        console.error('Error en la petición:', error);
    });

// Manejar los cambios en los checkboxes
function handleCheckboxChange(idAlimento) {
    const checkbox = document.getElementById(`checkbox_${idAlimento}`);
    if (checkbox.checked) {
        // Añadir el ID si está seleccionado
        selectedCheckboxIDs.push(idAlimento);
    } else {
        // Eliminar el ID si está deseleccionado
        selectedCheckboxIDs = selectedCheckboxIDs.filter(id => id !== idAlimento);
    }
}

// Enviar el formulario con los alimentos seleccionados
function submitForm() {
    const plan = JSON.parse(localStorage.getItem('plan')); 

    if (plan) {
        const { dia, descripcion, userId } = plan;
        console.log({ dia, descripcion, userId });

        const formData = new FormData();
        formData.append('nombre', plan.nombre); // Asegúrate de que 'nombre' esté en el plan si lo necesitas
        formData.append('dia', dia);
        formData.append('descripcion', descripcion);
        formData.append('id_entrenador', userId);

        // Añadir los alimentos seleccionados
        selectedCheckboxIDs.forEach(id => {
            formData.append('selectedCheckboxIds', id);
        });


        fetch('http://localhost:7007/api/PlanAlimenticio/RegistrarPlanAlimenticio', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al registrar el plan');
                localStorage.clear();
            }
            return response.json();
        })
        .then(data => {
            console.log('Plan registrado con éxito:', data);
            window.location.href = "MostrarPlan.html";
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('Hubo un error al registrar el plan: ' + error.message);
        });
    } else {
        console.error("No se encontraron datos del plan en el localStorage.");
    }
}

// Funciones para mostrar y cerrar el modal
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

function confirmarCancelar() {
    document.getElementById('cancelModal').style.display = 'flex'; 
}

function closeModal() {
    document.getElementById('cancelModal').style.display = 'none';
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