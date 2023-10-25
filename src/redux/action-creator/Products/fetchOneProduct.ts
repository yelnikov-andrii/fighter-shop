import axios from 'axios';
import { getOneProduct, getOneProductError, getOneProductsSuccess } from '../../slices/productSlice';
import { baseUrl } from '../../../helpers/baseUrl';

export const fetchOneProduct = (productId: string): any => {
  return async (dispatch: any) => {
    dispatch(getOneProduct());
    try {
      const response: any = await axios.get(`${baseUrl}/products/${productId}`);
      dispatch(getOneProductsSuccess(response.data));
    } 
    catch(e: any) {
      dispatch(getOneProductError('Error can not load product'));
    }
  };
};