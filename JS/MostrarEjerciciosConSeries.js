let EjerciciosData = [];
let selectedCheckboxIDs = [];

// Cargar los ejercicios desde la API
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

        // Generar filas de la tabla con los ejercicios
        data.forEach((ejercicio, index) => {
            html += `<tr>
                        <td><input type="checkbox" name="select_ejercicio_${index}" value="${ejercicio?.id_ejercicio}" id="checkbox_${ejercicio?.id_ejercicio}"></td>
                        <td>${ejercicio?.nombre_ejercicio}</td>
                        <td>${ejercicio?.id_grupo_muscular}</td>
                        <td><img class="ImgEjer" src="${ejercicio?.apoyo_visual}" alt="Apoyo Visual"></td>
                        <td><input type="number" id="num_series_${ejercicio?.id_ejercicio}" name="series_${ejercicio?.id_ejercicio}" min="1" placeholder="Series" disabled></td>
                        <td><input type="number" id="repeticiones_${ejercicio?.id_ejercicio}" name="repeticiones_${ejercicio?.id_ejercicio}" min="1" placeholder="Repeticiones" disabled></td>
                     </tr>`;
        });

        ejerciciosTable.innerHTML = html;

        // Inicializar eventos de los checkboxes
        initializeCheckboxEvents();

        // Inicializar DataTable
        $('#ejercicios').DataTable({
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

// Inicializar los eventos para habilitar/deshabilitar campos de series y repeticiones
function initializeCheckboxEvents() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkboxId = checkbox.value;

            // Habilitar o deshabilitar los campos según el estado del checkbox
            if (checkbox.checked) {
                selectedCheckboxIDs.push(checkboxId);
                document.getElementById('num_series_' + checkboxId).disabled = false;
                document.getElementById('repeticiones_' + checkboxId).disabled = false;
            } else {
                const index = selectedCheckboxIDs.indexOf(checkboxId);
                if (index >= 0) {
                    selectedCheckboxIDs.splice(index, 1);
                }
                document.getElementById('num_series_' + checkboxId).disabled = true;
                document.getElementById('repeticiones_' + checkboxId).disabled = true;
            }

            console.log('Selected IDs:', selectedCheckboxIDs);
        });
    });
}

function getSelectedCheckboxIds() {
    const listadoSeries = [];
    const listadoRepeticiones = [];

    // Recolectar las series y repeticiones de los ejercicios seleccionados
    selectedCheckboxIDs.forEach(checkboxId => {
        const numSeries = document.getElementById('num_series_' + checkboxId).value;
        listadoSeries.push(numSeries);

        const numRepeticiones = document.getElementById('repeticiones_' + checkboxId).value;
        listadoRepeticiones.push(numRepeticiones);
    });

    // Recuperar los datos desde el localStorage
    const rutina = JSON.parse(localStorage.getItem('rutina')); // Recuperar todo el objeto

    if (rutina) {
        const { nombreRutina, nivelRutina, objetivo, dia, descripcion, userId } = rutina;

        // Mostrar los valores para depurar
        console.log({ nombreRutina, nivelRutina, objetivo, dia, descripcion, userId });

        // Crear el objeto FormData dentro del mismo ámbito
        const formData = new FormData();
        formData.append('id_nivel_rutina', nivelRutina);
        formData.append('id_objetivo', objetivo);
        formData.append('nombre_rutina', nombreRutina);
        formData.append('dia', dia);
        formData.append('descripcion', descripcion);
        formData.append('id_entrenador', userId);

        // Añadir los ejercicios seleccionados, sus series y repeticiones
        selectedCheckboxIDs.forEach(id => {
            formData.append('selectedCheckboxIds', id);
        });

        listadoSeries.forEach(series => {
            formData.append('listadoSeries', series);
        });

        listadoRepeticiones.forEach(repeticiones => {
            formData.append('listadoRepeticiones', repeticiones);
        });

        // Enviar el formData al servidor
        fetch('https://localhost:7007/RegistrarRutina', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al registrar la rutina');
            }
            return response.json();
        })
        .then(data => {
            console.log('Rutina registrada con éxito:', data);
            window.location.href = "MostrarEjercicios.html";
        })
        .catch(error => {
            console.error('Error al registrar la rutina:', error);
            showMessage('Hubo un error al registrar la rutina: ' + error.message);
        });
    } else {
        console.error("No se encontraron datos de la rutina en el localStorage.");
    }
}

// Función para enviar el formulario
function submitForm() {
    getSelectedCheckboxIds();
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