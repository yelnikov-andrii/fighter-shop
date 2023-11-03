import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { RootState } from '../../../redux/store';
import { SubsubcategoryInt } from '../../../types';
import { BlockError } from './BlockError';
import { BlockLoading } from './BlockLoading';
import { baseUrl } from '../../../helpers/baseUrl';

const SubSubcategory = styled(Link)`
font-weight: 500;
font-size: 14px;
color: teal;
text-transform: uppercase;

&:hover {
  color: #ff5733;
}
`;

const List = styled.ul`
list-style: none;
padding: 0;
margin: 0;
display: flex;
flex-direction: column;
gap: 6px;
`;

interface Props {
  subcategoryId: number;
}

export const SubsubcategoryMobile: React.FC <Props> = ({ subcategoryId }) => {
  const { language } = useSelector((state: RootState) => state.language);
  const [subsubcategories, setSubsubcategories] = React.useState([]);
  const [loadingSubsubcategories, setLoadingSubsubcategories] = React.useState(false);
  const [subsubcategoryError, setSubsubcategoryError] = React.useState('');

  const fetchSubsubCategories = async (subcategoryId: number) => {
    try {
      setLoadingSubsubcategories(true);
      const response = await axios.get(`${baseUrl}/subsubcategories/${subcategoryId}`);
      setSubsubcategories(response.data);
      setLoadingSubsubcategories(false);
    } catch(e: any) {
      setSubsubcategoryError(e.message);
    }
  };

  React.useEffect(() => {
    fetchSubsubCategories(subcategoryId);
  }, [subcategoryId]);

  if (subsubcategoryError) {
    return (
      <BlockError 
        error={subsubcategoryError}
      />
    );
  }

  if (loadingSubsubcategories) {
    return (
      <BlockLoading />
    );
  }

  return (
    <div>
      <List>
        {subsubcategories.map((subsubcategory: SubsubcategoryInt) => (
          <li key={subsubcategory.id}>
            <SubSubcategory
              to={`/products?subsubcategory=${subsubcategory.id}`}
              key={subsubcategory.id}
            >
              {language === 'EN' ? subsubcategory.name_en : subsubcategory.name_ukr}
            </SubSubcategory>
          </li>
        ))}
      </List>
    </div>
  );
};
