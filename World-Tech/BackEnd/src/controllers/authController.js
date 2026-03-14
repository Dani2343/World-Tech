const User = require('../models/userModel');

/**
 * Proceso de Inicio de Sesión
 */
const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
        // 1. Buscar si el usuario existe en la tabla Usuarios
        const user = await User.findByEmail(correo);

        if (!user) {
            return res.status(404).json({ message: "El usuario no existe" });
        }

        // 2. Verificar la contraseña (comparación directa)
        if (user.Contrasena_Usuario !== password) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // 3. Responder éxito enviando los datos del perfil
        // Crucial: Enviamos el correo para que el FrontEnd active el Modo Administrador
        res.status(200).json({
            message: "Login exitoso",
            user: {
                id: user.ID_Usuario,
                nombre: user.Nombre_Usuario,
                correo: user.Correo_Usuario,
                telefono: user.Telefono_Usuario,
                direccion: user.Direccion_Usuario
            }
        });

    } catch (error) {
        console.error("Error en el proceso de login:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

/**
 * Registro de Nuevos Usuarios (Clientes)
 */
const register = async (req, res) => {
    const { nombre, telefono, correo, password, direccion } = req.body;

    try {
        // 1. Verificar si el correo ya está registrado para evitar duplicados
        const existe = await User.findByEmail(correo);
        if (existe) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // 2. Crear el nuevo usuario en la base de datos
        const userId = await User.create({
            nombre,
            telefono,
            correo,
            password,
            direccion
        });

        res.status(201).json({
            message: "Usuario registrado con éxito",
            userId
        });

    } catch (error) {
        console.error("Error en el proceso de registro:", error);
        res.status(500).json({ message: "No se pudo crear la cuenta" });
    }
};

// Exportamos ambas funciones para que authRoutes.js las pueda utilizar
module.exports = { login, register };