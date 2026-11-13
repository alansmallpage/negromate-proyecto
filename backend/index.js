/** -------------------------------------------------------------------
 * ============================================
 * SERVIDOR PRINCIPAL DE NEGROMATE
 * ============================================
 */

import express from "express";
import cors from "cors";
import { PORT } from "./config/config.js";
import { connectDB } from "./db/mongoose.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import apiRoutes from "./routes/index.routes.js";

const app = express();

/** -------------------------------------------------------------------
 * ============================================
 * MIDDLEWARES
 * ============================================
 */
// Permite que el frontend pueda hacer peticiones a la API
app.use(cors());
// Cuerpo de las peticiones en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** -------------------------------------------------------------------
 * ============================================
 * DEFINICIÓN DE RUTAS
 * ============================================
 */
// verificar que el servidor está funcionando correctamente
app.get("/", (req, res) => {
  res.json({ message: "API de Negromate funcionando correctamente" });
});
app.use("/api", apiRoutes);

/** -------------------------------------------------------------------
 * ============================================
 * SERVIDOR
 * ============================================
 */
app.use(errorMiddleware);
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
