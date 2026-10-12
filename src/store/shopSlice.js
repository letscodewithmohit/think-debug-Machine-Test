import { createSlice } from "@reduxjs/toolkit";

const WISHLIST_STORAGE_KEY = "thinkdebug-ecommerce-wishlist";

function getSavedWishlist() {
  try {
    const savedWishlist = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    const wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];

    return Array.isArray(wishlist)
      ? wishlist.filter((productId) => Number.isInteger(productId))
      : [];
  } catch (error) {
    console.error("Unable to load the saved wishlist.", error);
    return [];
  }
}

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    cart: [],
    wishlist: getSavedWishlist(),
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    toggleWishlist(state, action) {
      const productId = action.payload;
      const isSaved = state.wishlist.includes(productId);

      state.wishlist = isSaved
        ? state.wishlist.filter((savedId) => savedId !== productId)
        : [...state.wishlist, productId];
    },
  },
});

export const { addToCart, toggleWishlist } = shopSlice.actions;
export default shopSlice.reducer;
