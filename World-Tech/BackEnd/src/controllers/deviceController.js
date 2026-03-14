const Device = require('../models/deviceModel');

/**
 * Obtener la lista completa de dispositivos (Para Cliente y Admin)
 */
const getDevices = async (req, res) => {
    try {
        const devices = await Device.getAll();
        res.status(200).json(devices);
    } catch (error) {
        console.error("Error al obtener dispositivos:", error);
        res.status(500).json({ message: "Error al obtener la lista de equipos" });
    }
};

/**
 * Obtener los detalles de un solo dispositivo por su ID
 */
const getDeviceById = async (req, res) => {
    try {
        const device = await Device.getById(req.params.id);
        if (!device) {
            return res.status(404).json({ message: "Dispositivo no encontrado" });
        }
        res.status(200).json(device);
    } catch (error) {
        console.error("Error al obtener el dispositivo:", error);
        res.status(500).json({ message: "Error al consultar los detalles" });
    }
};

/**
 * Registrar un nuevo dispositivo (Añadir)
 */
const addDevice = async (req, res) => {
    try {
        // req.body contiene: nombre, referencia, marca, tipo, precio, stock, imagen, 
        // procesador, ram, almacenamiento, camaras, bateria, conectividad
        const deviceId = await Device.create(req.body);
        res.status(201).json({ 
            message: "Dispositivo registrado con éxito", 
            id: deviceId 
        });
    } catch (error) {
        console.error("Error al crear dispositivo:", error);
        res.status(500).json({ message: "No se pudo registrar el equipo en la base de datos" });
    }
};

/**
 * Actualizar los datos de un dispositivo existente (Editar)
 */
const updateDevice = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Device.update(id, req.body);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Dispositivo no encontrado para actualizar" });
        }

        res.status(200).json({ message: "Dispositivo actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar dispositivo:", error);
        res.status(500).json({ message: "Error al procesar la actualización" });
    }
};

/**
 * Eliminar un dispositivo del inventario (Borrar)
 */
const deleteDevice = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Device.delete(id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Dispositivo no encontrado para eliminar" });
        }

        res.status(200).json({ message: "Dispositivo eliminado del inventario" });
    } catch (error) {
        console.error("Error al eliminar dispositivo:", error);
        res.status(500).json({ message: "No se pudo eliminar el equipo" });
    }
};

// Exportamos todas las funciones para que el archivo de rutas las consuma
module.exports = { 
    getDevices, 
    getDeviceById, 
    addDevice, 
    updateDevice, 
    deleteDevice 
};