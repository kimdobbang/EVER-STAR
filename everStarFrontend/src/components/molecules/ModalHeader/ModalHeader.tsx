import React from 'react';
import { ArrowIcon } from 'components/atoms/icons/Arrow/ArrowIcon';

interface ModalHeaderProps {
  text: string;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  iconSize?: 16 | 24;
  iconColor?: 'black' | 'gray' | 'white' | 'orange';
  iconHover?: boolean;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  text,
  showLeftIcon = true,
  showRightIcon = false,
  iconSize = 24,
  iconColor = 'black',
  iconHover = true,
  onLeftIconClick,
  onRightIconClick,
}) => {
  return (
    <header className='relative flex items-center justify-center w-full py-4'>
      {showLeftIcon && (
        <div
          className='absolute cursor-pointer left-4'
          onClick={onLeftIconClick}
        >
          <ArrowIcon
            size={iconSize}
            direction='left'
            color={iconColor}
            hover={iconHover}
          />
        </div>
      )}
      <h1 className='kor-h-h2'>{text}</h1>
      {showRightIcon && (
        <div
          className='absolute cursor-pointer right-4'
          onClick={onRightIconClick}
        >
          <ArrowIcon
            size={iconSize}
            direction='right'
            color={iconColor}
            hover={iconHover}
          />
        </div>
      )}
    </header>
  );
};

export type { ModalHeaderProps };
