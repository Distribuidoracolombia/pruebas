// Función para enviar el examen
function submitTest() {
    if (confirm('¿Está seguro que desea finalizar la prueba?')) {
        // Obtener información del usuario actual
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const documento = currentUser.documento || '';
        
        // Calcular puntuación
        let score = 0;
        let totalAnswered = 0;
        let resultDetails = [];
        
        for (let i = 1; i <= totalQuestions; i++) {
            if (userAnswers[i]) {
                totalAnswered++;
                const isCorrect = userAnswers[i] === questions[i-1].correctAnswer;
                if (isCorrect) {
                    score++;
                }
                
                // Almacenar detalles para la página de resultados
                resultDetails.push({
                    questionNumber: i,
                    questionText: questions[i-1].text,
                    userAnswer: userAnswers[i],
                    correctAnswer: questions[i-1].correctAnswer,
                    isCorrect: isCorrect,
                    options: questions[i-1].options
                });
            } else {
                // Preguntas sin responder
                resultDetails.push({
                    questionNumber: i,
                    questionText: questions[i-1].text,
                    userAnswer: null,
                    correctAnswer: questions[i-1].correctAnswer,
                    isCorrect: false,
                    options: questions[i-1].options
                });
            }
        }
        
        // Guardar resultados en localStorage
        const testResult = {
            documento: documento,
            nivel: nivel,
            score: score,
            totalQuestions: totalQuestions,
            totalAnswered: totalAnswered,
            details: resultDetails,
            date: new Date().toISOString()
        };
        
        // Almacenar resultados de forma segura
        try {
            let results = [];
            const existingResults = localStorage.getItem('testResults');
            if (existingResults) {
                results = JSON.parse(existingResults);
            }
            results.push(testResult);
            localStorage.setItem('testResults', JSON.stringify(results));
            
            // Almacenar resultado actual para la página de resultados
            localStorage.setItem('currentTestResult', JSON.stringify(testResult));
            
            console.log("Prueba teórica guardada correctamente:", testResult);
            
            // Enviar resultados por correo
            sendResultsByEmail(testResult).then(emailSent => {
                // Marcar si el correo fue enviado
                testResult.emailSent = emailSent;
                localStorage.setItem('currentTestResult', JSON.stringify(testResult));
                
                // Navegar a la página de resultados
                window.location.href = 'resultados_examen.html';
            });
            
        } catch (storageError) {
            console.error("Error al almacenar resultados:", storageError);
            alert(`Prueba finalizada.\nPuntuación: ${score} de ${totalQuestions}\nRespuestas correctas: ${score}`);
            window.location.href = 'dashboard.html';
        }
    }
}


// Check attempts before loading the test
function checkAttempts() {
    const userDocument = localStorage.getItem('userDocument');
    
    if (!userDocument) {
        alert('Debe iniciar sesión para realizar la prueba.');
        window.location.href = 'login.html';
        return false;
    }
    
    // Get test results
    const testResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    
    // Count attempts for this user and level
    const attempts = testResults.filter(result => 
        result.documento === userDocument && 
        result.nivel === nivel
    ).length;
    
    // Check for administrator exam attempts from localStorage
    if (nivel === 'administrador') {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const userId = userData ? userData.documento : userDocument;
        const attemptData = JSON.parse(localStorage.getItem(`attempts_${userId}`)) || {};
        
        if (attemptData.administrador >= 2) {
            alert('Ha alcanzado el límite de 2 intentos para esta prueba. Será redirigido al dashboard.');
            window.location.href = 'dashboard.html';
            return false;
        }
    } else if (attempts >= 2) {
        alert('Ha alcanzado el límite de 2 intentos para esta prueba. Será redirigido al dashboard.');
        window.location.href = 'dashboard.html';
        return false;
    }
    
    return true;
}

// Variables globales
let currentQuestion = 1;
let totalQuestions = 20;
let nivel = '';
let userAnswers = {};
let questions = [];
let timerInterval;

window.onload = function() {
    // Inicializar EmailJS
    initEmailJS();
    
    // Obtener datos del usuario
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        alert('Debe iniciar sesión para realizar la prueba.');
        window.location.href = 'login.html';
        return;
    }
    
    // Obtener nivel del parámetro URL o de window.nivelExamen
    const urlParams = new URLSearchParams(window.location.search);
    nivel = urlParams.get('nivel') || window.nivelExamen || 'basico';
    
    // Check if this is an administrator test from localStorage
    const testInfo = JSON.parse(localStorage.getItem('currentTestInfo') || '{}');
    if (testInfo.level === 'administrador') {
        nivel = 'administrador';
    }
    
    // Check attempts before proceeding
    if (!checkAttempts()) {
        return;
    }
    
    // Load questions based on level
    if (nivel === 'basico') {
        questions = basicQuestions;
    } else if (nivel === 'intermedio') {
        questions = intermediateQuestions;
    } else if (nivel === 'administrador') {
        questions = adminQuestions;
    }
    
    totalQuestions = questions.length;
    
    // Initialize question indicators
    initQuestionIndicators();
    
    // Load first question
    loadQuestion(currentQuestion);
    
    // Start timer
    startTimer(60 * 60);
    
    // Set up modal buttons (other buttons use onclick in HTML)
    document.getElementById('cancelFinish').addEventListener('click', hideConfirmationModal);
    document.getElementById('confirmFinish').addEventListener('click', submitTest);
    document.querySelector('.close').addEventListener('click', hideConfirmationModal);
};

