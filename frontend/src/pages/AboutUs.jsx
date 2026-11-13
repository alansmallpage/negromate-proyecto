/** -------------------------------------------------------------------
 * ============================================
 * Página Sobre Nosotros "AboutUs"
 * ============================================
 */

import "@/css/pages/AboutUs.css";

const AboutUs = () => {
  return (
    <section className="u-section">
      <div className="u-container">
        <h1 className="u-sectionTitle">Sobre Nosotros</h1>
        {/* Párrafo principal */}
        <p className="AboutUs-mainParagraph">
          <strong>Negromate</strong> emerge en el escenario creativo de Madrid, España. Somos emprendedores con una perspectiva fresca y arraigada en la cultura urbana que nos rodea e inspira. Transformamos ideas en visuales y nos especializamos en la creación de identidades de marcas, desarrollando logotipos e ilustraciones que capturan la esencia.
          <br />
          <b> La creatividad va más allá del ámbito digital,</b> llevamos nuestro arte a espacios físicos, interviniendo muros en el entorno urbano. Personalizamos prendas de ropa para quienes buscan expresar su individualidad. Nuestra estética se basa en la fluidez del surf y el arte alternativo. Estos elementos sellan un carácter inconfundible en los proyectos que hemos desarrollado junto a nuestros clientes.
          <br />
          <b>
            <u>Comprometidos con soluciones de diseño de alta calidad que comunican, conectan con la audiencia y perduran.</u>
          </b>
        </p>
        {/* Una columna en móvil y dos desde 1024px */}
        <div className="AboutUs-content">
          {/* Foto de los artistas y sus Instagram */}
          <div className="Artist-figure">
            <img
              src="/images/artistas-aboutUs.webp"
              alt="Adriana y Yoel"
              className="Artist-image"
            />
            <div className="Artist-links">
              <a
                href="https://www.instagram.com/adriluzzatto/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @adriluzzatto
              </a>
              <a
                href="https://www.instagram.com/soy.yowyow/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @soyyowyow
              </a>
            </div>
          </div>
          {/* Información sobre los artistas */}
          <div className="Artist-info">
            <h2 className="Artist-infoTitle">Adriana y Yoel</h2>
            <p>
              En <strong>Negromate</strong> la conceptualización y pasión por el arte urbano se entrelazan para dar vida a proyectos únicos. Nuestra historia comienza en Madrid, donde nos conocimos en el departamento de diseño en una agencia de marketing. Ambos estilos confluyeron de manera natural, impulsándonos a unir fuerzas y fundar nuestra propia agencia de creación.
            </p>
            <p>
              <strong>Adriana</strong>, con una década de experiencia en dirección de arte, ha trabajado con marcas de renombre como Coca-Cola y Cabify. Su visión aporta un enfoque profesional a cada proyecto, desde la idea inicial del diseño hasta los tipos de pintura que estarán en los murales. Le confiamos la ejecución de proyectos complejos, siempre orientada a soluciones de impacto visual.
            </p>
            <p>
              <strong>Yoel</strong> complementa esta experiencia con 5 años dedicados a la docencia artística y su trabajo como freelancer. Su versatilidad radica en la creación de ilustraciones detalladas, la intervención de espacios a través de murales con graffiti y la conceptualización de diseños para ropa. Aportando un toque fresco y auténtico a cada pieza.
            </p>
            <p>
              <b>Creamos este lugar que celebra el arte alternativo y lo lleva a otros espacios para compartirlo. Nos encanta colaborar con artistas locales y globales para enriquecer nuestras propuestas y ofrecer siempre algo nuevo a la comunidad.</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
