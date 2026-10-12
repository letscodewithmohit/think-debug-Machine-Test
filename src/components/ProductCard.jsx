import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleWishlist } from "../store/shopSlice.js";
import Icon from "./Icon.jsx";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.shop.wishlist);
  const isWishlisted = wishlist.includes(product.id);

  return (
    <article className="product-card">
      <button
        className={`favorite-button${isWishlisted ? " is-favorite" : ""}`}
        onClick={() => dispatch(toggleWishlist(product.id))}
        aria-label={`${isWishlisted ? "Remove from" : "Add to"} wishlist: ${product.title}`}
        aria-pressed={isWishlisted}
      >
        <Icon name="heart" size={19} filled={isWishlisted} />
      </button>

      <div className="product-image-wrap">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>
      <h3 title={product.title}>{product.title}</h3>

      <div className="product-card-bottom">
        <p className="product-price">${product.price.toFixed(2)}</p>
        <span
          className="product-rating"
          aria-label={`${product.rating?.rate ?? 0} out of 5 stars`}
        >
          <span aria-hidden="true">★</span> {product.rating?.rate ?? "New"}
        </span>
      </div>

      <button className="add-button" onClick={() => dispatch(addToCart(product))}>
        <Icon name="cart" size={16} />
        Add to cart
      </button>
    </article>
  );
}

export default ProductCard;
