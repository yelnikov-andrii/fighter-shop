import React from 'react';
import styled from 'styled-components';
import { ProductPhotoInt } from '../../redux/types';
import { MyModal } from '../UI/MyModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface PropsBlockItem {
  hover?: string;
}

const BlockItem = styled.div<PropsBlockItem>`
width: calc((100% - 20px) / 2);
cursor: pointer;
`;

const Image = styled.img`
width: 100%;
height: auto;
`;

interface Props {
  photos: ProductPhotoInt[];
}

export const ImageBlock: React.FC <Props> = ({ photos }) => {
  const [active, setActive] = React.useState(false);
  return (
    <BlockItem>
      {photos.length > 0 && active === false && (
        <Image 
          src={`http://localhost:2000/${photos[0].imageUrl}`}
          alt=''
          onClick={() => {
            setActive(true);
          }}
        />
      )}
      <MyModal
        active={active}
        setActive={setActive}
      >
        <Swiper
          spaceBetween={50}
          pagination={{ clickable: true }}
          navigation
          slidesPerView={1}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
        >
          {photos.map((photo: ProductPhotoInt) => (
            <SwiperSlide key={photo.id}>
              <Image
                src={`http://localhost:2000/${photo.imageUrl}`}
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </MyModal>
    </BlockItem>
  );
};
