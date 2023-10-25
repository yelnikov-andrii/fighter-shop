import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../redux/store';
import { closeCart } from '../../redux/slices/cartSlice';
import arrow from '../../images/left-arrow.png';

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

export const Cart = () => {
  const { cartIsOpen } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

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
        <div>
          <Image 
            src={arrow}
            alt='arrow'
            onClick={() => {
              dispatch(closeCart());
            }}
          />
        </div>
      </Content>
    </StyledCart>
  );
};