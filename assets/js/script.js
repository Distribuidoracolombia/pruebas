let timerInterval;
let tiempoRestante;
let currentUser;
let activeTest = null;

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!localStorage.getItem('userRole') || localStorage.getItem('userRole') !== 'user') {
        window.location.href = 'login.html';
        return;
    }
    
    // Get current user
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Display user info
    document.getElementById('userName').textContent = currentUser.fullName;
    document.getElementById('userProfile').innerHTML = `
        <p><strong>Nombre:</strong> ${currentUser.fullName}</p>
        <p><strong>Cargo:</strong> ${currentUser.position}</p>
        <p><strong>Documento:</strong> ${currentUser.docType} ${currentUser.docNumber}</p>
    `;
    
    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('userRole');
        localStorage.removeItem('username');
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
    
    // Setup file upload forms
    setupFileUploads();
    
    // Display user results
    displayUserResults();
    
    // Disable buttons for completed tests
    disableCompletedTests();
});

function iniciarSeccion(seccion, minutos) {
    // Check if user is logged in
    if (!currentUser) {
        alert('Debe iniciar sesión para realizar las pruebas');
        window.location.href = 'login.html';
        return;
    }
    
    // Set active test
    activeTest = seccion;
    
    // Detener temporizador anterior si existe
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Configurar tiempo en segundos
    tiempoRestante = minutos * 60;
    
    // Actualizar el temporizador inmediatamente
    actualizarTemporizador();
    
    // Configurar intervalo para actualizar cada segundo
    timerInterval = setInterval(function() {
        tiempoRestante--;
        
        if (tiempoRestante <= 0) {
            clearInterval(timerInterval);
            alert("¡Tiempo terminado! Por favor guarde su trabajo y suba sus resultados.");
            
            // Show upload section
            document.getElementById(`upload${getTestId(seccion)}`).style.display = 'block';
            
            // Disable test button
            document.getElementById(`${getTestId(seccion)}Btn`).disabled = true;
            
            return;
        }
        
        actualizarTemporizador();
    }, 1000);
    
    // Abrir la sección correspondiente
    switch(seccion) {
        case 'teorica':
            window.open('examen_teorico.html', '_blank');
            break;
        case 'practica-basico':
            window.open('instrucciones_practicas.html?nivel=basico', '_blank');
            break;
        case 'practica-intermedio':
            window.open('instrucciones_practicas.html?nivel=intermedio', '_blank');
            break;
        case 'proyecto':
            window.open('instrucciones_practicas.html?nivel=proyecto', '_blank');
            break;
    }
}

