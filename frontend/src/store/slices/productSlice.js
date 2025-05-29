import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//HTTP Requests

// get all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:8000/api/products");
    return response.data;
  }
);

//get product by id
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/products/${id}`);
    return response.data;
  }
);

//delete product by id
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`http://localhost:8000/api/products/${id}`);
    return id;
  }
);

//create new product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newProduct) => {
    const response = await axios.post(
      `http://localhost:8000/api/products`, newProduct);
    return response.data;
  }
);

//getReviews of a product
export const fetchReviews = createAsyncThunk(
  "products/fetchReviews",
  async (productId) => {
    const response = await axios.get(
      `http://localhost:8000/api/products/${productId}/reviews`);
    return { productId, reviews: response.data };
  }
);

//create a review for a product
export const createReview = createAsyncThunk(
  "products/createReview",
  async ({ productId, review }) => {
    const response = await axios.post(
      `http://localhost:8000/api/products/${productId}/reviews`, review);
    return { productId, review: response.data };
  }
);

//delete a review by id
export const deleteReview = createAsyncThunk(
  "products/deleteReview",
  async ({ productId, reviewId }) => {
    await axios.delete(
      `http://localhost:8000/api/products/${productId}/reviews/${reviewId}`);
    return { productId, reviewId };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    reviews: {},
    loading: false,
    error: null,
    searchQuery: "",
  },
  reducers: {

    // search for products
    searchProducts: (state, action) => {
      state.searchQuery = action.payload;
    },

    // delete a product
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    // clear search bar
    clearSearch: (state) => {
      state.searchQuery = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch products";
      });
  },
});

export const { searchProducts, removeProduct, clearSearch } =
  productsSlice.actions;

export default productsSlice.reducer;
