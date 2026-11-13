/** -------------------------------------------------------------------
 * ============================================
 * Página de Diseño Gráfico "Graphic Design"
 * ============================================
 * Lista de trabajos a un lado y la foto del trabajo elegido al otro.
 */

import { useEffect, useRef, useState } from "react";
import { api } from "@/services/api";
import PricesSection from "@/components/PricesSection";
import "@/css/pages/GraphicDesign.css";

// Botón con el nombre de un trabajo de la lista
const GalleryItem = ({ item, onSelect, isSelected }) => (
  <button
    type="button"
    onClick={onSelect}
    className={`GalleryItem ${isSelected ? "GalleryItem--selected" : ""}`}
  >
    <span className="GalleryItem-brand">{item.title}</span>
  </button>
);

const GraphicDesign = () => {
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const imageRef = useRef(null);

  // Cargar los paquetes y la galería (se muestra el primer trabajo)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.products.getWithGallery("GraphicDesign");
        setProducts(response.data.products);
        setGallery(response.data.gallery);
        setSelectedItem(response.data.gallery[0] ?? null);
      } catch (err) {
        console.error("Error al cargar los diseños:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Elegir un trabajo; en el móvil la imagen está debajo de la lista, así que se baja hasta ella
  const handleSelect = (item) => {
    setSelectedItem(item);
    if (window.innerWidth < 768) {
      imageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) return <div className="u-loadingMessage">Cargando diseños...</div>;
  if (error) {
    return (
      <p className="u-pageError">
        No se pudieron cargar los diseños. Inténtalo más tarde.
      </p>
    );
  }

  return (
    <>
      <section className="u-section">
        <div className="u-container">
          <h1 className="u-sectionTitle">Galería de Diseño Gráfico</h1>
          {/* Móvil: nombres arriba e imagen debajo. Desde 768px: nombres a la izquierda */}
          <div className="Gallery-layout">
            <div className="Gallery-sidebar">
              {gallery.map((item) => (
                <GalleryItem
                  key={item._id}
                  item={item}
                  onSelect={() => handleSelect(item)}
                  isSelected={selectedItem?._id === item._id}
                />
              ))}
            </div>
            {selectedItem && (
              <div ref={imageRef} className="Gallery-main">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="Gallery-mainImage"
                />
                <h2 className="Gallery-mainBrand">{selectedItem.title}</h2>
                <p>{selectedItem.description}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <PricesSection title="Paquetes de Diseños" products={products} />
    </>
  );
};

export default GraphicDesign;
