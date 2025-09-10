// Variables globales
let allResults = [];

// Inicializar la página cuando cargue
window.onload = function() {
    // Verificar si el admin está logueado
    if (!localStorage.getItem('adminLoggedIn')) {
        // Redirigir al login si no está logueado
        alert('Debe iniciar sesión como administrador para acceder a esta página');
        window.location.href = 'login.html';
        return;
    }
    
    // Cargar resultados
    loadResults();
    
    // Configurar eventos
    document.getElementById('searchInput').addEventListener('input', filterResults);
    document.getElementById('filterTest').addEventListener('change', filterResults);
    document.getElementById('refreshBtn').addEventListener('click', loadResults);
    
    // Habilitar el botón de cerrar sesión
    document.getElementById('logoutBtn').addEventListener('click', logout);
};

// Cargar resultados desde localStorage
function loadResults() {
    // Obtener datos de usuarios
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Obtener resultados de pruebas teóricas
    const theoreticalResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    
    // Obtener resultados de pruebas prácticas
    const practicalResults = JSON.parse(localStorage.getItem('practicalResults') || '[]');
    
    console.log("Usuarios:", users);
    console.log("Resultados teóricos:", theoreticalResults);
    console.log("Resultados prácticos:", practicalResults);
    
    // Combinar resultados
    allResults = [];
    
    // Procesar resultados teóricos
    theoreticalResults.forEach(result => {
        // Buscar usuario por documento
        const user = users.find(u => u.documento === result.documento);
        if (user) {
            allResults.push({
                nombre: user.nombre,
                cargo: user.cargo,
                documento: user.documento,
                prueba: 'Teórica',
                puntuacion: `${result.score}/${result.totalQuestions}`,
                nivel: result.nivel === 'basico' ? 'Básico' : 'Intermedio',
                fecha: new Date(result.date).toLocaleDateString(),
                archivos: 'N/A'
            });
        } else {
            // Si no encuentra usuario, mostrar con datos disponibles
            allResults.push({
                nombre: "Usuario no encontrado",
                cargo: "N/A",
                documento: result.documento || "Desconocido",
                prueba: 'Teórica',
                puntuacion: `${result.score}/${result.totalQuestions}`,
                nivel: result.nivel === 'basico' ? 'Básico' : 'Intermedio',
                fecha: new Date(result.date).toLocaleDateString(),
                archivos: 'N/A'
            });
        }
    });
    
    // Procesar resultados prácticos
    practicalResults.forEach(result => {
        // Buscar usuario por documento
        const user = users.find(u => u.documento === result.documento);
        
        // Crear enlace para el archivo si existe
        let fileLink = 'N/A';
        if (result.fileName) {
            fileLink = `<a href="#" class="file-link" data-filename="${result.fileName}" onclick="viewFile('${result.fileName}', '${result.fileType || ''}')">
                            ${result.fileName}
                        </a>`;
        }
        
        if (user) {
            allResults.push({
                nombre: user.nombre,
                cargo: user.cargo,
                documento: user.documento,
                prueba: 'Práctica',
                puntuacion: result.score || 'Pendiente',
                nivel: result.nivel === 'basico' ? 'Básico' : 'Intermedio',
                fecha: new Date(result.date).toLocaleDateString(),
                archivos: fileLink
            });
        } else {
            // Si no encuentra usuario, mostrar con datos disponibles
            allResults.push({
                nombre: "Usuario no encontrado",
                cargo: "N/A",
                documento: result.documento || "Desconocido",
                prueba: 'Práctica',
                puntuacion: result.score || 'Pendiente',
                nivel: result.nivel === 'basico' ? 'Básico' : 'Intermedio',
                fecha: new Date(result.date).toLocaleDateString(),
                archivos: fileLink
            });
        }
    });
    
    // Mostrar resultados
    displayResults(allResults);
}

// Mostrar resultados en la tabla
function displayResults(results) {
    const tbody = document.getElementById('resultsBody');
    tbody.innerHTML = '';
    
    if (results.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="no-results">No se encontraron resultados</td></tr>`;
        return;
    }
    
    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.nombre}</td>
            <td>${result.cargo}</td>
            <td>${result.documento}</td>
            <td>${result.prueba}</td>
            <td>${result.puntuacion}</td>
            <td>${result.nivel}</td>
            <td>${result.fecha}</td>
            <td>${result.archivos}</td>
        `;
        tbody.appendChild(row);
    });
}

// Filtrar resultados según búsqueda y filtro
function filterResults() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filterValue = document.getElementById('filterTest').value;
    
    let filteredResults = allResults;
    
    // Filtrar por término de búsqueda (nombre o documento)
    if (searchTerm) {
        filteredResults = filteredResults.filter(result => 
            result.nombre.toLowerCase().includes(searchTerm) || 
            result.documento.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filtrar por tipo de prueba
    if (filterValue) {
        if (filterValue === 'teorica') {
            filteredResults = filteredResults.filter(result => result.prueba === 'Teórica');
        } else if (filterValue === 'practica-basico') {
            filteredResults = filteredResults.filter(result => 
                result.prueba === 'Práctica' && result.nivel === 'Básico'
            );
        } else if (filterValue === 'practica-intermedio') {
            filteredResults = filteredResults.filter(result => 
                result.prueba === 'Práctica' && result.nivel === 'Intermedio'
            );
        } else if (filterValue === 'proyecto') {
            filteredResults = filteredResults.filter(result => result.prueba === 'Proyecto');
        }
    }
    
    // Mostrar resultados filtrados
    displayResults(filteredResults);
}

// Función para ver el archivo
function viewFile(fileName, fileType) {
    // Buscar el archivo en los resultados prácticos
    const practicalResults = JSON.parse(localStorage.getItem('practicalResults') || '[]');
    const fileResult = practicalResults.find(r => r.fileName === fileName);
    
    if (fileResult && fileResult.fileURL) {
        // Abrir el archivo en una nueva ventana
        window.open(fileResult.fileURL, '_blank');
    } else {
        alert('El archivo no está disponible para visualización.');
    }
}

// Cerrar sesión
function logout() {
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'login.html';
    }
}

// Agregar la función viewFile al objeto window para que sea accesible desde el HTML
window.viewFile = viewFile;