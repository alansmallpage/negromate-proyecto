/** -------------------------------------------------------------------
 * ============================================
 * Página de Murales "Murals"
 * ============================================
 */

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import PhotoGallery from "@/components/PhotoGallery";
import PricesSection from "@/components/PricesSection";

const Murals = () => {
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Cargar los paquetes y la galería
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.products.getWithGallery("Murals");
        setProducts(response.data.products);
        setGallery(response.data.gallery);
      } catch (err) {
        console.error("Error al cargar los murales:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="u-loadingMessage">Cargando murales...</div>;
  if (error) {
    return (
      <p className="u-pageError">
        No se pudieron cargar los murales. Inténtalo más tarde.
      </p>
    );
  }

  return (
    <>
      <section className="u-section">
        <div className="u-container">
          <h1 className="u-sectionTitle">Galería de Murales</h1>
          <PhotoGallery items={gallery} type="murals" />
        </div>
      </section>
      <PricesSection title="Paquetes de Murales" products={products} />
    </>
  );
};

export default Murals;
