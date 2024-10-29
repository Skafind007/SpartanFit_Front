
window.onload = function() {
    const userRole = getCookie('userRole');


    if (userRole !== '1') {
        window.location.href = 'Error.html'; 
    } else {
  
        mostrarRutinaDia();  
    }
};


async function mostrarRutinaDia() {
    const userId = getCookie('userId'); 


    if (!userId) {
        alert('No se encontró el ID de usuario en las cookies.');
        return;
    }

    try {

        const response = await fetch(`https://localhost:7007/Usuario/MostrarRutinaDia?id_usuario=${userId}`);

        if (!response.ok) {
 
            if (response.status === 404) {
                throw new Error("No se encontró la rutina o los ejercicios para el día.");
            }
            throw new Error("Se produjo un error al recuperar los datos.");
        }


        const data = await response.json();

 
        if (!data.rutina || !data.ejercicios || data.ejercicios.length === 0) {
            throw new Error("La rutina o los ejercicios no están disponibles.");
        }

     
        mostrarDatosRutina(data); 
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
}


function mostrarDatosRutina(data) {
    const rutinaContainer = document.getElementById('rutina');
    const ejerciciosContainer = document.getElementById('ejercicios');

    rutinaContainer.innerHTML = '';
    ejerciciosContainer.innerHTML = '';

  
    rutinaContainer.innerHTML = `
        <h2> ${data.rutina.nombre_rutina}</h2>
        <p> ${data.rutina.descripcion}</p>
        <p> ${data.rutina.dia}</p>
    `;

  
    data.ejercicios.forEach(ejercicio => {
        const ejercicioElement = document.createElement('div');
        ejercicioElement.innerHTML = `
            <h3>${ejercicio.nombre_ejercicio}</h3>
            <img src="${ejercicio.apoyo_visual}" alt="${ejercicio.nombre_ejercicio}" style="max-width: 200px;">
            <p>Series: ${ejercicio.num_series}</p>
            <p>Repeticiones: ${ejercicio.repeticiones}</p>
        `;
        ejerciciosContainer.appendChild(ejercicioElement);
    });
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}


function CerrarSesion() {
    deleteCookie('userRole');
    deleteCookie('userId');
    localStorage.clear();
    window.location.href = 'Login.html'; 
}
