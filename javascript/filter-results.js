document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query').toLowerCase();
    const resultsDiv = document.getElementById("results");

    if (query) {
        // Aquí puedes simular la carga de artículos desde una API o una página web.
        fetch('https://coinmarketcap.com/currencies/bitcoin/#News')
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const articles = Array.from(doc.querySelectorAll('.article'));

                const filteredArticles = articles.filter(article => {
                    const title = article.getAttribute('data-title').toLowerCase();
                    return title.includes(query);
                });

                if (filteredArticles.length > 0) {
                    filteredArticles.forEach(article => {
                        resultsDiv.appendChild(article);
                    });
                } else {
                    resultsDiv.innerHTML = `<p>No articles found for: <strong>${query}</strong></p>`;
                }
            })
            .catch(error => {
                resultsDiv.innerHTML = `<p>Error fetching articles: ${error.message}</p>`;
            });
    } else {
        resultsDiv.innerHTML = `<p>No search query provided.</p>`;
    }
});