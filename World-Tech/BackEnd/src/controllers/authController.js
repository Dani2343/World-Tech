const User = require('../models/userModel');

/**
 * LOGIN
 */
const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const user = await User.findByEmail(correo);

        if (!user) {
            return res.status(404).json({
                message: "El usuario no existe"
            });
        }

        if (user.Contrasena_Usuario !== password) {
            return res.status(401).json({
                message: "Contraseña incorrecta"
            });
        }

        res.status(200).json({
            message: "Login exitoso",
            user: {
                ID_Usuario: user.ID_Usuario,
                Nombre_Usuario: user.Nombre_Usuario,
                Correo_Usuario: user.Correo_Usuario,
                Telefono_Usuario: user.Telefono_Usuario,
                Direccion_Usuario: user.Direccion_Usuario,
                Rol: user.Rol
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

/**
 * REGISTRO
 */
const register = async (req, res) => {
    const { nombre, telefono, correo, password, direccion } = req.body;

    try {
        const existe = await User.findByEmail(correo);

        if (existe) {
            return res.status(400).json({
                message: "El correo ya está registrado"
            });
        }

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
        console.error(error);
        res.status(500).json({
            message: "Error al registrar usuario"
        });
    }
};

module.exports = {
    login,
    register
};