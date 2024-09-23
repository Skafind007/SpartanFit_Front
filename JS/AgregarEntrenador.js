
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('registroEntrenador-form');
            
            form.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') { 
                    event.preventDefault(); 
                    RegistrarEntrenador(); 
                }
            });
        });
     
        function RegistrarEntrenador() {
    const form = document.getElementById('registroEntrenador-form');

    if (form.checkValidity()) {
        const persona = {
            id_rol: 2,
            nombres: document.getElementById('nombres').value,
            apellidos: document.getElementById('apellidos').value,
            correo: document.getElementById('correo').value,
            contrasena: document.getElementById('contrasena').value,
            fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
            genero: document.getElementById('genero').value
        };
        
        console.log('EntrenadorData:', persona); 
        
        fetch('https://localhost:7007/api/Administrador/RegistrarEntrenador', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(persona)
        })
        .then(response => {
            if (response.ok) {
                showMessage('¡Entrenador creado exitosamente!', 'success');
                setTimeout(() => {
                    window.location.href = 'MostrarEntrenadores.html';
                }, 2000);
            } else {                           
                showMessage('El correo ya está registrado', 'error');
            }
        })
        .catch(error => {
            console.log('Fetch error:', error);
            showMessage(`Error: ${error.message || 'Desconocido'}`, 'error');
        });
    } else {
        showMessage('Por favor, completa todos los campos requeridos.', 'error');
    }
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
            
            messageModal.style.display = 'flex'; // Mostrar el modal
        }

        function closeMessageModal() {
            document.getElementById('messageModal').style.display = 'none';
        }
      
        function confirmarCancelar() {
            document.getElementById('cancelModal').style.display = 'flex'; // Mostrar el modal de cancelación
        }

        function closeModal() {
            document.getElementById('cancelModal').style.display = 'none';
        }

        function cancelar() {
            window.location.href = 'MostrarEntrenadores.html'; 
        }
    