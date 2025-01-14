import React from 'react';

type LabelSize = 'large' | 'medium' | 'small' | 'xl';
type Color = 'black' | 'gray' | 'white';

interface ILetterText {
  size: LabelSize;
  color: string; // Color 타입을 string으로 변경
  children?: string;
  className?: string; // className을 받을 수 있도록 추가
}

const fontStyle = {
  xl: 'text-[24px] font-normal leading-normal tracking-tight',
  large: 'text-[16px] font-normal leading-normal tracking-tight',
  medium: 'text-[13px] font-normal leading-normal tracking-[-1.04px]',
  small: 'text-[12px] font-normal leading-normal tracking-[-0.24px]',
};

const colorStyle = {
  black: 'text-greyscaleblack-100',
  gray: 'text-greyscaleblack-80',
  white: 'text-greyscalewhite',
};

export const LetterText = ({ size, color, children, className }: ILetterText) => {
  return (
    <div className='max-w-full'>
      <div
        className={`top-0 left-0 font-Kyobo ${fontStyle[size]} ${colorStyle[color as Color] || ''} ${className || ''}`}
      >
        {children}
      </div>
    </div>
  );
};
