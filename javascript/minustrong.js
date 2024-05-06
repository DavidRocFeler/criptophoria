const strongElements = document.querySelectorAll('strong');

// Función para capitalizar la primera letra y convertir el resto del texto en minúsculas
function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Iterar sobre cada elemento <strong> y aplicar la transformación
strongElements.forEach(strong => {
    const text = strong.textContent;
    const transformedText = capitalizeFirstLetter(text);
    strong.textContent = transformedText;
});