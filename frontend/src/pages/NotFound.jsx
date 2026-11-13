/** -------------------------------------------------------------------
 * ============================================
 * Página no encontrada (404)
 * ============================================
 * Se muestra en cualquier dirección que no es una página de la web
 * (por ejemplo, un enlace mal copiado). El header sigue visible para
 * volver al inicio o ir a otra sección.
 */

import "@/css/pages/NotFound.css";

const NotFound = () => (
  <div className="u-messagePage">
    <div className="u-messageBox NotFound-box">
      <p className="NotFound-code">404</p>
      <h1 className="NotFound-title">Página no encontrada</h1>
      <p>La página que buscas no existe o ha cambiado de dirección.</p>
    </div>
  </div>
);

export default NotFound;
