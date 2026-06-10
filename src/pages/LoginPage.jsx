import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { loginUser } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSessionExpired, setShowSessionExpired] = useState(
    searchParams.get("expired") === "1",
  );
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setShowSessionExpired(false);

    try {
      const data = await loginUser(formData);

      login({
        token: data.token,
        user: data.user,
      });

      navigate("/recipes");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (showSessionExpired) {
      setSearchParams({}, { replace: true });
    }
  }, [showSessionExpired, setSearchParams]);

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Iniciar Sesión</h1>
        {showSessionExpired && (
          <p className="form-info">
            Tu sesión ha expirado. Por favor, inicia sesión nuevamente.
          </p>
        )}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <p className="form-link">
            <Link to="/forgot-password">Olvidé mi contraseña</Link>
          </p>
          {error && <p className="form-error">{error}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
