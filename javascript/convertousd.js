// Obtener referencia al campo de entrada BTC y al campo de salida USD
const btcInput = document.getElementById('btc-input');
const usdOutput = document.getElementById('usd-output');

// Función para obtener la tasa de cambio de BTC a USD desde la API de Binance
function fetchBTCtoUSDExchangeRate() {
    fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
        .then(response => response.json())
        .then(data => {
            // Obtener el precio actual de BTC en USD desde la respuesta de la API
            const btcPriceUSD = parseFloat(data.price);

            // Llamar a la función para realizar la conversión de BTC a USD
            convertBTCtoUSD(btcPriceUSD);
        })
        .catch(error => {
            console.error('Error al obtener la tasa de cambio de BTC a USD:', error);
        });
}

// Función para realizar la conversión de BTC a USD
function convertBTCtoUSD(btcPriceUSD) {
    // Obtener el valor de BTC ingresado por el usuario
    const btcAmount = parseFloat(btcInput.value);

    // Verificar si el valor ingresado es válido
    if (!isNaN(btcAmount) && btcAmount >= 0) {
        // Calcular el valor en USD correspondiente
        const usdAmount = btcAmount * btcPriceUSD;

        // Mostrar el valor en USD en el campo de salida
        usdOutput.textContent = `$${usdAmount.toFixed(2)}`;
    } else {
        // Si el valor ingresado no es válido, mostrar un mensaje de error en el campo de salida
        usdOutput.textContent = '';
    }
}

// Llamar a la función para obtener la tasa de cambio de BTC a USD inicialmente
fetchBTCtoUSDExchangeRate();

// Escuchar el evento 'input' en el campo de entrada BTC para realizar la conversión en tiempo real
btcInput.addEventListener('input', () => {
    // Obtener la tasa de cambio de BTC a USD nuevamente cada vez que se ingresa un nuevo valor de BTC
    fetchBTCtoUSDExchangeRate();
});
