import { useSelector } from "react-redux";
import Icon from "./Icon.jsx";
import ProductCard from "./ProductCard.jsx";

function ProductSection({
  products,
  loading,
  error,
  query,
  showWishlist,
  onShowAll,
}) {
  const wishlist = useSelector((state) => state.shop.wishlist);

  const visibleProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(query.toLowerCase());
    const matchesWishlist = !showWishlist || wishlist.includes(product.id);
    return matchesSearch && matchesWishlist;
  });

  return (
    <section className="products-section" id="products">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {showWishlist ? "Saved just for you" : "The good stuff"}
          </p>
          <h2>{showWishlist ? "Your wishlist" : "Special picks for you"}</h2>
          <p className="section-subtitle">
            {showWishlist
              ? "Keep your favorite finds close."
              : "Everyday essentials and little things worth loving."}
          </p>
        </div>

        {showWishlist && (
          <button className="text-button" onClick={onShowAll}>
            Browse all products <span aria-hidden="true">→</span>
          </button>
        )}
      </div>

      {error && (
        <div className="state-message error-message" role="alert">
          <h3>We couldn’t load the products</h3>
          <p>{error}</p>
          <button className="text-button" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      )}

      {loading && !error && (
        <div className="product-grid" aria-label="Loading products" aria-busy="true">
          {Array.from({ length: 8 }, (_, index) => (
            <div className="product-skeleton" key={index} />
          ))}
        </div>
      )}

      {!loading && !error && visibleProducts.length > 0 && (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!loading && !error && visibleProducts.length === 0 && (
        <div className="state-message">
          <div className="empty-heart">
            <Icon name={showWishlist ? "heart" : "search"} size={25} />
          </div>
          <h3>{showWishlist ? "Your wishlist is waiting" : "No products found"}</h3>
          <p>
            {showWishlist
              ? "Tap the heart on anything you love and it’ll be saved here."
              : "Try a different product name."}
          </p>
          {showWishlist && (
            <button className="text-button" onClick={onShowAll}>
              Explore products <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default ProductSection;
