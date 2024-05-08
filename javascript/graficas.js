// Función para obtener datos históricos del precio de Bitcoin desde CoinCap
function getHistoricalData(range) {
    // Función para obtener la fecha de inicio basada en el rango especificado
    function getStartDate(range) {
        const today = new Date();
        let startDate = new Date();

        switch (range) {
            case '1d':
                startDate.setDate(today.getDate() - 1);
                break;
            case '7d':
                startDate.setDate(today.getDate() - 7);
                break;
            case '30d':
                startDate.setDate(today.getDate() - 30);
                break;
            case '365d':
                startDate.setDate(today.getDate() - 365);
                break;
            case 'max':
                // No hay fecha de inicio para el rango 'max'
                break;
            default:
                startDate = today;
        }

        return startDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    }

    // Obtén la fecha de inicio y fin en formato UNIX timestamp
    const startDate = getStartDate(range);
    const endDate = new Date().toISOString().split('T')[0]; // Fecha de fin es hoy

    // Construir la URL de la API con los parámetros de fecha en formato UNIX timestamp
    const apiUrl = `api.coincap.io/v2/candles?exchange=poloniex&interval=h8&baseId=ethereum&quoteId=bitcoin`;

    // Realiza una solicitud GET a la API
    fetch(apiUrl)
        .then(response => response.json() )
        .then(data => {
            // Extrae las etiquetas (fechas) y los precios de cierre de los datos recibidos
            const labels = data.data.map(entry => new Date(entry.time).toLocaleDateString());
            const prices = data.data.map(entry => parseFloat(entry.priceUsd));

            // Configura los datos para el gráfico
            const chartData = {
                labels: labels,
                datasets: [{
                    label: 'Precio de Bitcoin (USD)',
                    data: prices,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            };

            // Configura las opciones del gráfico
            const options = {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            };

            // Obtén el contexto del lienzo del gráfico
            const ctx = document.getElementById('myChart').getContext('2d');

            // Crea el gráfico de líneas
            new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: options
            });
        })
        .catch(error => console.error('Error al obtener datos históricos de Bitcoin:', error));
}
