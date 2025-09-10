// Function to submit the practical test
function submitPracticalTest() {
    // Get user document
    const userDocument = localStorage.getItem('userDocument');
    
    if (!userDocument) {
        alert('Error: No se pudo identificar al usuario. Por favor inicie sesión nuevamente.');
        window.location.href = 'login.html';
        return;
    }
    
    // Get file upload if available
    const fileUpload = document.getElementById('fileUpload');
    let fileName = '';
    let fileType = '';
    
    if (fileUpload && fileUpload.files && fileUpload.files[0]) {
        fileName = fileUpload.files[0].name;
        fileType = fileUpload.files[0].type;
    }
    
    // Save practical test result
    const practicalResult = {
        documento: userDocument,
        nivel: nivel,
        fileName: fileName,
        fileType: fileType,
        date: new Date().toISOString()
    };
    
    // Get existing results
    let practicalResults = JSON.parse(localStorage.getItem('practicalResults') || '[]');
    
    // Add new result
    practicalResults.push(practicalResult);
    
    // Save updated results
    localStorage.setItem('practicalResults', JSON.stringify(practicalResults));
    
    console.log('Practical test result saved:', practicalResult);
    console.log('All practical results:', practicalResults);
    
    // Continue with your existing code to show results or redirect
    alert('Prueba práctica enviada correctamente.');
    window.location.href = 'dashboard.html';
}