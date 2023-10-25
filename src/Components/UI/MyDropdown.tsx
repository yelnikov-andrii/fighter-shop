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
`;

const DropdownContent = styled.div<any>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  background-color: white;
  border: 1px solid teal;
  border-radius: 8px;
  margin-top: 5px;
  padding: 5px 10px;
`;

export const MyDropdown: React.FC <any> = ({ butttonContent, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<any>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', closeDropdown);

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
          isOpen={isOpen}
        >
          {children}
        </DropdownContent>
      )}
    </StyledSelect>
  );
};
