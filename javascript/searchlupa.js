document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.getElementById("searchIcon");
    let isVisible = false; // Variable para rastrear la visibilidad del campo de búsqueda
    
    searchIcon.addEventListener("click", function() {
        if (!isVisible) { // Si el campo de búsqueda no está visible, se muestra
            searchInput.style.display = "inline-block";
            searchInput.focus();
            isVisible = true; // Actualiza el estado de visibilidad
        } else { // Si ya está visible, se oculta
            searchInput.style.display = "none";
            isVisible = false; // Actualiza el estado de visibilidad
        }
    });
});
