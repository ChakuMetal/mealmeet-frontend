import { Link } from "react-router-dom";
import "./RecipeCard.css";

function RecipeCard({
  recipe,
  onDelete,
  showDelete = false,
  showEdit = false,
}) {
  const shortIngredients =
    recipe.ingredients.length > 120
      ? recipe.ingredients.slice(0, 120) + "..."
      : recipe.ingredients;

  const shortInstructions =
    recipe.instructions.length > 160
      ? recipe.instructions.slice(0, 160) + "..."
      : recipe.instructions;

  return (
    <li className="recipe-card">
      <h2 className="recipe-card-title">
        <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
      </h2>

      <img
        className="recipe-card-image"
        src={recipe.image}
        alt={recipe.title}
        width="250"
      />
      <div className="recipe-card-body">
        <p>
          <strong>Categoría:</strong> {recipe.category}
        </p>
        <p>
          <strong>Dificultad:</strong> {recipe.level}
        </p>
        <p>
          <strong>Tiempo:</strong> {recipe.preptime} minutos
        </p>
        <p>
          <strong>Ingredientes:</strong> {shortIngredients}
        </p>
        <p>
          <strong>Instrucciones:</strong> {shortInstructions}
        </p>
      </div>
      <div className="recipe-card-actions">
        {showEdit && (
          <Link className="recipe-card-edit" to={`/edit-recipe/${recipe._id}`}>
            Editar
          </Link>
        )}

        {showDelete && (
          <button
            className="recipe-card-delete"
            onClick={() => onDelete(recipe._id)}
          >
            Eliminar
          </button>
        )}
      </div>
    </li>
  );
}

export default RecipeCard;
