import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { 

}

//fetchProducts
export const fetchProducts = createAsyncThunk( 
  'products/fetchProducts', 
  async (_, {rejectWithValue}) => { 
    try {
      const response = await axios.get("http://localhost:8000/api/products"); 
        return response.data
    } catch (error) {
     return rejectWithValue(error.response?.data?.message || error.message) 
    }
  }
) 

//deleteAProduct
export const deleteProductRequest = createAsyncThunk(
  'products/deleteProductRequest', 
  async (productId, {rejectWithValue}) => {
    try { 
      await axios.delete(`http://localhost:8000/api/products/${productId}`); 
      return productId; 

    } catch (error) { 
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
) 

//updateProduct
export const updateProductRequest = createAsyncThunk( 
  'products/updateProductRequest', 

)


  const productsSlice = createSlice({ 
    name: 'products', 
    initialState: { 
      items: [], 
      filteredItems: [], 
      status: 'idle', 
      error: null, 
      searchQuery: '', 
      pageNumber: 1, 
      totalCount: 0, 
      selectedCategory: 'all', 
      sortBy: 'name', 
      deleteStatus: 'idle', 
      deleteError: null
    }, 

    reducers: { 
      setSearchQuery: (state, action) => { 
        state.searchQuery = action.payload; 
      }
    }
  })


