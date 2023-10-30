/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React from 'react';
import { baseUrl } from '../helpers/baseUrl';
import { getUniqueColors, getUniqueFilterOptions } from '../helpers/filterHelpers';
import { BrandInt, FilterOptionInt, ProductInt } from '../types';

const useGetSizes = (products: ProductInt[], ) => {
  const [sizes, setSizes] = React.useState<FilterOptionInt[]>([]);

  async function getUniqueSizes() {
    const productIds = products.map((product: ProductInt) => product.id);
    const variantRequests = productIds.map((productId: number) =>
      axios.get(`${baseUrl}/variants/${productId}`)
    );

    const variantResponses = await Promise.all(variantRequests);
    const variants = [].concat(...variantResponses.map(response => response.data));

    const uniqueSizes = variants.reduce((accumulator: FilterOptionInt[], currentVariant: FilterOptionInt) => {
      const existingVariant = accumulator.find((variant: FilterOptionInt) => variant.name_en === currentVariant.name_en);
      if (!existingVariant) {
        accumulator.push(currentVariant);
      }
      return accumulator;
    }, []);
    setSizes(uniqueSizes);
  }

  React.useEffect(() => {
    getUniqueSizes();
  }, [products]);

  return {
    sizes
  };
};

const useGetBrands = (products: ProductInt[], ) => {
  const [brands, setBrands] = React.useState([]);

  async function getUniqueBrands() {
    const allBrandsIds = products.map((product: ProductInt) => product.BrandSportId);
    const uniqueBrandsIds = Array.from(new Set(allBrandsIds));
    const response = await axios.get(`${baseUrl}/brands`);

    const uniqueBrands = response.data.filter((brand: BrandInt) => uniqueBrandsIds.includes(brand.id));

    setBrands(uniqueBrands);
  }

  React.useEffect(() => {
    getUniqueBrands();
  }, [products]);

  return {
    brands
  };
};

const useGetColors = (products: ProductInt[]) => {
  const colors = React.useMemo(() => {
    return getUniqueColors(products);
  }, [products]);

  return {
    colors
  };
};

export const useGetAllOptions = (products: ProductInt[]) => {

  const { colors } = useGetColors(products);
  const { brands } = useGetBrands(products);
  const { sizes } = useGetSizes(products);

  const materials = React.useMemo(() => {
    return getUniqueFilterOptions(products, 'material_en', 'material_ukr');
  }, [products]);

  const genders = React.useMemo(() => {
    return getUniqueFilterOptions(products, 'gender_en', 'gender_ukr');
  }, [products]);

  const ages = React.useMemo(() => {
    return getUniqueFilterOptions(products, 'age_en', 'age_ukr');
  }, [products]);

  const options = [
    {
      name_en: 'Sizes:',
      name_ukr: 'Розміри:',
      arr: sizes,
      filterCategory: 'sizes',
    },
    {
      name_en: 'Materials:',
      name_ukr: 'Матеріали:',
      arr: materials,
      filterCategory: 'materials',
      
    },
    {
      name_en: 'Genders:',
      name_ukr: 'Гендери:',
      arr: genders,
      filterCategory: 'genders',
    },
    {
      name_en: 'Ages:',
      name_ukr: 'Вік:',
      arr: ages,
      filterCategory: 'ages',
    },
  ];

  return {options, colors, brands};
};