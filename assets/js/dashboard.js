// Check if user is logged in
window.onload = function() {
    // Get user data from localStorage
    const userName = localStorage.getItem('userName');
    const userDocument = localStorage.getItem('userDocument');
    const userRole = localStorage.getItem('userRole');
    
    // If no user data, redirect to login
    if (!userName || !userDocument || !userRole) {
        window.location.href = 'login.html';
        return;
    }
    
    // Update user info in the dashboard
    document.getElementById('userName').textContent = userName;
    document.getElementById('userDocument').textContent = userDocument;
    document.getElementById('userRole').textContent = userRole;
    
    // Update test buttons based on attempts
    updateTestButtons();
};

// Function to check test attempts
// Function to check test attempts
function checkTestAttempts(testType, nivel) {
    const userDocument = localStorage.getItem('userDocument');
    
    if (!userDocument) return 0;
    
    let attempts = 0;
    
    if (testType === 'teorica') {
        // Check theoretical test attempts
        const testResults = JSON.parse(localStorage.getItem('testResults') || '[]');
        attempts = testResults.filter(result => 
            result.documento === userDocument && 
            result.nivel === nivel
        ).length;
        
        console.log(`Theoretical attempts for ${userDocument}, level ${nivel}: ${attempts}`);
        console.log('Test results:', testResults);
    } else if (testType === 'practica') {
        // Check practical test attempts
        const practicalResults = JSON.parse(localStorage.getItem('practicalResults') || '[]');
        attempts = practicalResults.filter(result => 
            result.documento === userDocument && 
            result.nivel === nivel
        ).length;
        
        console.log(`Practical attempts for ${userDocument}, level ${nivel}: ${attempts}`);
        console.log('Practical results:', practicalResults);
    } else if (testType === 'proyecto') {
        // Check project attempts
        const projectResults = JSON.parse(localStorage.getItem('projectResults') || '[]');
        attempts = projectResults.filter(result => 
            result.documento === userDocument
        ).length;
        
        console.log(`Project attempts for ${userDocument}: ${attempts}`);
        console.log('Project results:', projectResults);
    }
    
    return attempts;
}

// Function to update test buttons based on attempts
function updateTestButtons() {
    // Update theoretical test buttons
    const teoricaBasicaBtn = document.getElementById('teoricaBasicaBtn');
    const teoricaIntermedioBtn = document.getElementById('teoricaIntermedioBtn');
    
    // Update practical test buttons
    const practicaBasicaBtn = document.getElementById('practicaBasicaBtn');
    const practicaIntermedioBtn = document.getElementById('practicaIntermedioBtn');
    
    // Update project button
    const proyectoIntegradorBtn = document.getElementById('proyectoIntegradorBtn');
    
    // Check attempts for each test type
    const basicoTeoricoAttempts = checkTestAttempts('teorica', 'basico');
    const intermedioTeoricoAttempts = checkTestAttempts('teorica', 'intermedio');
    const basicoPracticoAttempts = checkTestAttempts('practica', 'basico');
    const intermedioPracticoAttempts = checkTestAttempts('practica', 'intermedio');
    const proyectoAttempts = checkTestAttempts('proyecto', '');
    
    // Update button states and text
    if (teoricaBasicaBtn) {
        updateButtonState(teoricaBasicaBtn, basicoTeoricoAttempts, 'Iniciar Prueba Teórica Básica');
    }
    
    if (teoricaIntermedioBtn) {
        updateButtonState(teoricaIntermedioBtn, intermedioTeoricoAttempts, 'Iniciar Prueba Teórica Intermedia');
    }
    
    if (practicaBasicaBtn) {
        updateButtonState(practicaBasicaBtn, basicoPracticoAttempts, 'Iniciar Prueba Básica');
    }
    
    if (practicaIntermedioBtn) {
        updateButtonState(practicaIntermedioBtn, intermedioPracticoAttempts, 'Iniciar Prueba Intermedia');
    }
    
    if (proyectoIntegradorBtn) {
        updateButtonState(proyectoIntegradorBtn, proyectoAttempts, 'Iniciar Proyecto Integrador');
    }
}

