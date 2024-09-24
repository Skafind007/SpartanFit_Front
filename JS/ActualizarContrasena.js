document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contrasena-form');
    
    form.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { 
            event.preventDefault(); 
            BuscarCorreo(); 
        }
    });
    });
        async function Restablecer() {
            const form = document.getElementById('contrasena-form');

            if (form.checkValidity()) {
                const formData = new FormData(form);

                try {
                    const response = await fetch('https://localhost:7007/api/Persona/RestablecerContrasena', { 
                        method: 'POST',
                        body: formData
                    });

                    if (response.ok) {
                        const result = await response.text(); 
                        showMessage(result,'success');
                        setTimeout(() => {
                    window.location.href = 'Login.html';
                }, 2000);
        
                    } else {
                        const error = await response.text();
                        showMessage(`Error: ${error}`, 'error');
                    }
                } catch (error) {
                    console.error('Fetch error:', error);
                    showMessage(`Error: ${error.message || 'Desconocido'}`, 'error');
                }
            } else {
                showMessage('Ingresa los campos ');
            }
        }

        function showMessage(message, type) {
            const messageModal = document.getElementById('messageModal');
           
            
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