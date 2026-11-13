/** -------------------------------------------------------------------
 * ==============================================================
 * Productos - Configuración de las categorías de los servicios
 * ==============================================================
 */

import { Link } from "react-router-dom";
import "@/css/components/Products.css";

const productCategories = [
  {
    title: "Diseño Gráfico",
    path: "/graphic-design",
    image: "/images/santoku.webp",
  },
  {
    title: "Ropa Personalizada",
    path: "/custom-clothing",
    image: "/images/clothes.webp",
  },
  { title: "Murales", path: "/murals", image: "/images/goiko.webp" },
];

/** -------------------------------------------------------------------
 * ============================================
 * Componente de los productos
 * ============================================
 */
const Products = () => {
  return (
    // id "servicios": destino del botón "Explorar servicios" (/#servicios)
    <section id="servicios" className="u-section Products">
      <div className="u-container">
        <h2 className="u-sectionTitle">Nuestros Servicios</h2>
        {/* Grid de tarjetas: 1 columna en móvil, 2 en tablet y 3 en escritorio */}
        <div className="Products-grid">
          {productCategories.map((category) => (
            <Link to={category.path} key={category.title} className="CategoryCard">
              <img src={category.image} alt="" loading="lazy" className="CategoryCard-image" />
              {/* Overlay con el título del servicio */}
              <div className="CategoryCard-overlay">
                <h3 className="CategoryCard-title">{category.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
