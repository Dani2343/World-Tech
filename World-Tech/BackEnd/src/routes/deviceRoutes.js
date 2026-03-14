const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

// 1. Obtener todos los dispositivos (GET)
// Se activa cuando el Front-end hace: fetch('.../api/devices')
router.get('/', deviceController.getDevices);

// 2. Obtener un dispositivo por ID (GET)
router.get('/:id', deviceController.getDeviceById);

// 3. Añadir un nuevo dispositivo (POST)
// Se activa cuando el Admin pulsa "REGISTRAR NUEVO EQUIPO"
router.post('/', deviceController.addDevice);

// 4. Actualizar un dispositivo (PUT)
// Se activa cuando el Admin pulsa "GUARDAR CAMBIOS"
router.put('/:id', deviceController.updateDevice);

// 5. Eliminar un dispositivo (DELETE)
// Se activa cuando el Admin pulsa "ELIMINAR"
router.delete('/:id', deviceController.deleteDevice);

module.exports = router;