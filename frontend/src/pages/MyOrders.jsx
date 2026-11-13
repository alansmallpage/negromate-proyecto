/** -------------------------------------------------------------------
 * ============================================
 * Página "Mis Pedidos"
 * ============================================
 * Pedidos del usuario con sesión iniciada, los más recientes primero.
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import OrderCard from "@/components/OrderCard";
import "@/css/pages/MyOrders.css";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar los pedidos del usuario
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await api.orders.getMyOrders(token);
        setOrders(response.data);
      } catch (err) {
        console.error("Error al cargar los pedidos:", err);
        setError("No se pudieron cargar tus pedidos. Inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <section className="u-section MyOrders">
      <div className="u-container">
        <div className="MyOrders-content">
          <h1 className="u-sectionTitle MyOrders-title">Mis Pedidos</h1>
          <p className="MyOrders-greeting">
            Hola, <strong>{user.username}</strong>. Aquí puedes ver el estado de tus pedidos.
          </p>
          <p className="u-mutedText MyOrders-info">
            Cuando recibimos un pedido, nos ponemos en contacto contigo para concretar los
            detalles y el pago.
          </p>

          {loading && <p className="u-loadingMessage">Cargando pedidos...</p>}
          {error && <p className="u-errorMessage">{error}</p>}

          {/* Sin pedidos todavía */}
          {!loading && !error && orders.length === 0 && (
            <div className="u-emptyBox">
              <p className="u-emptyText">Todavía no has hecho ningún pedido.</p>
              <Link to="/#servicios" className="Button">
                Explorar servicios
              </Link>
            </div>
          )}

          <div className="MyOrders-list">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyOrders;
