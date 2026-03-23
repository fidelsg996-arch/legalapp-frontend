import React, { useState, useEffect } from 'react';
import { getLibros, uploadLibro, deleteLibro } from '../../services/api';

function LibrosAdmin() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    archivo: null
  });

  useEffect(() => {
    cargarLibros();
  }, []);

  const cargarLibros = async () => {
    try {
      const data = await getLibros();
      setLibros(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.archivo) {
      alert('Selecciona un archivo');
      return;
    }

    const data = new FormData();
    data.append('titulo', formData.titulo);
    data.append('autor', formData.autor);
    data.append('archivo', formData.archivo);

    setUploading(true);
    try {
      await uploadLibro(data);
      alert('Libro subido correctamente');
      setFormData({ titulo: '', autor: '', archivo: null });
      cargarLibros();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este libro?')) {
      try {
        await deleteLibro(id);
        alert('Libro eliminado');
        cargarLibros();
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  const handleFileChange = (e) => {
    setFormData({...formData, archivo: e.target.files[0]});
  };

  if (loading) return <div className="loading">Cargando libros...</div>;

  return (
    <div className="admin-section">
      <h2>📖 Administrar Libros</h2>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <h3>Subir Nuevo Libro</h3>
        <input
          type="text"
          placeholder="Título"
          value={formData.titulo}
          onChange={(e) => setFormData({...formData, titulo: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={formData.autor}
          onChange={(e) => setFormData({...formData, autor: e.target.value})}
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          required
        />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Subiendo...' : 'Subir Libro'}
        </button>
      </form>

      <div className="admin-list">
        <h3>Libros Disponibles</h3>
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th>Título</th>
              <th>Autor</th>
              <th>Archivo</th>
              <th>Descargas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {libros.map(libro => (
              <tr key={libro._id}>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>
                  <a href={`http://localhost:3000/uploads/${libro.archivo}`} target="_blank" rel="noreferrer">
                    Ver PDF
                  </a>
                </td>
                <td>{libro.descargas || 0}</td>
                <td>
                  <button onClick={() => handleDelete(libro._id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
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

export default LibrosAdmin;