import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../redux/store';
import { Option } from '../../types';
import { addAgeFilter, addBrandFilter, addGenderFilter, addMaterialFilter, addSizeFilter, removeAgeFilter, removeBrandFilter, removeGenderFilter, removeMaterialFilter, removeSizeFilter } from '../../redux/slices/filterSlice';

const StyledBlockFilterOptions = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
`;

interface Props {
  array: Option[];
  filterCategory: string;
}

export const BlockWithFilterOptions: React.FC <Props> = ({ array, filterCategory }) => {
  const { language } = useSelector((state: RootState) => state.language);
  const { brandFilters, ageFilters, materialFilters, genderFilters, sizeFilters } = useSelector((state: RootState) => state.filter);

  const dispatch = useDispatch();

  function handleCheckboxChange(e: any, item: Option, filterCategory: string) {

    if (e.target.checked === false) {
      switch(filterCategory) {
      case 'ages':
        dispatch(removeAgeFilter(item));
        break;
      case 'brands':
        dispatch(removeBrandFilter(item));
        break;
      case 'materials':
        dispatch(removeMaterialFilter(item));
        break;
      case 'genders':
        dispatch(removeGenderFilter(item));
        break;
      case 'sizes':
        dispatch(removeSizeFilter(item));
        break;
      default:
        return;
      }
    } else {
      switch(filterCategory) {
      case 'ages':
        dispatch(addAgeFilter(item));
        break;
      case 'brands':
        dispatch(addBrandFilter(item));
        break;
      case 'materials':
        dispatch(addMaterialFilter(item));
        break;
      case 'genders':
        dispatch(addGenderFilter(item));
        break;
      case 'sizes':
        dispatch(addSizeFilter(item));
        break;
      default:
        return;
      }
    }
  }

  return (
    <StyledBlockFilterOptions>
      {array.map((item: Option) => (
        <div
          key={filterCategory === 'brands' ? item.name : item.name_en}
        >
          <input 
            type='checkbox'
            onChange={(e) => {
              handleCheckboxChange(e, item, filterCategory);
            }}
            checked={
              filterCategory === 'brands'
                ? brandFilters.find(filter => filter.name === item.name) ? true : false
                : filterCategory === 'ages' 
                  ? ageFilters.find(filter => filter.name_en === item.name_en) ? true : false
                  : filterCategory === 'materials'
                    ? materialFilters.find(filter => filter.name_en === item.name_en) ? true : false
                    : filterCategory === 'sizes'
                      ? sizeFilters.find(filter => filter.name_en === item.name_en) ? true : false
                      : genderFilters.find(filter => filter.name_en === item.name_en) ? true : false
            }
          />
          <span>
            {filterCategory === 'brands' ? item.name : (language === 'EN' ? item.name_en : item.name_ukr) }
          </span>
        </div>
      ))}
    </StyledBlockFilterOptions>
  );
};
