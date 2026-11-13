/** -------------------------------------------------------------------
 * ============================================
 * Panel de Admin
 * ============================================
 * Pedidos de todos los clientes (cambiar su estado o eliminarlos) y
 * mensajes del formulario de contacto (leerlos o eliminarlos).
 * Solo para usuarios con rol "admin" (AdminRoute y la API lo comprueban).
 */

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "@/services/api";
import OrderCard from "@/components/OrderCard";
import { ORDER_STATUS, formatDate, orderNumber } from "@/utils/helpers";
import "@/css/pages/AdminPanel.css";

/** -------------------------------------------------------------------
 * Tarjeta de un mensaje de contacto
 */
const MessageCard = ({ message, onDelete }) => (
  <article className="MessageCard">
    <div className="MessageCard-header">
      <div>
        <h2 className="MessageCard-name">{message.name}</h2>
        <p className="u-mutedText">
          {formatDate(message.createdAt)} ·{" "}
          {message.clientType === "company" ? "Empresa" : "Particular"}
        </p>
      </div>
      <button type="button" onClick={() => onDelete(message)} className="DeleteButton">
        Eliminar
      </button>
    </div>
    {/* Email y teléfono: al hacer clic se abre el correo o la llamada */}
    <p className="MessageCard-contact">
      <a href={`mailto:${message.email}`} className="u-link">
        {message.email}
      </a>
      {message.phone && (
        <a href={`tel:${message.phone}`} className="u-link">
          {message.phone}
        </a>
      )}
    </p>
    {message.message && <p className="MessageCard-text">{message.message}</p>}
  </article>
);

/** -------------------------------------------------------------------
 * Componente principal
 */
const AdminPanel = () => {
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("userToken");

  // Cargamos pedidos y mensajes a la vez
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, messagesRes] = await Promise.all([
          api.orders.getAll(token),
          api.messages.getAll(token),
        ]);
        setOrders(ordersRes.data);
        setMessages(messagesRes.data);
      } catch (err) {
        console.error("Error al cargar el panel:", err);
        setError("No se pudieron cargar los datos del panel. Inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  // Cambiar el estado de un pedido (pendiente, completado o cancelado)
  const handleStatusChange = async (order, status) => {
    setError("");
    try {
      await api.orders.updateStatus(order._id, status, token);
      setOrders((prev) => prev.map((o) => (o._id === order._id ? { ...o, status } : o)));
      toast.success(`Pedido ${orderNumber(order)}: ${ORDER_STATUS[status].label.toLowerCase()}.`);
    } catch (err) {
      setError(err.message || "No se pudo cambiar el estado del pedido.");
    }
  };

  // Eliminar un pedido (pide confirmación)
  const handleDeleteOrder = async (order) => {
    if (!window.confirm(`¿Eliminar el pedido ${orderNumber(order)}? No se puede deshacer.`)) return;
    setError("");
    try {
      await api.orders.delete(order._id, token);
      setOrders((prev) => prev.filter((o) => o._id !== order._id));
      toast.success(`Pedido ${orderNumber(order)} eliminado.`);
    } catch (err) {
      setError(err.message || "No se pudo eliminar el pedido.");
    }
  };

  // Eliminar un mensaje (pide confirmación)
  const handleDeleteMessage = async (message) => {
    if (!window.confirm(`¿Eliminar el mensaje de ${message.name}? No se puede deshacer.`)) return;
    setError("");
    try {
      await api.messages.delete(message._id, token);
      setMessages((prev) => prev.filter((m) => m._id !== message._id));
      toast.success("Mensaje eliminado.");
    } catch (err) {
      setError(err.message || "No se pudo eliminar el mensaje.");
    }
  };

  // Número de pedidos con un estado ("Pendientes: 2"...)
  const countByStatus = (status) => orders.filter((o) => o.status === status).length;

  return (
    <section className="u-section AdminPanel">
      <div className="u-container">
        <div className="AdminPanel-content">
          <h1 className="u-sectionTitle">Panel de Admin</h1>
          <div className="ToggleButtons">
            <button
              type="button"
              onClick={() => setTab("orders")}
              className={`ToggleButton ${tab === "orders" ? "ToggleButton--active" : ""}`}
            >
              Pedidos ({orders.length})
            </button>
            <button
              type="button"
              onClick={() => setTab("messages")}
              className={`ToggleButton ${tab === "messages" ? "ToggleButton--active" : ""}`}
            >
              Mensajes ({messages.length})
            </button>
          </div>
          {/* Error al cargar o al hacer un cambio */}
          {error && <p className="u-errorMessage">{error}</p>}

          {loading ? (
            <p className="u-loadingMessage">Cargando...</p>
          ) : tab === "orders" ? (
            // Pestaña de pedidos
            orders.length === 0 ? (
              <p className="u-emptyBox AdminPanel-empty">No hay pedidos todavía.</p>
            ) : (
              <>
                <p className="u-mutedText AdminPanel-counts">
                  Pendientes: {countByStatus("pending")} · Completados:{" "}
                  {countByStatus("completed")} · Cancelados: {countByStatus("cancelled")}
                </p>
                <div className="AdminPanel-list">
                  {orders.map((order) => (
                    <OrderCard
                      key={order._id}
                      order={order}
                      isAdmin={true}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDeleteOrder}
                    />
                  ))}
                </div>
              </>
            )
          ) : // Pestaña de mensajes
          messages.length === 0 ? (
            <p className="u-emptyBox AdminPanel-empty">No hay mensajes todavía.</p>
          ) : (
            <div className="AdminPanel-list">
              {messages.map((message) => (
                <MessageCard key={message._id} message={message} onDelete={handleDeleteMessage} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
