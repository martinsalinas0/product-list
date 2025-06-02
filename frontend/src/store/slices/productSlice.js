import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

const initialState = {
  products: [],
  categories: [],
  count: null,
  page: 1,
  totalPages: null,
  isLoading: false,
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ category, priceSort, page } = {}) => {
    const url = new URL(`${API_URL}/products`);

    if (category) url.searchParams.append("category", category);
    if (priceSort) url.searchParams.append("price", priceSort);
    if (page) url.searchParams.append("page", page)

    const response = await axios.get(url.toString());
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;

      const categories = [];
      for (let i = 0; i < state.products.length; i++) {
        const category = state.products[i].category;
        if (category && !categories.includes(category)) {
          categories.push(category);
        }
      }

      state.categories = categories;
      state.count = action.payload.count || action.payload.length;
      state.page = action.payload.page || 1;
      state.totalPages = action.payload.totalPages || 1;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = "Error fetching request. ";
    });
  },
});

export const { setPage } = productSlice.actions;

export default productSlice.reducer;
