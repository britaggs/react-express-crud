import React from 'react';

const EditarUsuario = ({
    nombre,
    setNombre,
    email,
    setEmail,
    actualizarUsuario,
    cancelarEdicion
}) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
            <h2 className="text-2xl font-bold text-yellow-600 flex items-center gap-2 mb-4">
                ✏️ Editar Usuario
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="border rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Correo electrónico:</label>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    />
                </div>

                <div className="flex gap-2 pt-2">
                    <button
                        onClick={actualizarUsuario}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow transition-colors"
                    >
                        Guardar Cambios
                    </button>
                    <button
                        onClick={cancelarEdicion}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg shadow transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditarUsuario;
