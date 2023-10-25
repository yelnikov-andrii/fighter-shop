import axios from 'axios';
import { getCountOfProducts, getProducts, getProductsError, getProductsSuccess } from '../../slices/productSlice';
import { baseUrl } from '../../../helpers/baseUrl';

export const fetchProducts = (productInfo: string = ''): any => {
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