/** -------------------------------------------------------------------
 * ==============================================
 * Componente del formulario de inicio de sesión
 * ==============================================
 */

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import "@/css/components/Form.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(email, password);
      if (response?.data?.username) {
        toast.success(`¡Hola de nuevo, ${response.data.username}! Has iniciado sesión.`);
      }
    } catch (err) {
      setError(
        err.message || "Error al iniciar sesión. Verifica tus credenciales."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="FormContainer">
      <h1 className="Form-title">Iniciar Sesión</h1>
      {error && <p className="u-errorMessage">{error}</p>}
      <form onSubmit={handleSubmit} className="Form">
        <div className="Form-group">
          <label htmlFor="login-email" className="Form-label">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="Form-input"
            autoComplete="email"
          />
        </div>
        <div className="Form-group">
          <label htmlFor="login-password" className="Form-label">
            Contraseña
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="Form-input"
            autoComplete="current-password"
          />
        </div>
        <button type="submit" disabled={loading} className="Button">
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default Login;
