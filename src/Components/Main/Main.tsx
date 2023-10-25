import React from 'react';
import styled from 'styled-components';
import { BannerMain } from './BannerMain';
import { BannerSecond } from './BannerSecond';
import boxingGloves from '../../images/boxingGloves.png';
import bjjGis from '../../images/bjjGi.png';
import punchBags from '../../images/punchbags.png';
import mmaProtection from '../../images/mmaprotection.png';
import noGi from '../../images/nogi.png';
import dumbells from '../../images/dumells.png';
import { LatestArrivals } from './LatestArrivals';
import { AboutBlock } from './AboutBlock';

const MainStyled = styled.section`
  padding: 0 0 100px;
`;

const Block = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`;

export const Main = () => {
  const firstBlockElements = [
    {
      name_en: 'Boxing gloves',
      name_ukr: 'Боксерські перчатки',
      img: boxingGloves,
      imgAlt: 'boxing gloves',
      linkUrl: '/products?subcategory=1'
    },
    {
      name: 'Bjj Gi',
      name_en: 'Bjj Gi',
      name_ukr: 'Гі для джиу-джитсу',
      img: bjjGis,
      imgAlt: 'bjj gi',
      linkUrl: 'products?subcategory=7'
    },
    {
      name_en: 'MMA protection',
      name_ukr: 'Захист для ММА',
      img: mmaProtection,
      imgAlt: 'mma protection',
      linkUrl: 'products?subcategory=11'
    }
  ];

  const secondBlockElements = [
    {
      name_en: 'No gi staff',
      name_ukr: 'Ноу-гі',
      img: noGi,
      imgAlt: 'no gi',
      linkUrl: 'products?subcategory=8'
    },
    {
      name_en: 'Punch bags',
      name_ukr: 'Ударні мішки',
      img: punchBags,
      imgAlt: 'punch bags',
      linkUrl: 'products?subcategory=3'
    },
    {
      name_en: 'Dumbells and kettlebells',
      name_ukr: 'Гантелі та гирі',
      img: dumbells,
      imgAlt: 'dumbells',
      linkUrl: 'products?subcategory=15'
    }
  ];

  return (
    <MainStyled>
      <BannerMain />
      <Block>
        <BannerSecond 
          reverse={false}
          elements={firstBlockElements}
        />
        <BannerSecond 
          reverse={true}
          elements={secondBlockElements}
        />
      </Block>
      <LatestArrivals />
      <AboutBlock />
    </MainStyled>
  );
};
