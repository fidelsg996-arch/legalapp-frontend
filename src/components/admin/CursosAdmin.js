import React, { useState, useEffect } from 'react';
import { getCursos, createCurso, updateCurso, deleteCurso } from '../../services/api';

function CursosAdmin() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    precio: ''
  });

  useEffect(() => {
    cargarCursos();
  }, []);

  const cargarCursos = async () => {
    try {
      const data = await getCursos();
      setCursos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cursoData = {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio) || 0
      };

      if (editing) {
        await updateCurso(editing, cursoData);
        alert('Curso actualizado');
      } else {
        await createCurso(cursoData);
        alert('Curso creado');
      }
      
      setFormData({ titulo: '', descripcion: '', precio: '' });
      setEditing(null);
      cargarCursos();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleEdit = (curso) => {
    setEditing(curso._id);
    setFormData({
      titulo: curso.titulo,
      descripcion: curso.descripcion,
      precio: curso.precio || ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este curso?')) {
      try {
        await deleteCurso(id);
        alert('Curso eliminado');
        cargarCursos();
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  if (loading) return <div className="loading">Cargando cursos...</div>;

  return (
    <div className="admin-section">
      <h2>📚 Administrar Cursos</h2>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <h3>{editing ? 'Editar Curso' : 'Nuevo Curso'}</h3>
        <input
          type="text"
          placeholder="Título"
          value={formData.titulo}
          onChange={(e) => setFormData({...formData, titulo: e.target.value})}
          required
        />
        <textarea
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={formData.precio}
          onChange={(e) => setFormData({...formData, precio: e.target.value})}
        />
        <button type="submit">{editing ? 'Actualizar' : 'Crear Curso'}</button>
        {editing && (
          <button type="button" onClick={() => {
            setEditing(null);
            setFormData({ titulo: '', descripcion: '', precio: '' });
          }}>
            Cancelar
          </button>
        )}
      </form>

      <div className="admin-list">
        <h3>Cursos Existentes</h3>
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th>Título</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map(curso => (
              <tr key={curso._id}>
                <td>{curso.titulo}</td>
                <td>{curso.descripcion}</td>
                <td>${curso.precio || 0}</td>
                <td>
                  <button onClick={() => handleEdit(curso)} style={{ marginRight: '5px', background: '#28a745', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                    ✏️ Editar
                  </button>
                  <button onClick={() => handleDelete(curso._id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CursosAdmin;