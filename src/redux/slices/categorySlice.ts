import { createSlice } from '@reduxjs/toolkit';
import { ActionCategoriesError, ActionCategoriesSuccess, ActionSubCategoriesError, ActionSubCategoriesSuccess, CategoryStateInterface } from '../../types';

const initialState: CategoryStateInterface = {
  categories: [],
  categoriesLoading: false,
  categoriesError: '',
  subcategories: [],
  subCategoriesLoading: false,
  subCategoriesError: '',
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategories: (state: CategoryStateInterface) => {
      state.categoriesLoading = true;
    },
    getCategoriesSuccess: (state: CategoryStateInterface, action: ActionCategoriesSuccess) => {
      state.categories = action.payload;
      state.categoriesLoading = false;
      state.categoriesError = '';
    },
    getCategoriesError: (state: CategoryStateInterface, action: ActionCategoriesError) => {
      state.categories = [];
      state.categoriesError = action.payload;
      state.categoriesLoading = false;
    },
    getSubCategories: (state: CategoryStateInterface) => {
      state.subCategoriesLoading = true;
    },
    getSubCategoriesSuccess: (state: CategoryStateInterface, action: ActionSubCategoriesSuccess) => {
      state.subcategories = action.payload;
      state.subCategoriesLoading = false;
      state.subCategoriesError = '';
    },
    getSubCategoriesError: (state: CategoryStateInterface, action: ActionSubCategoriesError) => {
      state.subcategories = [];
      state.subCategoriesLoading = false;
      state.subCategoriesError = action.payload;
    }
  }
});

export const { getCategories, getCategoriesError, getCategoriesSuccess, getSubCategories, getSubCategoriesError, getSubCategoriesSuccess } = categorySlice.actions;

export default categorySlice.reducer;