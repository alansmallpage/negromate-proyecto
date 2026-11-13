/** -------------------------------------------------------------------
 * ============================================
 * Volver arriba al cambiar de página
 * ============================================
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Con un ancla en la URL (por ejemplo /#servicios) baja hasta esa sección;
// sin ancla, la página nueva empieza desde arriba
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