// Initialize question indicators
function initQuestionIndicators() {
    const indicatorsContainer = document.getElementById('questionIndicators');
    indicatorsContainer.innerHTML = '';
    
    for (let i = 1; i <= totalQuestions; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'question-indicator';
        indicator.dataset.question = i;
        indicator.textContent = i; // Show question number
        indicator.addEventListener('click', () => goToQuestion(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    updateQuestionIndicators();
}

// Update question indicators and show finish button
function updateQuestionIndicators() {
    const indicators = document.querySelectorAll('.question-indicator');
    
    indicators.forEach(indicator => {
        const questionNum = parseInt(indicator.dataset.question);
        indicator.classList.remove('current', 'answered');
        
        if (questionNum === currentQuestion) {
            indicator.classList.add('current');
        }
        
        if (userAnswers[questionNum]) {
            indicator.classList.add('answered');
        }
    });
    
    // Always show finish button - user should be able to finish at any time
    const finishBtn = document.getElementById('finishBtn');
    finishBtn.style.display = 'block';
}

// Load question function
function loadQuestion(questionNumber) {
    const question = questions[questionNumber - 1];
    const container = document.getElementById('questionContainer');
    
    // Create question HTML
    let html = `
        <div class="question-number">Pregunta ${questionNumber} de ${totalQuestions}</div>
        <div class="question-text">${question.text}</div>
        <div class="options-container">
    `;
    
    // Add options
    question.options.forEach(option => {
        const isChecked = userAnswers[questionNumber] === option.id ? 'checked' : '';
        const isSelected = userAnswers[questionNumber] === option.id ? 'selected' : '';
        
        html += `
            <div class="option ${isSelected}" onclick="selectOption('q${questionNumber}-${option.id}')">
                <input type="radio" id="q${questionNumber}-${option.id}" name="q${questionNumber}" value="${option.id}" ${isChecked}>
                <label for="q${questionNumber}-${option.id}">${option.text}</label>
            </div>
        `;
    });
    
    html += `</div>`;
    container.innerHTML = html;
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = (questionNumber === 1);
    document.getElementById('nextBtn').disabled = (questionNumber === totalQuestions);
    
    // Update question indicators
    updateQuestionIndicators();
}

// Select option function
function selectOption(id) {
    const optionId = id.split('-')[1]; // Get the option id (a, b, c, d)
    const questionNum = parseInt(id.split('q')[1].split('-')[0]);
    userAnswers[questionNum] = optionId;
    
    // Remove selected class from all options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    document.getElementById(id).closest('.option').classList.add('selected');
    
    // Check the radio button
    document.getElementById(id).checked = true;
    
    // Update question indicators
    updateQuestionIndicators();
}

// Navigation functions
function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        loadQuestion(currentQuestion);
    }
}

function prevQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
}

function goToQuestion(questionNum) {
    if (questionNum >= 1 && questionNum <= totalQuestions) {
        currentQuestion = questionNum;
        loadQuestion(currentQuestion);
    }
}

// Timer functionality
function startTimer(duration) {
    let timer = duration;
    const display = document.getElementById('timer');
    
    // Clear any existing interval
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(function() {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        
        display.textContent = 
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds);
        
        if (--timer < 0) {
            clearInterval(timerInterval);
            display.textContent = "00:00";
            alert("¡Se acabó el tiempo! El examen se enviará automáticamente.");
            submitTest();
        }
    }, 1000);
}

// Modal functions
function showConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    const unansweredContainer = document.getElementById('unansweredQuestions');
    
    // Count unanswered questions
    let unansweredCount = 0;
    let unansweredList = '';
    
    for (let i = 1; i <= totalQuestions; i++) {
        if (!userAnswers[i]) {
            unansweredCount++;
            if (unansweredCount <= 5) { // Show only first 5 unanswered questions
                unansweredList += `<span class="unanswered-question">Pregunta ${i}</span>`;
            }
        }
    }
    
    if (unansweredCount > 5) {
        unansweredList += `<span class="unanswered-more">y ${unansweredCount - 5} más...</span>`;
    }
    
    if (unansweredCount > 0) {
        unansweredContainer.innerHTML = `
            <p>Tiene ${unansweredCount} preguntas sin responder:</p>
            <div class="unanswered-list">${unansweredList}</div>
        `;
    } else {
        unansweredContainer.innerHTML = `<p>Ha respondido todas las preguntas.</p>`;
    }
    
    // Ensure the modal is displayed as flex to center its content
    modal.style.display = 'flex';
}

function hideConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'none';
}

// Function to confirm exit
function confirmarSalida() {
    if (confirm("¿Está seguro que desea salir? Su progreso no se guardará.")) {
        window.location.href = 'dashboard.html';
    }
}

// Inicializar EmailJS
function initEmailJS() {
    emailjs.init({
        publicKey: 'ujydeP8ESBAm8HttQ', // Reemplaza con tu Public Key de EmailJS
    });
}

// Función para enviar resultados por correo
function sendResultsByEmail(testResult) {
    const templateParams = {
        to_email: 'auxsistemas@luma.com.co', // Correo destino
        user_name: testResult.documento,
        test_level: testResult.nivel,
        score: testResult.score,
        total_questions: testResult.totalQuestions,
        percentage: Math.round((testResult.score / testResult.totalQuestions) * 100),
        date: new Date(testResult.date).toLocaleDateString('es-ES'),
        time: new Date(testResult.date).toLocaleTimeString('es-ES'),
        status: (testResult.score / testResult.totalQuestions) >= 0.7 ? 'APROBADO' : 'REPROBADO'
    };

    return emailjs.send('service_gu2z3bu', 'template_nh327cj', templateParams)
        .then(function(response) {
            console.log('Correo enviado exitosamente:', response.status, response.text);
            return true;
        })
        .catch(function(error) {
            console.error('Error al enviar correo:', error);
            return false;
        });
}