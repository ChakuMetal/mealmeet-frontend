import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import RecipesPage from "../pages/RecipesPage";
import CreateRecipePage from "../pages/CreateRecipePage";
import MyRecipesPage from "../pages/MyRecipesPage";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Navbar from "../components/layout/Navbar";
import RecipeDetailPage from "../pages/RecipeDetailPage";
import EditRecipePage from "../pages/EditRecipePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import SwipeRecipesPage from "../pages/SwipeRecipesPage";

// Para qué sirve AppRouter:
// Organiza todas las rutas (URLs) de la app en un solo lugar.
// Así no mezclamos lógica de rutas con el componente principal App.jsx

// Por qué está separado en su propia carpeta:
// Las rutas son lo suficientemente importantes como para tener su propio archivo.
// Si la app crece, puedes agregar lógica más compleja aquí sin afectar App.jsx

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Rutas públicas - cualquiera puede acceder */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Rutas privadas - solo usuarios autenticados */}
        <Route
          path="/create-recipe"
          element={
            <ProtectedRoute>
              <CreateRecipePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipes"
          element={
            <ProtectedRoute>
              <RecipesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-recipes"
          element={
            <ProtectedRoute>
              <MyRecipesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-recipe/:id"
          element={
            <ProtectedRoute>
              <EditRecipePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/swipe-recipes"
          element={
            <ProtectedRoute>
              <SwipeRecipesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
