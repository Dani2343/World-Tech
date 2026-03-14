const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// --- RUTAS PÚBLICAS ---

// Ruta para iniciar sesión
router.post('/login', authController.login);

// Ruta para crear nuevos usuarios (Clientes)
router.post('/register', authController.register);


// --- RUTAS PROTEGIDAS (Opcionales para el futuro) ---
/* Aquí podrías añadir rutas que requieran que el usuario esté logueado,
   como por ejemplo obtener sus datos de perfil o actualizar su dirección.
*/

// Ejemplo: router.get('/profile', authController.getProfile);

module.exports = router;