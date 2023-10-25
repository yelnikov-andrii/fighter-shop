import React, { Dispatch, SetStateAction } from 'react';
import { VariantInt } from '../../redux/types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface H3Props {
  empty?: string;
}

const H3 = styled.h3<H3Props>`
font-size: 18px;
font-weight: 400;
color: ${props => props.empty === 'true' ? 'red' : 'green'};
margin: 0 0 10px 0;
`;

const Variants = styled.div`
display: flex;
gap: 8px;
margin: 0 0 60px 0;
`;

interface VaraintProps {
  active: string;
  empty: string;
}

const Variant = styled.div<VaraintProps>`
padding: 4px;
border-radius: 4px;
border: ${props => props.active ? '3px solid teal' : '1px solid teal'};
background-color: ${props => props.empty ? '#ccc' : 'transparent'};
font-size: 16px;
font-weight: 600;
cursor: pointer;
`;

const H5 = styled.p`
margin: 0 0 10px 0;
font-size: 22px;
font-weight: 600;
`;

interface Props {
  variants: VariantInt[];
  selectedVariant: VariantInt | null;
  setSelectedVariant: Dispatch<SetStateAction<VariantInt | null>>;
}

export const VariantsBlock: React.FC <Props> = ({ variants, selectedVariant, setSelectedVariant }) => {
  const { language } = useSelector((state: RootState) => state.language);

  console.log(variants);

  return (
    <React.Fragment>
      {selectedVariant && (
        selectedVariant.quantity > 0 ?
          <H3>
            {language === 'EN' ? `In stock ${selectedVariant.quantity}` : `В наявності ${selectedVariant.quantity}`}
          </H3>
          :
          <H3
            empty={selectedVariant.quantity === 0 ? 'true' : ''}  
          >
            {language === 'EN' ? 'No in stock' : 'Немає в наявності'}
          </H3>
      )}
      <H5>
        {language === 'EN' ? 'Size' : 'Розмір'}
      </H5>
      <Variants>
        {variants && variants.map((variant: VariantInt) => (
          <Variant
            onClick={() => {
              setSelectedVariant(variant);
            }}
            active={selectedVariant && selectedVariant.id === variant.id ? 'true' : ''}
            empty={variant.quantity === 0 ? 'true' : ''}
            key={variant.id}
          >
            {language === 'EN' ? variant.name_en : variant.name_ukr}
          </Variant>
        ))}
      </Variants>
    </React.Fragment>
  );
};
