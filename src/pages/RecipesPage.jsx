import { useEffect, useState } from "react";
import { getAllRecipes } from "../services/recipeService";
import RecipeCard from "../components/recipes/RecipeCard";

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadRecipes();
  }, []);

  if (isLoading) {
    return (
      <div className="page-section">
        <p className="recipes-state">Cargando recetas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-section">
        <p className="recipes-state recipes-state-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="page-section">
      <div className="recipes-header">
        <h1 className="recipes-title">Todas las Recetas</h1>
        <p className="recipes-total">Total de recetas: {recipes.length}</p>
      </div>
      {recipes.length === 0 ? (
        <p className="recipes-state">No hay recetas disponibles todavía.</p>
      ) : (
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipesPage;
