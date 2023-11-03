/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../helpers/baseUrl';
import axios from 'axios';
import { SubsubcategoryMobile } from './SubsubcategoryMobile';
import { SubcategoryInt } from '../../../types';

const StyledSubCategories = styled.div`
padding: 5px 10px;
box-sizing: border-box;
background: #fff;
width: 100%;
box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
`;

const StyledLink = styled(Link)`
margin: 0 0 10px 0;
color: #333;
display: inline-block;
`;

const Block = styled.div`
display: flex;
flex-direction: column;
`;

const Subcategories = styled.div`
margin: 0 0 10px 0;
paddign: 0 0 10px 0;
`;

interface Props {
  categoryId: number;
}

export const SubcategoriesMobile: React.FC <Props> = ({ categoryId }) => {
  const [subcategories, setSubcategories] = React.useState([]);

  async function fetchSubcategories() {
    try {
      const response = await axios.get(`${baseUrl}/subcategories/${categoryId}`);
      setSubcategories(response.data);
    } catch(e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    if (categoryId) {
      fetchSubcategories();
    }
  }, [categoryId]);
  
  return (
    <StyledSubCategories>
      <Block>
        {subcategories?.map((subcategory: SubcategoryInt) => (
          <Subcategories>
            <StyledLink to={`/products?subcategory=${subcategory.id}`}>
              {subcategory.name_en}
            </StyledLink>
            <SubsubcategoryMobile
              subcategoryId={subcategory.id}
            />
          </Subcategories>
        ))}
      </Block>
    </StyledSubCategories>
  );
};
