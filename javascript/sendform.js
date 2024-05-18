document.getElementById('subscriptionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value || ''; // Hacer opcional
    const country = document.getElementById('country-select').value;

    if (name && email && country) { // Verifica que todos los campos requeridos estén completos
        fetch('http://localhost:3000/api/suscribirse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, whatsapp, country })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Thank you for subscribing!');
                // Limpiar los campos del formulario después de un envío exitoso
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('whatsapp').value = '';
                document.getElementById('country-select').selectedIndex = 0; // Reiniciar la selección del país
            } else {
                alert('There was a problem with the subscription. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem with the subscription. Please try again.');
        });
    } else {
        alert('Please fill in all required fields.'); // Alerta si falta algún campo requerido
    }
});

