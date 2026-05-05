import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";
import { Link } from "react-router-dom";

function RecipeDetailPage() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRecipe() {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  if (isLoading) {
    return <p>Cargando receta...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>No se encontró la receta.</p>;
  }

  return (
    <div>
      <Link to="/recipes">Volver a recetas</Link>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} width="300" />
      <p>Categoría: {recipe.category}</p>
      <p>Dificultad: {recipe.level}</p>
      <p>Tiempo de preparación: {recipe.preptime} minutos</p>
      <p>Ingredientes: {recipe.ingredients}</p>
      <p>Instrucciones: {recipe.instructions}</p>
    </div>
  );
}

export default RecipeDetailPage;
