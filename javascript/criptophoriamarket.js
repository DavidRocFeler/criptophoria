function fetchBitcoinPrice() {
    const apiUrl = 'https://api.coincap.io/v2/assets/bitcoin';

    // Hacer una solicitud a la API de CoinCap para obtener el precio de Bitcoin
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Obtener el precio de Bitcoin de la respuesta de la API
            const bitcoinPrice = parseFloat(data.data.priceUsd).toFixed(2);

            // Actualizar el precio de Bitcoin en la página
            document.getElementById('bitcoin-precio').textContent = `${bitcoinPrice} USD`;
        })
        .catch(error => {
            console.error('Error al obtener el precio de Bitcoin:', error);
        });
}

// Llamar a la función fetchBitcoinPrice inicialmente para mostrar el precio
fetchBitcoinPrice();

// Actualizar el precio cada 10 segundos (10000 milisegundos)
setInterval(fetchBitcoinPrice, 5000);

