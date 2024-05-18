async function getBitcoinSupply() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin');
        const data = await response.json();

        // Obtener los valores de circulating supply y max supply
        const circulatingSupply = data.market_data.circulating_supply;
        const maxSupply = data.market_data.max_supply;

        // Actualizar los elementos del DOM con los datos obtenidos
        document.getElementById('total-supply').innerText = Math.floor(circulatingSupply).toLocaleString() + ' BTC';
        document.getElementById('max-supply').innerText = Math.floor(maxSupply).toLocaleString() + ' BTC';
    } catch (error) {
        console.error('Error al obtener datos de la API de CoinGecko:', error);
    }
}

// Llamar a la función para obtener los datos y actualizar la tabla
getBitcoinSupply();




async function fetchFDMCFromAPI() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin');
        const data = await response.json();

        // Suponiendo que la API devuelve el Fully Diluted Market Cap en un campo llamado 'market_data'
        // Ajustamos a circulating_supply porque no proporciona directamente fully_diluted_market_cap
        const fdmcValue = data.market_data.circulating_supply * data.market_data.current_price.usd;

        // Mostrar el Fully Diluted Market Cap con el símbolo del dólar al principio
        document.getElementById('fdmc').innerText = '$' + fdmcValue.toLocaleString();
       
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
}

// Llamar a la función para obtener el FDMC cuando se carga la página
fetchFDMCFromAPI();
