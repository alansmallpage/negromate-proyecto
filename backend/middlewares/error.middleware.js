/** -------------------------------------------------------------------
 * ============================================
 * Middleware Global de Manejo de Errores
 * ============================================
 */

// Middleware de errores: aquí llegan los errores que pasamos con next(error)
const errorMiddleware = (err, req, res, _next) => {
  console.error(err.stack);

  // ID con formato incorrecto (por ejemplo /api/products/123)
  if (err.name === "CastError") {
    return res.status(400).json({ msg: "ID no válido", data: null, status: "error" });
  }
  // Datos que no cumplen el esquema de Mongoose
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)[0].message;
    return res.status(400).json({ msg: message, data: null, status: "error" });
  }

  res.status(500).json({
    msg: "Ha ocurrido un error interno en el servidor",
    data: null,
    status: "error",
  });
};

export default errorMiddleware;
