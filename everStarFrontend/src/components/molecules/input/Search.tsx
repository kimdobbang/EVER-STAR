import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon } from 'components/atoms/icons/Search/SearchIcon';
import { DropdownMenu } from 'components/atoms/DropdownMenu/DropdownMenu';

interface SearchProps {
  initialState: 'disable' | 'focus' | 'default';
  className?: string;
  placeholderButtonTextIcon?: JSX.Element;
  options: (string | number)[];
  onOptionSelect: (option: string | number) => void;
  onInputChange?: (input: string) => void;
  moveToTopOnClick?: boolean;
  enableFiltering?: boolean;
  dropdownMaxHeight?: number; // 선택적인 드롭다운 최대 높이 속성
}

export const Search = ({
  initialState,
  className = '',
  placeholderButtonTextIcon = <SearchIcon size={24} color="black" />,
  options = [],
  onOptionSelect,
  onInputChange,
  moveToTopOnClick = true,
  enableFiltering = true,
  dropdownMaxHeight, // 선택적으로 받음
}: SearchProps): JSX.Element => {
  const [state, setState] = useState<'disable' | 'focus' | 'default'>(initialState);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<(string | number)[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const buttonTextProp =
    state === 'focus' ? '' : state === 'disable' ? '검색 결과' : '검색어를 입력하세요';

  useEffect(() => {
    if (enableFiltering && state === 'focus') {
      setFilteredOptions(
        options.filter((option) =>
          option.toString().toLowerCase().includes(inputValue.toLowerCase()),
        ),
      );
    } else {
      setFilteredOptions(options);
    }
  }, [inputValue, state, options, enableFiltering]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setState('default');
      }
    };

    if (state === 'focus') {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [state]);

  const handleFocus = () => {
    if (state !== 'disable') {
      setState('focus');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onInputChange) {
      onInputChange(e.target.value);
    }
  };

  const handleOptionSelect = (option: string | number) => {
    if (moveToTopOnClick) {
      setInputValue(option.toString());
    }
    setState('default');
    onOptionSelect(option);
  };

  return (
    <div className={`w-100 flex flex-col items-start relative ${className}`} ref={searchRef}>
      <div className="w-full flex self-stretch flex-col items-start gap-2 flex-[0_0_auto] relative">
        <div
          className={`flex items-center px-4 py-2 relative w-full rounded-xl bg-white self-stretch h-14 overflow-hidden
          ${state === 'focus' ? 'border-[#ff9078] border-2 border-solid' : ''}
          ${state === 'focus' ? 'shadow-[0px_0px_24px_#ff90784c]' : 'shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99]'}`}
          onClick={handleFocus}
        >
          <div className="flex items-center w-full">
            <div className="flex-none">{placeholderButtonTextIcon}</div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="flex-grow ml-2 outline-none"
              placeholder={buttonTextProp}
            />
          </div>
        </div>
        {state === 'focus' && filteredOptions.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '100%', // Dropdown menu appears directly below the search bar
              left: 0,
              width: '100%',
            }}
          >
            <DropdownMenu
              options={filteredOptions}
              onOptionSelect={handleOptionSelect}
              maxHeight={dropdownMaxHeight} // 드롭다운 최대 높이를 전달
            />
          </div>
        )}
      </div>
    </div>
  );
};

Search.propTypes = {
  initialState: PropTypes.oneOf(['disable', 'focus', 'default']).isRequired,
  className: PropTypes.string,
  placeholderButtonTextIcon: PropTypes.element,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  onOptionSelect: PropTypes.func.isRequired,
  moveToTopOnClick: PropTypes.bool,
  onInputChange: PropTypes.func,
  enableFiltering: PropTypes.bool,
  dropdownMaxHeight: PropTypes.number, // 선택적인 PropType
};
