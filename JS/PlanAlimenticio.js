window.onload = function() {
    const userRole = getCookie('userRole');

    if (userRole !== '1') {
        window.location.href = 'Error.html'; 
    } else {
        mostrarPlanAlimenticioDia();  
    }
};

async function mostrarPlanAlimenticioDia() {
    const userId = getCookie('userId'); 

    if (!userId) {
        alert('No se encontró el ID de usuario en las cookies.');
        return;
    }

    try {
        const response = await fetch(`https://localhost:7007/Usuario/MostrarPlanAlimenticioDia?id_usuario=${userId}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("No se encontró el plan alimenticio o los alimentos para el día.");
            }
            throw new Error("Se produjo un error al recuperar los datos.");
        }

        const data = await response.json();

        if (!data.planAlimenticio || !data.alimentos || data.alimentos.length === 0) {
            throw new Error("El plan alimenticio o los alimentos no están disponibles.");
        }

        mostrarDatosPlanAlimenticio(data); 
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
}

function mostrarDatosPlanAlimenticio(data) {
    const planContainer = document.getElementById('plan');
    const alimentosContainer = document.getElementById('alimentos');

    // Limpiar contenido previo
    planContainer.innerHTML = '';
    alimentosContainer.innerHTML = '';

    // Mostrar los datos del plan alimenticio
    planContainer.innerHTML = `
        <h2>Plan Alimenticio del Día:</h2>
        <p>${data.planAlimenticio.dia}</p>
        <p>${data.planAlimenticio.descripcion}</p>
    `;

    // Mostrar los alimentos
    data.alimentos.forEach(alimento => {
        const alimentoElement = document.createElement('div');
        alimentoElement.innerHTML = `
            <h3>${alimento.nombre}</h3>
            <p>Calorías por gramo: ${alimento.calorias_x_gramo}</p>
            <p>Grasa: ${alimento.grasa} g</p>
            <p>Carbohidratos: ${alimento.carbohidrato} g</p>
            <p>Proteína: ${alimento.proteina} g</p>
            <p>Fibra: ${alimento.fibra} g</p>
        `;
        alimentosContainer.appendChild(alimentoElement);
    });
}

// Funciones de sesión y cookies
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
