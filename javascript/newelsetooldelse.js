document.addEventListener("DOMContentLoaded", function() {
    // Selecciona todos los artículos
    const articles = Array.from(document.querySelectorAll('article'));
    
    // Ordena los artículos por la fecha de publicación (de más nuevo a más antiguo)
    articles.sort((a, b) => {
        const dateA = new Date(a.querySelector('.tiempo-transcurrido').dataset.fechaPublicacion);
        const dateB = new Date(b.querySelector('.tiempo-transcurrido').dataset.fechaPublicacion);
        return dateB - dateA;
    });
    
    // Reorganiza los artículos en el DOM
    const container = articles[0].parentNode;
    articles.forEach(article => container.appendChild(article));
});