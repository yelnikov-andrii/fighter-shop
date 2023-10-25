/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { Container } from '../Layout/Container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/action-creator/Products/fetchProducts';
import { Product } from './Product';
import { Pagination } from './Pagination';
import { RootState } from '../../redux/store';
import { useScrollTop } from '../../hooks/useScrollTop';
import { useFetchProducts } from '../../hooks/useFetchProducts';

const ProductsBlock = styled.div`
padding: 20px 0;
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

export const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const subsubcategory = searchParams.get('subsubcategory');

  const dispatch = useDispatch();

  const { products, countOfProducts } = useSelector((state: RootState) => state.products);
  const { language } = useSelector((state: RootState) => state.language);

  const [page, setPage] = React.useState(1);

  useFetchProducts(category, subcategory, subsubcategory, fetchProducts, location, page, dispatch);
  useScrollTop([page], 0, 0);

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
        <List>
          {products.map((product: any) => (
            <Product 
              product={product}
              key={product.id}
            />
          ))}
        </List>
        <Pagination 
          countOfProducts={countOfProducts}
          setPage={setPage}
          currentPage={page}
        />
      </Container>
    </ProductsBlock>
  );
};
