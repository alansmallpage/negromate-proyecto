/** -------------------------------------------------------------------
 * =====================================================
 * Contexto para manejar la autenticación de usuarios
 * =====================================================
 * El token y los datos del usuario se guardan en localStorage para que la
 * sesión siga abierta al recargar la página.
 */

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Al abrir la web, recuperamos la sesión guardada
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userInfo = localStorage.getItem("userInfo");
    if (token && userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  // Guarda la sesión y lleva al carrito (después de iniciar sesión o registrarse)
  const saveSession = (response) => {
    localStorage.setItem("userToken", response.data.token);
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    setUser(response.data);
    navigate("/cart");
  };

  // Si fallan, el error llega al formulario, que muestra el mensaje
  const login = async (email, password) => {
    const response = await api.auth.login({ email, password });
    saveSession(response);
    return response;
  };

  const register = async (username, email, password) => {
    const response = await api.auth.register({ username, email, password });
    saveSession(response);
    return response;
  };

  // Cerrar sesión
  const logout = () => {
    // Elimina el token JWT y la información del usuario del localStorage
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
    setUser(null);
    // Redirige a la página principal
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {/* No mostramos la web hasta saber si hay sesión guardada */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Para usar la sesión en cualquier componente
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
