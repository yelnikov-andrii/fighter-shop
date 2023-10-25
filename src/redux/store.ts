import { configureStore } from '@reduxjs/toolkit';
import langSliceReducer from './slices/langSlice';
import categorySlice from './slices/categorySlice';
import productSlice from './slices/productSlice';
import productPhotosSlice from './slices/productPhotosSlice';
import currencySlice from './slices/currencySlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    language: langSliceReducer,
    categories: categorySlice,
    products: productSlice,
    photos: productPhotosSlice,
    currency: currencySlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch