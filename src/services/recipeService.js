import api from "./api"; //usamos la instancia de AXIOS, y no repetimos la url del backend en cada archivo.

export async function getAllRecipes() {
  try {
    const response = await api.get("/recipes");
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error al obtener las recetas";
    throw new Error(message);
  }
}

export async function getRecipeById(recipeId) {
  try {
    const response = await api.get(`/recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error al obtener la receta";
    throw new Error(message);
  }
}

export async function createRecipe(recipeData) {
  try {
    const response = await api.post("/recipes", recipeData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error al crear la receta";
    throw new Error(message);
  }
}

export async function deleteRecipe(recipeId) {
  try {
    const response = await api.delete(`/recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error al eliminar la receta";
    throw new Error(message);
  }
}

export async function updateRecipe(recipeId, recipeData) {
  try {
    const response = await api.put(`/recipes/${recipeId}`, recipeData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error al actualizar la receta";
    throw new Error(message);
  }
}
