import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shopSlice.js";

const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});

export default store;
