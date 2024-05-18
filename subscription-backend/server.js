const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Configura la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rdpalominop1997@', // Reemplaza con tu contraseña de MySQL
    database: 'sucriptores_db'
});

// Conecta a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.use(cors());
app.use(bodyParser.json());

app.post('/api/suscribirse', (req, res) => {
    const { name, email, whatsapp, country } = req.body;

    // Validación básica del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Correo electrónico no válido' });
    }

    // Crear un registro de suscripción
    const subscription = { name, email, whatsapp, country };

    // Guardar la suscripción en la base de datos
    const query = 'INSERT INTO subscribers (name, email, whatsapp, country, date) VALUES (?, ?, ?, ?, NOW())';

    db.query(query, [subscription.name, subscription.email, subscription.whatsapp, subscription.country], (err, result) => {
        if (err) {
            console.error('Error al guardar la suscripción:', err);
            return res.status(500).json({ success: false, message: 'Error al guardar la suscripción' });
        }
        res.json({ success: true, message: 'Suscripción exitosa' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
