document.addEventListener('DOMContentLoaded', function () {
  const ctx = document.getElementById('myChart').getContext('2d');

  const initialData = {
      datasets: [{
          label: 'Bitcoin Price',
          data: [],
          type: 'candlestick',
          borderColor: '#667389',
          borderWidth: 1
      }]
  };

  const config = {
      type: 'candlestick',
      data: initialData,
      options: {
          plugins: {
              legend: {
                  display: false
              }
          },
          scales: {
              x: {
                  type: 'time',
                  time: {
                      unit: 'day',
                      tooltipFormat: 'DD MMM YYYY',
                  }
              },
              y: {
                  ticks: {
                      display: false // Desactiva la visualización de los números en el eje Y
                  }
              }
          }
      }
  };

  const chart = new Chart(ctx, config);

  const periodMapping = {
      '15m': '15m',
      '1h': '1h',
      '4h': '4h',
      '8h': '8h',
      '1d': '1d',
      '7d': '1w', // Cambiado a '1w' para coincidir con los intervalos de Binance
      '30d': '1M',
      '365d': '1Y'
  };

  async function fetchData(period) {
      const interval = periodMapping[period];
      const limit = (period === '7d' || period === '365d') ? 500 : 100; // Aumentar el límite de datos para intervalos largos
      const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=${limit}`);
      const data = await response.json();
      return data.map(item => ({
          x: item[0],
          o: parseFloat(item[1]),
          h: parseFloat(item[2]),
          l: parseFloat(item[3]),
          c: parseFloat(item[4])
      }));
  }

  async function updateChart(period) {
      const data = await fetchData(period);
      chart.data.datasets[0].data = data;
      chart.update();
  }

  const buttons = document.querySelectorAll('#graficaMarket button');
  buttons.forEach(button => {
      button.addEventListener('click', () => {
          const period = button.getAttribute('data-period');
          updateChart(period);
      });
  });

  // Initial load for 1 day data
  updateChart('1d');
});
