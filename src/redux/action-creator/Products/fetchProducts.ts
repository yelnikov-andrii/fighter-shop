import axios from 'axios';
import { getCountOfProducts, getProducts, getProductsAllPagesSuccess, getProductsError, getProductsSuccess } from '../../slices/productSlice';
import { baseUrl } from '../../../helpers/baseUrl';

export const fetchProducts: any = (productInfo: string = ''): any => {
  return async (dispatch: any) => {
    dispatch(getProducts());
    try {
      if (!productInfo.includes('?')) {
        const response: any = await axios.get(`${baseUrl}/products-by-category?${productInfo}`);
        dispatch(getProductsSuccess(response.data.rows));
        dispatch(getCountOfProducts(response.data.count));
      } else {
        const response: any = await axios.get(`${baseUrl}/products${productInfo}`);
        dispatch(getProductsSuccess(response.data.rows));
        dispatch(getCountOfProducts(response.data.count));
      }
    } 
    catch(e: any) {
      dispatch(getProductsError('Error can not load products'));
    }
  };
};

export const fetchProductsAllPages = (productInfo: string = ''): any => {
  return async (dispatch: any) => {
    try {
      if (!productInfo.includes('?')) {
        const response: any = await axios.get(`${baseUrl}/products-by-category?${productInfo}`);
        dispatch(getProductsAllPagesSuccess(response.data));
      } else {
        const response: any = await axios.get(`${baseUrl}/products${productInfo}`);
        dispatch(getProductsAllPagesSuccess(response.data));
      }
    } 
    catch(e: any) {
      console.log('error');
    }
  };
};