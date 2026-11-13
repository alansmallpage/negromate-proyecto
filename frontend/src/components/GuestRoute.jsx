/** -------------------------------------------------------------------
 * ==================================================================
 * Componente de protección de rutas para usuarios no autenticados
 * ==================================================================
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const GuestRoute = () => {
  const { user } = useAuth();
  // Si el usuario está autenticado lo redirigimos al carrito de compras, si no está autenticado (invitado)
  return user ? <Navigate to="/cart" replace /> : <Outlet />;
};

export default GuestRoute;
