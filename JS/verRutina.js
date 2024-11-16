document.addEventListener("DOMContentLoaded", async () => {
    const id_rutina = localStorage.getItem("id_rutina");

    if (!id_rutina) {
        console.error("No se encontró el ID de la rutina en localStorage");
        return;
    }

    try {
        const response = await fetch(`http://localhost:7007/DetallesRutina?id_rutina=${id_rutina}`);
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);

        const data = await response.json();
        const rutina = data.rutina;
        const ejercicios = data.ejercicios;

        // Mostrar detalles de la rutina
        document.getElementById("nombreRutina").innerText = rutina.nombre_rutina;
        document.getElementById("descripcionRutina").innerText = rutina.descripcion;
        document.getElementById("diaRutina").innerText = `Día: ${rutina.dia}`;

        // Mostrar ejercicios
        const ejerciciosContainer = document.getElementById("ejerciciosContainer");
        ejercicios.forEach(ejercicio => {
            const ejercicioElement = document.createElement("div");
            ejercicioElement.innerHTML = `
                <h3>${ejercicio.nombre_ejercicio}</h3>
                <img src="${ejercicio.apoyo_visual}" alt="${ejercicio.nombre_ejercicio}" />
                <p>Series: ${ejercicio.num_series}</p>
                <p>Repeticiones: ${ejercicio.repeticiones}</p>
            `;
            ejerciciosContainer.appendChild(ejercicioElement);
        });
    } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
    }
});

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
