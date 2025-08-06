import React from 'react';

const ConsultaUsuario = ({
    consultandoId,
    setConsultandoId,
    consultarUsuarioPorId,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
            <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2 mb-4">
                🔍 Consultar Usuario por ID
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">ID del Usuario:</label>
                    <input
                        type="number"
                        value={consultandoId}
                        onChange={(e) => setConsultandoId(e.target.value)}
                        placeholder="Ej: 1"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                <button
                    onClick={consultarUsuarioPorId}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-colors"
                >
                    Consultar
                </button>
            </div>
        </div>
    );
};

export default ConsultaUsuario;
