document.addEventListener('DOMContentLoaded', function () {
    var selectSelected = document.querySelector('.select-selected');

    // Obtener el precio inicial al cargar la página
    getPriceData(selectSelected.value);

    selectSelected.addEventListener('change', function () {
        var selectedOption = selectSelected.value;
        getPriceData(selectedOption);
    });

    function getPriceData(selectedOption) {
        // Definimos la URL de la API de CoinGecko para obtener el precio de Bitcoin
        var url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=';

        // Ajustamos el período de tiempo en base a la opción seleccionada
        var days;
        switch (selectedOption) {
            case '24h':
                days = 1;
                break;
            case '30d':
                days = 30;
                break;
            case '52w':
                days = 365;
                break;
            default:
                days = 1;
        }

        // Añadimos el período de tiempo a la URL de la API
        url += days;

        // Realizamos la solicitud a la API
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Obtenemos los precios más bajos y más altos de Bitcoin
                var prices = data.prices;
                var lowestPrice = prices.reduce((min, p) => p[1] < min ? p[1] : min, Infinity);
                var highestPrice = prices.reduce((max, p) => p[1] > max ? p[1] : max, -Infinity);

                // Agregamos el símbolo del dólar al inicio de los precios
                lowestPrice = '$' + lowestPrice.toFixed(2);
                highestPrice = '$' + highestPrice.toFixed(2);

                // Actualizamos los elementos HTML con los precios obtenidos
                document.getElementById('precio-de-low').textContent = lowestPrice;
                document.getElementById('precio-de-high').textContent = highestPrice;
            })
            .catch(error => console.error('Error fetching data:', error));
    }
});
