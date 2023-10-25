import React from 'react';
import { Container } from '../../Layout/Container';
import styled from 'styled-components';

const StyledBlockError = styled.div`
position: relative;
`;

const Block = styled.div`
display: flex;
padding: 0 10px 0;
box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
border-radius: 4px;
height: 40px;
`;

interface Props {
  error: string;
}

export const BlockError: React.FC <Props> = ({ error }) => {
  return (
    <StyledBlockError>
      <Container>
        <Block>
          {error}
        </Block>
      </Container>
    </StyledBlockError>
  );
};
