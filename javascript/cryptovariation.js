// Obtener referencia a los elementos del DOM
const marketCapVariationElement = document.getElementById('market-cap-variation');
const marketCapValueElement = document.getElementById('market-cap-value');

// Función para obtener el precio actual de BTC y su variación porcentual desde la API de Binance
function fetchMarketCap() {
    const apiUrl = 'https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT';

    // Hacer una solicitud a la API de Binance para obtener el precio y la variación de BTC en 24 horas
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Obtener la variación porcentual de BTC en 24 horas
            const priceChangePercent = parseFloat(data.priceChangePercent);

            // Actualizar el porcentaje de variación en la página
            marketCapVariationElement.textContent = `${priceChangePercent.toFixed(2)}%`;

            // Si la variación es positiva, cambiar el color del texto a verde
            if (priceChangePercent > 0) {
                marketCapVariationElement.style.color = '#18c785';
            } else {
                // Si la variación es negativa o cero, cambiar el color del texto a rojo
                marketCapVariationElement.style.color = '#ee636b';
            }

            // Obtener el precio actual de BTC en USD desde la respuesta de la API
            const btcPriceUSD = parseFloat(data.lastPrice);

            // Actualizar la capitalización de mercado en la página
            // Nota: Aquí no se obtiene la capitalización de mercado directamente desde Binance
            marketCapValueElement.textContent = `$${(btcPriceUSD * 19300000).toLocaleString()}`; // 19,300,000 es un estimado del suministro circulante de BTC
        })
        .catch(error => {
            console.error('Error al obtener la capitalización de mercado:', error);
        });
}

// Llamar a fetchMarketCap() inicialmente para obtener la capitalización de mercado y su variación
fetchMarketCap();

// Actualizar la capitalización de mercado cada 5 segundos (5000 milisegundos)
setInterval(fetchMarketCap, 5000);
