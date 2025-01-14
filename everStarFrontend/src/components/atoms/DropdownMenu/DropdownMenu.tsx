import React from 'react';

interface DropdownMenuProps {
  options: (string | number)[];
  onOptionSelect: (option: string | number) => void;
  maxHeight?: number; // 선택 사항인 최대 높이 prop
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  onOptionSelect,
  maxHeight, // maxHeight를 선택적으로 받음
}) => {
  return (
    <div
      className={`absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg ${
        maxHeight ? 'overflow-y-auto' : ''
      }`}
      style={{ maxHeight: maxHeight ? `${maxHeight}px` : 'auto' }} // maxHeight가 있으면 적용, 없으면 auto
    >
      <ul className='py-1'>
        {options.map((option, index) => (
          <li
            key={index}
            className='z-10 flex items-center justify-start p-4 mt-1 list-none cursor-pointer text-kor-h-h3'
            onClick={() => onOptionSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
