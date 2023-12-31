import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { MySelect } from '../../UI/MySelect';
import login from '../../../images/user-alt-1.svg';
import cart from '../../../images/shopping-cart-outline.svg';
import { useDispatch } from 'react-redux';
import { changeLang } from '../../../redux/slices/langSlice';
import { Link } from 'react-router-dom';
import { changeCurrency } from '../../../redux/slices/currencySlice';
import { currencies } from '../../../helpers/currenciesArr';
import { languages } from '../../../helpers/languagesArr';
import { openCart } from '../../../redux/slices/cartSlice';

const StyledMainHeader = styled.div`
display: flex;
justify-content: space-between;
margin: 0 0 10px 0;
`;

const Logo = styled(Link)`
margin: 0;
text-decoration: none;
font-size: 24px;
font-weight: 700;
color: teal;

@media screen and (max-width: 768px) {
  font-size: 18px;
}

&:hover {
  color: #ff5733;
}
`;

const MenuButton = styled.div`
display: flex;
flex-direction: column;
gap: 4px;
width: 20px;

@media screen and (min-width: 1200px) {
  display: none;
}
`;

const Span = styled.span`
height: 2px;
width: 100%;
background-color: teal;
`;

const AuthBlock = styled.div`
display: flex;
gap: 10px;
`;

const Icon = styled.img`
width: 20px;
height: 20px;
cursor: pointer;
`;

interface Props {
  setMobileCategoriesAreOpen: Dispatch<SetStateAction<boolean>>;
}

export const MainHeader: React.FC <Props> = ({ setMobileCategoriesAreOpen }) => {
  
  const dispatch = useDispatch();

  function changeLanguage(language: string) {
    dispatch(changeLang(language));
  }

  function changeCurrencyHandler(currency: string) {
    dispatch(changeCurrency(currency));
  }

  function openMobileCategories() {
    setMobileCategoriesAreOpen(true);
  }

  return (
    <StyledMainHeader>
      <Logo to="/">
          Sport Shop
      </Logo>
      <MenuButton
        onClick={() => {
          openMobileCategories();
        }}
      >
        <Span></Span>
        <Span></Span>
        <Span></Span>
      </MenuButton>
      <AuthBlock>
        <MySelect 
          options={currencies}
          change={changeCurrencyHandler}
        />
        <MySelect 
          options={languages}
          change={changeLanguage}
        />
        <div>
          <Icon 
            src={login}
            alt="login button"
          />
        </div>
        <div>
          <Icon 
            src={cart}
            alt="cart button"
            onClick={() => {
              dispatch(openCart());
            }}
          />
        </div>
      </AuthBlock>
    </StyledMainHeader>
  );
};
