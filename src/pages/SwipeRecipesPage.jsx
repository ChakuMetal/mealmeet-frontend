import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRecipes } from "../services/recipeService";
function SwipeRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState([]);
  const [passed, setPassed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
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
  const currentRecipe = useMemo(
    () => recipes[currentIndex],
    [recipes, currentIndex],
  );
  const total = recipes.length;
  const progress = total > 0 ? currentIndex + 1 : 0;
  function handleLike() {
    if (!currentRecipe) return;
    setLiked((prev) => [...prev, currentRecipe._id]);
    setCurrentIndex((prev) => prev + 1);
  }
  function handlePass() {
    if (!currentRecipe) return;
    setPassed((prev) => [...prev, currentRecipe._id]);
    setCurrentIndex((prev) => prev + 1);
  }
  if (isLoading) {
    return (
      <div className="page-section">
        <p className="recipes-state">Cargando modo swipe...</p>
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
  if (!currentRecipe) {
    return (
      <div className="page-section">
        <div className="form-card">
          <h1>Swipe finalizado</h1>
          <p className="recipes-state">Has visto todas las recetas.</p>
          <p className="recipes-state">
            Likes: {liked.length} | Saltadas: {passed.length}
          </p>
          <p className="form-link">
            <Link to="/recipes">Volver al listado de recetas</Link>
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="page-section">
      <div className="form-card">
        <h1>Modo Swipe</h1>
        <p className="recipes-total">
          Receta {progress} de {total}
        </p>

        <img
          src={currentRecipe.image}
          alt={currentRecipe.title}
          style={{ width: "100%", borderRadius: "12px", marginBottom: "12px" }}
        />

        <h2 style={{ marginTop: 0 }}>{currentRecipe.title}</h2>
        <p>
          <strong>Categoría:</strong> {currentRecipe.category}
        </p>
        <p>
          <strong>Dificultad:</strong> {currentRecipe.level}
        </p>
        <p>
          <strong>Tiempo:</strong> {currentRecipe.preptime} minutos
        </p>

        <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
          <button
            type="button"
            className="recipe-card-delete"
            onClick={handlePass}
          >
            Saltar
          </button>
          <button
            type="button"
            className="recipe-card-edit"
            onClick={handleLike}
          >
            Me gusta
          </button>
        </div>

        <p className="form-link" style={{ marginTop: "14px" }}>
          <Link to={"/recipes/" + currentRecipe._id}>Ver detalle</Link>
        </p>
      </div>
    </div>
  );
}
export default SwipeRecipesPage;
