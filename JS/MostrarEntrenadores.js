
        function Crear(){
            window.location.href='AgregarEntrenador.html';
        }

        let entrenadoresData = [];

     
        fetch('https://localhost:7007/api/Administrador/ListEntrenadores')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .then(data => {
            entrenadoresData = data;
            const entrenadoresTable = document.getElementById('entrenadores').getElementsByTagName('tbody')[0];
            let html = "";
            data.forEach((persona, index) => {
                let fechaNacimiento = persona?.fecha_nacimiento;
                if (fechaNacimiento) {
                    try {
                        const [fechaParte] = fechaNacimiento.split(' ');
                        fechaNacimiento = fechaParte; 
                    } catch (error) {
                        console.error('Error al procesar la fecha:', error);
                        fechaNacimiento = 'Fecha no válida';
                    }
                } else {
                    fechaNacimiento = 'Fecha no disponible';
                }

                html += `<tr>
                            <td>${persona?.nombres}</td>
                            <td>${persona?.apellidos}</td>
                            <td>${persona?.correo}</td>
                            <td>${persona?.genero}</td>
                            <td>${fechaNacimiento}</td>                          
                            <td>
                                <img src="Css/Imagenes/usuario (1).png" onclick='guardarDatosEntrenador(${index})'>
                            </td>
                            <td>
                                 <img src="Css/Imagenes/basura.png" onclick='EliminarEntrenador(${index})' alt="Eliminar Entrenador">
                            </td>
                         </tr>`;
            });

            entrenadoresTable.innerHTML = html;

            $(document).ready(function() {
                $('#entrenadores').DataTable({
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

      
        function guardarDatosEntrenador(index) {
            const entrenador = entrenadoresData[index];
            localStorage.setItem('entrenadorDatos', JSON.stringify(entrenador));     
            window.location.href = 'ActualizarEntrenador.html'; 
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

       
        function EliminarEntrenador(index) {
    
    const entrenador = entrenadoresData[index];
    const id_usuario = entrenador.id_usuario; 
    showMessage("¿Estás seguro de que deseas eliminar este entrenador?", function() {
    fetch(`https://localhost:7007/api/Administrador/EliminarEntrenador?id=${encodeURIComponent(id_usuario)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar el entrenador');
        }
        return response.json();
    })
    .then(data => {
        showMessageError(data.mensaje || "Entrenador eliminado correctamente.");
        location.reload(); 
    })
    .catch(error => {
        console.error('Error:', error);
        showMessageError("Hubo un error al eliminar el entrenador.");
    });
}
    )};



   //VARIABLES DE SESION ADMIN    
        function CerrarSesion() {
            deleteCookie('userRole');
            localStorage.removeItem('entrenadorDatos');
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

            if (userRole !== '3') {
                window.location.href = 'Error.html'; 
            }
        };

        function downloadPdf() {
            fetch('https://localhost:7007/api/Administrador/ReporteEntrenadores')
              .then(response => response.blob())  
              .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Reporte_Entrenadores.pdf';  
                document.body.appendChild(a);  
                a.click();  
                a.remove();
              })
              .catch(error => console.error('Error al descargar el PDF:', error)); 
          }
  