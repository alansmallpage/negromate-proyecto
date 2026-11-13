/** -------------------------------------------------------------------
 * ============================================
 * Título de la pestaña del navegador
 * ============================================
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Nombre de cada página: en la pestaña se ve "Negromate | Nombre"
const PAGE_TITLES = {
  "/": "Inicio",
  "/about": "Sobre Nosotros",
  "/contact": "Contacto",
  "/profile": "Iniciar Sesión",
  "/cart": "Carrito de Compras",
  "/orders": "Mis Pedidos",
  "/admin": "Panel de Admin",
  "/graphic-design": "Diseño Gráfico",
  "/custom-clothing": "Ropa Personalizada",
  "/murals": "Murales",
};

const PageTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const pageName = PAGE_TITLES[pathname] ?? "Página no encontrada";
    document.title = `Negromate | ${pageName}`;
  }, [pathname]);

  return null;
};

export default PageTitle;
