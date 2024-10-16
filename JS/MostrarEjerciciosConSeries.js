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

// Función para recopilar las series, repeticiones e IDs seleccionados
function getSelectedCheckboxIds() {
    const listadoSeries = [];
    const listadoRepeticiones = [];

    selectedCheckboxIDs.forEach(checkboxId => {
        const numSeries = document.getElementById('num_series_' + checkboxId).value;
        listadoSeries.push(numSeries);

        const numRepeticiones = document.getElementById('repeticiones_' + checkboxId).value;
        listadoRepeticiones.push(numRepeticiones);
    });

    // Obtener los datos del `localStorage`
    const nombreRutina = localStorage.getItem('nombreRutina') || 'Prueba';
    const nivelRutina = parseInt(localStorage.getItem('nivelRutina')) || 2;
    const objetivo = parseInt(localStorage.getItem('objetivo')) || 1;
    const dia = localStorage.getItem('dia') || 'Martes';
    const descripcion = localStorage.getItem('descripcion') || 'sapo';
    const userId = parseInt(localStorage.getItem('userId')) || 8048;

    // Crear un objeto FormData para enviar los datos como multipart/form-data
    const formData = new FormData();
    formData.append('id_nivel_rutina', nivelRutina);
    formData.append('id_objetivo', objetivo);
    formData.append('nombre_rutina', nombreRutina);
    formData.append('dia', dia);
    formData.append('descripcion', descripcion);
    formData.append('id_entrenador', userId);


    selectedCheckboxIDs.forEach(id => {
        formData.append('selectedCheckboxIds', id);
    });

    listadoSeries.forEach(series => {
        formData.append('listadoSeries', series);
    });

    listadoRepeticiones.forEach(repeticiones => {
        formData.append('listadoRepeticiones', repeticiones);
    });

    console.log('Enviando los siguientes datos:');
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }


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

        window.location.href="MostrarEjercicios.html";
        console.log(data); 
    })
    .catch(error => {
        console.error('Error al registrar la rutina:', error);
        showMessage('Hubo un error al registrar la rutina: ' + error.message); 
    });
}

function submitForm(){
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