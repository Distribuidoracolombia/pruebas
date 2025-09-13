// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init('ujydeP8ESBAm8HttQ');
    
    // Load test results when the page loads
    loadTestResults();
    
    // Get references to buttons
    const retryBtn = document.getElementById('retryBtn');
    const dashboardBtn = document.getElementById('dashboardBtn');
    const sendEmailBtn = document.getElementById('sendEmailBtn');
    
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
    
    if (sendEmailBtn) {
        sendEmailBtn.addEventListener('click', function() {
            sendResultsByEmail();
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
    
    // Function to send results by email
    function sendResultsByEmail() {
        const currentTestResult = localStorage.getItem('currentTestResult');
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        if (!currentTestResult) {
            alert('No se encontraron resultados para enviar.');
            return;
        }
        
        try {
            const results = JSON.parse(currentTestResult);
            const userName = currentUser.nombre || currentUser.documento || 'Usuario';
            
            // Disable button and show loading
            const sendEmailBtn = document.getElementById('sendEmailBtn');
            if (sendEmailBtn) {
                sendEmailBtn.disabled = true;
                sendEmailBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            }
            
            // Format results for email
            const percentage = results.totalQuestions > 0 ? (results.score / results.totalQuestions) * 100 : 0;
            const status = percentage >= 70 ? 'APROBADO' : 'NECESITA MEJORAR';
            
            // Create detailed results HTML
            const resultsHtml = formatResultsForEmail(results, percentage, status);
            
            // Prepare email parameters
            const templateParams = {
                to_name: 'Administrador del Sistema',
                from_name: userName,
                name: userName,
                subject: `Resultados del Examen - ${userName} - ${results.nivel.toUpperCase()}`,
                message: `Se han completado los resultados del examen teórico nivel ${results.nivel} para el usuario ${userName}.`,
                results_html: resultsHtml
            };
            
            // Send email using EmailJS
            emailjs.send('service_gu2z3bu', 'template_nh327cj', templateParams)
                .then(function(response) {
                    console.log('Email enviado exitosamente:', response);
                    alert('Los resultados han sido enviados por email exitosamente.');
                    
                    // Reset button
                    if (sendEmailBtn) {
                        sendEmailBtn.disabled = false;
                        sendEmailBtn.innerHTML = '<i class="fas fa-envelope"></i> Enviar Resultados por Email';
                    }
                }, function(error) {
                    console.error('Error al enviar email:', error);
                    alert('Error al enviar el email. Por favor, inténtelo de nuevo.');
                    
                    // Reset button
                    if (sendEmailBtn) {
                        sendEmailBtn.disabled = false;
                        sendEmailBtn.innerHTML = '<i class="fas fa-envelope"></i> Enviar Resultados por Email';
                    }
                });
                
        } catch (error) {
            console.error('Error al procesar resultados:', error);
            alert('Error al procesar los resultados para el envío.');
        }
    }
    
    // Function to format results for email
    function formatResultsForEmail(results, percentage, status) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const userName = currentUser.nombre || currentUser.documento || 'Usuario';
        const userDocument = currentUser.documento || 'N/A';
        const testDate = new Date(results.date).toLocaleString('es-ES');
        
        let html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #333; text-align: center; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">Resultados del Examen Teórico</h2>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="color: #555; margin-top: 0;">Información del Estudiante</h3>
                    <p><strong>Nombre:</strong> ${userName}</p>
                    <p><strong>Documento:</strong> ${userDocument}</p>
                    <p><strong>Nivel del Examen:</strong> ${results.nivel.charAt(0).toUpperCase() + results.nivel.slice(1)}</p>
                    <p><strong>Fecha:</strong> ${testDate}</p>
                </div>
                
                <div style="background-color: ${percentage >= 70 ? '#d4edda' : '#f8d7da'}; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
                    <h3 style="color: ${percentage >= 70 ? '#155724' : '#721c24'}; margin-top: 0;">Resultado: ${status}</h3>
                    <p style="font-size: 24px; font-weight: bold; color: ${percentage >= 70 ? '#155724' : '#721c24'}; margin: 10px 0;">${Math.round(percentage)}%</p>
                    <p><strong>Respuestas Correctas:</strong> ${results.score} de ${results.totalQuestions}</p>
                    <p><strong>Preguntas Respondidas:</strong> ${results.totalAnswered} de ${results.totalQuestions}</p>
                </div>
                
                <div style="margin: 20px 0;">
                    <h3 style="color: #555;">Detalle de Respuestas</h3>
        `;
        
        // Add detailed answers
        if (results.details && results.details.length > 0) {
            results.details.forEach((detail, index) => {
                const userAnswerText = detail.userAnswer ? 
                    (detail.options && detail.options[detail.userAnswer] ? detail.options[detail.userAnswer] : detail.userAnswer) : 
                    'Sin respuesta';
                
                const correctAnswerText = detail.options && detail.options[detail.correctAnswer] ? 
                    detail.options[detail.correctAnswer] : detail.correctAnswer;
                
                html += `
                    <div style="border: 1px solid #ddd; border-radius: 5px; padding: 10px; margin: 10px 0; background-color: ${detail.isCorrect ? '#d4edda' : '#f8d7da'};">
                        <p style="margin: 5px 0;"><strong>Pregunta ${detail.questionNumber}:</strong> ${detail.questionText}</p>
                        <p style="margin: 5px 0; color: ${detail.isCorrect ? '#155724' : '#721c24'};"><strong>Tu respuesta:</strong> ${userAnswerText}</p>
                        ${!detail.isCorrect ? `<p style="margin: 5px 0; color: #155724;"><strong>Respuesta correcta:</strong> ${correctAnswerText}</p>` : ''}
                        <p style="margin: 5px 0; text-align: right;"><i class="fas fa-${detail.isCorrect ? 'check' : 'times'}" style="color: ${detail.isCorrect ? '#28a745' : '#dc3545'};"></i></p>
                    </div>
                `;
            });
        }
        
        html += `
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                    <p style="color: #666; font-size: 12px;">Este email fue generado automáticamente por el Sistema de Evaluación</p>
                </div>
            </div>
        `;
        
        return html;
    }
});