// Function to update button state based on attempts
function updateButtonState(button, attempts, testName) {
    // Find the icon element
    const iconHTML = button.innerHTML.split('</i>')[0] + '</i> ';
    
    if (attempts >= 2) {
        button.disabled = true;
        button.classList.add('disabled');
        button.innerHTML = iconHTML + testName + ' <span class="attempts-badge">Límite alcanzado</span>';
    } else {
        button.disabled = false;
        button.classList.remove('disabled');
        button.innerHTML = iconHTML + testName + ' <span class="attempts-badge">' + attempts + '/2 intentos</span>';
    }
}

// User session management
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkUserSession();
    
    // Load user attempts for each test
    loadUserAttempts();
});

// Check if user is logged in
function checkUserSession() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        // Redirect to login if no user data found
        window.location.href = 'index.html';
        return;
    }
    
    // Display user information
    document.getElementById('userName').textContent = userData.nombre || 'Usuario';
    document.getElementById('userRole').textContent = userData.cargo || 'Cargo';
    document.getElementById('userDocument').textContent = userData.documento || 'Documento';
}

// Load user attempts for each test
function loadUserAttempts() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.documento) return;
    
    const userId = userData.documento;
    
    // Get attempts from localStorage
    const attempts = JSON.parse(localStorage.getItem(`attempts_${userId}`)) || {
        teoricaBasico: 0,
        teoricaIntermedio: 0,
        practicaBasico: 0,
        practicaIntermedio: 0,
        proyecto: 0
    };
    
    // Update attempts badges
    document.querySelector('#teoricaBasicaBtn .attempts-badge').textContent = `${attempts.teoricaBasico}/2 intentos`;
    document.querySelector('#teoricaIntermedioBtn .attempts-badge').textContent = `${attempts.teoricaIntermedio}/2 intentos`;
    document.querySelector('#practicaBasicaBtn .attempts-badge').textContent = `${attempts.practicaBasico}/2 intentos`;
    document.querySelector('#practicaIntermedioBtn .attempts-badge').textContent = `${attempts.practicaIntermedio}/2 intentos`;
    document.querySelector('#proyectoIntegradorBtn .attempts-badge').textContent = `${attempts.proyecto}/2 intentos`;
    
    // Disable buttons if max attempts reached
    if (attempts.teoricaBasico >= 2) {
        document.getElementById('teoricaBasicaBtn').classList.add('disabled');
        document.getElementById('teoricaBasicaBtn').onclick = function() { return false; };
    }
    
    if (attempts.teoricaIntermedio >= 2) {
        document.getElementById('teoricaIntermedioBtn').classList.add('disabled');
        document.getElementById('teoricaIntermedioBtn').onclick = function() { return false; };
    }
    
    if (attempts.practicaBasico >= 2) {
        document.getElementById('practicaBasicaBtn').classList.add('disabled');
        document.getElementById('practicaBasicaBtn').onclick = function() { return false; };
    }
    
    if (attempts.practicaIntermedio >= 2) {
        document.getElementById('practicaIntermedioBtn').classList.add('disabled');
        document.getElementById('practicaIntermedioBtn').onclick = function() { return false; };
    }
    
    if (attempts.proyecto >= 2) {
        document.getElementById('proyectoIntegradorBtn').classList.add('disabled');
        document.getElementById('proyectoIntegradorBtn').onclick = function() { return false; };
    }
}

