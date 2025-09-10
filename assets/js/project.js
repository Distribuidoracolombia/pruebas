// Variables globales
let tiempoTotal = 40 * 60; // 40 minutos en segundos

// Check if user is logged in
window.onload = function() {
    // Get user data from localStorage
    const userName = localStorage.getItem('userName');
    
    // If no user data, redirect to login
    if (!userName) {
        window.location.href = 'login.html';
        return;
    }
    
    // Start timer when page loads
    startTimer(tiempoTotal);
};

// Timer functionality
function startTimer(duration) {
    let timer = duration;
    const display = document.getElementById('timer');
    
    const interval = setInterval(function() {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        
        display.textContent = 
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds);
        
        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = "00:00";
            alert("¡Se acabó el tiempo! El proyecto ha finalizado.");
            window.location.href = 'dashboard.html';
        }
    }, 1000);
}

// Start project function
function iniciarProyecto() {
    alert("El proyecto ha comenzado. Tiene 40 minutos para completarlo.");
    // Here you would typically open Excel or redirect to another page
    // For now, we'll just show an alert
}

// Confirm exit
function confirmarSalida() {
    if (confirm("¿Está seguro que desea salir? Su progreso no se guardará.")) {
        window.location.href = 'dashboard.html';
    }
}