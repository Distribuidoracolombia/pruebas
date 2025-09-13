// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load test results when the page loads
    loadTestResults();
    
    // Get references to buttons
    const retryBtn = document.getElementById('retryBtn');
    const dashboardBtn = document.getElementById('dashboardBtn');
    
    // Add event listeners to buttons
    if (retryBtn) {
        retryBtn.addEventListener('click', function() {
            // Get test type from URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            const testType = urlParams.get('type') || 'teorico';
            const level = urlParams.get('level') || 'basico';
            
            // Redirect to appropriate test page based on type and level
            if (testType === 'teorico') {
                window.location.href = `examen_teorico_${level}.html`;
            } else if (testType === 'practico') {
                window.location.href = 'instrucciones_practicas.html?level=' + level;
            } else {
                window.location.href = 'instrucciones_proyecto.html';
            }
        });
    }
    
    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', function() {
            // Return to dashboard
            window.location.href = 'dashboard.html';
        });
    }
    
    // Function to load test results
    function loadTestResults() {
        // Get current test result from localStorage
        const currentTestResult = localStorage.getItem('currentTestResult');
        
        if (!currentTestResult) {
            showError("No se encontraron resultados de la prueba");
            return;
        }
        
        try {
            const results = JSON.parse(currentTestResult);
            displayResults(results);
        } catch (error) {
            console.error("Error parsing test results:", error);
            showError("Error al cargar los resultados");
        }
    }
    
    // Function to fetch test results (from API or localStorage)
    function fetchTestResults(testId) {
        // For demonstration, we'll check localStorage first
        const storedResults = localStorage.getItem(`testResults_${testId}`);
        
        if (storedResults) {
            return Promise.resolve(JSON.parse(storedResults));
        }
        
        // If not in localStorage, fetch from API
        // Replace with your actual API endpoint
        return fetch(`api/test-results/${testId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
    }
    
    // Function to display results in the UI
    function displayResults(results) {
        // Update test info
        const testTypeElement = document.querySelector('.test-type');
        const testLevelElement = document.querySelector('.test-level');
        
        if (testTypeElement) {
            testTypeElement.textContent = 'Examen Teórico';
        }
        
        if (testLevelElement && results.nivel) {
            testLevelElement.textContent = results.nivel === 'basico' ? 'Nivel Básico' : 
                                          results.nivel === 'intermedio' ? 'Nivel Intermedio' : 
                                          results.nivel === 'administrador' ? 'Administrador' : 'Avanzado';
        }
        
        // Calculate percentage
        const percentage = results.totalQuestions > 0 ? (results.score / results.totalQuestions) * 100 : 0;
        
        // Update score circle and value
        const scoreValue = document.querySelector('.score-value');
        const scoreCircle = document.querySelector('.score-circle');
        
        if (scoreValue) {
            scoreValue.textContent = `${Math.round(percentage)}%`;
        }
        
        if (scoreCircle) {
            // Update the conic gradient to reflect the score percentage
            const roundedPercentage = Math.round(percentage);
            scoreCircle.style.background = `conic-gradient(#4CAF50 0% ${roundedPercentage}%, #e0e0e0 ${roundedPercentage}% 100%)`;
        }
        
        // Update score label based on percentage
        const scoreLabel = document.getElementById('scoreLabel');
        if (scoreLabel) {
            if (percentage >= 70) {
                scoreLabel.textContent = 'Aprobado';
                scoreLabel.style.color = '#4CAF50';
            } else {
                scoreLabel.textContent = 'Necesita mejorar';
                scoreLabel.style.color = '#f44336';
            }
        }
        
        // Update details
        const answeredQuestions = document.getElementById('answeredQuestions');
        const correctAnswers = document.getElementById('correctAnswers');
        
        if (answeredQuestions) {
            answeredQuestions.textContent = `${results.totalAnswered} de ${results.totalQuestions}`;
        }
        
        if (correctAnswers) {
            correctAnswers.textContent = `${results.score}`;
        }
        
        // Update answers list if available
        if (results.details && results.details.length > 0) {
            displayAnswers(results.details);
        }
    }
    
    // Function to update a detail item in the results details section
    function updateDetailItem(id, value, total) {
        const detailElement = document.getElementById(id);
        if (detailElement) {
            const valueElement = detailElement.querySelector('.detail-value');
            if (valueElement) {
                if (id === 'correct-answers' && total) {
                    valueElement.textContent = `${value} de ${total}`;
                } else {
                    valueElement.textContent = value;
                }
            }
        }
    }
    
    // Function to format time in minutes and seconds
    function formatTime(seconds) {
        if (!seconds) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    }
    
    // Function to display answers
    function displayAnswers(details) {
        const answersContainer = document.getElementById('answersList');
        if (!answersContainer) return;
        
        // Clear previous answers
        answersContainer.innerHTML = '';
        
        // Add each answer to the container
        details.forEach((detail) => {
            const answerItem = document.createElement('div');
            answerItem.className = `answer-item ${detail.isCorrect ? 'correct' : 'incorrect'}`;
            
            const userAnswerText = detail.userAnswer ? 
                (detail.options && detail.options[detail.userAnswer] ? detail.options[detail.userAnswer] : detail.userAnswer) : 
                'Sin respuesta';
            
            const correctAnswerText = detail.options && detail.options[detail.correctAnswer] ? 
                detail.options[detail.correctAnswer] : detail.correctAnswer;
            
            answerItem.innerHTML = `
                <div class="answer-number">Pregunta ${detail.questionNumber}</div>
                <div class="answer-content">
                    <div class="question-text">${detail.questionText}</div>
                    <div class="user-answer ${detail.isCorrect ? 'correct-answer' : 'wrong-answer'}">
                        Tu respuesta: ${userAnswerText}
                    </div>
                    ${!detail.isCorrect ? `<div class="correct-answer">Respuesta correcta: ${correctAnswerText}</div>` : ''}
                </div>
                <div class="answer-status">
                    <i class="fas fa-${detail.isCorrect ? 'check' : 'times'}"></i>
                </div>
            `;
            
            answersContainer.appendChild(answerItem);
        });
    }
    
    // Function to show error message
    function showError(message) {
        // Create error message container if it doesn't exist
        let errorContainer = document.querySelector('.error-message');
        
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.className = 'error-message';
            errorContainer.style.backgroundColor = '#f8d7da';
            errorContainer.style.color = '#721c24';
            errorContainer.style.padding = '1rem';
            errorContainer.style.borderRadius = '8px';
            errorContainer.style.marginBottom = '1.5rem';
            errorContainer.style.textAlign = 'center';
            
            const resultsContent = document.querySelector('.results-content');
            if (resultsContent) {
                resultsContent.prepend(errorContainer);
            } else {
                document.body.prepend(errorContainer);
            }
        }
        
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
    }
    
    // Function to show error message
    function showError(message) {
        // Create error message container if it doesn't exist
        let errorContainer = document.querySelector('.error-message');
        
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.className = 'error-message';
            errorContainer.style.backgroundColor = '#f8d7da';
            errorContainer.style.color = '#721c24';
            errorContainer.style.padding = '1rem';
            errorContainer.style.borderRadius = '8px';
            errorContainer.style.marginBottom = '1.5rem';
            errorContainer.style.textAlign = 'center';
            
            const resultsContent = document.querySelector('.results-content');
            if (resultsContent) {
                resultsContent.prepend(errorContainer);
            } else {
                document.body.prepend(errorContainer);
            }
        }
        
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
    }
    
    // Function to share results
    function shareResults() {
        const percentageElement = document.querySelector('.percentage');
        const percentage = percentageElement ? percentageElement.textContent : 'No disponible';
        
        const shareText = `¡He completado el examen con ${percentage}!`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Mis resultados del examen',
                text: shareText,
                url: window.location.href,
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        } else {
            // Fallback for browsers that don't support Web Share API
            prompt('Copia este enlace para compartir tus resultados:', window.location.href);
        }
    }
});