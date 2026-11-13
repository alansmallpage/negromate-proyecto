/** -------------------------------------------------------------------
 * ============================================
 * MongoDB
 * ============================================
 */

import mongoose from "mongoose";
import { DB_USER, DB_PASS, CLUSTER, DATABASE } from "../config/config.js";
import { mockData } from "./data.mock.js";
import Product from "./models/Product.model.js";
import GalleryItem from "./models/GalleryItem.model.js";

// Conecta la app a MongoDB
export const connectDB = async () => {
  const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${CLUSTER}/${DATABASE}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(url);
    console.log("✅ Conectado a MongoDB Atlas");
    console.log(`DB: ${mongoose.connection.db.databaseName}`);
    await populateDatabase();
  } catch (error) {
    // Si hay un error en la conexión, error
    console.error(`❌ Error al conectar con MongoDB: ${error}`);
    process.exit(1);
  }
};

// Datos iniciales con mockData
const populateDatabase = async () => {
  try {
    // Verificar si ya existen productos en Product
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      // Si no hay productos, insertar los productos con mockData
      await Product.insertMany(mockData.products);
      console.log("🛍️ Productos iniciales insertados en la base de datos.");
    }
    // Verificar si ya existen items de galería en GalleryItem
    const galleryCount = await GalleryItem.countDocuments();
    if (galleryCount === 0) {
      // Si no hay galería, insertar los items con mockData
      await GalleryItem.insertMany(mockData.galleryItems);
      console.log("🖼️ Galerías iniciales insertadas en la base de datos.");
    }
  } catch (error) {
    // Si hay un error al insertar info, error
    console.error("🔥 Error al poblar la base de datos:", error);
  }
};
