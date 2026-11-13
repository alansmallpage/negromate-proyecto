/** -------------------------------------------------------------------
 * ============================================
 * Componente del Header
 * ============================================
 * Escritorio (desde 981px): enlaces y menús que se abren al pasar el ratón.
 * Móvil: botón de menú (hamburguesa) que abre la lista de enlaces.
 */

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { SERVICES } from "@/utils/helpers";
import "@/css/components/Header.css";

// Logo según el tema: letras amarillas en modo oscuro y negras en modo claro
const LOGOS = {
  dark: "/images/logo-negromate.webp",
  light: "/images/logo-negromate-claro.webp",
};

// CSS del NavLink si está activo o no
const navLinkClass = ({ isActive }) => `NavLink ${isActive ? "NavLink--active" : ""}`;

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="Header-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="Header-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

// Flecha de "Servicios" (gira al abrir el menú)
const ChevronIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="Dropdown-chevron"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
  </svg>
);

// Icono del carrito con el número de productos
const CartLink = () => {
  const { cartCount } = useCart();

  return (
    <NavLink
      to="/cart"
      className="IconLink"
      aria-label="Carrito de compras"
      title="Carrito de compras"
    >
      <CartIcon />
      {cartCount > 0 && <span className="CartLink-count">{cartCount}</span>}
    </NavLink>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    closeMenu();
    logout();
  };

  return (
    <header className="Header">
      <div className="u-container Header-content">
        <Link to="/" onClick={closeMenu} title="Inicio" className="Header-logo">
          <img src={LOGOS[theme]} alt="Negromate" />
        </Link>

        {/* Menú de escritorio (desde 981px) */}
        <nav className="Header-desktopNav">
          {/* Servicios: lleva a la sección de la portada y despliega los tres servicios */}
          <div className="Dropdown">
            <Link to="/#servicios" className="NavLink Dropdown-toggle" title="Servicios">
              Servicios
              <ChevronIcon />
            </Link>
            <div className="Dropdown-menu Dropdown-menu--left">
              <div className="Dropdown-panel">
                {SERVICES.map((service) => (
                  <NavLink key={service.to} to={service.to} className={navLinkClass}>
                    {service.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <NavLink to="/about" className={navLinkClass} title="Sobre nosotros">
            Sobre Nosotros
          </NavLink>
          <NavLink to="/contact" className={navLinkClass} title="Contacto">
            Contacto
          </NavLink>
          {user ? (
            // Mi cuenta: el icono lleva a Mis Pedidos y despliega las opciones de la cuenta
            <div className="Dropdown">
              <NavLink to="/orders" className="IconLink" aria-label="Mi cuenta" title="Mi cuenta">
                <UserIcon />
              </NavLink>
              <div className="Dropdown-menu Dropdown-menu--right">
                <div className="Dropdown-panel">
                  <p className="Dropdown-greeting">
                    Hola, <strong>{user.username}</strong>
                  </p>
                  <NavLink to="/orders" className={navLinkClass}>
                    Mis Pedidos
                  </NavLink>
                  {user.role === "admin" && (
                    <NavLink to="/admin" className={navLinkClass}>
                      Panel de Admin
                    </NavLink>
                  )}
                  <button type="button" onClick={logout} className="LogoutButton">
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <NavLink
              to="/profile"
              className="IconLink"
              aria-label="Iniciar sesión"
              title="Iniciar sesión"
            >
              <UserIcon />
            </NavLink>
          )}
          <CartLink />
        </nav>

        {/* Móvil (hasta 980px): carrito y botón del menú */}
        <div className="Header-mobile">
          <CartLink />
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            className="MobileMenuButton"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="MobileMenuButton-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil abierto */}
      {isMenuOpen && (
        <nav className="MobileNav">
          {SERVICES.map((service) => (
            <NavLink key={service.to} to={service.to} className={navLinkClass} onClick={closeMenu}>
              {service.label}
            </NavLink>
          ))}
          <hr className="MobileNav-divider" />
          <NavLink to="/about" className={navLinkClass} onClick={closeMenu}>
            Sobre Nosotros
          </NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={closeMenu}>
            Contacto
          </NavLink>
          <hr className="MobileNav-divider" />
          {user ? (
            <>
              <NavLink to="/orders" className={navLinkClass} onClick={closeMenu}>
                Mis Pedidos
              </NavLink>
              {user.role === "admin" && (
                <NavLink to="/admin" className={navLinkClass} onClick={closeMenu}>
                  Panel de Admin
                </NavLink>
              )}
              <button type="button" onClick={handleLogout} className="LogoutButton">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <NavLink to="/profile" className={navLinkClass} onClick={closeMenu}>
              Iniciar Sesión
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
