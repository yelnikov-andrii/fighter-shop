import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../redux/store';
import { closeCart } from '../../redux/slices/cartSlice';
import arrow from '../../images/left-arrow.png';
import { ProductInCart } from './ProductInCart';
import { ProductAdded } from '../../types';

interface CartProps {
  active: string;
}

const StyledCart = styled.div<CartProps>`
top: 0;
left: 0;
right: 0;
bottom: 0;
position: fixed;
background: rgba(0, 0, 0, 0.5);
visibility: ${props => props.active ? 'visible' : 'hidden'};
z-index: 3;
`;

const Arrow = styled.div`
margin: 0 0 20px 0;
`;

const Content = styled.div<CartProps>`
  background: white;
  display: block;
  width: 100%;
  max-width: 500px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: auto;
  bottom: 0;
  right: ${props => props.active ? '0' : '-100%'};
  transition: all 0.3s ease-in-out;
  padding: 20px 10px;
`;

const Image = styled.img`
width: 40px;
heigth: 20px;
transform: rotate(180deg);
cursor: pointer;
`;

const Products = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`;

const EmptyCart = styled.p`
margin: 0;
font-weight: 600;
font-size: 24px;
color: #333;
text-aling: center;
display: flex;
justify-content: center;
align-items: center;
`;

const Total = styled.div`
  margin: 20px 0 0 0;
  font-size: 22px;
  font-weight: 600;
  color: #333;
`;

export const SideCart = () => {
  const { cartIsOpen, productsInCart } = useSelector((state: RootState) => state.cart);
  const { language } = useSelector((state: RootState) => state.language);
  const { currency, coefficient } = useSelector((state: RootState) => state.currency);
  const dispatch = useDispatch();

  const totalCount = (productsInCart && productsInCart.reduce((init, elem) => init + elem.price * elem.quantity, 0)) || 1;
  const price = `${(totalCount * coefficient).toFixed(1).replace(/\.0$/, '')} ${currency}`;

  return (
    <StyledCart 
      active={cartIsOpen ? 'true' : ''}
      onClick={() => {
        dispatch(closeCart());
      }}
    >
      <Content 
        onClick={(e) => e.stopPropagation()}
        active={cartIsOpen ? 'true' : ''}
      >
        <Arrow>
          <Image 
            src={arrow}
            alt='arrow'
            onClick={() => {
              dispatch(closeCart());
            }}
          />
        </Arrow>
        <React.Fragment>
          {productsInCart && productsInCart.length > 0 ? (
            <Products>
              {productsInCart.map((product: ProductAdded) => (
                <ProductInCart 
                  product={product}
                  key={product.id + product.variant.name_en}
                />
              ))}
              <Total>
                {language === 'EN' ? `Total: ${price}` : `Разом: ${price}`}
              </Total>
            </Products>
          ) : (
            <Products>
              <EmptyCart>
                {language === 'EN' ? 'Cart is empty' : 'Кошик порожній'}
              </EmptyCart>
            </Products>
          )}
        </React.Fragment>
      </Content>
    </StyledCart>
  );
};