// Function to start theoretical test
function startTheoreticalTest(level) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.documento) {
        alert('Debe iniciar sesión para realizar la prueba');
        window.location.href = 'index.html';
        return;
    }
    
    const userId = userData.documento;
    
    // Get attempts from localStorage
    const attempts = JSON.parse(localStorage.getItem(`attempts_${userId}`)) || {
        teoricaBasico: 0,
        teoricaIntermedio: 0,
        practicaBasico: 0,
        practicaIntermedio: 0,
        proyecto: 0
    };
    
    // Check if max attempts reached
    const attemptKey = level === 'basico' ? 'teoricaBasico' : 'teoricaIntermedio';
    if (attempts[attemptKey] >= 2) {
        alert('Ha alcanzado el máximo de intentos permitidos para esta prueba');
        return;
    }
    
    // Increment attempt count
    attempts[attemptKey]++;
    localStorage.setItem(`attempts_${userId}`, JSON.stringify(attempts));
    
    // Store test information
    const testInfo = {
        type: 'teorica',
        level: level,
        userId: userId,
        startTime: new Date().getTime(),
        timeLimit: 60 * 60 * 1000 // 60 minutes in milliseconds
    };
    
    localStorage.setItem('currentTest', JSON.stringify(testInfo));
    
    // Redirect to the appropriate test page
    window.location.href = `examen_teorico_${level}.html`;
}

// Function to start practical test
function startPracticalTest(level) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.documento) {
        alert('Debe iniciar sesión para realizar la prueba');
        window.location.href = 'index.html';
        return;
    }
    
    const userId = userData.documento;
    
    // Get attempts from localStorage
    const attempts = JSON.parse(localStorage.getItem(`attempts_${userId}`)) || {
        teoricaBasico: 0,
        teoricaIntermedio: 0,
        practicaBasico: 0,
        practicaIntermedio: 0,
        proyecto: 0
    };
    
    // Check if max attempts reached
    const attemptKey = level === 'basico' ? 'practicaBasico' : 'practicaIntermedio';
    if (attempts[attemptKey] >= 2) {
        alert('Ha alcanzado el máximo de intentos permitidos para esta prueba');
        return;
    }
    
    // Increment attempt count
    attempts[attemptKey]++;
    localStorage.setItem(`attempts_${userId}`, JSON.stringify(attempts));
    
    // Store test information
    const testInfo = {
        type: 'practica',
        level: level,
        userId: userId,
        startTime: new Date().getTime(),
        timeLimit: 40 * 60 * 1000 // 40 minutes in milliseconds
    };
    
    localStorage.setItem('currentTest', JSON.stringify(testInfo));
    
    // Redirect to the appropriate test page
    window.location.href = `examen_practico_${level}.html`;
}

// Function to start integrator project
function startProject() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.documento) {
        alert('Debe iniciar sesión para realizar el proyecto');
        window.location.href = 'index.html';
        return;
    }
    
    const userId = userData.documento;
    
    // Get attempts from localStorage
    const attempts = JSON.parse(localStorage.getItem(`attempts_${userId}`)) || {
        teoricaBasico: 0,
        teoricaIntermedio: 0,
        practicaBasico: 0,
        practicaIntermedio: 0,
        proyecto: 0
    };
    
    // Check if max attempts reached
    if (attempts.proyecto >= 2) {
        alert('Ha alcanzado el máximo de intentos permitidos para este proyecto');
        return;
    }
    
    // Increment attempt count
    attempts.proyecto++;
    localStorage.setItem(`attempts_${userId}`, JSON.stringify(attempts));
    
    // Store test information
    const testInfo = {
        type: 'proyecto',
        userId: userId,
        startTime: new Date().getTime(),
        timeLimit: 40 * 60 * 1000 // 40 minutes in milliseconds
    };
    
    localStorage.setItem('currentTest', JSON.stringify(testInfo));
    
    // Redirect to the project page
    window.location.href = 'proyecto_integrador.html';
}

// Function to log out
function cerrarSesion() {
    localStorage.removeItem('userData');
    localStorage.removeItem('currentTest');
    window.location.href = 'index.html';
}