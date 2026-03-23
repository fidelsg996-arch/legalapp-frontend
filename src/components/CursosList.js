import React, { useState, useEffect } from 'react';
import { getCursos, deleteCurso } from '../services/api';

function CursosList() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarCursos();
  }, []);

  const cargarCursos = async () => {
    try {
      setLoading(true);
      const data = await getCursos();
      setCursos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este curso?')) {
      try {
        await deleteCurso(id);
        cargarCursos(); // Recargar la lista
      } catch (err) {
        alert('Error al eliminar: ' + err.message);
      }
    }
  };

  if (loading) return <div>Cargando cursos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Lista de Cursos</h2>
      <ul>
        {cursos.map(curso => (
          <li key={curso._id}>
            <strong>{curso.titulo}</strong> - {curso.descripcion}
            {curso.precio && <span> - ${curso.precio}</span>}
            <button onClick={() => handleDelete(curso._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CursosList;