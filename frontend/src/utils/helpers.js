/** -------------------------------------------------------------------
 * ============================================
 * Funciones y datos que se usan en varios sitios
 * ============================================
 */

// Servicios de Negromate (menú, carrito y pedidos)
// "category" es la categoría de los packs en la base de datos
export const SERVICES = [
  { category: "GraphicDesign", to: "/graphic-design", label: "Diseño Gráfico" },
  { category: "CustomClothing", to: "/custom-clothing", label: "Ropa Personalizada" },
  { category: "Murals", to: "/murals", label: "Murales" },
];

// Nombre del servicio a partir de la categoría
export const serviceName = (category) =>
  SERVICES.find((s) => s.category === category)?.label;

// Estados de un pedido: nombre y clase de la etiqueta (colores en OrderCard.css)
export const ORDER_STATUS = {
  pending: { label: "Pendiente", className: "OrderCard-status--pending" },
  completed: { label: "Completado", className: "OrderCard-status--completed" },
  cancelled: { label: "Cancelado", className: "OrderCard-status--cancelled" },
};

// Número corto del pedido: los 6 últimos caracteres del id ("#A1B2C3")
export const orderNumber = (order) => `#${order._id.slice(-6).toUpperCase()}`;

// Fecha: "8 de noviembre de 2026, 19:30"
export const formatDate = (date) =>
  new Date(date).toLocaleString("es-ES", { dateStyle: "long", timeStyle: "short" });

// Precio: "250.00€"
export const formatPrice = (amount) => `${amount.toFixed(2)}€`;
