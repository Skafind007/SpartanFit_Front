document.addEventListener("DOMContentLoaded", async () => {
    const id_plan_alimenticio = 6;

   
    console.log(id_plan_alimenticio);

    try {
        console.log("Solicitando datos para el ID:", id_plan_alimenticio);

        const response = await fetch(`http://localhost:7007/api/PlanAlimenticio/DetallesPlanAlimenticio?id_plan_alimenticio=${id_plan_alimenticio}`);
        
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);

        const data = await response.json();

        if (!data.plan || !data.alimentos) {
            throw new Error("La respuesta de la API no tiene la estructura esperada.");
        }

        const plan = data.plan;
        const alimentos = data.alimentos;

        // Mostrar datos del plan
        document.getElementById("diaPlan").innerText = ` ${plan.dia}`;

        // Mostrar alimentos
        const alimentosContainer = document.getElementById("alimentosContainer");
        alimentos.forEach(alimento => {
            const alimentoElement = document.createElement("div");
            alimentoElement.innerHTML = `
                <h3>${alimento.nombre}</h3>
                <p>Calorías por gramo: ${alimento.calorias_x_gramo}</p>
                <p>Grasa: ${alimento.grasa}</p>
                <p>Carbohidrato: ${alimento.carbohidrato}</p>
                <p>Proteína: ${alimento.proteina}</p>
                <p>Fibra: ${alimento.fibra}</p>
            `;
            alimentosContainer.appendChild(alimentoElement);
        });
    } catch (error) {
        console.error("Error al obtener los datos de la API:", error.message);
        console.error("Detalles:", error);
    }
});

// Función para obtener una cookie específica
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Función para eliminar una cookie
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

// Función para cerrar sesión
function CerrarSesion() {
    deleteCookie('userRole');
    deleteCookie('userId');
    localStorage.clear();
    window.location.href = 'Login.html';
}
