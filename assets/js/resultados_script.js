// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load test results when the page loads
    loadTestResults();
    
    // Get references to buttons
    const playAgainBtn = document.getElementById('playAgainBtn');
    const shareResultsBtn = document.getElementById('shareResultsBtn');
    const acceptBtn = document.getElementById('acceptBtn');
    
    // Add event listeners to buttons
    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', function() {
            // Handle play again functionality - return to dashboard
            window.location.href = 'dashboard.html';
        });
    }
    
    if (shareResultsBtn) {
        shareResultsBtn.addEventListener('click', function() {
            // Handle share results functionality
            shareResults();
        });
    }
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            // Handle accept button click
            window.location.href = 'index.html';
        });
    }
    
    // Function to load test results
    function loadTestResults() {
        // Get test ID from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const testId = urlParams.get('testId');
        
        if (!testId) {
            showError("No se encontró el ID de la prueba");
            return;
        }
        
        // Fetch test results from server or local storage
        fetchTestResults(testId)
            .then(results => {
                if (results) {
                    displayResults(results);
                } else {
                    showError("No se encontraron resultados para esta prueba");
                }
            })
            .catch(error => {
                console.error("Error loading test results:", error);
                showError("Error al cargar los resultados");
            });
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
        // Hide error message if it was shown
        const messageElement = document.querySelector('.message');
        if (messageElement) {
            messageElement.style.display = 'none';
        }
        
        // Update percentage
        const percentageElement = document.querySelector('.percentage');
        if (percentageElement) {
            percentageElement.textContent = `Porcentaje: ${results.percentage}%`;
        }
        
        // Update questions answered
        const respondentsElement = document.querySelector('.respondents div:last-child');
        if (respondentsElement) {
            respondentsElement.textContent = `${results.answered} de ${results.total}`;
        }
        
        // Update score icon based on pass/fail
        const scoreIcon = document.querySelector('.score-icon');
        if (scoreIcon) {
            scoreIcon.src = results.percentage >= 70 ? 'assets/img/check-icon.svg' : 'assets/img/error-icon.svg';
        }
        
        // Display detailed answers
        displayDetailedAnswers(results.answers);
    }
    
    // Function to display detailed answers
    function displayDetailedAnswers(answers) {
        if (!answers || answers.length === 0) {
            return;
        }
        
        const detailsContainer = document.querySelector('.details');
        if (!detailsContainer) {
            return;
        }
        
        // Clear previous content except the header
        const detailsHeader = detailsContainer.querySelector('.details-header');
        detailsContainer.innerHTML = '';
        detailsContainer.appendChild(detailsHeader);
        
        // Create and append answer details
        answers.forEach((answer, index) => {
            const answerElement = document.createElement('div');
            answerElement.className = 'answer-item';
            
            const isCorrect = answer.isCorrect;
            answerElement.classList.add(isCorrect ? 'correct' : 'incorrect');
            
            answerElement.innerHTML = `
                <div class="answer-number">Pregunta ${index + 1}</div>
                <div class="answer-content">
                    <div class="question-text">${answer.question}</div>
                    <div class="user-answer ${isCorrect ? 'correct-answer' : 'wrong-answer'}">
                        Tu respuesta: ${answer.userAnswer}
                    </div>
                    ${!isCorrect ? `<div class="correct-answer">Respuesta correcta: ${answer.correctAnswer}</div>` : ''}
                </div>
                <div class="answer-status">
                    <img src="assets/img/${isCorrect ? 'check' : 'cross'}.svg" alt="${isCorrect ? 'Correcto' : 'Incorrecto'}" />
                </div>
            `;
            
            detailsContainer.appendChild(answerElement);
        });
    }
    
    // Function to show error message
    function showError(message) {
        const messageElement = document.querySelector('.message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.style.display = 'block';
        }
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