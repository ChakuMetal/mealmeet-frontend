import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/MealMeet Logo.png";

function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      <div className="home-hero">
        <img src={logo} alt="MealMeet Logo" className="home-logo" />
        <h1 className="home-title">Descubre Recetas</h1>
        <p className="home-subtitle">
          Bienvenido a MealMeet. Mesa abierta para tod@s.
        </p>
        <p className="home-description">
          Web de cocina colaborativa con tecnología swipe.
        </p>
        <div className="home-ctas">
          {isAuthenticated ? (
            // Si está logueado → estos 2 links
            <>
              <Link to="/recipes">Ver recetas</Link>
              <Link to="/create-recipe">Crear receta</Link>
            </>
          ) : (
            // Si NO está logueado → estos 2 links
            <>
              <Link to="/recipes">Explorar recetas</Link>
              <Link to="/login">Inicio de sesión</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default HomePage;
