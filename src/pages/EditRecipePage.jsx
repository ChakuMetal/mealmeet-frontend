import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeById, updateRecipe } from "../services/recipeService";

function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    category: "",
    level: "",
    preptime: "",
    ingredients: "",
    instructions: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadRecipe() {
      try {
        const recipe = await getRecipeById(id);

        setFormData({
          title: recipe.title || "",
          image: recipe.image || "",
          category: recipe.category || "",
          level: recipe.level || "",
          preptime: recipe.preptime || "",
          ingredients: recipe.ingredients || "",
          instructions: recipe.instructions || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await updateRecipe(id, {
        ...formData,
        preptime: Number(formData.preptime),
      });

      navigate("/my-recipes");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <p>Cargando datos de la receta...</p>;
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Editar receta</h1>

        {error && <p className="form-error">{error}</p>}

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">URL de la imagen</label>
            <input
              id="image"
              name="image"
              type="text"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="level">Dificultad</label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="fácil">Fácil</option>
              <option value="medio">Medio</option>
              <option value="difícil">Difícil</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="preptime">Tiempo de preparación (minutos)</label>
            <input
              id="preptime"
              name="preptime"
              type="number"
              value={formData.preptime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ingredients">
              Ingredientes (separados por comas)
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="instructions">Instrucciones</label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando cambios..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditRecipePage;
