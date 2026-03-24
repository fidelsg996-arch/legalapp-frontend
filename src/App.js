import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import AdminPanel from './components/admin/AdminPanel';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');
    
    if (token && usuarioGuardado) {
      setIsAuthenticated(true);
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const handleLogin = (usuarioData) => {
    setIsAuthenticated(true);
    setUsuario(usuarioData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setIsAuthenticated(false);
    setUsuario(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <div style={{ 
        textAlign: 'right', 
        padding: '10px 20px', 
        background: '#f5f5f5',
        borderBottom: '1px solid #ddd'
      }}>
        <span>👤 {usuario?.nombre} ({usuario?.rol})</span>
        <button 
          onClick={handleLogout} 
          style={{ marginLeft: '15px', padding: '5px 15px', cursor: 'pointer' }}
        >
          Cerrar Sesión
        </button>
      </div>
      <AdminPanel />
    </div>
  );
}

export default App;