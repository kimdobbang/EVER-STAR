import PropTypes from 'prop-types';
import React from 'react';
import './ButtonText.css';

interface ButtonTextProps {
  show: boolean;
  prop: string;
  showIcon: boolean;
  size: 'large' | 'size-4' | 'medium' | 'small';
  color: 'black' | 'grey';
  className?: string;
  divClassName?: string;
}

export const ButtonText = ({
  show = true,
  prop = '텍스트 버튼',
  showIcon = true,
  size,
  color,
  divClassName,
  className,
}: ButtonTextProps): JSX.Element => {
  // Define font style classes based on size and color
  let fontStyleClass = '';
  if (color === 'grey' || size === 'small') {
    fontStyleClass = 'font-kor-p-p3';
  } else if (size === 'large') {
    fontStyleClass = 'font-kor-h-h3';
  } else if (size === 'medium') {
    fontStyleClass = 'font-kor-subtitle-subtitle2';
  }
  return (
    <div
      className={`
        relative
        ${className ?? ''}
        ${size === 'size-4' ? 'w-[58px]' : ''}
        ${color === 'black' ? 'inline-flex' : size === 'size-4' ? 'flex' : ''}
        ${size === 'size-4' ? 'flex-col' : ''}
        ${color === 'black' ? 'items-center' : size === 'size-4' ? 'items-start' : ''}
        ${size === 'size-4' ? 'justify-center' : ''}
        ${divClassName ?? ''}
        
      `}
    >
      {show && (
        <div
          className={`
            text-center relative
            ${fontStyleClass}
            ${color === 'grey' || size === 'small' ? 'font-kor-p-p3' : size === 'large' ? 'font-kor-h-h3' : size === 'medium' ? 'font-kor-subtitle-subtitle2' : ''}
            ${color === 'black' ? 'w-fit' : ''}
            ${size === 'size-4' ? 'self-stretch' : ''}
            ${color === 'grey' || size === 'small' ? 'mt-[-1.00px]' : size === 'large' ? 'mt-[-0.50px]' : ''}
            ${color === 'grey' || size === 'small' ? 'tracking-[var(--kor-p-p3-letter-spacing)]' : size === 'large' ? 'tracking-[var(--kor-h-h3-letter-spacing)]' : size === 'medium' ? 'tracking-[var(--kor-subtitle-subtitle2-letter-spacing)]' : ''}
            ${color === 'grey' || size === 'small' ? 'text-[length:var(--kor-p-p3-font-size)]' : size === 'large' ? 'text-[length:var(--kor-h-h3-font-size)]' : size === 'medium' ? 'text-[length:var(--kor-subtitle-subtitle2-font-size)]' : ''}
            ${color === 'grey' || size === 'small' ? '[font-style:var(--kor-p-p3-font-style)]' : size === 'large' ? '[font-style:var(--kor-h-h3-font-style)]' : size === 'medium' ? '[font-style:var(--kor-subtitle-subtitle2-font-style)]' : ''}
            ${size === 'size-4' ? 'text-greyscaleblack-80' : color === 'black' ? 'text-greyscaleblack-100' : ''}
            ${color === 'grey' || size === 'small' ? 'font-[number:var(--kor-p-p3-font-weight)]' : size === 'large' ? 'font-[number:var(--kor-h-h3-font-weight)]' : size === 'medium' ? 'font-[number:var(--kor-subtitle-subtitle2-font-weight)]' : ''}
            ${color === 'grey' || size === 'small' ? 'leading-[var(--kor-p-p3-line-height)]' : size === 'large' ? 'leading-[var(--kor-h-h3-line-height)]' : size === 'medium' ? 'leading-[var(--kor-subtitle-subtitle2-line-height)]' : ''}
            `}
        >
          {prop}
        </div>
      )}

      {color === 'black' && showIcon && (
        <svg
          className={
            ['large', 'medium'].includes(size)
              ? '!relative !w-6 !h-6'
              : size === 'small'
                ? '!relative !w-4 !h-4'
                : undefined
          }
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289L18.5303 11.1161C19.0185 11.6043 19.0185 12.3957 18.5303 12.8839L12.7071 18.7071C12.3166 19.0976 11.6834 19.0976 11.2929 18.7071C10.9024 18.3166 10.9024 17.6834 11.2929 17.2929L16.5858 12L11.2929 6.70711C10.9024 6.31658 10.9024 5.68342 11.2929 5.29289Z'
            fill='black'
          />
        </svg>
      )}
    </div>
  );
};

ButtonText.propTypes = {
  show: PropTypes.bool,
  prop: PropTypes.string,
  showIcon: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'size-4', 'medium', 'small']),
  color: PropTypes.oneOf(['black', 'grey']),
  divClassName: PropTypes.string,
  className: PropTypes.string,
};

export type { ButtonTextProps };
