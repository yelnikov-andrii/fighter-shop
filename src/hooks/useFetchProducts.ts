/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

export const useFetchProducts = (category: string | null, subcategory: string | null, subsubcategory: string | null, fetchProducts: any, location: any, page: number, dispatch: any) => {
  React.useEffect(() => {
    if (category) {
      dispatch(fetchProducts(`category=${category}&page=${page}&limit=9`));
      return;
    }

    if (subcategory) {
      dispatch(fetchProducts(`subcategory=${subcategory}&page=${page}&limit=9`));
      return;
    }

    if (subsubcategory) {
      dispatch(fetchProducts(`subsubcategory=${subsubcategory}&page=${page}&limit=9`));
      return;
    }

    dispatch(fetchProducts(`?page=${page}&limit=9`));
  }, [location, page]);
};