import React from 'react';
import { ProductInt } from '../../types';
import styled from 'styled-components';
import { MyDropdown } from '../UI/MyDropdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const DescriptionBlock = styled.div`
margin: 0 0 20px 0;
`;

const Content = styled.div`
font-size: 18px;
font-weight: 400;
color: #333;
`;

interface Props {
  product: ProductInt;
}


export const Description: React.FC <Props> = ({ product }) => {
  const { language } = useSelector((state: RootState) => state.language);

  return (
    <DescriptionBlock>
      <MyDropdown
        butttonContent={language === 'EN' ? 'Description' : 'Опис'}
      >
        <Content>
          {language === 'EN' ? product.description_en : product.description_ukr}
        </Content>
      </MyDropdown>
    </DescriptionBlock>
  );
};
