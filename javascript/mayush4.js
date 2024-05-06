var headers = document.querySelectorAll('h4');

// Iterar sobre cada elemento <h4> y convertir su texto a mayúsculas
headers.forEach(function(header) {
    header.textContent = header.textContent.toUpperCase();
});