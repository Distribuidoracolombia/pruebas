// Variables globales
let nivel = '';
let timerInterval;
let timeRemaining = 2400; // 40 minutos en segundos

// Función para inicializar la página
window.onload = function() {
    // Obtener el nivel de la URL
    const urlParams = new URLSearchParams(window.location.search);
    nivel = urlParams.get('nivel') || 'basico';
    
    // Verificar intentos antes de cargar la prueba
    if (!checkAttempts()) {
        return;
    }
    
    // Actualizar la interfaz según el nivel
    actualizarInterfaz();
    
    // Configurar el enlace de descarga
    configurarDescarga();
    
    // Ocultar la sección de inicio si está presente
    const startSection = document.querySelector('.start-section');
    if (startSection) {
        startSection.style.display = 'none';
    }
};

// Verificar intentos
function checkAttempts() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const documento = currentUser.documento;
    
    if (!documento) {
        alert('Debe iniciar sesión para realizar la prueba.');
        window.location.href = 'login.html';
        return false;
    }
    
    // Obtener resultados de pruebas prácticas
    const practicalResults = JSON.parse(localStorage.getItem('practicalResults') || '[]');
    
    // Contar intentos para este usuario y nivel
    const attempts = practicalResults.filter(result => 
        result.documento === documento && 
        result.nivel === nivel
    ).length;
    
    if (attempts >= 2) {
        alert('Ha alcanzado el límite de 2 intentos para esta prueba. Será redirigido al dashboard.');
        window.location.href = 'dashboard.html';
        return false;
    }
    
    return true;
}

// Función para actualizar la interfaz según el nivel
function actualizarInterfaz() {
    const levelBadge = document.getElementById('levelBadge');
    const testTitle = document.getElementById('testTitle');
    const downloadLink = document.getElementById('downloadLink');
    
    if (nivel === 'intermedio') {
        levelBadge.textContent = 'Nivel Intermedio';
        levelBadge.className = 'level-badge intermediate';
        downloadLink.href = 'assets/files/ejercicio_intermedio.xlsx';
    } else {
        levelBadge.textContent = 'Nivel Básico';
        levelBadge.className = 'level-badge basic';
        downloadLink.href = 'assets/files/ejercicio_basico.xlsx';
    }
    
    testTitle.innerHTML = `Prueba Práctica <span id="levelBadge" class="${levelBadge.className}">${levelBadge.textContent}</span>`;
}

// Configurar el enlace de descarga
function configurarDescarga() {
    const downloadLink = document.getElementById('downloadLink');
    
    downloadLink.addEventListener('click', function(e) {
        // Iniciar el temporizador después de la descarga
        setTimeout(function() {
            startTimer(2400); // 40 minutos
            
            // Crear y mostrar la sección de carga de archivos
            crearSeccionCarga();
            
            // Ocultar el botón de inicio si está visible
            const startSection = document.querySelector('.start-section');
            if (startSection) {
                startSection.style.display = 'none';
            }
            
            // Actualizar instrucciones
            const instructionsSection = document.querySelector('.instructions-section:nth-child(2)');
            instructionsSection.innerHTML = `
                <h2>Instrucciones</h2>
                <p>El archivo ha sido descargado. Por favor complete los ejercicios y suba el archivo cuando termine.</p>
                <p>Tiene <span style="color: #FF5722; font-weight: bold;">40 minutos</span> para completar la prueba.</p>
            `;
        }, 1000);
    });
}

// Función para iniciar la prueba
function iniciarPrueba() {
    // Ocultar el botón de inicio
    document.querySelector('.start-section').style.display = 'none';
    
    // Mostrar la sección de descarga si está oculta
    const downloadSection = document.querySelector('.download-section');
    if (downloadSection) {
        downloadSection.style.display = 'block';
    }
}

// Función para crear la sección de carga de archivos
function crearSeccionCarga() {
    // Verificar si ya existe la sección
    if (document.getElementById('uploadSection')) {
        document.getElementById('uploadSection').style.display = 'block';
        return;
    }
    
    // Crear la sección de carga
    const uploadSection = document.createElement('div');
    uploadSection.id = 'uploadSection';
    uploadSection.className = 'upload-section';
    uploadSection.innerHTML = `
        <h2>Subir Archivo Completado</h2>
        <div class="file-upload">
            <input type="file" id="fileUpload" accept=".xlsx, .xls" />
            <label for="fileUpload">
                <i class="fas fa-cloud-upload-alt"></i> Seleccionar Archivo
            </label>
            <span id="fileName">Ningún archivo seleccionado</span>
        </div>
        <button id="submitBtn" class="submit-btn" onclick="submitExam()" disabled>Finalizar Prueba</button>
    `;
    
    // Agregar la sección al final de la tarjeta de instrucciones
    document.querySelector('.instructions-card').appendChild(uploadSection);
    
    // Configurar el evento de cambio de archivo
    const fileUpload = document.getElementById('fileUpload');
    const fileName = document.getElementById('fileName');
    
    fileUpload.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            fileName.textContent = this.files[0].name;
            document.getElementById('submitBtn').disabled = false;
        } else {
            fileName.textContent = 'Ningún archivo seleccionado';
            document.getElementById('submitBtn').disabled = true;
        }
    });
}

// Función para iniciar el temporizador
function startTimer(duration) {
    timeRemaining = duration;
    const timerDisplay = document.getElementById('timer');
    
    // Limpiar cualquier intervalo existente
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(function() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (--timeRemaining < 0) {
            clearInterval(timerInterval);
            alert('¡El tiempo ha terminado! Por favor, envíe su archivo.');
            submitExam();
        }
    }, 1000);
}

// Función para enviar el examen
function submitExam() {
    const fileUpload = document.getElementById('fileUpload');
    
    if (fileUpload && fileUpload.files && fileUpload.files[0]) {
        // Detener el temporizador
        clearInterval(timerInterval);
        
        // Obtener información del usuario actual
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const documento = currentUser.documento || '';
        
        // Calcular el tiempo utilizado
        const timeElapsed = 2400 - timeRemaining;
        const minutes = Math.floor(timeElapsed / 60);
        const seconds = timeElapsed % 60;
        
        // Crear un objeto URL para el archivo
        const fileURL = URL.createObjectURL(fileUpload.files[0]);
        
        // Guardar el resultado
        const examResult = {
            documento: documento,
            nivel: nivel,
            fileName: fileUpload.files[0].name,
            fileType: fileUpload.files[0].type,
            fileSize: fileUpload.files[0].size,
            fileURL: fileURL,
            timeElapsed: `${minutes}m ${seconds}s`,
            date: new Date().toISOString()
        };
        
        // Guardar en localStorage
        let results = JSON.parse(localStorage.getItem('practicalResults') || '[]');
        results.push(examResult);
        localStorage.setItem('practicalResults', JSON.stringify(results));
        
        console.log("Prueba práctica guardada correctamente:", examResult);
        
        // Mostrar mensaje de finalización
        alert(`¡Prueba completada con éxito!\nTiempo utilizado: ${minutes} minutos y ${seconds} segundos.`);
        
        // Redirigir al dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Por favor seleccione un archivo para subir.');
    }
}

// Función para confirmar salida
function confirmarSalida() {
    if (confirm('¿Está seguro que desea salir? Se perderá todo el progreso.')) {
        window.location.href = 'dashboard.html';
    }
}