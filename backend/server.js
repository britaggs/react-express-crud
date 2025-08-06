const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Base de datos simulada en memoria
let usuarios = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com' },
    { id: 2, nombre: 'María García', email: 'maria@email.com' },
    { id: 3, nombre: 'Carlos López', email: 'carlos@email.com' }
];

let nextId = 4;

// GET - Consultar todos los usuarios
app.get('/api/usuarios', (req, res) => {
    console.log('GET /api/usuarios - Obteniendo todos los usuarios');
    res.json({
        success: true,
        data: usuarios,
        message: 'Usuarios obtenidos correctamente',
        total: usuarios.length
    });
});

// GET - Consultar un usuario por ID
app.get('/api/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`GET /api/usuarios/${id} - Buscando usuario`);

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        console.log(`Usuario con ID ${id} no encontrado`);
        return res.status(404).json({
            success: false,
            message: 'Usuario no encontrado'
        });
    }

    console.log(`Usuario encontrado: ${usuario.nombre}`);
    res.json({
        success: true,
        data: usuario,
        message: 'Usuario encontrado correctamente'
    });
});

// POST - Insertar nuevo usuario
app.post('/api/usuarios', (req, res) => {
    const { nombre, email } = req.body;
    console.log(`POST /api/usuarios - Creando usuario: ${nombre}, ${email}`);

    if (!nombre || !email) {
        console.log('Error: Faltan campos requeridos');
        return res.status(400).json({
            success: false,
            message: 'Nombre y email son requeridos'
        });
    }

    // Verificar si el email ya existe
    const emailExiste = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExiste) {
        console.log('Error: Email ya existe');
        return res.status(400).json({
            success: false,
            message: 'El email ya está registrado'
        });
    }

    const nuevoUsuario = {
        id: nextId++,
        nombre: nombre.trim(),
        email: email.trim().toLowerCase()
    };

    usuarios.push(nuevoUsuario);
    console.log(`Usuario creado exitosamente con ID: ${nuevoUsuario.id}`);

    res.status(201).json({
        success: true,
        data: nuevoUsuario,
        message: 'Usuario creado correctamente'
    });
});

// PUT - Actualizar usuario
app.put('/api/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, email } = req.body;
    console.log(`PUT /api/usuarios/${id} - Actualizando usuario`);

    const usuarioIndex = usuarios.findIndex(u => u.id === id);

    if (usuarioIndex === -1) {
        console.log(`Usuario con ID ${id} no encontrado para actualizar`);
        return res.status(404).json({
            success: false,
            message: 'Usuario no encontrado'
        });
    }

    if (!nombre || !email) {
        console.log('Error: Faltan campos requeridos para actualizar');
        return res.status(400).json({
            success: false,
            message: 'Nombre y email son requeridos'
        });
    }

    // Verificar si el email ya existe en otro usuario
    const emailExiste = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase() && u.id !== id);
    if (emailExiste) {
        console.log('Error: Email ya existe en otro usuario');
        return res.status(400).json({
            success: false,
            message: 'El email ya está registrado en otro usuario'
        });
    }

    usuarios[usuarioIndex] = {
        id,
        nombre: nombre.trim(),
        email: email.trim().toLowerCase()
    };

    console.log(`Usuario ${id} actualizado exitosamente`);

    res.json({
        success: true,
        data: usuarios[usuarioIndex],
        message: 'Usuario actualizado correctamente'
    });
});

// DELETE - Borrar usuario
app.delete('/api/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`DELETE /api/usuarios/${id} - Eliminando usuario`);

    const usuarioIndex = usuarios.findIndex(u => u.id === id);

    if (usuarioIndex === -1) {
        console.log(`Usuario con ID ${id} no encontrado para eliminar`);
        return res.status(404).json({
            success: false,
            message: 'Usuario no encontrado'
        });
    }

    const usuarioEliminado = usuarios.splice(usuarioIndex, 1)[0];
    console.log(`Usuario ${usuarioEliminado.nombre} eliminado exitosamente`);

    res.json({
        success: true,
        data: usuarioEliminado,
        message: 'Usuario eliminado correctamente'
    });
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: 'API de Usuarios funcionando correctamente',
        endpoints: {
            'GET /api/usuarios': 'Obtener todos los usuarios',
            'GET /api/usuarios/:id': 'Obtener usuario por ID',
            'POST /api/usuarios': 'Crear nuevo usuario',
            'PUT /api/usuarios/:id': 'Actualizar usuario',
            'DELETE /api/usuarios/:id': 'Eliminar usuario'
        }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📡 API disponible en http://localhost:${PORT}/api/usuarios`);
    console.log(`👥 Usuarios iniciales: ${usuarios.length}`);
});
