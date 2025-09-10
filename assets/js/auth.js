// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Configurar los botones de mostrar/ocultar contraseña
    setupPasswordToggles();
    
    // Configurar el botón de inicio de sesión
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
    
    // Configurar el botón de registro
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', handleRegister);
    }
});

// Configurar los botones para mostrar/ocultar contraseña
function setupPasswordToggles() {
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            togglePasswordVisibility('password', this);
        });
    }
    
    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', function() {
            togglePasswordVisibility('confirmPassword', this);
        });
    }
}

// Alternar la visibilidad de la contraseña
function togglePasswordVisibility(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Manejar el inicio de sesión
function handleLogin() {
    const documento = document.getElementById('documento').value.trim();
    const password = document.getElementById('password').value;
    
    // Validar campos
    if (!documento || !password) {
        showError('Por favor complete todos los campos');
        return;
    }
    
    // Verificar si es admin
    if (documento === 'admin' && password === 'admin') {
        localStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'admin_dashboard.html';
        return;
    }
    
    // Obtener usuarios registrados
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Buscar usuario
    const user = users.find(u => u.documento === documento && u.password === password);
    
    if (user) {
        // Guardar información del usuario actual (método original)
        localStorage.setItem('currentUser', JSON.stringify({
            nombre: user.nombre,
            documento: user.documento,
            cargo: user.cargo
        }));
        
        // Guardar información del usuario en el formato que espera dashboard.js
        localStorage.setItem('userData', JSON.stringify({
            nombre: user.nombre,
            documento: user.documento,
            cargo: user.cargo
        }));
        
        // También guardar los valores individuales para la verificación inicial
        localStorage.setItem('userName', user.nombre);
        localStorage.setItem('userDocument', user.documento);
        localStorage.setItem('userRole', user.cargo);
        
        // Redirigir al dashboard
        window.location.href = 'dashboard.html';
    } else {
        showError('Documento o contraseña incorrectos');
    }
}

// Manejar el registro
function handleRegister() {
    const nombre = document.getElementById('nombre').value.trim();
    const documento = document.getElementById('documento').value.trim();
    const cargo = document.getElementById('cargo').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validar campos
    if (!nombre || !documento || !cargo || !password || !confirmPassword) {
        showError('Por favor complete todos los campos');
        return;
    }
    
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        showError('Las contraseñas no coinciden');
        return;
    }
    
    // Obtener usuarios registrados
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verificar si el usuario ya existe
    if (users.some(u => u.documento === documento)) {
        showError('Ya existe un usuario con este documento');
        return;
    }
    
    // Agregar nuevo usuario
    users.push({
        nombre,
        documento,
        cargo,
        password
    });
    
    // Guardar usuarios
    localStorage.setItem('users', JSON.stringify(users));
    
    // Mostrar mensaje de éxito
    alert('Registro exitoso. Ahora puede iniciar sesión.');
    
    // Redirigir a la página de inicio de sesión
    window.location.href = 'login.html';
}

// Mostrar mensaje de error
function showError(message) {
    // Verificar si ya existe un mensaje de error
    let errorElement = document.querySelector('.error-message');
    
    if (!errorElement) {
        // Crear elemento de error
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        
        // Insertar después del encabezado
        const authHeader = document.querySelector('.auth-header');
        authHeader.parentNode.insertBefore(errorElement, authHeader.nextSibling);
    }
    
    // Mostrar mensaje
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 3000);
}
