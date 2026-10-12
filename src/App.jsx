import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header.jsx";
import HeroSlider from "./components/HeroSlider.jsx";
import ProductSection from "./components/ProductSection.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Footer from "./components/Footer.jsx";

let productsRequest;

function getProducts() {
  if (!productsRequest) {
    productsRequest = fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Product request failed (${response.status}).`);
        }
        return response.json();
      })
      .then((products) => {
        if (!Array.isArray(products)) {
          throw new Error("The product service returned an invalid response.");
        }
        return products;
      })
      .catch((error) => {
        productsRequest = undefined;
        throw error;
      });
  }
  return productsRequest;
}

function App() {
  const cart = useSelector((state) => state.shop.cart);
  const wishlist = useSelector((state) => state.shop.wishlist);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [showWishlist, setShowWishlist] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    getProducts()
      .then((items) => {
        if (isCurrent) setProducts(items);
      })
      .catch((requestError) => {
        if (isCurrent) {
          setError(requestError.message || "Please try again in a moment.");
        }
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("thinkdebug-ecommerce-wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Unable to save the wishlist.", error);
    }
  }, [wishlist]);

  function showAllProducts() {
    setShowWishlist(false);
  }

  function openWishlist() {
    setShowWishlist(true);
  }

  return (
    <div id="top">
      <div className="announcement-bar">
        <span>Thoughtful finds for brighter days</span>
        <span>
          Free shipping on orders over $50 <span aria-hidden="true">✳</span>
        </span>
      </div>

      <Header
        onShowWishlist={openWishlist}
        onShowAll={showAllProducts}
        query={query}
        onQueryChange={setQuery}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
      />

      <main className="page-content">
        <HeroSlider />
        <ProductSection
          products={products}
          loading={loading}
          error={error}
          query={query.trim()}
          showWishlist={showWishlist}
          onShowAll={showAllProducts}
        />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}

export default App;
