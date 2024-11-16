
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('registroEntrenador-form');
            
            form.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') { 
                    event.preventDefault(); 
                    RegistrarEntrenador(); 
                }
            });
        });

        function convertirCadenaABinario(texto) {
            let resultadoBinario = '';
        
            for (let i = 0; i < texto.length; i++) {
                
                let binario = texto.charCodeAt(i).toString(2);
             
                binario = binario.padStart(8, '0');
                resultadoBinario += binario;
            }
        
            return resultadoBinario;
        }
     
        function RegistrarEntrenador() {
    const form = document.getElementById('registroEntrenador-form');

    if (form.checkValidity()) {
        let password = document.getElementById('contrasena').value;
        let passwordBinario = convertirCadenaABinario(password);
        const persona = {
            id_rol: 2,
            nombres: document.getElementById('nombres').value,
            apellidos: document.getElementById('apellidos').value,
            correo: document.getElementById('correo').value,
            contrasena: passwordBinario,
            fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
            genero: document.getElementById('genero').value
        };
        
        console.log('EntrenadorData:', persona); 
        
        fetch('http://localhost:7007/api/Administrador/RegistrarEntrenador', { 
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

        function cancelar() {
            window.location.href = 'MostrarEntrenadores.html'; 
        }
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
            
                if (userRole !== '3') {
                    window.location.href = 'Error.html'; 
                }
            };
            