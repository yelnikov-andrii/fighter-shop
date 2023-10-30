import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Container } from '../Layout/Container';

const List = styled.div`
display: flex;
gap: 5px;
`;

interface PageInt {
  current: string;
}

const Page = styled.div<PageInt>`
width: 30px;
height: 30px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
background-color: ${props => props.current ? '#007bff' : '#fff'};
color: ${props => props.current ? '#fff' : '#333'};
font-weight: bold;
transition: all 0.2s;
border-radius: 4px;
user-select: none;
border: ${props => props.current ? '1px solid black' : '1px solid transparent'};
`;

interface Props {
  countOfProducts: number;
  setPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
}

export const Pagination: React.FC <Props> = ({ countOfProducts, setPage, currentPage }) => {
  const limit = 9;
  const countOfPages = Math.ceil(countOfProducts / limit);

  const pages = [];

  for (let i = 1; i <= countOfPages; i++) {
    pages.push(i);
  }
  return (
    <Container>
      <List>
        {pages.length > 1 && pages.map(page => (
          <Page 
            onClick={() => {
              setPage(page);
            }}
            current={currentPage === page ? 'true' : ''}
            key={page}
          >
            {page}
          </Page>
        ))}
      </List>
    </Container>
  );
};
