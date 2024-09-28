
       
fetch('https://localhost:7007/api/Administrador/ListUsuarios')
.then(response => {
    if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
    }
    return response.json();
})
.then(data => {
    const usuariosTable = document.getElementById('usuarios').getElementsByTagName('tbody')[0];
    let html = "";
    data.forEach(usuario => {
        let nivelEntrenamiento = ''; 
        switch (usuario.id_nivel_entrenamiento) {
            case 1:
                nivelEntrenamiento = 'Básico';
                break;
            case 2:
                nivelEntrenamiento = 'Intermedio';
                break;
            case 3:
                nivelEntrenamiento = 'Avanzado';
                break;
            default:
                nivelEntrenamiento = 'No Aplica'; 
        }
        let nivelRutina = ''; 
        switch (usuario.id_objetivo) {
            case 1:
                nivelRutina = 'Definición';
                break;
            case 2:
                nivelRutina = 'Mantenimiento';
                break;
            case 3:
                nivelRutina = 'Hipertrofia';
                break;
            case 4:
                nivelRutina = 'Fuerza';
                break; 
            case 5:
                nivelRutina = 'Rehabilitación';
                break;   
            default:
                nivelRutina = 'No Aplica'; 
        }
        let rehabilitacion = usuario.rehabilitacion === 1 ? 'Sí' : 'No';

        let fechaNacimiento = usuario.persona?.fecha_nacimiento;
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
                    <td>${usuario.persona?.nombres }</td>
                    <td>${usuario.persona?.apellidos }</td>
                    <td>${usuario.persona?.correo }</td>
                    <td>${usuario.persona?.genero }</td>
                    <td>${fechaNacimiento}</td>
                    <td>${usuario.estatura}</td>
                    <td>${usuario.peso}</td>
                    <td>${nivelEntrenamiento}</td>
                    <td>${nivelRutina}</td>
                    <td>${rehabilitacion}</td>
                 </tr>`;
    });

    usuariosTable.innerHTML = html;


    $(document).ready(function() {
        $('#usuarios').DataTable({
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
  
//VARIABLES DE SESION ADMIN 
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

function CerrarSesion() {
    deleteCookie('userRole');
    window.location.href = 'Login.html'; 
}

document.getElementById('downloadPdfBtn').addEventListener('click', function() {
   
    fetch('/generate-pdf')
      .then(response => response.blob())  
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reportEstudiantes.pdf';  
        document.body.appendChild(a);  
        a.click();  
        a.remove();
      })
      .catch(error => console.error('Error al descargar el PDF:', error)); 