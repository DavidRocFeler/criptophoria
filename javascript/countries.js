fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => {
    // Ordenar los datos alfabéticamente por el nombre común
    data.sort((a, b) => {
      if (a.name.common < b.name.common) return -1;
      if (a.name.common > b.name.common) return 1;
      return 0;
    });

    // Obtener el elemento select
    const countrySelect = document.getElementById('country-select');

    // Iterar sobre los datos y agregar opciones al elemento select
    data.forEach(country => {
      const option = document.createElement('option');
      option.value = country.name.common;
      option.textContent = country.name.common;
      countrySelect.appendChild(option);
    });

    // Habilitar la caja de selección después de agregar las opciones
    countrySelect.disabled = false;
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });