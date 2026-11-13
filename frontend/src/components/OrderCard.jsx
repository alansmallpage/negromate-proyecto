/** -------------------------------------------------------------------
 * ============================================
 * Tarjeta de un pedido
 * ============================================
 * La usan "Mis Pedidos" y el panel de admin. Con isAdmin={true} muestra
 * también el cliente, el selector de estado y el botón de eliminar.
 */

import {
  ORDER_STATUS,
  formatDate,
  formatPrice,
  orderNumber,
  serviceName,
} from "@/utils/helpers";
import "@/css/components/OrderCard.css";

const OrderCard = ({ order, isAdmin = false, onStatusChange, onDelete }) => {
  const status = ORDER_STATUS[order.status] ?? ORDER_STATUS.pending;

  return (
    <article className="OrderCard">
      {/* Número, fecha, cliente y estado */}
      <div className="OrderCard-header">
        <div>
          <h2 className="OrderCard-number">Pedido {orderNumber(order)}</h2>
          <p className="u-mutedText">{formatDate(order.createdAt)}</p>
          {/* Datos del cliente (solo admin) */}
          {isAdmin && (
            <p className="OrderCard-customer">
              Cliente: <strong>{order.user?.username ?? "Usuario eliminado"}</strong>
              {order.user?.email && (
                <>
                  {" · "}
                  <a href={`mailto:${order.user.email}`} className="u-link">
                    {order.user.email}
                  </a>
                </>
              )}
            </p>
          )}
        </div>
        <span className={`OrderCard-status ${status.className}`}>{status.label}</span>
      </div>
      {/* Packs del pedido (el precio es el que tenía al hacer el pedido) */}
      <ul className="OrderCard-items">
        {order.items.map((item) => {
          const service = serviceName(item.product?.category);
          return (
            <li key={item._id} className="OrderCard-item">
              {item.product?.imageUrl && (
                <img src={item.product.imageUrl} alt="" className="OrderCard-itemImage" />
              )}
              <div className="OrderCard-itemInfo">
                <p className="OrderCard-itemName">{item.product?.name ?? "Pack eliminado"}</p>
                {/* En móvil, servicio y cantidad en líneas separadas */}
                <p className="u-mutedText">
                  {service && (
                    <span className="OrderCard-itemService">
                      {service}
                      <span className="OrderCard-separator"> · </span>
                    </span>
                  )}
                  <span className="OrderCard-itemQuantity">
                    {item.quantity} × {formatPrice(item.price)}
                  </span>
                </p>
              </div>
              <p className="OrderCard-itemTotal">{formatPrice(item.price * item.quantity)}</p>
            </li>
          );
        })}
      </ul>
      {/* Estado y eliminar (solo admin) y total */}
      <div className="OrderCard-footer">
        <div className="OrderCard-actions">
          {isAdmin && (
            <>
              <label className="OrderCard-statusLabel">
                Estado
                <select
                  value={order.status}
                  onChange={(e) => onStatusChange(order, e.target.value)}
                  className="OrderCard-select"
                >
                  {Object.entries(ORDER_STATUS).map(([value, s]) => (
                    <option key={value} value={value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" onClick={() => onDelete(order)} className="DeleteButton">
                Eliminar
              </button>
            </>
          )}
        </div>
        <p className="OrderCard-total">Total: {formatPrice(order.totalAmount)}</p>
      </div>
    </article>
  );
};

export default OrderCard;
