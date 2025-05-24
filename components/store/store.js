import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import ordersReducer from './slices/ordersSlice';

// Покращене налаштування для надійнішого збереження даних
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart', 'orders', 'user'], // Не зберігаємо стан products, оскільки він завантажується динамічно
  stateReconciler: autoMergeLevel2, // Забезпечує краще поєднання збереженого стану з початковим
  timeout: 10000, // Збільшуємо час очікування для операцій збереження
  debug: __DEV__, // Для відлагодження в режимі розробки
};

// Кустомний мідлвар для збереження замовлень та кошика в AsyncStorage
const persistenceMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  
  // Список типів дій, які повинні викликати збереження
  const orderActionTypes = ['orders/addOrder', 'orders/saveOrdersToStorage'];
  const cartActionTypes = ['cart/addToCart', 'cart/removeFromCart', 'cart/updateQuantity', 'cart/clearCart'];
  
  // Якщо тип дії відповідає тим, що пов'язані з замовленнями
  if (orderActionTypes.includes(action.type)) {
    // Зберігаємо стан замовлень в AsyncStorage
    AsyncStorage.setItem('@orders', JSON.stringify(state.orders.items))
      .catch(error => console.error('Error saving orders:', error));
  }
  
  // Якщо тип дії відповідає тим, що пов'язані з кошиком
  if (cartActionTypes.includes(action.type)) {
    // Зберігаємо стан кошика в AsyncStorage
    AsyncStorage.setItem('@cart', JSON.stringify(state.cart))
      .catch(error => console.error('Error saving cart:', error));
  }
  
  return result;
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  user: userReducer,
  orders: ordersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ігноруємо всі дії redux-persist, щоб уникнути помилок серіалізації
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ігноруємо шляхи в Redux Store, які можуть містити несеріалізовані дані
        ignoredPaths: ['payload.timestamp'],
      },
    }).concat(persistenceMiddleware), // Додаємо наш кустомний мідлвар для автоматичного збереження
  // Більше не обмежуємо розмір стану для DevTools, щоб побачити всі дані
  devTools: __DEV__,
});

export const persistor = persistStore(store, { manualPersist: false });