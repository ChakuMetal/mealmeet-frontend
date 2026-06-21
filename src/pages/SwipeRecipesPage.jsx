import { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAllRecipes } from "../services/recipeService";
import "../pages/SwipeRecipesPage.css";

function SwipeRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState([]);
  const [passed, setPassed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isExiting, setIsExiting] = useState(false);

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
  const handleLike = useCallback(() => {
    if (!currentRecipe || isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      setLiked((prev) => [...prev, currentRecipe._id]);
      setCurrentIndex((prev) => prev + 1);
      setIsExiting(false);
    }, 300);
  }, [currentRecipe, isExiting]);

  const handlePass = useCallback(() => {
    if (!currentRecipe || isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      setPassed((prev) => [...prev, currentRecipe._id]);
      setCurrentIndex((prev) => prev + 1);
      setIsExiting(false);
    }, 300);
  }, [currentRecipe, isExiting]);

  useEffect(() => {
    function handleKeyDown(event) {
      const tagName = event.target?.tagName;
      const isTyping =
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        event.target?.isContentEditable;
      if (isTyping) return;
      if (!currentRecipe || isExiting) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePass();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleLike();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentRecipe, isExiting, handleLike, handlePass]);

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
        <div className={`swipe-card ${isExiting ? "swipe-card-exit" : ""}`}>
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
      <div className={`swipe-card ${isExiting ? "swipe-card-exit" : ""}`}>
        <h1>Modo Swipe</h1>
        <p className="recipes-total">
          Receta {progress} de {total}
        </p>
        <img
          src={currentRecipe.image}
          alt={currentRecipe.title}
          className="swipe-image"
        />
        <h2 className="swipe-title">{currentRecipe.title}</h2>

        <p className="form-link swipe-detail-link">
          <Link to={"/recipes/" + currentRecipe._id}>Ver detalle</Link>
        </p>

        <p>
          <strong>Categoría:</strong> {currentRecipe.category}
        </p>

        <p>
          <strong>Dificultad:</strong> {currentRecipe.level}
        </p>

        <p>
          <strong>Tiempo:</strong> {currentRecipe.preptime} minutos
        </p>

        <div className="swipe-actions">
          <button
            type="button"
            className="swipe-btn swipe-btn-pass"
            onClick={handlePass}
            disabled={isExiting}
          >
            Saltar
          </button>

          <button
            type="button"
            className="swipe-btn swipe-btn-like"
            onClick={handleLike}
            disabled={isExiting}
          >
            Me gusta
          </button>
        </div>
        <p className="swipe-hint">Atajos: ← Saltar · → Me gusta</p>
      </div>
    </div>
  );
}
export default SwipeRecipesPage;
