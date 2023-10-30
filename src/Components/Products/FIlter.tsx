/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styled from 'styled-components';
import { MyDropdown } from '../UI/MyDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { BlockWithFilterOptions } from './BlockWithFilterOptions';
import { useGetAllOptions } from '../../hooks/filterHooks';
import { addColorFilter, clearAllFilters, removeColorFilter } from '../../redux/slices/filterSlice';
import { FilterOptionInt } from '../../types';

const StyledFilter = styled.div`
width: 20%;
`;

const ClearAll = styled.div`
display: flex;
justify-content: flex-end;
margin: 0 0 20px 0;
`;

const Button = styled.button`
border: 1px solid #333;
padding: 5px 10px;
bordere-radius: 8px;
outline: none;
background: transparent;
color: teal;
font-size: 18px;
font-weight: 500;
`;

const Colors = styled.div`
display: flex;
gap: 8px;
flex-wrap: wrap;
`;

interface ColorProps {
  active: string;
}

const Color = styled.div<ColorProps>`
width: 20px;
height: 20px;
border-radius: 50%;
border: ${props => props.active ? '2px solid #333' : '1px solid #333'};
box-shadow: ${props => props.active ? '0 0 5px teal' : 'none'};
outline: ${props => props.active ? '1px solid #333' : 'none'};
transform: ${props => props.active ? 'scale(1.1)' : 'none'};
cursor: pointer;
`;

export const FIlter: React.FC = () => {
  const { language } = useSelector((state: RootState) => state.language);

  const { productsAllPages } = useSelector((state: RootState) => state.products);

  const {colors, options, brands} = useGetAllOptions(productsAllPages);
  const { colorFilters } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();


  function colorClickAction(color: string) {
    if (colorFilters.includes(color)) {
      dispatch(removeColorFilter(color));
    } else {
      dispatch(addColorFilter(color));
    }
  }
  
  return (
    <StyledFilter>
      <ClearAll>
        <Button
          onClick={() => {
            dispatch(clearAllFilters());
          }}
        >
          {language === 'EN' ? 'Clear all' : 'Очистити фільтри'}
        </Button>
      </ClearAll>
      <MyDropdown
        butttonContent={language === 'EN' ? 'Colors' : 'Кольори'}
      >
        <Colors>
          {colors.map((color: string) => (
            <Color 
              style={{background: color === 'khaki' ? '#7E805D' : color}}
              onClick={() => {
                colorClickAction(color);
              }}
              active={colorFilters.includes(color) ? 'true' : ''}
              key={color}
            >
            </Color>
          ))}
        </Colors>
      </MyDropdown>
      <MyDropdown
        butttonContent={language === 'EN' ? 'Brands' : 'Бренди'}
      >
        <BlockWithFilterOptions
          filterCategory='brands'
          array={brands}
        />
      </MyDropdown>
      {options.map((option: FilterOptionInt) => (
        <MyDropdown
          butttonContent={language === 'EN' ? option.name_en : option.name_ukr}
          key={option.name_en}
        >
          <BlockWithFilterOptions
            array={option.arr}
            filterCategory={option.filterCategory}
          />
        </MyDropdown>
      ))}
    </StyledFilter>
  );
};
