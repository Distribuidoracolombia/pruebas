document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Admin login
        if (username === 'admin' && password === 'admin') {
            // Store admin session
            localStorage.setItem('userRole', 'admin');
            localStorage.setItem('username', username);
            
            // Redirect to admin dashboard
            window.location.href = 'admin_dashboard.html';
        } 
        // User login - check if user exists in localStorage
        else {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                // Store user session
                localStorage.setItem('userRole', 'user');
                localStorage.setItem('username', username);
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Redirect to user dashboard
                window.location.href = 'index.html';
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        }
    });
});

// Login functionality
function iniciarSesion() {
    // Get input values
    const documento = document.getElementById('documento').value;
    const nombre = document.getElementById('nombre').value;
    const cargo = document.getElementById('cargo').value;
    
    // Validate inputs
    if (!documento || !nombre || !cargo) {
        document.getElementById('errorMessage').textContent = 'Por favor complete todos los campos';
        return;
    }
    
    // Store user data in localStorage
    localStorage.setItem('userDocument', documento);
    localStorage.setItem('userName', nombre);
    localStorage.setItem('userRole', cargo);
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

// Add event listener for Enter key
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                iniciarSesion();
            }
        });
    });
});