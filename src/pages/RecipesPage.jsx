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
    return <p>Cargando recetas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="page-section">
      <h1>Todas las Recetas</h1>
      <p>Total de recetas: {recipes.length}</p>

      {recipes.length === 0 ? (
        <p>No hay recetas disponibles todavía.</p>
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
