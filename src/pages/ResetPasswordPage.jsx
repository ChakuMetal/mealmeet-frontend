import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPasswordRequest } from "../services/authService";

function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await resetPasswordRequest(token, { password });
      setMessage(
        data.message ||
          "Contraseña restablecida correctamente...redirigiendo a Incio de sesión 🍳",
      );
      setTimeout(() => navigate("/login"), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Nueva contraseña</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Nueva contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>

          {message && <p className="form-info">{message}</p>}
          {error && <p className="form-error">{error}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Restablecer contraseña"}
          </button>

          <p className="form-link">
            <Link to="/login">Volver a iniciar sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
