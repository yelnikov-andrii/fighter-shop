import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.div`
    position: relative;
    display: inline-block;
    z-index: 2;
`;

const SelectButton = styled.div`
  cursor: pointer;
  background-color: teal;
  color: white;
  padding: 5px 10px;
  border-radius: 8px;
`;

interface OptionsProps {
  isopen: string;
}

const Options = styled.div<OptionsProps>`
  display: ${props => (props.isopen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid teal;
  border-radius: 8px;
  padding: 5px 0;
  max-height: 250px;
  overflow-y: auto;
  margin: 4px 0 0 0;
`;

const Option = styled.div`
  cursor: pointer;
  padding: 5px;

  &:hover {
    background-color: teal;
    color: white;
  }
`;

interface Props {
  options: string[];
  change: (option: string) => void;
}

export const MySelect: React.FC <Props> = ({ options, change }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<string>(options[0]);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    change(option);
    setIsOpen(false);
  };

  const closeDropdown = (event: MouseEvent) => {
    const target = event.target as Node;
    if (dropdownRef.current && !dropdownRef.current.contains(target)) {
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
        {selectedOption}
      </SelectButton>
      {isOpen && (
        <Options 
          isopen={isOpen === true ? 'ture' : ''}
        >
          {options.map((option: string, index: number) => (
            <Option
              key={option + index}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </Option>
          ))}
        </Options>
      )}
    </StyledSelect>
  );
};

