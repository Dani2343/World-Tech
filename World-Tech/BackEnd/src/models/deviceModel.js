const db = require('../config/db');

const Device = {
    // 1. Obtener todos los dispositivos (Read)
    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM Dispositivo');
        return rows;
    },

    // 2. Obtener un dispositivo por ID (Para ver detalles)
    getById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM Dispositivo WHERE ID_Dispositivo = ?', [id]);
        return rows[0];
    },

    // 3. Crear un nuevo dispositivo (Create)
    create: async (data) => {
        const { 
            nombre, referencia, marca, tipo, fecha, precio, stock, 
            imagen, descripcion, procesador, ram, almacenamiento, 
            camaras, bateria, conectividad 
        } = data;

        const [result] = await db.execute(
            `INSERT INTO Dispositivo 
            (Nombre_Dispositivo, Referencia_Dispositivo, Marca_Dispositivo, Tipo_Dispositivo, 
             Fecha_Lanzamiento, Precio_Dispositivo, Stock_Dispositivo, Imagen_URL, 
             Descripcion_Dispositivo, Procesador, RAM, Almacenamiento, 
             Camaras, Bateria, Conectividad) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                nombre, referencia, marca, tipo, fecha || null, precio, stock || 0, 
                imagen, descripcion, procesador, ram, almacenamiento, 
                camaras, bateria, conectividad
            ]
        );
        return result.insertId;
    },

    // 4. Actualizar un dispositivo (Update)
    update: async (id, data) => {
        const { 
            nombre, referencia, marca, tipo, fecha, precio, stock, 
            imagen, descripcion, procesador, ram, almacenamiento, 
            camaras, bateria, conectividad 
        } = data;

        const [result] = await db.execute(
            `UPDATE Dispositivo SET 
            Nombre_Dispositivo = ?, Referencia_Dispositivo = ?, Marca_Dispositivo = ?, 
            Tipo_Dispositivo = ?, Fecha_Lanzamiento = ?, Precio_Dispositivo = ?, 
            Stock_Dispositivo = ?, Imagen_URL = ?, Descripcion_Dispositivo = ?,
            Procesador = ?, RAM = ?, Almacenamiento = ?, 
            Camaras = ?, Bateria = ?, Conectividad = ?
            WHERE ID_Dispositivo = ?`,
            [
                nombre, referencia, marca, tipo, fecha || null, precio, stock, 
                imagen, descripcion, procesador, ram, almacenamiento, 
                camaras, bateria, conectividad, id
            ]
        );
        return result.affectedRows;
    },

    // 5. Eliminar un dispositivo (Delete)
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM Dispositivo WHERE ID_Dispositivo = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = Device;