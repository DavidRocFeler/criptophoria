document.addEventListener("DOMContentLoaded", function() {
    fetch('./news.html')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            const articles = Array.from(doc.querySelectorAll('article'));

            articles.sort((a, b) => {
                const dateA = new Date(a.querySelector('.tiempo-transcurrido').getAttribute('data-fecha-publicacion'));
                const dateB = new Date(b.querySelector('.tiempo-transcurrido').getAttribute('data-fecha-publicacion'));
                return dateB - dateA;
            });

            const recentNews = articles.slice(0, 6);

            const homeFirst = document.getElementById('home-first');
            homeFirst.innerHTML = '';

            recentNews.forEach(news => {
                const article = document.createElement('article');
                article.setAttribute('onclick', news.getAttribute('onclick'));

                const imgSection = news.querySelector('section:nth-of-type(2) img');
                const img = document.createElement('img');
                img.setAttribute('src', imgSection.getAttribute('src'));
                img.setAttribute('alt', imgSection.getAttribute('alt'));
                img.classList.add('imghome');

                const padescrip = document.createElement('div');
                padescrip.classList.add('padescrip');

                const strong = document.createElement('strong');
                strong.textContent = news.querySelector('strong').textContent;

                const p = document.createElement('p');
                p.textContent = news.querySelector('p').nextSibling.textContent;

                padescrip.appendChild(strong);
                padescrip.appendChild(p);
                article.appendChild(img);
                article.appendChild(padescrip);

                homeFirst.appendChild(article);
            });
        })
        .catch(error => console.error('Error al cargar las noticias:', error));
});