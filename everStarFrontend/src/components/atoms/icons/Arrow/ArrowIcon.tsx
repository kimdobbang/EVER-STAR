import React from 'react';
import { ReactComponent as ArrowLeft } from 'assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from 'assets/icons/arrow-right.svg';
import { ReactComponent as ArrowUp } from 'assets/icons/arrow-up.svg';
import { ReactComponent as ArrowDown } from 'assets/icons/arrow-down.svg';

export interface ArrowIconProps {
  size: 16 | 24;
  direction: 'left' | 'right' | 'up' | 'down';
  color?: 'black' | 'gray' | 'white' | 'orange';
  hover?: boolean;
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({
  size,
  direction,
  color = 'black',
  hover = false,
}) => {
  let IconComponent;
  switch (direction) {
    case 'left':
      IconComponent = ArrowLeft;
      break;
    case 'right':
      IconComponent = ArrowRight;
      break;
    case 'up':
      IconComponent = ArrowUp;
      break;
    case 'down':
      IconComponent = ArrowDown;
      break;
    default:
      IconComponent = ArrowRight;
  }

  const sizeClasses = size === 16 ? 'w-4 h-4' : 'w-6 h-6';
  const colorClasses = {
    black: 'text-greyscaleblack-100',
    gray: 'text-greyscaleblack-60',
    white: 'text-greyscalewhite',
    orange: 'text-mainprimary',
  };
  const hoverClass = hover ? 'hover:text-mainprimary' : '';

  return <IconComponent className={`${sizeClasses} ${colorClasses[color]} ${hoverClass}`} />;
};
