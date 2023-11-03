import React from 'react';
import styled from 'styled-components';
import { Categories } from './Categories/Categories';
import { MainHeader } from './MainHeader/MainHeader';
import { SideCart } from '../Cart/SideCart';
import { CategoriesMobile } from './Categories/CategoriesMobile';

const StyledHeader = styled.header`
padding: 10px 20px 0;
background-color: ${props => props.theme.colors.backgroundColor};
display: flex;
flex-direction: column;
gap: 10px;
position: sticky;
left: 0;
top: 0;
right: 0;
z-index: 9;
`;

export const Header = () => {
  const [mobileCategoriesAreOpen, setMobileCategoriesAreOpen] = React.useState(false);
  
  return (
    <StyledHeader>
      <MainHeader 
        setMobileCategoriesAreOpen={setMobileCategoriesAreOpen}
      />
      <CategoriesMobile 
        mobileCategoriesAreOpen={mobileCategoriesAreOpen}
        setMobileCategoriesAreOpen={setMobileCategoriesAreOpen}
      />
      <Categories />
      <SideCart />
    </StyledHeader>
  );
};
