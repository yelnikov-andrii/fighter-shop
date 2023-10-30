import { createSlice } from '@reduxjs/toolkit';
import { ProductAdded } from '../../types';

export interface CartState {
  cartIsOpen: boolean;
  productsInCart: ProductAdded[] | null;
}

const cartData: string = localStorage.getItem('cart') || '';

const initialState: CartState = {
  cartIsOpen: false,
  productsInCart: cartData ? JSON.parse(cartData) : [],
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
      let foundProduct = null;
      if (state.productsInCart) {
        foundProduct = state.productsInCart.find(product => product.id === action.payload.id && action.payload.variant.id === product.variant.id);

        if (foundProduct) {
          foundProduct.quantity += action.payload.quantity;
        } else {
          state.productsInCart = [...state.productsInCart, action.payload];
        }
      }
      
      localStorage.setItem('cart', JSON.stringify(state.productsInCart));
    },
    deleteProduct: (state, action) => {
      state.productsInCart = state?.productsInCart?.filter(product => !(product.id === action.payload.id && product.variant.id === action.payload.variant.id)) as ProductAdded[];
      localStorage.setItem('cart', JSON.stringify(state.productsInCart));
    },
    increaseProduct: (state, action) => {
      let updatedProductsInCart: ProductAdded[] = [];
      if (state.productsInCart) {
        updatedProductsInCart = state.productsInCart.map(product => {
          if (product.id === action.payload.id && product.variant.id === action.payload.variant.id) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          }
          return product;
        });
      }
    
      state.productsInCart = updatedProductsInCart;
      localStorage.setItem('cart', JSON.stringify(state.productsInCart));
    },
    decreaseProduct: (state, action) => {
      let updatedProductsInCart: ProductAdded[] = [];
      if (state.productsInCart) {
        updatedProductsInCart = state.productsInCart.map(product => {
          if (product.id === action.payload.id && product.variant.id === action.payload.variant.id) {
            const updatedQuantity = product.quantity - 1;
            if (updatedQuantity > 0) {
              return {
                ...product,
                quantity: updatedQuantity,
              };
            } else {
              return null;
            }
          }
          return product;
        }) as ProductAdded[];
      }
    
      state.productsInCart = updatedProductsInCart.filter(product => product !== null);
      localStorage.setItem('cart', JSON.stringify(state.productsInCart));
    }
  },
});

export const { openCart, closeCart, addProductToCart, increaseProduct, decreaseProduct, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;