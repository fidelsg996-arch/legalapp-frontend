// URL del backend en producción (Vercel)
const API_URL = 'https://legalapp-backend.vercel.app/api';

// ======================
// CURSOS
// ======================

export const getCursos = async () => {
  const response = await fetch(`${API_URL}/cursos`);
  if (!response.ok) throw new Error('Error al obtener cursos');
  return response.json();
};

export const createCurso = async (curso) => {
  const response = await fetch(`${API_URL}/cursos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(curso)
  });
  if (!response.ok) throw new Error('Error al crear curso');
  return response.json();
};

export const updateCurso = async (id, curso) => {
  const response = await fetch(`${API_URL}/cursos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(curso)
  });
  if (!response.ok) throw new Error('Error al actualizar curso');
  return response.json();
};

export const deleteCurso = async (id) => {
  const response = await fetch(`${API_URL}/cursos/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar curso');
  return response.json();
};

// ======================
// USUARIOS
// ======================

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/usuarios/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!response.ok) throw new Error('Error al registrar usuario');
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  if (!response.ok) throw new Error('Error al iniciar sesión');
  return response.json();
};

export const getUsuarios = async () => {
  const response = await fetch(`${API_URL}/usuarios`);
  if (!response.ok) throw new Error('Error al obtener usuarios');
  return response.json();
};

// ======================
// LIBROS
// ======================

export const getLibros = async () => {
  const response = await fetch(`${API_URL}/libros`);
  if (!response.ok) throw new Error('Error al obtener libros');
  return response.json();
};

export const uploadLibro = async (formData) => {
  const response = await fetch(`${API_URL}/libros`, {
    method: 'POST',
    body: formData
  });
  if (!response.ok) throw new Error('Error al subir libro');
  return response.json();
};

export const deleteLibro = async (id) => {
  const response = await fetch(`${API_URL}/libros/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar libro');
  return response.json();
};

export const registrarDescarga = async (id) => {
  const response = await fetch(`${API_URL}/libros/${id}/descargar`, {
    method: 'PUT'
  });
  if (!response.ok) throw new Error('Error al registrar descarga');
  return response.json();
};