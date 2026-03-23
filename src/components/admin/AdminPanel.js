import React, { useState } from 'react';
import CursosAdmin from './CursosAdmin';
import UsuariosAdmin from './UsuariosAdmin';
import LibrosAdmin from './LibrosAdmin';
import './AdminPanel.css';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('cursos');

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      
      <div className="admin-tabs">
        <button 
          className={activeTab === 'cursos' ? 'active' : ''}
          onClick={() => setActiveTab('cursos')}
        >
          📚 Cursos
        </button>
        <button 
          className={activeTab === 'usuarios' ? 'active' : ''}
          onClick={() => setActiveTab('usuarios')}
        >
          👥 Usuarios
        </button>
        <button 
          className={activeTab === 'libros' ? 'active' : ''}
          onClick={() => setActiveTab('libros')}
        >
          📖 Libros
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'cursos' && <CursosAdmin />}
        {activeTab === 'usuarios' && <UsuariosAdmin />}
        {activeTab === 'libros' && <LibrosAdmin />}
      </div>
    </div>
  );
}

export default AdminPanel;