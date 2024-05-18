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

    searchInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") { // Detecta cuando se presiona Enter
            event.preventDefault(); // Previene el comportamiento predeterminado
            const query = searchInput.value.trim();
            if (query) {
                // Redirige a la nueva página con la búsqueda
                window.location.href = `search_results.html?query=${encodeURIComponent(query)}`;
            }
        }
    });
});



