import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { decreaseProduct, increaseProduct } from '../../redux/slices/cartSlice';
import { ProductAdded } from '../../types';

const Input = styled.input`
width: 30px;
height: 30px;
box-sizing: border-box;
border-radius: 4px;
padding: 0 5px;
`;

const Block = styled.div`
display: flex;
gap: 10px;
align-items: center;
`;

const Button = styled.button`
width: 30px;
height: 30px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
background: transparent;
border-radius: 4px;
outline: none;
`;

interface Props {
  product: ProductAdded;
}

export const CounterBlock: React.FC <Props> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <Block>
      <Button
        onClick={() => {
          dispatch(decreaseProduct(product));
        }}
      >
        -
      </Button>
      <Input 
        value={product.quantity}
        onChange={(e) => {
          const value = +e.target.value;
          if (!isNaN(value)) {
            console.log(' product quantity');
          }
        }}
      />
      <Button
        onClick={() => {
          dispatch(increaseProduct(product));
        }}
      >
        +
      </Button>
    </Block>
  );
};
