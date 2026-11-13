/** -------------------------------------------------------------------
 * =====================================
 * Componente de PriceCard
 * =====================================
 */

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import "@/css/components/PriceCard.css";

const PriceCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();

  // Añadir el pack al carrito y avisar al usuario
  const handleAddToCart = () => {
    const inCart = cartItems.find((item) => item._id === product._id);
    addToCart(product);
    const message = inCart
      ? `Ahora tienes ${inCart.quantity + 1} × "${product.name}" en el carrito`
      : `"${product.name}" se añadió al carrito`;
    // Notificación con un enlace al carrito (al hacer clic se cierra)
    toast.success((t) => (
      <span>
        {message}.{" "}
        <Link to="/cart" className="ToastLink" onClick={() => toast.dismiss(t.id)}>
          Ver carrito
        </Link>
      </span>
    ));
  };

  return (
    <div className="PriceCard">
      <h3 className="PriceCard-name">{product.name}</h3>
      <p className="PriceCard-description">{product.description}</p>
      <div className="PriceCard-price">{product.price}€</div>
      {/* Lista de características en el paquete */}
      <ul className="PriceCard-details">
        {product.details.map((detail, i) => (
          <li key={i}>
            {/* Icono de check */}
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
      {/* Botón para agregar el producto al carrito de compras */}
      <button onClick={handleAddToCart} className="Button">
        Agregar al Carrito
      </button>
    </div>
  );
};

export default PriceCard;
