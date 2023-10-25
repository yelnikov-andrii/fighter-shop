import axios from 'axios';
import { getCategories, getCategoriesError, getCategoriesSuccess, getSubCategories, getSubCategoriesError, getSubCategoriesSuccess } from '../../slices/categorySlice';
import { baseUrl } from '../../../helpers/baseUrl';

export const fetchCategories = (): any => {
  return async (dispatch: any) => {
    dispatch(getCategories());
    try {
      const response: any = await axios.get(`${baseUrl}/categories`);
      dispatch(getCategoriesSuccess(response.data));
    } 
    catch(e: any) {
      dispatch(getCategoriesError('Error can not load categories'));
    }
  };
};

export const fetchSubCategories = (categoryId: any): any => {
  return async(dispatch: any) => {
    dispatch(getSubCategories());
    try {
      const response = await axios.get(`${baseUrl}/subcategories/${categoryId}`);
      dispatch(getSubCategoriesSuccess(response.data));
    } catch(e) {
      dispatch(getSubCategoriesError('Cant not load subcategories'));
    }
  };
};