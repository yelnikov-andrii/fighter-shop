/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { Container } from '../Layout/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from './Product';
import { Pagination } from './Pagination';
import { RootState } from '../../redux/store';
// import { useScrollTop } from '../../hooks/useScrollTop';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import { FIlter } from './FIlter';
import { ProductInt } from '../../types';

const ProductsBlock = styled.div`
padding: 20px 0;
`;

const Block = styled.div`
display: flex;
gap: 10px;
width: 100%;
`;

const ListWrapper = styled.div`
width: calc((80% - 10px));
`;

const List = styled.div`
display: flex;
flex-wrap: wrap;
gap: 20px;
margin: 0 0 40px 0;
`;

const H1 = styled.h1`
margin: 0 0 20px 0;
font-size: 20px;
`;

const NoProducts = styled.h3`
text-align: center;
font-size: 24px;
font-weight: 700;
margin: 0 auto;
`;

export const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const subsubcategory = searchParams.get('subsubcategory');

  const dispatch = useDispatch();

  const { products, countOfProducts } = useSelector((state: RootState) => state.products);
  const { language } = useSelector((state: RootState) => state.language);
  const { colorFilters, brandFilters, ageFilters, materialFilters, sizeFilters, genderFilters } = useSelector((state: RootState) => state.filter);

  const allFilters = React.useMemo(() => {
    return {
      colorFilters,
      brandFilters,
      ageFilters,
      materialFilters,
      sizeFilters,
      genderFilters
    };
  }, [colorFilters, brandFilters, ageFilters, materialFilters, genderFilters, sizeFilters]);

  const [page, setPage] = React.useState(1);

  useFetchProducts(category, subcategory, subsubcategory, location, page, dispatch, allFilters);
  // useScrollTop([page], 0, 0);

  return (
    <ProductsBlock>
      <Container>
        <H1>
          {countOfProducts > 0 && (
            language === 'EN' 
              ? `Count of products - ${countOfProducts}`
              : `Кількість продуктів - ${countOfProducts}`
          )}
        </H1>
        <Block>
          <FIlter />
          <ListWrapper>
            <List>
              {products.length > 0 ? products.map((product: ProductInt) => (
                <Product 
                  product={product}
                  key={product.id}
                />
              )) : (
                <NoProducts>
                  {language === 'EN' ? 'No products' : 'Немає продуктів'}
                </NoProducts>
              )}
            </List>
            <Pagination 
              countOfProducts={countOfProducts}
              setPage={setPage}
              currentPage={page}
            />
          </ListWrapper>
        </Block>
      </Container>
    </ProductsBlock>
  );
};
