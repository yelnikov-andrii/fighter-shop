import React from 'react';
import styled from 'styled-components';
import { Categories } from './Categories/Categories';
import { MainHeader } from './MainHeader/MainHeader';
import { Cart } from '../Cart/Cart';

const StyledHeader = styled.header`
padding: 50px 20px;
background: ${props => props.theme.backgroundColor};
display: flex;
flex-direction: column;
gap: 10px;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <MainHeader />
      <Categories />
      <Cart />
    </StyledHeader>
  );
};
