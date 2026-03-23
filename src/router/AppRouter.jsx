import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import RecipesPage from "../pages/RecipesPage";
import CreateRecipePage from "../pages/CreateRecipePage";
import MyRecipesPage from "../pages/MyRecipesPage";

// Para qué sirve AppRouter:
// Organiza todas las rutas (URLs) de la app en un solo lugar.
// Así no mezclamos lógica de rutas con el componente principal App.jsx

// Por qué está separado en su propia carpeta:
// Las rutas son lo suficientemente importantes como para tener su propio archivo.
// Si la app crece, puedes agregar lógica más compleja aquí sin afectar App.jsx

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas - cualquiera puede acceder */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recipes" element={<RecipesPage />} />

        {/* Rutas privadas - solo usuarios autenticados */}
        {/* Más adelante protegeremos estas con ProtectedRoute */}
        <Route path="/create-recipe" element={<CreateRecipePage />} />
        <Route path="/my-recipes" element={<MyRecipesPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
