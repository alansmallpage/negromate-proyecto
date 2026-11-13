/** -------------------------------------------------------------------
 * ============================================
 * Sección de paquetes de precios
 * ============================================
 * La usan Diseño Gráfico, Ropa Personalizada y Murales.
 */

import { Link } from "react-router-dom";
import PriceCard from "@/components/PriceCard";
import "@/css/components/PriceCard.css";

const PricesSection = ({ title, products }) => (
  <section className="u-section PriceCard-section">
    <div className="u-container">
      <h2 className="u-sectionTitle">{title}</h2>
      <div className="PriceCards-grid">
        {products.map((product) => (
          <PriceCard key={product._id} product={product} />
        ))}
      </div>
      <div className="PriceCards-actions">
        <Link to="/#servicios" className="Button">
          Explorar servicios
        </Link>
      </div>
    </div>
  </section>
);

export default PricesSection;
