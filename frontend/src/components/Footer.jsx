/** -------------------------------------------------------------------
 * ============================================
 * Componente del Footer
 * ============================================
 */

import { useTheme } from "@/context/ThemeContext";
import "@/css/components/Footer.css";

const Footer = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="Footer">
      <div className="u-container">
        {/* Línea separadora en el color del tema */}
        <hr className="Footer-divider" />
        <div className="Footer-content">
          <p className="Footer-copyright">
            &copy; {new Date().getFullYear()} Negromate Creatives. Todos los
            derechos reservados.
          </p>
          <div className="Footer-links">
            {/* Botón para cambiar entre tema claro y oscuro */}
            <button onClick={toggleTheme} className="ThemeToggleButton">
              Modo {theme === "light" ? "Oscuro" : "Claro"}
            </button>
            <a
              href="https://www.instagram.com/negromatecreatives/"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://www.behance.net/soyyowyow/"
              target="_blank"
              rel="noopener noreferrer"
              title="Behance"
            >
              Behance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
