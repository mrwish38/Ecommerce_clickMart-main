import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProduct = createAsyncThunk(
  'products/getProduct',
  async ({ keyword = '', currentPage = 1, category, ratings = 0, price = [0, 120000] }) => {
    try {
      const link = category
        ? `/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}&ratings[gte]=${ratings}&price[gte]=${price[0]}&price[lte]=${price[1]}`
        : `/api/v1/products?keyword=${keyword}&page=${currentPage}&ratings[gte]=${ratings}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);



const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [], loading: false, error: null },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products; 
        state.productsCount = action.payload.productsCount;
        state.productPerPage = action.payload.productPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;
        state.error = null;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { clearError } = productsSlice.actions;

export default productsSlice.reducer;
