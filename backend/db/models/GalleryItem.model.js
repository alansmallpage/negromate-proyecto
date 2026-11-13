/** -------------------------------------------------------------------
 * ============================================
 * Esquema de Item de Galería
 * ============================================
 */

import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema(
  {
    // Misma categoría que los productos
    category: {
      type: String,
      required: true,
      enum: ["GraphicDesign", "CustomClothing", "Murals"],
    },
    // Nombre del trabajo o de la marca
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // Ruta de la imagen en public/images del frontend
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    // Posición en la galería (de menor a mayor)
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const GalleryItem = mongoose.model("GalleryItem", galleryItemSchema);

export default GalleryItem;
