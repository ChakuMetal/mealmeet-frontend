import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeCard from "../components/recipes/RecipeCard";
import useAuth from "../hooks/useAuth";
import { getAllRecipes, deleteRecipe } from "../services/recipeService";

function MyRecipesPage() {
  const { user } = useAuth();

  const [myRecipes, setMyRecipes] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    async function loadMyRecipes() {
      try {
        const allRecipes = await getAllRecipes();
        const currentUserId = user?._id || user?.id;
        const filteredRecipes = allRecipes.filter(
          (recipe) => recipe.user?._id === currentUserId,
        );

        setMyRecipes(filteredRecipes);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadMyRecipes();
  }, [user]);

  async function handleDelete(recipeId) {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar esta receta?",
    );

    if (!confirmDelete) {
      return;
    }

    setActionError("");

    try {
      await deleteRecipe(recipeId);

      setMyRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
    } catch (err) {
      setActionError(err.message);
    }
  }

  if (isLoading) {
    return <p>Cargando tus recetas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="page-section">
      <h1>Mis Recetas</h1>
      <p>Total de mis recetas: {myRecipes.length}</p>
      <div className="my-recipes-actions">
        <Link className="my-recipes-create-btn" to="/create-recipe">
          Crear receta
        </Link>
      </div>

      {actionError && <p>{actionError}</p>}
      {myRecipes.length === 0 ? (
        <p>Aún no has creado recetas.</p>
      ) : (
        <ul className="recipe-list">
          {myRecipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onDelete={handleDelete}
              showDelete={true}
              showEdit={true}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyRecipesPage;
