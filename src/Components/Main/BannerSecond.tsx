import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';

interface StyledBannerProps {
  reverse: string;
}

const StyledBanner = styled.div<StyledBannerProps>`
  display: flex;
  gap: 10px;
  height: 100vh;
  min-height: 400px;
  flex-direction: ${props => props.reverse === 'true' ? 'row-reverse' : 'row'};

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

interface BannerItemProps {
  column?: string;
}

const BannerItem = styled.div<BannerItemProps>`
width: calc((100% - 10px) / 2);
display: flex;
flex-direction: ${props => props.column === 'true' ? 'column' : ''};
gap: 10px;
height: 100%;
position: relative;
z-index: 0;
min-height: 350px;

@media screen and (max-width: 768px) {
  width: 100%;
}
`;

const BannerItemImgBlock = styled.div`
  height: calc((100% - 10px) / 2);
  min-height: 350px;
  position: relative;
`;

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
position: absolute;
z-index: -1;
`;

interface TxtBlockProps {
  small?: string;
}

const TxtBlock = styled.div<TxtBlockProps>`
margin: ${props => props.small === 'true' ? '30% 0 30px 30px' : 'auto 0 30px 30px'};
`;

const H2 = styled.h2`
color: white;
font-weight: 600;
font-size: 36px;
margin: 0 0 20px 0;
`;

const Button = styled(Link)`
border: none;
outline: none;
background: white;
color: #000;
font-size: 18px;
font-weight: 500;
cursor: pointer;
padding: 10px 20px;
text-decoration: none;

&:hover {
  color: white;
  background: teal;
}
`;

interface ElementInt {
  name_en: string;
  name_ukr: string;
  img: string;
  imgAlt: string;
  linkUrl: string;
}

interface Props {
  reverse: boolean;
  elements: ElementInt[];
}

export const BannerSecond: React.FC <Props> = ({ reverse, elements, }) => {
  const { language } = useSelector((state: RootState) => state.language);
  return (
    <StyledBanner
      reverse={reverse === true ? 'true' : ''}
    >
      <BannerItem>
        <Image 
          src={elements[0].img}
          alt={elements[0].imgAlt}
        />
        <TxtBlock>
          <H2>
            {language === 'EN' ? elements[0].name_en : elements[0].name_ukr}
          </H2>
          <Button
            to={elements[0].linkUrl}
          >
            {language === 'EN' ? 'Shop now' : 'Купити зараз'}
          </Button>
        </TxtBlock>
      </BannerItem>
      <BannerItem
        column="true"
      >
        <React.Fragment>
          {elements.slice(1).map((element: ElementInt) => (
            <BannerItemImgBlock
              key={element.name_en + element.img}
            >
              <Image 
                src={element.img}
                alt={element.imgAlt}
              />
              <TxtBlock
                small="true"
              >
                <H2>
                  {language === 'EN' ? element.name_en : element.name_ukr}
                </H2>
                <Button
                  to={element.linkUrl}
                >
                  {language === 'EN' ? 'Shop now' : 'Купити зараз'}
                </Button>
              </TxtBlock>
            </BannerItemImgBlock>
          ))}
        </React.Fragment>
      </BannerItem>
    </StyledBanner>
  );
};
