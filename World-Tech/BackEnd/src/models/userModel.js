const db = require('../config/db');

const User = {
    // Buscar por correo para validar el login
    findByEmail: async (correo) => {
        try {
            const [rows] = await db.query(
                'SELECT * FROM Usuarios WHERE Correo_Usuario = ?', 
                [correo]
            );
            return rows[0]; // Retorna el usuario si existe
        } catch (error) {
            throw error;
        }
    },

    // Crear nuevo usuario (Registro)
    create: async (userData) => {
        const { nombre, telefono, correo, password, direccion } = userData;
        const [result] = await db.query(
            'INSERT INTO Usuarios (Nombre_Usuario, Telefono_Usuario, Correo_Usuario, Contrasena_Usuario, Direccion_Usuario) VALUES (?, ?, ?, ?, ?)',
            [nombre, telefono, correo, password, direccion]
        );
        return result.insertId;
    }
};

module.exports = User;