import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ORDERS_STORAGE_KEY = '@orders';

export const loadOrders = createAsyncThunk(
  'orders/loadOrders',
  async () => {
    try {
      const storedOrders = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
      return storedOrders ? JSON.parse(storedOrders) : [];
    } catch (error) {
      console.error('Error loading orders:', error);
      return [];
    }
  }
);

export const saveOrders = createAsyncThunk(
  'orders/saveOrders',
  async (orders) => {
    try {
      await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
      return orders;
    } catch (error) {
      console.error('Error saving orders:', error);
      throw error;
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
        totalPrice: action.payload.totalPrice,
        customerName: action.payload.customerName,
        customerEmail: action.payload.customerEmail,
      };

      state.items.unshift(newOrder);
      // Note: The middleware will call saveOrders thunk
    },
    // Helpers to trigger persistence manually
    saveOrdersToStorage: (state) => {
      // This is just a marker action - the middleware handles the actual persistence
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveOrders.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { addOrder, saveOrdersToStorage } = ordersSlice.actions;
export default ordersSlice.reducer;