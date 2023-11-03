import React from 'react';
import { SubcategoriesMobile } from './SubcategoriesMobile';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CategoryInt } from '../../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const StyledLink = styled(Link)`
color: teal;
`;

const CategoryLinkBlock = styled.div`
display: flex;
width: 95%;
justify-content: space-between;
border: 1px solid teal;
padding: 5px;
border-radius: 8px;
`;

const ToggleButton = styled.div`
width: 20px;
color: teal;
font-weight: 900;
`;

interface Props {
  category: CategoryInt;
}

export const CategoryMobileBlock: React.FC <Props> = ({ category }) => {
  const { language } = useSelector((state: RootState) => state.language);
  const [isOpen, setIsOpen] = React.useState(false);

  function toggleBlock() {
    setIsOpen(!isOpen);
  }

  return (
    <React.Fragment>
      <CategoryLinkBlock>
        <StyledLink
          to={`products?category=${category.id}`}
        >
          {language === 'EN' ? category.name_en : category.name_ukr}
        </StyledLink>
        <ToggleButton
          onClick={() => {
            toggleBlock();
          }}
        >
          {isOpen ? '-' : '+'}
        </ToggleButton>
      </CategoryLinkBlock>
      {isOpen && (
        <SubcategoriesMobile 
          categoryId={category.id}
        />
      )}
    </React.Fragment>
  );
};
