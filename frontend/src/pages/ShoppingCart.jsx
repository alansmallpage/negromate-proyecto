/** -------------------------------------------------------------------
 * ==============================================
 *  Página del carrito de compras "ShoppingCart"
 * ==============================================
 */

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/services/api";
import { serviceName } from "@/utils/helpers";
import { useState } from "react";
import { Link } from "react-router-dom";
import "@/css/pages/ShoppingCart.css";

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useCart();
  const { user } = useAuth();
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  // Procesamos la compra y crea una orden
  const handleCheckout = async () => {
    // Iniciamos estado de carga y reseteamos error/success
    setStatus({ loading: true, error: null, success: false });

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("Debes iniciar sesión para finalizar la compra.");
      }
      // Datos de la orden con el formato de la API
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
      };
      await api.orders.create(orderData, token);
      // Marcar como exitoso y limpiar el carrito
      setStatus({ loading: false, error: null, success: true });
      setTimeout(clearCart, 300);
    } catch (error) {
      // Capta errores y muestra mensaje al usuario
      setStatus({
        loading: false,
        error: error.message || "Hubo un error al procesar tu orden.",
        success: false,
      });
    }
  };

  // Mensaje de éxito si el pedido se ha guardado (todavía no se cobra:
  // primero Negromate habla con el cliente)
  if (status.success) {
    return (
      <div className="u-messagePage">
        <div className="u-messageBox ShoppingCart-successBox">
          <h1 className="ShoppingCart-successTitle">¡Pedido recibido!</h1>
          <p className="ShoppingCart-successText">
            Gracias por tu pedido. Nos pondremos en contacto contigo para concretar los
            detalles y el pago.
          </p>
          <div className="ShoppingCart-successActions">
            <Link to="/orders" className="Button">
              Ver mis pedidos
            </Link>
            <Link to="/" className="SecondaryButton">
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="u-section ShoppingCart">
      <div className="u-container">
        <h1 className="u-sectionTitle ShoppingCart-title">Carrito de Compras</h1>
        {user && (
          <p className="ShoppingCart-greeting">
            Hola, <strong>{user.username}</strong>.
            {cartItems.length > 0 &&
              " Revisa los servicios que has elegido antes de realizar tu pedido."}
          </p>
        )}
        {cartItems.length === 0 ? (
          <div className="u-emptyBox">
            <p className="u-emptyText">Tu carrito está vacío.</p>
            <Link to="/#servicios" className="Button">
              Explorar servicios
            </Link>
          </div>
        ) : (
          <div className="ShoppingCart-layout">
            <div className="ShoppingCart-itemsContainer">
              {/* Mapeo de cada producto en el carrito */}
              {cartItems.map((item) => (
                <div key={item._id} className="CartItem">
                  <div className="CartItem-info">
                    <img src={item.imageUrl} alt={item.name} className="CartItem-image" />
                    <div>
                      <h2 className="CartItem-name">{item.name}</h2>
                      {serviceName(item.category) && (
                        <p className="u-mutedText">Servicio: {serviceName(item.category)}</p>
                      )}
                      <p className="u-mutedText">{item.price.toFixed(2)}€</p>
                    </div>
                  </div>
                  <div className="CartItem-actions">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item._id, parseInt(e.target.value))
                      }
                      className="CartItem-quantity"
                      min="1"
                      aria-label={`Cantidad de ${item.name}`}
                    />
                    {/* Botón para eliminar el producto */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="CartItem-remove"
                      aria-label={`Eliminar ${item.name} del carrito`}
                    >
                      {/* Icono de papelera */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Panel con el resumen de la orden */}
            <div className="ShoppingCart-summary">
              <h2 className="ShoppingCart-summaryTitle">Resumen del Pedido</h2>
              <div className="ShoppingCart-summaryRow">
                <span>Subtotal</span>
                <span>{cartTotal.toFixed(2)}€</span>
              </div>
              <div className="ShoppingCart-summaryTotal">
                <span>Total</span>
                <span>{cartTotal.toFixed(2)}€</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={status.loading}
                className="Button"
              >
                {status.loading ? "Enviando..." : "Realizar Pedido"}
              </button>
              {/* Mensaje de error si la petición falla */}
              {status.error && (
                <p className="u-errorMessage ShoppingCart-error">{status.error}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShoppingCart;
