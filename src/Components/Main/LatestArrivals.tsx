import axios from 'axios';
import React from 'react';
import { baseUrl } from '../../helpers/baseUrl';
import { ProductInt } from '../../types';
import { LatestArrivalsItem } from './LatestArrivalsItem';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const LatestArrivalsStyled = styled.div`
margin: 10px 0 0 0;
`;

const Block = styled.div`
display: flex;

@media screen and (max-width: 768px) {
  flex-direction: column;
}
`;

const H2 = styled.h2`
marrgin: 0 0 40px 0;
font-size: 32px;
font-weight: 600;
text-align: center;
`;

const LatestArrivals = () => {
  const [latestProducts, setLatestProducts] = React.useState<ProductInt[]>([]);
  const { language } = useSelector((state: RootState) => state.language);

  function fetchLatestProducts() {
    axios.get(`${baseUrl}/products?latest=true&page=1&limit=6`)
      .then(response => {
        setLatestProducts(response.data.rows);
      })
      .catch((e) => {

      })
      .finally(() => {

      });
  }

  React.useEffect(() => {
    fetchLatestProducts();
  }, []);

  return (
    <LatestArrivalsStyled>
      <H2>
        {language === 'EN' ? 'Latest arrivals' : 'Останні надходження'}
      </H2>
      <Block>
        {latestProducts && latestProducts.map(product => (
          <LatestArrivalsItem
            product={product}
            key={product.id}
          />
        ))}
      </Block>
    </LatestArrivalsStyled>
  );
};

const MemoizedLatestArrivals = React.memo(LatestArrivals);
export {MemoizedLatestArrivals as LatestArrivals};