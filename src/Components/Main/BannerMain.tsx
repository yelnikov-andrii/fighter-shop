import React from 'react';
import venumBanner from '../../images/venum.jpg';
import styled from 'styled-components';

const StyledBanner = styled.div`
height: 100vh;
width: 100%;

@media screen and (max-width: 768px) {
  min-height: 350px;
}
`;

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;

export const BannerMain = () => {
  return (
    <StyledBanner>
      <Image 
        src={venumBanner}
        alt='venum banner'
      />
    </StyledBanner>
  );
};
