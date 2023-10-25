import React from 'react';
import { MyDropdown } from '../UI/MyDropdown';
import { BrandInt, ProductInt } from '../../redux/types';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Technical = styled.div`
margin: 0 0 60px 0;
`;

const Paragraph = styled.p`
margin: 0 0 10px 0;
font-size: 16px;
font-weight: 500;
color: #333;
`;

interface Props {
  product: ProductInt;
  brand: BrandInt | undefined;
}

export const TechnicalDescription: React.FC <Props> = ({ product, brand }) => {
  const { language } = useSelector((state: RootState) => state.language);
  return (
    <Technical>
      <MyDropdown
        butttonContent={language === 'EN' ? 'Technical specification' : 'Технічна специфікація'}
      >
        <div>
          <Paragraph>
            {language === 'EN' ? `Manufactured by: ${brand?.name}` : `Виготовлено: ${brand?.name}`}
          </Paragraph>
          <Paragraph>
            {language === 'EN' ? `Material: ${product.material_en}` : `Матеріал: ${product.material_ukr}`}
          </Paragraph>
          <Paragraph>
            {language === 'EN' ? `Gender: ${product.gender_en}` : `Стать: ${product.gender_ukr}`}
          </Paragraph>
          <Paragraph>
            {language === 'EN' ? `Age: ${product.age_en}` : `Вік: ${product.age_ukr}`}
          </Paragraph>
        </div>
      </MyDropdown>
    </Technical>
  );
};
