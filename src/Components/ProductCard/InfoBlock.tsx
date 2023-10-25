import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { BrandInt, ProductInt, VariantInt } from '../../redux/types';
import { NameAndPrice } from './NameAndPrice';
import { VariantsBlock } from './VariantsBlock';
import { Description } from './Description';
import { TechnicalDescription } from './TechnicalDescription';
import { QuantityBlock } from './QuantityBlock';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addProductToCart } from '../../redux/slices/cartSlice';
import axios from 'axios';
import { baseUrl } from '../../helpers/baseUrl';

interface PropsBlockItem {
  hover?: string;
}

const BlockItem = styled.div<PropsBlockItem>`
width: calc((100% - 20px) / 2);
cursor: ${props => props.hover === 'pointer' ? 'pointer' : ''};
`;

const Button = styled.button`
max-width: 320px;
width: 100%;
height: 60px;
outline: none;
border: 1px solid teal;
border-radius: 2px;
cursor: pointer;
`;

const QuantityError = styled.p`
margin: 10px 0;
color: red;
font-size: 14px;
font-weight: 300;
`;

interface Props {
  product: ProductInt | null;
  brand: BrandInt | undefined;
  variants: VariantInt[];
  setVariants: Dispatch<SetStateAction<VariantInt[]>>;
}

export const InfoBlock: React.FC <Props> = ({ product, variants, setVariants, brand }) => {
  const { language } = useSelector((state: RootState) => state.language);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedVariant, setSelectedVariant] = React.useState(variants.length > 0 ? variants[0] : null);
  const [quantityError, setQuantityError] = React.useState('');

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (variants.length) {
      setSelectedVariant(variants[0]);
    }
  }, [variants]);

  async function updateCountOfProducts(variantId: number, quantity: number) {
    try {
      await axios.put(`${baseUrl}/variants/${variantId}`, { quantity });
      if (product) {
        const response = await axios.get(`${baseUrl}/variants/${product.id}`);
        setVariants(response.data);
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  async function addProductIntoCart() {
    if (selectedVariant) {
      if (quantity > selectedVariant?.quantity) {
        if (language === 'EN') {
          setQuantityError(`You can not add to cart more than ${selectedVariant.quantity} items of this product`);
          return;
        } else {
          setQuantityError(`Ви не можете додати в кошик більше ${selectedVariant.quantity} найменувань цього продукту`);
          return;
        }
      } else {
        const newProductInCart = {...product, quantity, variant: selectedVariant.id};
        dispatch(addProductToCart(newProductInCart));
        await updateCountOfProducts(selectedVariant.id, quantity);
      }
    }
  }

  React.useEffect(() => {
    if (quantityError) {
      setTimeout(() => {
        setQuantityError('');
      }, 3000);
    }
  }, [quantityError]);

  return (
    <BlockItem>
      {product && (
        <React.Fragment>
          <NameAndPrice
            product={product}
            quantity={quantity}
          />
          <VariantsBlock
            variants={variants}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
          <QuantityBlock 
            quantity={quantity}
            setQuantity={setQuantity}
          />
          <Description 
            product={product}
          />
          <TechnicalDescription 
            product={product}
            brand={brand}
          />
          <QuantityError>
            {quantityError}
          </QuantityError>
          <Button
            onClick={() => {
              addProductIntoCart();
            }}
          >
            {language === 'EN' ? 'Add to cart' : 'Додати до кошику'}
          </Button>
        </React.Fragment>
      )}

    </BlockItem>
  );
};
