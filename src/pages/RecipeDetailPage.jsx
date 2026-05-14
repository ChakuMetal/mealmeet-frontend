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
    return (
      <div className="page-section">
        <p className="recipe-detail-state">Cargando receta...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-section">
        <p className="recipe-detail-state recipe-detail-state-error">{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="page-section">
        <p className="recipe-detail-state">No se encontró la receta.</p>
      </div>
    );
  }

  return (
    <div className="recipe-detail-page">
      <div className="recipe-detail-card">
        <Link className="recipe-detail-back" to="/recipes">
          Volver a recetas
        </Link>

        <img
          className="recipe-detail-image"
          src={recipe.image}
          alt={recipe.title}
        />

        <h1 className="recipe-detail-title">{recipe.title}</h1>

        <div className="recipe-detail-body">
          <p>
            <strong>Categoría:</strong> {recipe.category}
          </p>
          <p>
            <strong>Dificultad:</strong> {recipe.level}
          </p>
          <p>
            <strong>Tiempo de preparación:</strong> {recipe.preptime} minutos
          </p>
          <p>
            <strong>Ingredientes:</strong> {recipe.ingredients}
          </p>
          <p>
            <strong>Instrucciones:</strong> {recipe.instructions}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailPage;
