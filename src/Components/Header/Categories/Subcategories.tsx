/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { fetchSubCategories } from '../../../redux/action-creator/Categories/fetchCategories';
import { useDispatch, useSelector } from 'react-redux';
import { SubSubCategory } from './SubSubCategory';
import { CategoryInt, SubcategoryInt } from '../../../redux/types';
import { RootState } from '../../../redux/store';
import { BlockError } from './BlockError';
import { BlockLoading } from './BlockLoading';
import { baseUrl } from '../../../helpers/baseUrl';

interface SubcategoriesProps {
  open: string;
}

const StyledSubCategories = styled.div<SubcategoriesProps>`
position: absolute;
padding: 5px 10px;
box-sizing: border-box;
background: #fff;
width: 100%;
top: 40px;
left: 0;
right: 0;
visibility: ${props => props.open === 'true' ? 'visible' : 'hidden'};
max-height: ${props => (props.open === 'true' ? '400px' : '0')};
overflow: hidden;
transition: all 0.4s ease;
box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
`;

const Block = styled.div`
display: flex;
justify-content: space-between;
`;

const Image = styled.img`
width: 218px;
height: 272px;
object-fit: cover;
`;

interface Props {
  category: CategoryInt;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

export const Subcategories: React.FC <Props> = ({ category, setIsOpen, isOpen }) => {
  const { subcategories, subCategoriesLoading, subCategoriesError } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (category) {
      dispatch(fetchSubCategories(category.id));
    }
  }, [category]);

  if (subCategoriesError) {
    return (
      <BlockError 
        error={subCategoriesError}
      />
    );
  }

  if (subCategoriesLoading) {
    return (
      <StyledSubCategories
        onMouseOver={() => {
          if (!subCategoriesError && !subCategoriesLoading) {
            setIsOpen(true);
          }
        }}
        onMouseLeave={() => {
          setIsOpen(false);
        }}
        open={(isOpen === true && !subCategoriesError && !subCategoriesLoading) ? 'true' : ''}
      >
        <BlockLoading />
      </StyledSubCategories>
    );
  }
  
  return (
    <StyledSubCategories
      onMouseOver={() => {
        if (!subCategoriesError && !subCategoriesLoading) {
          setIsOpen(true);
        }
      }}
      onMouseLeave={() => {
        setIsOpen(false);
      }}
      open={(isOpen === true && !subCategoriesError && !subCategoriesLoading) ? 'true' : ''}
    >
      <Block>
        {subcategories?.map((subcategory: SubcategoryInt) => (
          <SubSubCategory 
            subcategory={subcategory}
            key={subcategory.id}
          />
        ))}
        <div>
          <Image 
            src={`${baseUrl}/${category?.photo}` || ''}
            alt=""
          />
        </div>
      </Block>
    </StyledSubCategories>
  );
};
