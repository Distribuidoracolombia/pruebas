document.addEventListener('DOMContentLoaded', function() {
    // Initialize timer
    let timeLeft = 60 * 60; // 60 minutes in seconds
    const timerElement = document.getElementById('timer');
    
    // Start timer
    const timerInterval = setInterval(function() {
        timeLeft--;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("¡Tiempo terminado! El examen se enviará automáticamente.");
            document.getElementById('testForm').submit();
            return;
        }
        
        // Add warning class when less than 5 minutes remain
        if (timeLeft <= 300) {
            timerElement.classList.add('timer-warning');
        }
        
        // Update timer display
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
    
    // Handle form submission
    document.getElementById('testForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send the form data to a server
        // For this demo, we'll just show a completion message
        
        // Stop the timer
        clearInterval(timerInterval);
        
        // Get form data
        const formData = new FormData(this);
        const answers = {};
        
        for (const [key, value] of formData.entries()) {
            answers[key] = value;
        }
        
        // Store answers in localStorage (in a real app, send to server)
        localStorage.setItem('testAnswers', JSON.stringify(answers));
        
        // Show completion message
        const container = document.querySelector('.container');
        container.innerHTML = `
            <div class="test-complete">
                <h2>¡Examen Completado!</h2>
                <p>Sus respuestas han sido guardadas correctamente.</p>
            </div>
            <div style="text-align: center;">
                <a href="index.html" class="btn-primary">Volver al Inicio</a>
            </div>
        `;
    });
});