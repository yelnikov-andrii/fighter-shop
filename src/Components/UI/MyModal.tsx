import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface MyModalProps {
  active: string;
}

const MyModalStyled = styled.div<MyModalProps>`
top: 0;
left: 0;
right: 0;
bottom: 0;
position: fixed;
display: none;
background: rgba(0, 0, 0, 0.5);
display: ${props => props.active ? 'flex' : ''};
justify-content: center;
align-items: center;
`;

const MyModalContent = styled.div`
background: white;
padding: 25px;
max-width: 500px;
border-radius: 16px;
`;

interface Props {
  children: React.ReactNode;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

export const MyModal: React.FC <Props> = ({ children, active, setActive }) => {
  return (
    <MyModalStyled 
      active={active ? 'true' : ''}
      onClick={() => {
        setActive(false);
      }}
    >
      <MyModalContent 
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </MyModalContent>
    </MyModalStyled>
  );
};
