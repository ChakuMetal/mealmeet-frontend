import axios from "axios";

// Para qué sirve api.js:
// Configuración centralizada de axios.
// Aquí definimos URL base, headers por defecto, y comportamiento global.

// Por qué está aquí y no disperso en componentes:
// Si mañana cambia la URL del backend (de localhost a Render),
// lo cambias en UN lugar, no en 10 componentes diferentes.

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token en cada petición autenticada
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const backendMessage =
      error.response?.data?.message || error.response?.data?.error || "";
    const hasToken = Boolean(localStorage.getItem("token"));

    const isTokenExpired =
      typeof backendMessage === "string" &&
      /token no valido o expirado|token no válido o expirado|jwt expired|invalid token/i.test(
        backendMessage,
      );

    if (status === 401 && hasToken && isTokenExpired) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login?expired=1";
      }
    }

    return Promise.reject(error);
  },
);
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
