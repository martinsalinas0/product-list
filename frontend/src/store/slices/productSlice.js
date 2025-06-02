import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api"; 



const initialState = { 
  products: [], 
  count: null, 
  page: 1,
  totalPages: null, 
  isLoading: false, 
  error: '' 
}



export const fetchProducts = createAsyncThunk( 
  'products/fetchProducts', 
  async () => {
    const response =  await axios.get(`${API_URL}/products`); 
    return response.data
  }
); 

const productSlice = createSlice({ 
  name: 'products', 
  initialState, 
reducers: {}, 
extraReducers: (builder) => { 
  builder.addCase(fetchProducts.pending, (state) => { 
    state.isLoading = true;
  }); 
  builder.addCase(fetchProducts.fulfilled, (state, action) => { 
    state.isLoading = false; 
    state.products = action.payload.products || action.payload; 
    state.count = action.payload.count || action.payload.length;  
    state.page = action.payload.page || 1
    state.totalPages = action.payload.totalPages || 1
    state.error = ''; 
     

  }); 
  builder.addCase(fetchProducts.rejected, (state, action) => { 
    state.isLoading = false; 
    state.error = 'Error fetching request. '
  })
}

}); 

export default productSlice.reducer; 


