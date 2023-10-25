import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ProductInt } from '../../redux/types';

const H1 = styled.h1`
font-size: 24px;
font-weight: 600;
color: #333;
margin: 0 0 20px 0;
`;

const H2 = styled.h2`
font-size: 32px;
font-weight: 600;
color: #333;
margin: 0 0 20px 0;
`;

interface Props {
  product: ProductInt;
  quantity: number;
}

export const NameAndPrice: React.FC <Props> = ({ product, quantity }) => {
  const { language } = useSelector((state: RootState) => state.language);
  const { currency, coefficient } = useSelector((state: RootState) => state.currency);

  return (
    <React.Fragment>
      <H1>
        {language === 'EN' ? product.name_en : product.name_ukr}
      </H1>
      <H2>
        {`${currency} ${(product.price * quantity * coefficient).toFixed(1).replace(/\.0$/, '')}`}
      </H2>
    </React.Fragment>
  );
};
