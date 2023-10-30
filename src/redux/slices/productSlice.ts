import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductInt } from '../../types';

export interface ProductState {
  products: ProductInt[];
  productsAllPages: ProductInt[];
  productsLoading: boolean;
  productsError: string;
  countOfProducts: number;
  product: ProductInt | null;
  productLoading: boolean;
  productError: string | null;
}

const initialState: ProductState = {
  products: [],
  productsAllPages: [],
  productsLoading: false,
  productsError: '',
  countOfProducts: 0,
  product: null,
  productLoading: false,
  productError: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProducts: (state: ProductState) => {
      state.productsLoading = true;
    },
    getProductsSuccess: (state: ProductState, action: PayloadAction<ProductInt[]>) => {
      state.products = action.payload;
      state.productsLoading = false;
      state.productsError = '';
    },
    getProductsError: (state: ProductState, action: PayloadAction<string>) => {
      state.products = [];
      state.productsError = action.payload;
      state.productsLoading = false;
    },
    getCountOfProducts: (state: ProductState, action: PayloadAction<number>) => {
      state.countOfProducts = action.payload;
    },
    getOneProduct: (state: ProductState) => {
      state.productLoading = true;
    },
    getOneProductsSuccess: (state, action: PayloadAction<ProductInt>) => {
      state.product = action.payload;
      state.productLoading = false;
      state.productError = '';
    },
    getOneProductError: (state, action: PayloadAction<string>) => {
      state.product = null;
      state.productError = action.payload;
      state.productLoading = false;
    },
    getProductsAllPagesSuccess: (state: ProductState, action: PayloadAction<ProductInt[]>) => {
      state.productsAllPages = action.payload;
    }
  },
});

export const { getProductsError, getProducts, getProductsSuccess, getCountOfProducts, getOneProduct, getOneProductError, getOneProductsSuccess, getProductsAllPagesSuccess } = productSlice.actions;

export default productSlice.reducer;