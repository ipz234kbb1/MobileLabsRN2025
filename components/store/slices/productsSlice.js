import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsFromAPI } from '../../data';

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async () => {
    return await fetchProductsFromAPI();
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLoading, setError } = productsSlice.actions;
export default productsSlice.reducer;