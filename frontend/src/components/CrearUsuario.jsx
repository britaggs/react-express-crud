import React from 'react';

const CrearUsuario = ({
    nombre,
    setNombre,
    email,
    setEmail,
    crearUsuario,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
            <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2 mb-4">
                ➕ Crear Nuevo Usuario
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ingresa el nombre"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa el email"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                </div>

                <button
                    onClick={crearUsuario}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition-colors"
                >
                    Crear Usuario
                </button>
            </div>
        </div>
    );
};

export default CrearUsuario;
