/** -------------------------------------------------------------------
 * ============================================
 * Componente del formulario de registro
 * ============================================
 */

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import "@/css/components/Form.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setLoading(true);

    try {
      const response = await register(username, email, password);
      if (response?.data?.username) {
        toast.success(`¡Cuenta creada! Te damos la bienvenida, ${response.data.username}.`);
      }
    } catch (err) {
      setError(err.message || "Error al registrarse. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="FormContainer">
      <h1 className="Form-title">Crear Cuenta</h1>
      {error && <p className="u-errorMessage">{error}</p>}
      <form onSubmit={handleSubmit} className="Form">
        <div className="Form-group">
          <label htmlFor="register-username" className="Form-label">
            Nombre de Usuario
          </label>
          <input
            id="register-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="Form-input"
            autoComplete="username"
          />
        </div>
        <div className="Form-group">
          <label htmlFor="register-email" className="Form-label">
            Email
          </label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="Form-input"
            autoComplete="email"
          />
        </div>
        <div className="Form-group">
          <label htmlFor="register-password" className="Form-label">
            Contraseña (mín. 6 caracteres)
          </label>
          <input
            id="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="Form-input"
            autoComplete="new-password"
          />
        </div>
        <button type="submit" disabled={loading} className="Button">
          {loading ? "Creando cuenta..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

export default Register;
