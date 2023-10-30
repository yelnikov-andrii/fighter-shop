import { ProductInt } from '../types';

export function getUniqueColors(products: ProductInt[]) {
  const allColors = products.flatMap(product => product.color_en);
  const uniqueColors = Array.from(new Set(allColors));
  return uniqueColors;
}



export function getUniqueFilterOptions<T extends keyof ProductInt>(products: ProductInt[], nameOfKeyOne: T, nameOfKeyTwo: T) {
  const allOptions = products.flatMap(product => {
    return {
      name_en: product[nameOfKeyOne],
      name_ukr: product[nameOfKeyTwo]
    };
  });

  interface Option {
    name_en: ProductInt[T];
    name_ukr: ProductInt[T];
  }

  const uniqueOptions: Option[] = [];

  for (let option of allOptions) {
    if (!uniqueOptions.find((item: Option) => item.name_en === option.name_en)) {
      uniqueOptions.push(option);
    } else {
      continue;
    }
  }

  return uniqueOptions;
}