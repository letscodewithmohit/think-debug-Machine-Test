import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/shopSlice.js";

function CartModal({ onClose }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shop.cart);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <section
        className="cart-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-modal-heading">
          <h2 id="cart-title">Your cart ({cart.reduce((count, item) => count + item.quantity, 0)})</h2>
          <button className="cart-close-button" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="cart-empty-message">Your cart is empty.</p>
        ) : (
          <div className="cart-modal-items">
            {cart.map((item) => (
              <div className="cart-modal-item" key={item.id}>
                <img src={item.image} alt="" />
                <div className="cart-modal-item-info">
                  <h3>{item.title}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="cart-modal-item-actions">
                    <span>Qty: {item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() => dispatch(addToCart(item))}
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>
                    <button
                      className="remove-cart-button"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default CartModal;
