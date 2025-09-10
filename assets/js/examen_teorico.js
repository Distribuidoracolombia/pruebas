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
            
            // Navegar a la página de resultados
            window.location.href = 'resultados_examen.html';
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
    
    if (attempts >= 2) {
        alert('Ha alcanzado el límite de 2 intentos para esta prueba. Será redirigido al dashboard.');
        window.location.href = 'dashboard.html';
        return false;
    }
    
    return true;
}

// Add this at the beginning of your window.onload function
window.onload = function() {
    // Get level from URL
    const urlParams = new URLSearchParams(window.location.search);
    nivel = urlParams.get('nivel') || 'basico';
    
    // Check attempts before loading the test
    if (!checkAttempts()) {
        return;
    }
    
    // Continue with the rest of your initialization code
    // ...
};