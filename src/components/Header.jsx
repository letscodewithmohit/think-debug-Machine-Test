import logo from "../../Image/logo.png";
import Icon from "./Icon.jsx";

function Header({
  onOpenCart,
  onShowWishlist,
  onShowAll,
  query,
  onQueryChange,
  cartCount,
  wishlistCount,
}) {
  return (
    <header className="site-header">
      <a
        className="brand"
        href="#top"
        onClick={onShowAll}
        aria-label="E-Commerce home"
      >
        <img src={logo} alt="E-Commerce" />
      </a>

      <label className="search-box">
        <Icon name="search" size={18} />
        <input
          type="search"
          placeholder="Search for products, brands and more"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          aria-label="Search products"
        />
        <span className="search-shortcut">Find your next favorite</span>
      </label>

      <nav className="header-actions" aria-label="Shopping">
        <button className="nav-action" onClick={onShowWishlist}>
          <span className="nav-icon-wrap">
            <Icon name="heart" size={19} />
            {wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
          </span>
          <span>Wishlist</span>
        </button>

        <button
          className="nav-action cart-count"
          onClick={onOpenCart}
          aria-label={`Open cart, ${cartCount} items`}
        >
          <span className="nav-icon-wrap">
            <Icon name="cart" size={20} />
            <span className="nav-badge">{cartCount}</span>
          </span>
          <span>Cart</span>
        </button>
      </nav>
    </header>
  );
}

export default Header;
