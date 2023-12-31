import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../helpers/baseUrl';
import { ProductInt, ProductPhotoInt } from '../../types';

const ListItem = styled(Link)`
width: calc((100% - 40px) / 3);
text-decoration: none;
border: 1px solid teal;
border-radius: 8px;
box-sizing: border-box;
padding: 5px 10px;
min-width: 250px;
max-width: 340px;

&:hover {
  border: 2px solid teal;
}

@media screen and (max-width: 1024px) {
  width: 100%;
}
`;

const Image = styled.img`
width: 100%;
margin: 0 0 20px 0;
cursor: pointer;
`;

const H2 = styled.h2`
font-size: 22px;
font-weight: 600;
margin: 0 0 20px 0;
color: #333;
`;

const H3 = styled.h3`
font-size: 24px;
font-weight: 700;
margin: 0;
color: #333;
`;

interface Props {
  product: ProductInt;
}

export const Product: React.FC <Props> = ({ product }) => {
  const [photos, setPhotos] = React.useState<ProductPhotoInt[]>([]);
  const [photosLoading, setPhotosLoading] = React.useState(false);
  const [photosError, setPhotosError] = React.useState('');
  const { language } = useSelector((state: RootState) => state.language);
  const { currency, coefficient } = useSelector((state: RootState) => state.currency);

  const fetchPhotos = async (productId: string = '') => {
    setPhotosLoading(true);
    try {
      if (productId) {
        const response = await axios.get(`${baseUrl}/products-photos/${productId}`);
        setPhotos(response.data);
        setPhotosLoading(false);
      }
    } 
    catch(e: any) {
      setPhotosError('Error can not load photos');
      setPhotosLoading(false);
    }
  };

  React.useEffect(() => {
    if (product) {
      fetchPhotos((product.id).toString());
    }
  }, [product]);


  return (
    <ListItem 
      to={`/products/${product.id}`}
    >
      {photosLoading ? (
        <div>
          loading...
        </div>
      ) : (
        photos.length ? (
          <Image 
            src={`${baseUrl}/${photos[0].imageUrl}`}
            alt=""
          />
        ) : (
          <div>
            {photosError}
          </div>
        )
      )}
      <H2>
        {language === 'EN' ? product.name_en : product.name_ukr}
      </H2>
      <H3>
        {`${(product.price * coefficient).toFixed(1).replace(/\.0$/, '')} ${currency}`}
      </H3>
    </ListItem>
  );
};
