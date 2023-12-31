/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.div`
  border-radius: 8px;
  padding: 5px 10px;
`;

const SelectButton = styled.div`
  cursor: pointer;
  background-color: teal;
  color: white;
  padding: 5px 10px;
  border-radius: 8px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
    padding: 2px 6px;
  }
`;

interface DropdownInt {
  isopen: string;
}

const DropdownContent = styled.div<DropdownInt>`
  display: ${props => (props.isopen ? 'block' : 'none')};
  background-color: white;
  border: 1px solid teal;
  border-radius: 8px;
  margin-top: 5px;
  padding: 5px 10px;
`;

interface Props {
  butttonContent: string;
  children: React.ReactNode;
  autoClose?: boolean;
}

export const MyDropdown: React.FC <Props> = ({ butttonContent, children, autoClose }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event: MouseEvent) => {
    const target = event.target as Node;
    if (dropdownRef.current && !dropdownRef.current.contains(target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    if (autoClose) {
      document.addEventListener('click', closeDropdown);
    }

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <StyledSelect 
      ref={dropdownRef}
    >
      <SelectButton  
        onClick={toggleDropdown}
      >
        {butttonContent}
      </SelectButton>
      {isOpen && (
        <DropdownContent 
          isopen={isOpen ? 'true' : ''}
        >
          {children}
        </DropdownContent>
      )}
    </StyledSelect>
  );
};
