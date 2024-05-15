function fetchBitcoinPrice() {
    const apiUrl = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';

    // Hacer una solicitud a la API de Binance para obtener el precio de Bitcoin
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Obtener el precio de Bitcoin de la respuesta de la API
            const bitcoinPrice = parseFloat(data.price).toFixed(2);

            // Actualizar el precio de Bitcoin en la página
            document.getElementById('bitcoin-precio').textContent = `$${bitcoinPrice}`;
        })
        .catch(error => {
            console.error('Error al obtener el precio de Bitcoin:', error);
        });
}

// Llamar a la función fetchBitcoinPrice inicialmente para mostrar el precio
fetchBitcoinPrice();

// Actualizar el precio cada 5 segundos (5000 milisegundos)
setInterval(fetchBitcoinPrice, 5000);

