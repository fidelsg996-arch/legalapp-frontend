const API_URL = 'https://backend-solo-5a3o.onrender.com/api';

export const getCursos = async () => {
  const res = await fetch(`${API_URL}/cursos`);
  if (!res.ok) throw new Error('Error al obtener cursos');
  return res.json();
};

export const createCurso = async (curso) => {
  const res = await fetch(`${API_URL}/cursos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(curso)
  });
  if (!res.ok) throw new Error('Error al crear curso');
  return res.json();
};

export const updateCurso = async (id, curso) => {
  const res = await fetch(`${API_URL}/cursos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(curso)
  });
  if (!res.ok) throw new Error('Error al actualizar curso');
  return res.json();
};

export const deleteCurso = async (id) => {
  const res = await fetch(`${API_URL}/cursos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar curso');
  return res.json();
};

export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/usuarios/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!res.ok) throw new Error('Error al registrar usuario');
  return res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  if (!res.ok) throw new Error('Error al iniciar sesión');
  return res.json();
};

export const getUsuarios = async () => {
  const res = await fetch(`${API_URL}/usuarios`);
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return res.json();
};

export const deleteUsuario = async (id) => {
  const res = await fetch(`${API_URL}/usuarios/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar usuario');
  return res.json();
};

export const getLibros = async () => {
  const res = await fetch(`${API_URL}/libros`);
  if (!res.ok) throw new Error('Error al obtener libros');
  return res.json();
};

export const uploadLibro = async (formData) => {
  const res = await fetch(`${API_URL}/libros`, { method: 'POST', body: formData });
  if (!res.ok) throw new Error('Error al subir libro');
  return res.json();
};

export const deleteLibro = async (id) => {
  const res = await fetch(`${API_URL}/libros/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar libro');
  return res.json();
};

export const registrarDescarga = async (id) => {
  const res = await fetch(`${API_URL}/libros/${id}/descargar`, { method: 'PUT' });
  if (!res.ok) throw new Error('Error al registrar descarga');
  return res.json();
};