import React from 'react';

const ListaUsuarios = ({ usuarios, loading, editarUsuario, eliminarUsuario }) => {
    return (
        <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : usuarios.length > 0 ? (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-100 text-blue-800">
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Nombre</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((u) => (
                            <tr key={u.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{u.id}</td>
                                <td className="px-4 py-2 border">{u.nombre}</td>
                                <td className="px-4 py-2 border">{u.email}</td>
                                <td className="px-4 py-2 border text-center space-x-2">
                                    <button
                                        onClick={() => editarUsuario(u)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => eliminarUsuario(u.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500">No hay usuarios registrados</p>
            )}
        </div>
    );
};

export default ListaUsuarios;
