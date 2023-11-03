import React from 'react';
import { Container } from '../Layout/Container';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const AboutBlockStyled = styled.div`
margin: 50px 0 0 0;
`;

const Block = styled.div`
display: flex;
gap: 20px;

@media screen and (max-width: 768px) {
  flex-direction: column;
}
`;

const BlockItem = styled.div`
width: calc((100% - 20px) / 2);

@media screen and (max-width: 768px) {
  width: 100%;
}
`;

const H4 = styled.h4`
margin: 0 0 30px 0;
font-size: 32px;
font-weight: 600;
color: #333;
`;

const Paragraph = styled.p`
margin: 0;
font-size: 16px;
font-weight: 400;
color: #333;
`;


export const AboutBlock = () => {
  const { language } = useSelector((state: RootState) => state.language);

  return (
    <AboutBlockStyled>
      <Container>
        <Block>
          <BlockItem>
            <H4>
              {language === 'EN' ? 'MMA CLOTHING & MARTIAL ARTS GEAR' : 'ММА одяг та спорядження'}
            </H4>
            <Paragraph>
              {language === 'EN' ? 'Welcome to SportShop - premiere online supplier of the latest Mixed Martial Arts, boxing and fitness equipment. We also offer an extensive range of uniforms and MMA apparel for training, competition and streetwear from the sports brands you trust. Whether you\'re a fan, fighter or practitioner, we\'re the first and last word when it comes to supplying you with all the specialized combat sports and martial arts equipment you need to perform your best. Shop our online store for the latest MMA clothing and martial arts training equipment, including: MMA Fight Shorts & MMA Gloves, Boxing Gloves, MMA & UFC T shirts, BJJ Gi\'s and Rashguards.' : 'Ласкаво просимо до SportShop - головного онлайн-постачальника найновішого обладнання для змішаних бойових мистецтв, боксу та фітнесу. Ми також пропонуємо широкий асортимент уніформи та одягу для ММА для тренувань, змагань і вуличного одягу від спортивних брендів, яким ви довіряєте. Незалежно від того, чи ви фанат, боєць чи практикуючий, ми є першим і останнім словом, коли справа доходить до постачання вам усього спеціалізованого обладнання для бойових видів спорту та бойових мистецтв, яке вам потрібно, щоб показати якнайкраще. Купуйте в нашому інтернет-магазині найновіший одяг для MMA та обладнання для тренувань з єдиноборств, зокрема: шорти та рукавички для MMA, боксерські рукавички, футболки для MMA та UFC, спортивні штани BJJ Gi та рашгарди.'}
            </Paragraph>
          </BlockItem>
          <BlockItem>
            <H4>
              {language === 'EN' ? 'MARTIAL ARTS EQUIPMENT & UNIFORMS' : 'ММА обмундирування та уніформа'}
            </H4>
            <Paragraph>
              {language === 'EN' ? 'We\'re the number one choice for athletes when it comes to martial arts and combat sports, with the largest selection of gear and apparel for MMA, Muay Thai, Boxing, Kickboxing, Karate and Taekwondo. Shop for innovative workout equipment and clothing, including: grappling dummies, strength and conditioning gear, and all the uniforms, protective gear and training apparel you\'ll need to push yourself to the absolute limit. Choose from heavyweight brands from the likes of Venum, Ringside Boxing, Fumetsu, Fairtex and so many more.' : 'Ми є вибором номер один для спортсменів, коли мова заходить про бойові мистецтва та єдиноборства, з найбільшим вибором спорядження та одягу для MMA, тайського боксу, боксу, кікбоксингу, карате та тхеквондо. Придбайте інноваційне обладнання та одяг для тренувань, зокрема: манекени для захватів, силове спорядження та спорядження для кондиціонування, а також усю уніформу, захисне спорядження та тренувальний одяг, які вам знадобляться, щоб досягти абсолютного результату. Вибирайте серед таких потужних брендів, як Venum, Ringside Boxing, Fumetsu, Fairtex та багато інших.'}
            </Paragraph>
          </BlockItem>
        </Block>
      </Container>
    </AboutBlockStyled>
  );
};
