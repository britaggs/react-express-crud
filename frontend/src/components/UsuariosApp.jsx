import React, { useState, useEffect } from 'react';
import ListaUsuarios from './ListaUsuarios';
import EditarUsuario from './EditarUsuario';
import CrearUsuario from './CrearUsuario';
import ConsultaUsuario from './ConsultaUsuario';

const UsuariosApp = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [editandoId, setEditandoId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [consultandoId, setConsultandoId] = useState('');
    const [usuarioConsultado, setUsuarioConsultado] = useState(null);

    const API_URL = 'http://localhost:3001/api/usuarios';

    const mostrarMensaje = (texto, esError = false) => {
        setMensaje({ texto, esError });
        setTimeout(() => setMensaje(''), 3000);
    };

    const obtenerUsuarios = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (data.success) {
                setUsuarios(data.data);
                mostrarMensaje('Usuarios cargados correctamente');
            }
        } catch (error) {
            mostrarMensaje('Error al cargar usuarios', true);
        }
        setLoading(false);
    };

    const crearUsuario = async () => {
        if (!nombre.trim() || !email.trim()) {
            mostrarMensaje('Nombre y email son requeridos', true);
            return;
        }
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: nombre.trim(), email: email.trim() }),
            });
            const data = await response.json();
            if (data.success) {
                setUsuarios([...usuarios, data.data]);
                setNombre('');
                setEmail('');
                mostrarMensaje('Usuario creado correctamente');
            } else {
                mostrarMensaje(data.message || 'Error al crear usuario', true);
            }
        } catch (error) {
            mostrarMensaje('Error al crear usuario', true);
        }
    };

    const actualizarUsuario = async () => {
        if (!nombre.trim() || !email.trim() || !editandoId) {
            mostrarMensaje('Todos los campos son requeridos', true);
            return;
        }
        try {
            const response = await fetch(`${API_URL}/${editandoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: nombre.trim(), email: email.trim() }),
            });
            const data = await response.json();
            if (data.success) {
                setUsuarios(usuarios.map(u => u.id === editandoId ? data.data : u));
                setNombre('');
                setEmail('');
                setEditandoId(null);
                mostrarMensaje('Usuario actualizado correctamente');
            } else {
                mostrarMensaje(data.message || 'Error al actualizar usuario', true);
            }
        } catch (error) {
            mostrarMensaje('Error al actualizar usuario', true);
        }
    };

    const eliminarUsuario = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            const data = await response.json();
            if (data.success) {
                setUsuarios(usuarios.filter(u => u.id !== id));
                mostrarMensaje('Usuario eliminado correctamente');
            } else {
                mostrarMensaje(data.message || 'Error al eliminar usuario', true);
            }
        } catch (error) {
            mostrarMensaje('Error al eliminar usuario', true);
        }
    };

    const editarUsuario = (usuario) => {
        setNombre(usuario.nombre);
        setEmail(usuario.email);
        setEditandoId(usuario.id);
    };

    const cancelarEdicion = () => {
        setNombre('');
        setEmail('');
        setEditandoId(null);
    };

    const consultarUsuarioPorId = async () => {
        if (!consultandoId.trim()) {
            mostrarMensaje('Debe ingresar un ID para buscar', true);
            return;
        }
        try {
            const response = await fetch(`${API_URL}/${consultandoId}`);
            const data = await response.json();
            if (data.success && data.data) {
                setUsuarioConsultado(data.data);
                mostrarMensaje('Usuario encontrado');
            } else {
                setUsuarioConsultado(null);
                mostrarMensaje('Usuario no encontrado', true);
            }
        } catch (error) {
            mostrarMensaje('Error al consultar usuario', true);
        }
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen space-y-6">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Sistema CRUD - Gestión de Usuarios
            </h1>

            {mensaje && mensaje.texto && (
                <div
                    className={`text-center py-3 px-4 rounded-lg shadow-md ${mensaje.esError
                            ? 'bg-red-100 text-red-800 border border-red-300'
                            : 'bg-green-100 text-green-800 border border-green-300'
                        }`}
                >
                    {mensaje.texto}
                </div>
            )}

            {/* Formulario para crear o editar */}
            {editandoId ? (
                <EditarUsuario
                    nombre={nombre}
                    setNombre={setNombre}
                    email={email}
                    setEmail={setEmail}
                    actualizarUsuario={actualizarUsuario}
                    cancelarEdicion={cancelarEdicion}
                />
            ) : (
                <CrearUsuario
                    nombre={nombre}
                    setNombre={setNombre}
                    email={email}
                    setEmail={setEmail}
                    crearUsuario={crearUsuario}
                />
            )}

            {/* Consulta por ID */}
            <ConsultaUsuario
                consultandoId={consultandoId}
                setConsultandoId={setConsultandoId}
                consultarUsuarioPorId={consultarUsuarioPorId}
            />

            {usuarioConsultado && (
                <div className="bg-white rounded-lg shadow p-5 mb-6 border border-blue-200">
                    <h2 className="text-lg font-bold text-blue-600 mb-2">Resultado de la consulta</h2>
                    <p><strong>ID:</strong> {usuarioConsultado.id}</p>
                    <p><strong>Nombre:</strong> {usuarioConsultado.nombre}</p>
                    <p><strong>Email:</strong> {usuarioConsultado.email}</p>
                </div>
            )}

            {/* Lista de usuarios */}
            <ListaUsuarios
                usuarios={usuarios}
                loading={loading}
                editarUsuario={editarUsuario}
                eliminarUsuario={eliminarUsuario}
            />
        </div>
    );
};

export default UsuariosApp;
