import React from 'react';
import venumBanner from '../../images/venum.jpg';
import styled from 'styled-components';

const StyledBanner = styled.div`
height: 100vh;
width: 100%;
`;

const Image = styled.img`
width: 100%;
heigth: 100%;
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
