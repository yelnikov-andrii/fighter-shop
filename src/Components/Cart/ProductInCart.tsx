import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../redux/store';
import { CounterBlock } from './CounterBlock';
import { deleteProduct } from '../../redux/slices/cartSlice';
import { ProductAdded } from '../../types';

const StyledProductInCart = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #333;
`;

const Name = styled.p`
margin: 0 0 10px 0;
color: #333;
font-weight: 600;
font-size: 18px;
`;

const Size = styled.p`
margin: 0 0 10px 0;
color: #333;
font-weight: 600;
font-size: 16px;
`;

const PriceBlock = styled.div`
margin: 10px 0 0 0;
color: #333;
font-weight: 600;
font-size: 16px;
`;

interface Props {
  product: ProductAdded;
}

export const ProductInCart: React.FC <Props> = ({ product }) => {
  const { language } = useSelector((state: RootState) => state.language);
  const { currency, coefficient } = useSelector((state: RootState) => state.currency);
  const price = `${(product.price * coefficient).toFixed(1).replace(/\.0$/, '')} ${currency}`;

  const dispatch = useDispatch();

  return (
    <StyledProductInCart>
      <div>
        <Name>
          {language === 'EN' ? product.name_en : product.name_ukr}
        </Name>
        <Size>
          {language === 'EN' ? `Size: ${product.variant.name_en}` : `Розмір: ${product.variant.name_ukr}`}
        </Size>
        <CounterBlock 
          product={product}
        />
        <PriceBlock>
          {language === 'EN' ? `Price - ${price}` : `Ціна - ${price}`}
        </PriceBlock>
      </div>
      <div>
        <button
          onClick={() => {
            dispatch(deleteProduct(product));
          }}
        >
          X
        </button>
      </div>
    </StyledProductInCart>
  );
};
