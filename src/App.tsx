/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import { Products } from './Components/Products/Products';
import { Main } from './Components/Main/Main';
import { useDispatch } from 'react-redux';
import { fetchCurrencies } from './redux/action-creator/Currencies/fetchCurrencies';
import { ProductCard } from './Components/ProductCard/ProductCard';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Main />}>
        </Route>
        <Route path='/products' element={<Products />}>
        </Route>
        <Route path='/products/:productId' element={<ProductCard />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
