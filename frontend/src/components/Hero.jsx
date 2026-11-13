/** -------------------------------------------------------------------
 * ============================================
 * Componente del Hero
 * ============================================
 */

import { useState, useEffect } from "react";
import "@/css/components/Hero.css";

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);

  // Verificamos la posición del scroll
  useEffect(() => {
    const handleScroll = () => {
      // Si la posición del scroll es mayor a 50px
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    document.addEventListener("scroll", handleScroll, { passive: true });
    // Se remueve cuando el componente se desmonta
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <section className="Hero">
      {/* Overlay oscuro semitransparente */}
      <div className="Hero-overlay"></div>
      {/* Contenedor del logo: se agranda y desaparece al bajar */}
      <div className={`Hero-logoContainer ${scrolled ? "Hero-logoContainer--scrolled" : ""}`}>
        {/* El logo es el título principal de la portada (h1) */}
        <h1>
          <img src="/images/logoclear.webp" alt="Negromate" className="Hero-logo" />
        </h1>
      </div>
    </section>
  );
};

export default Hero;