function actualizarTemporizador() {
    const horas = Math.floor(tiempoRestante / 3600);
    const minutos = Math.floor((tiempoRestante % 3600) / 60);
    const segundos = tiempoRestante % 60;
    
    document.getElementById('timer').textContent = 
        `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

function getTestId(testType) {
    switch(testType) {
        case 'teorica': return 'Teorica';
        case 'practica-basico': return 'Basico';
        case 'practica-intermedio': return 'Intermedio';
        case 'proyecto': return 'Proyecto';
        default: return testType;
    }
}

function getTestName(testType) {
    switch(testType) {
        case 'teorica': return 'Prueba Teórica';
        case 'practica-basico': return 'Prueba Práctica Básica';
        case 'practica-intermedio': return 'Prueba Práctica Intermedia';
        case 'proyecto': return 'Proyecto Integrador';
        default: return testType;
    }
}

function setupFileUploads() {
    const uploadForms = document.querySelectorAll('.upload-form');
    
    uploadForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const testType = this.getAttribute('data-test-type');
            const fileInput = this.querySelector('.file-input');
            const file = fileInput.files[0];
            
            if (!file) {
                alert('Por favor seleccione un archivo');
                return;
            }
            
            // In a real application, you would upload the file to a server
            // For this demo, we'll simulate file storage using localStorage
            
            // Create a file URL (in a real app, this would be the server URL)
            const fileUrl = URL.createObjectURL(file);
            
            // Store file info
            const fileInfo = {
                name: file.name,
                type: file.type,
                size: file.size,
                url: fileUrl,
                uploadDate: new Date().toISOString()
            };
            
            // Add to user's results
            if (!currentUser.results) {
                currentUser.results = [];
            }
            
            // Check if result for this test already exists
            const existingResultIndex = currentUser.results.findIndex(r => r.testType === testType);
            
            if (existingResultIndex >= 0) {
                // Add file to existing result
                if (!currentUser.results[existingResultIndex].files) {
                    currentUser.results[existingResultIndex].files = [];
                }
                currentUser.results[existingResultIndex].files.push(fileInfo);
            } else {
                // Create new result
                const result = {
                    testType: testType,
                    score: Math.floor(Math.random() * 100), // Simulated score
                    date: new Date().toISOString(),
                    files: [fileInfo]
                };
                
                currentUser.results.push(result);
            }
            
            // Add to completed tests
            if (!currentUser.completedTests) {
                currentUser.completedTests = [];
            }
            if (!currentUser.completedTests.includes(testType)) {
                currentUser.completedTests.push(testType);
            }
            
            // Update user in localStorage
            updateCurrentUser();
            
            // Display uploaded file
            const uploadedFilesContainer = this.nextElementSibling;
            const fileElement = document.createElement('div');
            fileElement.className = 'uploaded-file';
            fileElement.innerHTML = `
                <span>${file.name}</span>
                <a href="${fileUrl}" target="_blank" class="view-file">Ver</a>
            `;
            uploadedFilesContainer.appendChild(fileElement);
            
            // Clear file input
            fileInput.value = '';
            
            // Update results display
            displayUserResults();
            
            // Disable test button
            document.getElementById(`${getTestId(testType)}Btn`).disabled = true;
            
            alert('Archivo subido correctamente');
        });
    });
}

function updateCurrentUser() {
    // Update current user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update user in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    
    if (userIndex >= 0) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function displayUserResults() {
    const resultsContainer = document.getElementById('userResults');
    
    if (!currentUser.results || currentUser.results.length === 0) {
        resultsContainer.innerHTML = '<p>No hay resultados disponibles</p>';
        return;
    }
    
    let resultsHTML = '<div class="user-results-table">';
    resultsHTML += `
        <div class="result-row header">
            <div class="result-cell">Prueba</div>
            <div class="result-cell">Puntuación</div>
            <div class="result-cell">Nivel</div>
            <div class="result-cell">Fecha</div>
            <div class="result-cell">Archivos</div>
        </div>
    `;
    
    // Sort results by date (newest first)
    currentUser.results.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    currentUser.results.forEach(result => {
        // Determine level based on score
        let level = 'Básico';
        if (result.score > 70) {
            level = 'Avanzado';
        } else if (result.score > 40) {
            level = 'Intermedio';
        }
        
        // Format date
        const date = new Date(result.date);
        const formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
        
        // Format files
        let filesHTML = '';
        if (result.files && result.files.length) {
            result.files.forEach(file => {
                filesHTML += `<a href="${file.url}" target="_blank" class="file-link">${file.name}</a><br>`;
            });
        } else {
            filesHTML = 'No hay archivos';
        }
        
        resultsHTML += `
            <div class="result-row">
                <div class="result-cell">${getTestName(result.testType)}</div>
                <div class="result-cell">${result.score}/100</div>
                <div class="result-cell">${level}</div>
                <div class="result-cell">${formattedDate}</div>
                <div class="result-cell">${filesHTML}</div>
            </div>
        `;
    });
    
    resultsHTML += '</div>';
    resultsContainer.innerHTML = resultsHTML;
}

function disableCompletedTests() {
    // Check if user has completed tests
    if (!currentUser.completedTests || !Array.isArray(currentUser.completedTests)) {
        return;
    }
    
    // Disable buttons for completed tests
    currentUser.completedTests.forEach(testType => {
        const buttonId = `${getTestId(testType)}Btn`;
        const button = document.getElementById(buttonId);
        
        if (button) {
            button.disabled = true;
            button.classList.add('disabled');
        }
        
        // Show upload section
        const uploadId = `upload${getTestId(testType)}`;
        const uploadSection = document.getElementById(uploadId);
        
        if (uploadSection) {
            uploadSection.style.display = 'block';
        }
    });
}