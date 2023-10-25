import { createSlice } from '@reduxjs/toolkit';

export interface CartState {
  cartIsOpen: boolean;
  productsInCart: any[];
}

const initialState: CartState = {
  cartIsOpen: false,
  productsInCart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state) => {
      state.cartIsOpen = true;
    },
    closeCart: (state) => {
      state.cartIsOpen = false;
    },
    addProductToCart: (state, action) => {
      state.productsInCart = [...state.productsInCart, action.payload];
    }
  },
});

export const { openCart, closeCart, addProductToCart } = cartSlice.actions;

export default cartSlice.reducer;