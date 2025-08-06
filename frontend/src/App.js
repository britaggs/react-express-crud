import React from 'react';
import UsuariosApp from './components/UsuariosApp';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📋 Gestión de Usuarios
        </h1>
        <UsuariosApp />
      </div>
    </div>
  );
}

export default App;
