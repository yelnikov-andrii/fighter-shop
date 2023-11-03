import React, { Dispatch, SetStateAction} from 'react';
import styled from 'styled-components';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { CategoryMobileBlock } from './CategoryMobileBlock';

interface StyledCateMobile {
  active: string;
}

const StyledCategoriesMobile = styled.div<StyledCateMobile>`
top: 0;
left: 0;
right: 0;
position: fixed;
height: auto;
background: rgba(0, 0, 0, 0.5);
visibility: ${props => props.active ? 'visible' : 'hidden'};
z-index: 3;
`;

const Content = styled.div<StyledCateMobile>`
  background: white;
  display: block;
  height: 99vh;
  overflow-y: scroll;
  top: 0;
  left: auto;
  bottom: 0;
  right: ${props => props.active ? '0' : '-100%'};
  transition: all 0.3s ease-in-out;
  padding: 20px 10px;
`;

const CloseButtonBlock = styled.div`
margin: 0 0 20px 0;
display: flex;
justify-content: flex-end;
padding: 0 20px;
`;

const CloseButton = styled.div`
  font-size: 24px;
  font-weight: 800;
`;

const Block = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
`;

interface Props {
  mobileCategoriesAreOpen: boolean;
  setMobileCategoriesAreOpen: Dispatch<SetStateAction<boolean>>;
}

export const CategoriesMobile: React.FC <Props> = ({ mobileCategoriesAreOpen, setMobileCategoriesAreOpen }) => {
  const { categories } = useSelector((state: RootState) => state.categories);
  

  return (
    <StyledCategoriesMobile 
      active={mobileCategoriesAreOpen ? 'true' : ''}>
      <Content 
        active={mobileCategoriesAreOpen ? 'true' : ''}
      >
        <CloseButtonBlock>
          <CloseButton
            onClick={() => {
              setMobileCategoriesAreOpen(false);
            }}
          >
            &#10006;
          </CloseButton>
        </CloseButtonBlock>
        <Block>
          {categories.map((category: any) => (
            <CategoryMobileBlock 
              category={category}
            />
          ))}
        </Block>
      </Content>
    </StyledCategoriesMobile>
  );
};
