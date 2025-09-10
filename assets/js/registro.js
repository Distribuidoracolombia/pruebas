document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const docTypeSelect = document.getElementById('docType');
    const docNumberInput = document.getElementById('docNumber');
    const docError = document.getElementById('docError');
    
    // Validate document number based on document type
    docTypeSelect.addEventListener('change', function() {
        docNumberInput.value = '';
        docError.textContent = '';
        
        // Set pattern based on document type
        switch(this.value) {
            case 'CC':
                docNumberInput.setAttribute('pattern', '[0-9]{8,10}');
                docNumberInput.setAttribute('title', 'Debe contener entre 8 y 10 dígitos numéricos');
                break;
            case 'CE':
                docNumberInput.setAttribute('pattern', '[0-9]{6,12}');
                docNumberInput.setAttribute('title', 'Debe contener entre 6 y 12 dígitos numéricos');
                break;
            case 'TI':
                docNumberInput.setAttribute('pattern', '[0-9]{10,11}');
                docNumberInput.setAttribute('title', 'Debe contener 10 u 11 dígitos numéricos');
                break;
            case 'PP':
                docNumberInput.setAttribute('pattern', '[A-Z0-9]{6,12}');
                docNumberInput.setAttribute('title', 'Debe contener entre 6 y 12 caracteres alfanuméricos');
                break;
            default:
                docNumberInput.removeAttribute('pattern');
        }
    });
    
    // Validate document number on input
    docNumberInput.addEventListener('input', function() {
        const docType = docTypeSelect.value;
        const value = this.value;
        
        if (docType === 'CC' && !/^[0-9]{0,10}$/.test(value)) {
            docError.textContent = 'Cédula debe contener solo números (máximo 10 dígitos)';
        } else if (docType === 'CE' && !/^[0-9]{0,12}$/.test(value)) {
            docError.textContent = 'Cédula de extranjería debe contener solo números (máximo 12 dígitos)';
        } else if (docType === 'TI' && !/^[0-9]{0,11}$/.test(value)) {
            docError.textContent = 'Tarjeta de identidad debe contener solo números (máximo 11 dígitos)';
        } else if (docType === 'PP' && !/^[A-Z0-9]{0,12}$/.test(value)) {
            docError.textContent = 'Pasaporte debe contener letras mayúsculas y números (máximo 12 caracteres)';
        } else {
            docError.textContent = '';
        }
    });
    
    // Form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate document number
        if (docError.textContent) {
            alert('Por favor corrija los errores en el formulario');
            return;
        }
        
        // Get form data
        const userData = {
            fullName: document.getElementById('fullName').value,
            position: document.getElementById('position').value,
            docType: docTypeSelect.value,
            docNumber: docNumberInput.value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            results: [],
            completedTests: []
        };
        
        // Save user data
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if username already exists
        if (users.some(user => user.username === userData.username)) {
            alert('Este nombre de usuario ya existe. Por favor elija otro.');
            return;
        }
        
        // Add new user
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Registro exitoso. Ahora puede iniciar sesión.');
        window.location.href = 'login.html';
    });
});