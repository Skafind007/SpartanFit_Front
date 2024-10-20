
//VARIABLES DE SESION 
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

        if (userRole !== '1') {
            window.location.href = 'Error.html'; 
        }
    };

    function CerrarSesion() {
        deleteCookie('userRole');
        deleteCookie('userId');
        localStorage.clear();
        window.location.href = 'Login.html'; 
    }
