const express = require('express');
const cors = require('cors');
require('dotenv').config();

// --- IMPORTAR RUTAS ---
const authRoutes = require('./src/routes/authRoutes');
const deviceRoutes = require('./src/routes/deviceRoutes'); // NUEVA RUTA IMPORTADA

const app = express();

app.use(cors());
app.use(express.json());

// --- USAR LAS RUTAS ---
app.use('/api/auth', authRoutes);      // Para Login y Registro
app.use('/api/devices', deviceRoutes); // NUEVA RUTA PARA INVENTARIO

app.get('/', (req, res) => {
    res.send('Servidor de World-Tech funcionando 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});