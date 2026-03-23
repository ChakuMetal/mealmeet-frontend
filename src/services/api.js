import axios from "axios";

// Para qué sirve api.js:
// Configuración centralizada de axios.
// Aquí definimos URL base, headers por defecto, y comportamiento global.

// Por qué está aquí y no disperso en componentes:
// Si mañana cambia la URL del backend (de localhost a Render),
// lo cambias en UN lugar, no en 10 componentes diferentes.

const API_BASE_URL = "https://mealmeet-backend.onrender.com/api";

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token en cada petición autenticada
// Más adelante lo conectaremos con el contexto de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
