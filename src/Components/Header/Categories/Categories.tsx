/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styled from 'styled-components';
import { Container } from '../../Layout/Container';
import { useDispatch, useSelector } from 'react-redux';
import arrow from '../../../images/down.svg';
import { Subcategories } from './Subcategories';
import { fetchCategories } from '../../../redux/action-creator/Categories/fetchCategories';
import { Link } from 'react-router-dom';
import { CategoryInt } from '../../../types';
import { RootState } from '../../../redux/store';
import { BlockError } from './BlockError';
import { BlockLoading } from './BlockLoading';

const StyledCategories = styled.div`
position: relative;
width: 100%;
margin: 0 auto;
z-index: 1;

@media screen and (max-width: 1200px) {
  display: none;
}
`;

const Block = styled.div`
display: flex;
justify-content: space-between;
padding: 0 10px 0;
box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
border-radius: 4px;
height: 40px;
`;

const Item = styled(Link)`
color: teal;
font-size: 15px;
font-weight: 500;
display: flex;
align-items: center;
gap: 4px;
cursor: pointer;
height: 100%;

&:hover {
  color: #ff5733;
}
`;

const Arrow = styled.img`
width: 14px;
height: 14px;
object-fit: cover;
`;

const Categories = () => {
  const { language } = useSelector((state: RootState) => state.language);
  const { categories, categoriesLoading, categoriesError, subcategories } = useSelector((state: RootState) => state.categories);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]);
  
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  if (categoriesError) {
    return (
      <BlockError 
        error={categoriesError}
      />
    );
  }

  if (categoriesLoading) {
    return (
      <BlockLoading />
    );
  }

  return (
    <StyledCategories>
      <Container>
        <Block>
          <Item
            to='products'
          >
            {language === 'EN' ? 'All products' : 'Усі продукти'}
          </Item>
          {categories.map((category: CategoryInt) => (
            <Item 
              onMouseOver={() => {
                setSelectedCategory(category);
                if (subcategories.length > 0) {
                  setIsOpen(true);
                }
              }}
              onMouseLeave={() => {
                setIsOpen(false);
              }}
              key={category.id}
              to={`products?category=${category.id}`}
            >
              {language === 'EN' ? category.name_en : category.name_ukr}
              <Arrow 
                src={arrow}
                alt="arrow"
              />
            </Item>
          ))}
        </Block>
        <Subcategories 
          category={selectedCategory}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      </Container>
    </StyledCategories>
  );
};

const MemoizedCategories = React.memo(Categories);
export { MemoizedCategories as Categories };
