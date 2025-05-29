"use client";
const { configureStore } = require("@reduxjs/toolkit");
import productsReducer from "./slices/productSlice.js";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
