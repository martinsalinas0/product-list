const { configureStore } = require("@reduxjs/toolkit");
const { fetchProducts } = require("./slices/productSlice");


const store = configureStore({ 
  reducer: { 
    products: productsReducer
  }
})

export default store; 