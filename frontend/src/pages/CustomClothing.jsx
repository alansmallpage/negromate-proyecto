/** -------------------------------------------------------------------
 * ==============================================
 * Página de Ropa Personalizada "CustomClothing"
 * ==============================================
 */

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import PhotoGallery from "@/components/PhotoGallery";
import PricesSection from "@/components/PricesSection";

const CustomClothing = () => {
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Cargar los paquetes y la galería
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.products.getWithGallery("CustomClothing");
        setProducts(response.data.products);
        setGallery(response.data.gallery);
      } catch (err) {
        console.error("Error al cargar las prendas:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="u-loadingMessage">Cargando prendas...</div>;
  if (error) {
    return (
      <p className="u-pageError">
        No se pudieron cargar las prendas. Inténtalo más tarde.
      </p>
    );
  }

  return (
    <>
      <section className="u-section">
        <div className="u-container">
          <h1 className="u-sectionTitle">Galería de Ropa Personalizada</h1>
          <PhotoGallery items={gallery} type="clothing" />
        </div>
      </section>
      <PricesSection title="Paquetes de Personalización" products={products} />
    </>
  );
};

export default CustomClothing;
