/** -------------------------------------------------------------------
 * =================================================================
 * Componente de protección de rutas solo para administradores
 * =================================================================
 * La API también comprueba el rol en cada petición: esto solo evita
 * que un usuario normal vea la página.
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AdminRoute = () => {
  const { user } = useAuth();
  // Sin sesión: a iniciar sesión. Con sesión pero sin rol de admin: al inicio
  if (!user) return <Navigate to="/profile" replace />;
  return user.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
