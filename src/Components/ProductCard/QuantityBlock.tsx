import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../redux/store';

const Quantity = styled.div`
margin: 0 0 20px 0;
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

const Input = styled.input`
width: 30px;
height: 30px;
box-sizing: border-box;
border-radius: 4px;
padding: 0 5px;
`;

const H5 = styled.p`
margin: 0 0 10px 0;
font-size: 22px;
font-weight: 600;
`;

const Block = styled.div`
display: flex;
gap: 10px;
align-items: center;
`;

interface Props {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

export const QuantityBlock: React.FC <Props> = ({ quantity, setQuantity }) => {
  const { language } = useSelector((state: RootState) => state.language);

  return (
    <Quantity>
      <H5>
        {language === 'EN' ? 'Quantity' : 'Кількість'}
      </H5>
      <Block>
        <Button
          onClick={() => {
            if (quantity > 1) {
              setQuantity(prev => prev - 1);
            }
          }}
        >
          -
        </Button>
        <Input 
          value={quantity}
          onChange={(e) => {
            const value = +e.target.value;
            if (!isNaN(value)) {
              setQuantity(value);
            }
          }}
        />
        <Button
          onClick={() => {
            setQuantity(prev => prev + 1);
          }}
        >
          +
        </Button>
      </Block>
    </Quantity>
  );
};
