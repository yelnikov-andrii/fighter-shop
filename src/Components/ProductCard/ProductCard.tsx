/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../Layout/Container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneProduct } from '../../redux/action-creator/Products/fetchOneProduct';
import { RootState } from '../../redux/store';
import { fetchPhotos } from '../../redux/action-creator/Products/fetchPhotosOneProduct';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import axios from 'axios';
import { ImageBlock } from './ImageBlock';
import { InfoBlock } from './InfoBlock';
import { VariantInt } from '../../redux/types';
import { baseUrl } from '../../helpers/baseUrl';

const ProductCardStyled = styled.div`
padding: 50px 0 100px;
`;

const Block = styled.div`
display: flex;
gap: 20px;
`;

interface BrandInt {
  name: string;
}

export const ProductCard = () => {
  const { productId }: any = useParams();

  const dispatch = useDispatch();

  const [variants, setVariants] = React.useState<VariantInt[]>([]);
  const [brand, setBrand] = React.useState<BrandInt>();

  const { product, productError, productLoading } = useSelector((state: RootState) => state.products);
  const { photos, photosError, photosLoading } = useSelector((state: RootState) => state.photos);
  
  async function fetchVariants(productId: string) {
    try {
      const response: any = await axios.get(`http://localhost:2000/variants/${productId}`);
      setVariants(response.data);
    }

    catch(e) {
      console.log(e);
    }
  }

  async function fetchBrand(brandId: number) {
    try {
      const response: any = await axios.get(`${baseUrl}/brands/${brandId}`);
      setBrand(response.data);
    }

    catch(e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    dispatch(fetchOneProduct(productId));
  }, [productId]);

  React.useEffect(() => {
    if (product) {
      dispatch(fetchPhotos(product.id));
    }
  }, [product]);

  React.useEffect(() => {
    fetchVariants(productId);
  }, [productId]);

  React.useEffect(() => {
    if (product) {
      fetchBrand(product.BrandSportId);
    }
  }, [product]);

  if (productError) {
    return (
      <div>
        <Container>
          <Block>
            Error can not load product
          </Block>
        </Container>
      </div>
    );
  }

  return (
    <ProductCardStyled>
      <Container>
        {productLoading ? (
          <Block>
            Loading...
          </Block>
        ) : (
          <Block>
            {photosLoading ? (
              <div>
                Loading...
              </div>
            ) : (
              <ImageBlock 
                photos={photos}
              />
            )}
            {photosError && (
              <div>
                {photosError}
              </div>
            )}
            <InfoBlock 
              product={product}
              variants={variants}
              brand={brand}
              setVariants={setVariants}
            />
          </Block>
        )}
      </Container>
    </ProductCardStyled>
  );
};
