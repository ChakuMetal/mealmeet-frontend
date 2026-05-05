import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/MealMeet Logo.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const isHome = location.pathname === "/";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {!isHome && (
          <NavLink to="/">
            <img src={logo} alt="MealMeet" className="navbar-logo" />
          </NavLink>
        )}
        <NavLink className="navbar-link" to="/">
          Home
        </NavLink>

        {!isAuthenticated && (
          <>
            <NavLink className="navbar-link" to="/register">
              Registro de usuario
            </NavLink>
          </>
        )}

        {isAuthenticated && (
          <>
            {" | "}
            <NavLink className="navbar-link" to="/recipes">
              Explorar todas las recetas
            </NavLink>
            {" | "}
            <NavLink className="navbar-link" to="/my-recipes">
              Mis Recetas
            </NavLink>
            {" | "}
            <button className="navbar-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
