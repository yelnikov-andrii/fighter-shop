import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
max-width: 1200px;
margin: 0 auto;
padding: 0 30px;
`;

interface Props {
  children: React.ReactNode;
}

export const Container: React.FC <Props> = ({ children }) => {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  );
};
