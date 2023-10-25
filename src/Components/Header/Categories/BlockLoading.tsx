import React from 'react';
import styled from 'styled-components';
import { Container } from '../../Layout/Container';

const StyledBlockLoading = styled.div`
position: relative;
`;

const Block = styled.div`
display: flex;
padding: 0 10px 0;
box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
border-radius: 4px;
height: 40px;
`;

export const BlockLoading = () => {
  return (
    <StyledBlockLoading>
      <Container>
        <Block>
          Loading...
        </Block>
      </Container>
    </StyledBlockLoading>
  );
};
