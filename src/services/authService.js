import api from "./api";
export async function loginUser(credentials) {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error al iniciar sesión";
    throw new Error(message);
  }
}

export async function registerUser(payload) {
  try {
    const response = await api.post("/auth/register", payload);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error al registrarse";
    throw new Error(message);
  }
}

export async function forgotPasswordRequest(payload) {
  try {
    const response = await api.post("/auth/forgot-password", payload);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || "No se pudo iniciar la recuperación";
    throw new Error(message);
  }
}

export async function resetPasswordRequest(token, payload) {
  try {
    const response = await api.post(`/auth/reset-password/${token}`, payload);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || "No se pudo restablecer la contraseña";
    throw new Error(message);
  }
}
