/** -------------------------------------------------------------------
 * ============================================
 * Galería de fotos con vista ampliada
 * ============================================
 * La usan Ropa Personalizada (type="clothing") y Murales (type="murals").
 * Al hacer clic en una foto se ve en grande; se cierra con el botón, con la
 * tecla Escape o haciendo clic fuera.
 */

import { useEffect, useState } from "react";
import "@/css/components/PhotoGallery.css";

const PhotoGallery = ({ items, type }) => {
  const [openItem, setOpenItem] = useState(null);

  // Cerrar la vista ampliada con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpenItem(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="PhotoGallery-grid">
        {items.map((item) => (
          <button
            key={item._id}
            type="button"
            onClick={() => setOpenItem(item)}
            className={`PhotoGallery-item PhotoGallery-item--${type}`}
          >
            {/* alt vacío: el título ya aparece en el texto del botón */}
            <img src={item.imageUrl} alt="" loading="lazy" className="PhotoGallery-image" />
            {type === "murals" ? (
              // Murales: el título aparece en el centro al pasar el ratón
              <span className="MuralsGalleryItem-overlay">
                <span className="MuralsGalleryItem-title">{item.title}</span>
              </span>
            ) : (
              // Ropa: el título y la descripción aparecen abajo al pasar el ratón
              <span className="ClothingGalleryItem-overlay">
                <span className="ClothingGalleryItem-title">{item.title}</span>
                <span className="ClothingGalleryItem-desc">{item.description}</span>
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Vista ampliada */}
      {openItem && (
        <div className="Modal-overlay" onClick={() => setOpenItem(null)}>
          {/* stopPropagation: al hacer clic en la foto no se cierra */}
          <img
            src={openItem.imageUrl}
            alt={openItem.title}
            className="Modal-image"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setOpenItem(null)}
            aria-label="Cerrar"
            className="Modal-close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
