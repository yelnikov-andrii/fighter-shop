import React from 'react';
import axios from 'axios';
import { baseUrl } from '../../helpers/baseUrl';
import { ProductInt, ProductPhotoInt } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LatestArrivalsItemStyled = styled.div`
width: calc((100% / 6));
transition: all 0.4s ease;

&:hover {
  transform: translateY(-10px);
}
`;

const Image = styled.img`
width: 100%;
height: auto;
object-fit: cover;
cursor: pointer;
`;

const Name = styled.p`
margin: 0 0 10px 0;
font-size: 16px;
font-weight: 600;
cursor: pointer;
`;

const Price = styled.p`
margin: 0;
font-size: 20px;
font-weight: 600;
color: #333;
`;

const LinkStyled = styled(Link)`
text-decoration: none;
color: #333;
`;

interface Props {
  product: ProductInt;
}

export const LatestArrivalsItem: React.FC <Props> = ({ product }) => {
  const [images, setImages] = React.useState<ProductPhotoInt[]>([]);

  const { language } = useSelector((state: RootState) => state.language);
  const { coefficient, currency } = useSelector((state: RootState) => state.currency);

  function fetchImages(productId: number) {
    axios.get(`${baseUrl}/products-photos/${productId}`)
      .then(response => {
        setImages(response.data);
      })
      .catch((e) => {

      })
      .finally(() => {

      });
  }

  React.useEffect(() => {
    if (product) {
      fetchImages(product.id);
    }
  }, [product]);


  return (
    <LatestArrivalsItemStyled>
      {images.length > 0 && (
        <LinkStyled to={`/products/${product.id}`}>
          <Image 
            src={`${baseUrl}/${images[0].imageUrl}`}
            alt=""
          />
        </LinkStyled>
      )}
      <LinkStyled to={`/products/${product.id}`}>
        <Name>
          {language === 'EN' ? product.name_en : product.name_ukr}
        </Name>
      </LinkStyled>
      <Price>
        {`${(product.price * coefficient).toFixed(1).replace(/\.0$/, '')} ${currency}`}
      </Price>
    </LatestArrivalsItemStyled>
  );
};
